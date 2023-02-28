<?php 

namespace App\EventSubscriber;

use App\Event\AddOrderEvent;
use App\Event\ApproveDeliveryOrderEvent;
use App\Event\ConfirmDeliveryOrderEvent;
use App\Event\ConfirmOrderEvent;
use App\Service\SendmailService;
use App\Service\SendSmsService;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Contracts\EventDispatcher\Event;

class OrderSuscriber implements EventSubscriberInterface
{

    public function __construct(private SendmailService $sendmailService,private SendSmsService $sendSmsService)
    {
        
    }

    public static function getSubscribedEvents(): array
    {
        return [
            AddOrderEvent::ADD_ORDER_EVENT => ['onAddOrderEvent', 100],
            ConfirmOrderEvent::CONFIRM_ORDER_EVENT => ['onConfirmOrderEvent', 100],
            ApproveDeliveryOrderEvent::APPROVE_DELIVERED_ORDER_EVENT => ['onApproveDeliveryEvent', 100],
            ConfirmDeliveryOrderEvent::CONFIRM_DELIVERED_ORDER_EVENT => ['onConfirmDeliveryEvent', 100],
        ];
    }

    public function onAddOrderEvent(AddOrderEvent $event):void
    {

        $mail= $this->setCustomer($event);
        $data = [
            'from' => 'noreply@imprimerie.com',
            'to' => $mail ,
            'subject' => 'Commande '. $event->getOrder()->getOrderNumber(),
            'template' => 'valid',
            'variables' => [
                'order'     => $event->getOrder()
            ],
        ];

        $this->sendEmail($data);

    }

    public function onConfirmOrderEvent(ConfirmOrderEvent $event):void
    {
        $message='La commande '.$event->getOrder()->getOrderNumber().' a bien été prise en compte.';
        $phone=$event->getOrder()->getPhone();
        $this->sendSmsService->send($phone,$message);

    }

    public function onApproveDeliveryEvent(ApproveDeliveryOrderEvent $event ):void
    {

        $message='La commande '.$event->getOrder()->getOrderNumber().' est prêt à être expédié. Il n’est pas encore pris en charge par ....';
        $phone=$event->getOrder()->getPhone();
        $this->sendSmsService->send($phone,$message);


    }

    public function onConfirmDeliveryEvent(ConfirmDeliveryOrderEvent $event ):void
    {
        $message='La commande '.$event->getOrder()->getOrderNumber().' est en cours de livraison ....';
        $phone=$event->getOrder()->getPhone();
        $this->sendSmsService->send($phone,$message);
    }


    public function setCustomer(Event $event)
    {
        $order=$event->getOrder();

        return $order->getUser()->getEmail();
    }

    public function sendEmail(Array $data)
    {
        $this->sendmailService->send(
            $data['from'],
            $data['to'],
            $data['subject'],
            $data['template'],
            $data['variables']
        );
    }


    

}