<?php
namespace app\ws;

use app\service\AuthService;
use app\service\ChatService;
use app\service\FrameService;
use app\service\RoomService;

class MessageRouter
{
    public static function dispatch(string $clientId, string $message)
    {
        $data = json_decode($message, true);
        if (!$data || empty($data['cmd'])) return;

        switch ($data['cmd']) {
            case 'auth':
                AuthService::login($clientId, $data['data']);
                break;
            case 'hall.chat':
                ChatService::hallChat($clientId, $data['data']);
                break;
            case 'room.join':
                RoomService::join($clientId, $data['data']);
                break;
            case 'frame.input':
                FrameService::input($clientId, $data['data']);
                break;
            default:
                break;
        }
    }
}

