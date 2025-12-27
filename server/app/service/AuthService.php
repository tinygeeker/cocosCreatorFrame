<?php

namespace app\service;

use GatewayWorker\Lib\Gateway;

class AuthService
{
    public static function login(string $clientId, array $data)
    {
        $uid = Gateway::getUidByClientId($clientId);

        if (!$uid) return;

        Gateway::bindUid($clientId, $uid);

        Gateway::sendToClient($clientId, json_encode([
            'cmd' => 'auth.ok',
            'data' => ['uid' => $uid]
        ]));
    }
}
