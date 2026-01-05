<?php

namespace app\ws;

use GatewayWorker\Lib\Gateway;
use think\Console;
use Workerman\Lib\Timer;
use app\wsservice\FrameService;

class Events
{
    private static $connections = [];

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
            FrameService::tick();
        });
    }

    public static function onWorkerReload()
    {
        echo "[onWorkerReload] 成功\n";
    }

    public static function onConnect($connection)
    {
        echo "[onConnect] 成功\n";
        self::$connections[spl_object_id($connection)] = $connection;
    }

    public static function onMessage($connection, $message)
    {
        echo "[onMessage] 成功\n";
        WsMessageRouter::dispatch($connection, $message);
    }

    public static function onClose($connection)
    {
        echo "[onClose] 成功\n";
        WsMessageRouter::onClose($connection);
        unset(self::$connections[spl_object_id($connection)]);
    }

    public static function onError($connection, $code, $msg)
    {
        echo "[onError] $code $msg\n";
    }
}
