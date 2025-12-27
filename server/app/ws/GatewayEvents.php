<?php

namespace app\ws;

use GatewayWorker\Lib\Gateway;
use Workerman\Lib\Timer;
use app\service\FrameService;

class GatewayEvents
{
    /**
     * BusinessWorker 启动时触发
     * 每个 BusinessWorker 进程只会执行一次
     */
    public static function onWorkerStart($worker)
    {
        echo "[onWorkerStart] 成功$worker->id\n";
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

    public static function onConnect($clientId)
    {
        echo "[onConnect/$clientId] 成功\n";
    }

    public static function onMessage($clientId, $message)
    {
        echo "[onMessage] 成功\n";
        MessageRouter::dispatch($clientId, $message);
    }

    public static function onClose($clientId)
    {
        echo "[onClose/$clientId] 成功\n";
    }

    public static function onError($clientId, $code, $msg)
    {
        echo "[onError/$clientId] $code $msg\n";
    }
}
