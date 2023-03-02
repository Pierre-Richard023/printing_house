<?php

namespace App\Controller;

use App\Entity\Orders;
use App\Service\ReceivedService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[IsGranted('ROLE_USER')]
class UserController extends AbstractController
{

    #[Route('/user', name: 'user.index')]
    public function index(): Response
    {
        return $this->render('user/index.html.twig', [
            'position' => 'user',
            'controller_name' => 'UserController',
        ]);
    }



    #[Route('/user/commandes', name: 'user.orders')]
    public function orders()
    {

        $user=$this->getUser();
        $orders=$user->getOrders();

        return $this->render('user/order/index.html.twig',[
            'position'=>'orders',
            'controller_name' => 'UserController',
            'orders'=>$orders
        ]);
    }


    #[Route('/user/commandes/{id}', name: 'user.orders.show', methods: ['GET'])]
    public function show(Orders $order): Response
    {

        $files=$order->getFiles();
        
        return $this->render('user/order/show.html.twig', [
            'controller_name'=>'userControlller',
            'order' => $order,
            'files' => $files
        ]);
    }

    #[Route('/user/commandes/{id}/facture', name: 'user.orders.show.received')]
    public function receivedPdf(Orders $order,ReceivedService $received)
    {

        $template=$this->render('user/order/received.html.twig',[
            'order'=>$order
        ]);

        $received->showPdfFile($template);

    }
}
