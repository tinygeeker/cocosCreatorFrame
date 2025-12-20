<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | Workerman设置 仅对 php think worker:server 指令有效
// +----------------------------------------------------------------------
return [
    // 扩展自身需要的配置
    'protocol' => 'websocket', // 协议 支持 tcp udp unix http websocket text
    'host' => '0.0.0.0', // 监听地址
    'port' => 2345, // 监听端口
    'socket' => '', // 完整监听地址
    'context' => [], // socket 上下文选项
    'worker_class' => '', // 自定义Workerman服务类名 支持数组定义多个服务

    // 支持workerman的所有配置参数
    'name' => 'cocos-game',
    'count' => 4,
    'daemonize' => false,
    'pidFile' => '',

    // 支持事件回调
    // onWorkerStart
    'onWorkerStart' => [app\ws\Events::class, 'onWorkerStart'],
    // onWorkerReload
    'onWorkerReload' => [app\ws\Events::class, 'onWorkerReload'],
    // onConnect
    'onConnect' => [app\ws\Events::class, 'onConnect'],
    // onMessage
    'onMessage' => [app\ws\Events::class, 'onMessage'],
    // onClose
    'onClose' => [app\ws\Events::class, 'onClose'],
    // onError
    'onError' => [app\ws\Events::class, 'onError'],
];
