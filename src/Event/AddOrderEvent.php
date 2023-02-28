<?php 

namespace App\Event;

use App\Entity\Orders;
use Symfony\Contracts\EventDispatcher\Event;

class AddOrderEvent extends Event
{
    const ADD_ORDER_EVENT ="order.add";

    public function __construct(private Orders $order){}

    public function getOrder()
    {
        return $this->order;
    }

}