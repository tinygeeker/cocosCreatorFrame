<?php
namespace app\wsservice;

use GatewayWorker\Lib\Gateway;
use Workerman\Connection\TcpConnection;

class ChatService
{
    public static function hallChat(TcpConnection $connection, array $data)
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
