<?php
namespace app\service;

use GatewayWorker\Lib\Gateway;

class ChatService
{
    public static function hallChat(string $clientId, array $data)
    {
        $uid = Gateway::getUidByClientId($clientId);

        Gateway::sendToAll(json_encode([
            'cmd' => 'hall.chat.push',
            'data' => [
                'uid'     => $uid,
                'content' => $data['content'],
                'time'    => time()
            ]
        ]));
    }
}
