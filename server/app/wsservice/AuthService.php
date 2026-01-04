<?php

namespace app\wsservice;

use app\common\Response;
use GatewayWorker\Lib\Gateway;
use Workerman\Connection\TcpConnection;

class AuthService
{
    private static $uid = 0;
    private static $userMap = [];
    private static $userClientMap = [];

    public static function login(TcpConnection $connection, array $input)
    {
        $uid = ++self::$uid;
        $data = [
            'id' => $uid,
            'rid' => 10,
            'nickname' => $input['nickname']
        ];

        self::$userMap[$uid] = $data;
        self::$userClientMap[$uid] = $connection;

        $connection->send(Response::success('user.login', $data));

        // 广播
        self::list();
    }

    public static function list()
    {
        foreach (self::$userClientMap as $client) {
            $client->send(Response::success('user.list', self::$userMap));
        }
    }

    public static function logout(array $data)
    {
        $uid = $data['id'];

        if (isset(self::$userMap[$uid])) {
            unset(self::$userMap[$uid]);
        }
    }
}
