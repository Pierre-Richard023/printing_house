<?php

namespace App\Service;

use App\Entity\Contact;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;

class ContactService
{

    public function __construct(private MailerInterface $mailer)
    {
    }

    public function notify(Contact $contact)
    {

        $mail=(new TemplatedEmail())
            ->from(new Address('noreply@domaine.com', 'Notifiaction'))
            ->to('contact@domaine.fr')
            ->subject($contact->getSubject())
            ->htmlTemplate('Contact/contact_email.html.twig')

        ;

        $context= $mail->getContext();
        $context['name']=$contact->getName();
        $context['senderMail']=$contact->getEmail();
        $context['message']=$contact->getMessage();
        
        $mail->context($context);
        $this->mailer->send($mail);

    }
}