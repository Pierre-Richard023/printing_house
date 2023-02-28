<?php

namespace App\Controller\Admin;

use App\Repository\OrdersRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AdminDashboardController extends AbstractController
{
    public function __construct(private OrdersRepository $ordersRepository){}

    #[Route('/admin', name: 'admin.dashboard')]
    public function index(): Response
    {
        $nbOrder=1;
        $nbOrderInvalid=1;
        $nbOrderPrinting=1;
        $nbOrderShipped=1;
        $nbOrderDelivered=1;

        return $this->render('admin/index.html.twig',[
            'orders'=>$this->ordersRepository->findBy(['status'=>0]),
            'nbOrder'=>$nbOrder,
            '$nbOrderInvalid'=>$nbOrderInvalid,
            '$nbOrderPrinting'=>$nbOrderPrinting,
            '$nbOrderShipped'=>$nbOrderShipped,
            '$nbOrderDelivered'=>$nbOrderDelivered,
        ]);
    }
}
