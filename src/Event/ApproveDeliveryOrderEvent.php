<?php

namespace App\Event;

use App\Entity\Orders;
use Symfony\Contracts\EventDispatcher\Event;

class ApproveDeliveryOrderEvent extends Event
{
    const APPROVE_DELIVERED_ORDER_EVENT ="approve.delivered.order";

    public function __construct(private Orders $order){}

    public function getOrder()
    {
        return $this->order;
    }
}