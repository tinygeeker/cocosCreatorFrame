<?php
namespace app\service;

use GatewayWorker\Lib\Gateway;

class RoomService
{
    protected static $rooms = [];

    public static function join(string $clientId, array $data)
    {
        $roomId = $data['room_id'];

        self::$rooms[$roomId]['players'][] = $clientId;
        Gateway::joinGroup($clientId, 'room_' . $roomId);

        Gateway::sendToGroup('room_' . $roomId, json_encode([
            'cmd' => 'room.joined',
            'data' => [
                'client_id' => $clientId
            ]
        ]));
    }
}
