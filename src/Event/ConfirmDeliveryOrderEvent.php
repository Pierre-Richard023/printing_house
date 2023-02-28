<?php


namespace App\Event;

use App\Entity\Orders;
use Symfony\Contracts\EventDispatcher\Event;

class ConfirmDeliveryOrderEvent extends Event
{
    const CONFIRM_DELIVERED_ORDER_EVENT ="confirm.delivered.order";

    public function __construct(private Orders $order){}

    public function getOrder()
    {
        return $this->order;
    }

}