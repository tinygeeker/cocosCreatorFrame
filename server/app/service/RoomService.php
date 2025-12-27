<?php

namespace app\service;

use GatewayWorker\Lib\Gateway;

class RoomService
{
    protected static $rooms = [];

    protected static $clientRoomMap = [];

    public static function join(string $clientId, array $data)
    {
        $roomId = $data['room_id'];

        if (isset(self::$clientRoomMap[$clientId])) return;

        // 记录房间成员
        self::$clientRoomMap[$clientId] = $roomId;
        self::$rooms[$roomId]['players'][] = $clientId;

        Gateway::joinGroup($clientId, 'room_' . $roomId);

        Gateway::sendToGroup('room_' . $roomId, json_encode([
            'cmd' => 'room.joined',
            'data' => [
                'client_id' => $clientId
            ]
        ]));
    }

    public static function leave(string $clientId)
    {
        // 不在任何房间
        if (!isset(self::$clientRoomMap[$clientId])) {
            return;
        }

        $roomId = self::$clientRoomMap[$clientId];
        $group = 'room_' . $roomId;

        // 从房间移除
        unset(self::$rooms[$roomId]['players'][$clientId]);
        unset(self::$clientRoomMap[$clientId]);

        // 离开 Gateway 分组
        Gateway::leaveGroup($clientId, $group);

        // 房间空了可以销毁
        if (empty(self::$rooms[$roomId]['players'])) {
            unset(self::$rooms[$roomId]);
        }

        // 通知房间内其他人
        Gateway::sendToGroup($group, json_encode([
            'cmd' => 'room.left',
            'data' => [
                'client_id' => $clientId
            ]
        ]));
    }
}
