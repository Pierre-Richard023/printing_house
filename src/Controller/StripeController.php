<?php 

namespace App\Controller;

use Stripe\PaymentIntent;
use Stripe\Stripe;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class StripeController extends AbstractController
{


    public function __construct()
    {
        Stripe::setApiKey($_ENV['STRIPE_SECRET_KEY']);
        Stripe::setApiVersion('2022-08-01');
    }

    #[Route('/paymentIntent-key', name: 'paiment.key')]
    public function keyPaymentIntent(Request $req)
    {


        if($req->getContent())
        {
            $data=json_decode($req->getContent());
            $price=$data->{'price'};

            $paymentIntent = PaymentIntent::create([
                'amount' => $price * 100,
                'currency' => 'EUR',
                'payment_method_types' => ['card']
            ]);

            return new JsonResponse([
                'clientSecret'=> $paymentIntent->client_secret
            ]);
        }
    
        return new JsonResponse([
            'clientSecret'=> 'pas de clée'
        ]);


    }
}