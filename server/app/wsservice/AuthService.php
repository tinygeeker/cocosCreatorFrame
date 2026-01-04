<?php

namespace app\wsservice;

use GatewayWorker\Lib\Gateway;
use Workerman\Connection\TcpConnection;

class AuthService
{
    private static $uid = 0;
    private static $users = [];

    public static function login(TcpConnection $connection, array $data)
    {
        $uid = ++static::$uid;
        $user = [
            'id' => $uid,
            'nickname' => $data['nickname']
        ];

        self::$users[$uid] = $user;

        $payload = [
            'name' => 'user.login.sync',
            'data' => [
                'success' => true,
                'res' => $user
            ]
        ];
        $connection->send(json_encode($payload, JSON_UNESCAPED_UNICODE));
    }

    public static function logout(array $data)
    {
        $uid = $data['id'];

        if (isset(self::$users[$uid])) {
            unset(self::$users[$uid]);
        }
    }
}
