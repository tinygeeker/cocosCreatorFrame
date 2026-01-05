<?php

namespace app\wsservice;

use app\common\Response;
use GatewayWorker\Lib\Gateway;
use Workerman\Connection\TcpConnection;

class RoomService
{
    protected static $roomId = 0;
    private static $rooms = [];
    private static $userRoomMap = [];

    public static function list(TcpConnection $connection)
    {
        $connection->send(Response::success('room.list', self::$rooms));
    }

    public static function create(TcpConnection $connection)
    {
        if (!isset($connection->uid)) {
            return $connection->send(Response::error('room.create', '用户未登录~'));
        }

        $uid = $connection->uid;
        $userInfo = AuthService::getUserInfo($uid);

        if (!$userInfo) {
            return $connection->send(Response::error('room.create', '用户不存在~'));
        }

        if (isset(self::$userRoomMap[$uid])) {
            return $connection->send(Response::error('room.create', '已经在房间内~'));
        }

        $roomId = ++self::$roomId;
        $roomInfo = [
            'id' => $roomId,
            'name' => '房间号：' . $roomId,
            'owner' => $uid,
            'owner_name' => $userInfo['nickname'],
            'players' => [$userInfo]
        ];

        self::$rooms[$roomId] = $roomInfo;
        self::$userRoomMap[$uid] = $roomId;

        $connection->send(Response::success('room.create', [$roomInfo]));

        // 同步给大厅中所有用户
        self::broadcastRoomListToLobby();

        // 单独给创建者推送房间详情
//        self::notifyRoomUpdate($roomId, $uid);

        return true;
    }

    public static function broadcastRoomListToLobby()
    {
        $connections = AuthService::getAllConnections();

        foreach ($connections as $connection) {
            $uid = $connection->uid ?? null;
            if ($uid && isset(self::$userRoomMap[$uid])) {
                continue;
            }

            $connection->send(Response::success('room.create', self::$rooms));
        }
    }

    public static function join(TcpConnection $connection, array $data)
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
