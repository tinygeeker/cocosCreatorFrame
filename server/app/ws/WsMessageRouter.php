<?php
namespace app\ws;

use app\wsservice\AuthService;
use app\wsservice\ChatService;
use app\wsservice\FrameService;
use app\wsservice\RoomService;
use Workerman\Connection\TcpConnection;

class WsMessageRouter
{
    public static function dispatch(TcpConnection $connection, string $message)
    {
        $data = json_decode($message, true);
        if (!$data || empty($data['name'])) return;

        switch ($data['name']) {
            case 'ApiPlayerJoin':
                AuthService::login($connection, $data['data']);
                break;
            case 'hall.chat':
                ChatService::hallChat($connection, $data['data']);
                break;
            case 'room.join':
                RoomService::join($connection, $data['data']);
                break;
            case 'MsgClientSync':
                FrameService::input($connection, $data['data']);
                break;
            default:
                break;
        }
    }
}

