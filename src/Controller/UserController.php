<?php

namespace App\Controller;

use App\Entity\Orders;
use App\Repository\FilesRepository;
use App\Service\ReceivedService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{

    #[Route('/user/commandes', name: 'user.orders')]
    public function orders()
    {

        /**
         * @var User
         */
        $user=$this->getUser();

        $orders=$user->getOrders();

        return $this->render('user/order/index.html.twig',[
            'controller_name' => 'UserController',
            'orders'=>$orders
        ]);
    }

    


    #[Route('/user/commandes/{id}', name: 'user.orders.show', methods: ['GET'])]
    public function show(Orders $order,FilesRepository $filesRepository): Response
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $files=$filesRepository->findByOrders($order->getId());
        
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
