<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class PaymentController extends AbstractController
{
    public function createPayment(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $amount = $data['amount'];
        $currency = $data['currency'];
        $paymentMethodId = $data['payment_method'];

        Stripe::setApiKey('sk_test_...'); // Remplacez par votre clé API Stripe

        $paymentIntent = PaymentIntent::create([
            'amount' => $amount * 100, // Montant en cents
            'currency' => $currency,
            'payment_method' => $paymentMethodId,
            'confirm' => true,
        ]);

        return $this->json([
            'redirect_url' => '/payment/success', // Remplacez par l'URL de confirmation de paiement de votre application
        ]);
    }
}
