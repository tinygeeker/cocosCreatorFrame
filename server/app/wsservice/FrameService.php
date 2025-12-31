<?php
/**
 * 帧同步
 */

namespace app\wsservice;


use Workerman\Connection\TcpConnection;

class FrameService
{
    private static $connection;
    protected static $inputs = [];
    protected static $frame = 0;

    public static function input(TcpConnection $connection, array $data)
    {
        self::$inputs[self::$frame][] = $data['input'];
        self::$connection = $connection;
    }

    public static function tick()
    {
        if (empty(self::$inputs[self::$frame])) {
            return;
        }

        $payload = [
            'cmd' => 'frame.sync',
            'data' => [
                'inputs' => self::$inputs[self::$frame] ?? []
            ]
        ];

        self::$connection->send(json_encode($payload));

        unset(self::$inputs[self::$frame]);

        self::$frame++;
    }
}

