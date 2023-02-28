<?php


namespace App\Event;

use App\Entity\Orders;
use Symfony\Contracts\EventDispatcher\Event;

class ConfirmOrderEvent extends Event
{
    const CONFIRM_ORDER_EVENT ="order.confirm";

    public function __construct(private Orders $order){}

    public function getOrder()
    {
        return $this->order;
    }

}