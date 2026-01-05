<?php
declare (strict_types=1);

namespace app\common;

class Response
{
    protected static $errorCode = 100;
    protected static $successCode = 200;
    protected static $successMessage = '成功~';
    protected static $errorMessage = '失败~';

    public static function success($cmd = '', $data = [], $message = '', $code = 200)
    {
        $response = [
            'cmd' => $cmd,
            'code' => $code ?: self::$successCode,
            'msg' => $message ?: self::$successMessage,
            'data' => $data
        ];

        return json_encode($response, JSON_UNESCAPED_UNICODE);
    }

    public static function error($cmd = '', $message = '', $code = 100, $debug = [])
    {
        $response = [
            'cmd' => $cmd,
            'code' => $code ?: self::$errorCode,
            'msg' => $message ?: self::$errorMessage,
            'debug' => $debug
        ];

        return json_encode($response, JSON_UNESCAPED_UNICODE);
    }
}