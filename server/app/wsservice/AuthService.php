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

        $connection->uid = $uid;
        self::$userMap[$uid] = $data;
        self::$userClientMap[$uid] = $connection;

        $connection->send(Response::success('user.login', $data));

        // 广播
        self::notifyUserLogin($data);
    }

    public static function list(TcpConnection $connection)
    {
        $connection->send(Response::success('user.list', self::$userMap));
    }

    public static function notifyUserLogin(array $userInfo)
    {
        foreach (self::$userClientMap as $uid => $client) {
            if ($uid === $userInfo['id']) continue;

            $client->send(Response::success('user.add', [$userInfo]));
        }
    }

    private static function notifyUserLeave()
    {
        foreach (self::$userClientMap as $client) {
            $client->send(Response::success('user.leave', self::$userMap));
        }
    }


    public static function logout(TcpConnection $connection)
    {
        if (isset($connection->uid)) {
            unset(self::$userMap[$connection->uid]);
            unset(self::$userClientMap[$connection->uid]);
        }

        // 广播
        self::notifyUserLeave();
    }
}
