<?php

namespace app\ws;

use GatewayWorker\Lib\Gateway;
use Workerman\Lib\Timer;
use app\service\FrameService;

class Events
{
    /**
     * BusinessWorker 启动时触发
     * 每个 BusinessWorker 进程只会执行一次
     */
    public static function onWorkerStart($worker)
    {
//        if ($worker->id !== 0) {
//            return;
//        }
//        // 20 帧 / 秒 = 50ms
//        Timer::add(0.05, function () {
//            FrameService::tick();
//        });
    }

    public static function onWorkerReload()
    {
    }

    public static function onConnect($connection)
    {
        $connection->clientId = uniqid();
    }

    public static function onMessage($connection, $message)
    {
        var_dump($connection);
//        MessageRouter::dispatch($clientId, $message);

        $connection->send('小狗收到' . $connection->clientId);
    }

    public static function onClose($clientId)
    {
//        ReconnectService::offline($clientId);
    }

    public static function onError($clientId, $code, $msg)
    {
        echo "error [$code] $clientId $msg\n";
    }
}
