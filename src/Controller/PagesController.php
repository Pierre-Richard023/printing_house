<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PagesController extends AbstractController
{

    #[Route('/politique-de-confidentialite', name: 'privacy-policy')]
    public function privacy(): Response
    {
        return $this->render('pages/privacy.html.twig', [
            'controller_name' => 'PagesController',
        ]);
    }
    
    #[Route('/conditions-generales-utilisation', name: 'terms-of-use')]
    public function termsOfUse(): Response
    {
        return $this->render('pages/termsOfUse.html.twig', [
            'controller_name' => 'PagesController',
        ]);
    }

}
