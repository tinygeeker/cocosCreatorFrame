<?php
/**
 * 帧同步
 */
namespace app\service;

use GatewayWorker\Lib\Gateway;

class FrameService
{
    protected static $inputs = [];
    protected static $frame = 0;

    public static function input(string $clientId, array $data)
    {
        $uid = Gateway::getUidByClientId($clientId);

        self::$inputs[self::$frame][] = [
            'uid' => $uid,
            'op'  => $data['op']
        ];
    }

    public static function tick()
    {
        self::$frame++;

        $payload = [
            'cmd' => 'frame.sync',
            'data' => [
                'frame'  => self::$frame,
                'inputs' => self::$inputs[self::$frame] ?? []
            ]
        ];

        Gateway::sendToAll(json_encode($payload));

        unset(self::$inputs[self::$frame]);
    }
}

