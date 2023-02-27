<?php

namespace App\Controller;

use App\Entity\Files;
use App\Entity\Options;
use App\Entity\Orders;
use App\Form\OrdersType;
use App\Service\FileUploaderService;
use App\Service\OrdersService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
class PaymentController extends AbstractController
{

    public function __construct(private EntityManagerInterface $entityManager){}

    #[Route('/orders/paiement', name:'orders.payment')]
    public function payment (Request $req,FileUploaderService $fileUploader): Response
    {

        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $order=new Orders();
        $form = $this->createForm(OrdersType::class, $order);
        $form->handleRequest($req);

        if ($form->isSubmitted() && $form->isValid()){
            $ordsService=new OrdersService;

            $opts=$form->get('optionsFiles')->getData();
            $sendOptionID=$form->get('option')->getData();

            $options=json_decode($opts);
            $filesUpload = $form->get('files')->getData();

            $indexOpts=0;

            foreach ($filesUpload as $file)
            {

                $newFilename= $fileUploader->upload($file);

                $f=new Files();
                $f->setName($newFilename);
                $f->setPath($newFilename);
                $f->setPrice($options[$indexOpts]->price);
                $f->setAmount($options[$indexOpts]->amount);
                $f->setReliure($options[$indexOpts]->reliure);
                $f->setBothSides($options[$indexOpts]->both_sides);
                $f->setColor($options[$indexOpts]->color);
                $order->addFile($f);

                $indexOpts++;
            }

            $sOpts= $this->entityManager->getRepository(Options::class)->findOneBy([
                'id' => $sendOptionID,
            ]);


            $order  ->setCustomer($this->getUser())
                    ->setOrderNumber($ordsService->generateRandomKey())
                    ->setOption($sOpts)
                    ->setCreateAt(new \DateTime())
            ;
            $this->entityManager->getRepository(Orders::class)->save($order,true);

            return $this->redirectToRoute('user.orders.show', ['id'=>$order->getId()], Response::HTTP_SEE_OTHER);

        }

        return $this->render('orders/payment.html.twig',[
            'order' => $order,
            'form' => $form->createView()
        ]);
    }
}