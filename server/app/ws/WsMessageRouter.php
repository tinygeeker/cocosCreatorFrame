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
        if (!$data || empty($data['cmd'])) return;

        switch ($data['cmd']) {
            case 'user.login':
                AuthService::login($connection, $data['data']);
                break;
            case 'user.list':
                AuthService::list($connection);
                break;
            case 'hall.chat':
                ChatService::hallChat($connection, $data['data']);
                break;
            case 'room.create':
                RoomService::create($connection);
                break;
            case 'room.list':
                RoomService::list($connection);
                break;
            case 'room.join':
                RoomService::join($connection, $data['data']);
                break;
            case 'frame.input':
                FrameService::input($connection, $data['data']);
                break;
            default:
                break;
        }
    }

    public static function onClose(TcpConnection $connection)
    {
        AuthService::logout($connection);
    }
}

