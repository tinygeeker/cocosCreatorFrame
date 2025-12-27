<?php

namespace app\ws;

use GatewayWorker\Lib\Gateway;
use think\Console;
use Workerman\Lib\Timer;
use app\service\FrameService;

class Events
{
    protected static $connections = [];
    protected static $inputs = [];

    /**
     * BusinessWorker 启动时触发
     * 每个 BusinessWorker 进程只会执行一次
     */
    public static function onWorkerStart($worker)
    {
        echo "[onWorkerStart] 成功\n";
        if ($worker->id !== 0) return;

        // 20帧 / 秒
        Timer::add(0.05, function () {
            self::tick();
        });
    }

    public static function onWorkerReload()
    {
        echo "[onWorkerReload] 成功\n";
    }

    public static function onConnect($connection)
    {
        $id = spl_object_id($connection);
        echo "[onConnect/$id] 成功\n";
        self::$connections[$id] = $connection;
    }

    public static function onMessage($connection, $message)
    {
        echo "[onMessage] 成功\n";
        $data = json_decode($message, true);
        $name = $data['name'];
        $frameId = $data['data']['frameId'];
        $input = $data['data']['input'];
        switch ($name) {
            case 'MsgClientSync':
                self::$inputs[] = $input;
                break;
        }

    }

    public static function onClose($connection)
    {
        echo "[onClose] 成功\n";
        unset(self::$connections[spl_object_id($connection)]);
    }

    public static function onError($connection, $code, $msg)
    {
        echo "[onError] $code $msg\n";
    }

    public static function tick()
    {
        if (empty(self::$inputs)) {
            return;
        }

        $payload = json_encode([
            'name' => 'MsgServerSync',
            'data' => [
                'inputs' => self::$inputs
            ]
        ]);

        foreach (self::$connections as $conn) {
            $conn->send($payload);
        }

        self::$inputs = [];
    }
}
