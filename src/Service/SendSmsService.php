<?php

namespace App\Service;

use Symfony\Component\Notifier\Message\SmsMessage;
use Symfony\Component\Notifier\TexterInterface;

class SendSmsService
{

    public function __construct(private TexterInterface $texter)
    {}

    public function send($phone,$message)
    {
        $phone='+594'.str_replace(' ', '', $phone);
        $sms=new SmsMessage(
            $phone,
            $message
        );

        $this->texter->send($sms);

    }
}