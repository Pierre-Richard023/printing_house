<?php

namespace App\Service;


use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;

class SendmailService
{


    public function __construct(private MailerInterface $mailer)
    {
        
    }


    public function send(String $from, String $to, String $subject, String $template, Array $context)
    {

        //préparation de l'email
        $email = (new TemplatedEmail())
                ->from($from)
                ->to($to)
                ->subject($subject)
                ->htmlTemplate("emails/$template.html.twig")
                ->context($context);
        //envoie de l'email
        $this->mailer->send($email);

    }

}