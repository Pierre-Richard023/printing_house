<?php

namespace App\Controller\Admin;

use App\Entity\Orders;
use App\Entity\User;
use App\Repository\OrdersRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AdminDashboardController extends AbstractController
{
    public function __construct(
        private OrdersRepository $ordersRepository,
        private EntityManagerInterface $entityManager
        ){}

    #[Route('/admin', name: 'admin.dashboard')]
    public function index(): Response
    {
        $invalidOrders=$this->entityManager->getRepository(Orders::class)->findBy(['status'=>0]);
        $nbOrder=count($this->entityManager->getRepository(Orders::class)->findAll());
        $nbOrderInvalid=count($invalidOrders);
        $nbUsers=count($this->entityManager->getRepository(User::class)->findAll());

        return $this->render('admin/index.html.twig',[
            'orders'=>$invalidOrders,
            'nbOrders'=>$nbOrder,
            'nbOrdersInvalid'=>$nbOrderInvalid,
            'nbUsers'=>$nbUsers
        ]);
    }
}
