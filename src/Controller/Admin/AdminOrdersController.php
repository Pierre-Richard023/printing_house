<?php

namespace App\Controller\Admin;


use App\Entity\Orders;
use App\Event\ApproveDeliveryOrderEvent;
use App\Event\ConfirmDeliveryOrderEvent;
use App\Event\ConfirmOrderEvent;
use App\Repository\OrdersRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/orders')]
class AdminOrdersController extends AbstractController
{


    public function __construct(
        private OrdersRepository $ordersRepository,
        private EventDispatcherInterface $eventDispatcher
    )
    {}

    #[Route('/', name: 'admin.orders.index', methods: ['GET'])]
    public function index(): Response
    {
        return $this->render('admin/orders/index.html.twig', [
            'position'=>'index',
            'orders' => $this->ordersRepository->findAll(),
        ]);
    }

    #[Route('/{id<[0-9]+>}', name: 'admin.orders.show', methods: ['GET'])]
    public function show(Orders $order): Response
    {
        return $this->render('admin/orders/show.html.twig', [
            'order' => $order,
        ]);
    }


    #[Route('/attente-de-validation', name: 'admin.orders.waiting', methods: ['GET'])]
    public function waitingForValidation(): Response
    {
        return $this->render('admin/orders/waiting.html.twig', [
            'position'=>'waiting',
            'orders' => $this->ordersRepository->findBy(["status"=>0]),
        ]);
    }

    #[Route('/impression-en-cours', name: 'admin.orders.printing', methods: ['GET'])]
    public function printingInProgress(): Response
    {
        return $this->render('admin/orders/printing.html.twig', [
            'position'=>'printing',
            'orders' => $this->ordersRepository->findBy(["state"=>1]),
        ]);
    }

    #[Route('/livraison-en-cours', name: 'admin.orders.shipping', methods: ['GET'])]
    public function shippingInProgress(): Response
    {
        return $this->render('admin/orders/shipping.html.twig', [
            'position'=>'shipping',
            'orders' => $this->ordersRepository->findBy(["state"=>2]),
        ]);
    }

    #[Route('/commande-livree', name: 'admin.orders.delivered', methods: ['GET'])]
    public function orderDelivered(): Response
    {
        return $this->render('admin/orders/delivered.html.twig', [
            'position'=>'delivered',
            'orders' => $this->ordersRepository->findBy(["state"=>3]),
        ]);
    }


    #[Route('/valid-{id<[0-9]+>}', name:'admin.orders.valid', methods: ['GET','POST'])]
    public function approveOrder(Request $request,Orders $order)
    {
        $refererPath=$request->headers->get('referer');

        if ($this->isCsrfTokenValid('order'.$order->getId(), $request->query->get('_token') )) {

            $order->approve();
            $this->ordersRepository->save($order,true);

            $confirmOrderEvent = new ConfirmOrderEvent($order);
            $this->eventDispatcher->dispatch($confirmOrderEvent,ConfirmOrderEvent::CONFIRM_ORDER_EVENT);

        }

        return $this->redirect($refererPath,Response::HTTP_SEE_OTHER);
    }

    #[Route('/nextStep-{id<[0-9]+>}', name:'admin.orders.approveDelivery', methods: ['GET'])]
    public function approveDelivery(Request $request, Orders $order)
    {
        $refererPath=$request->headers->get('referer');

        if ($this->isCsrfTokenValid('order'.$order->getId(), $request->query->get('_token') )) {

            $order->approveDelivery();
            $this->ordersRepository->save($order,true);

            $approveDeliveryEvent= new ApproveDeliveryOrderEvent($order);
            $this->eventDispatcher->dispatch($approveDeliveryEvent,ApproveDeliveryOrderEvent::APPROVE_DELIVERED_ORDER_EVENT);

        }

        return $this->redirect($refererPath,Response::HTTP_SEE_OTHER);

    }

    #[Route('/nextStep-{id<[0-9]+>}', name:'admin.orders.validDelivery', methods: ['GET'])]
    public function validDelivery(Request $request, Orders $order)
    {
        $refererPath=$request->headers->get('referer');

        if ($this->isCsrfTokenValid('order'.$order->getId(), $request->query->get('_token') )) {

            $order->validDelivery();
            $this->ordersRepository->save($order,true);

            $confirmDeliveryEvent = new ConfirmDeliveryOrderEvent($order);
            $this->eventDispatcher->dispatch($confirmDeliveryEvent,ConfirmDeliveryOrderEvent::CONFIRM_DELIVERED_ORDER_EVENT);
        }

        return $this->redirect($refererPath,Response::HTTP_SEE_OTHER);

    }
}
