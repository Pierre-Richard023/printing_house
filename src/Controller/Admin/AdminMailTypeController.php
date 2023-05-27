<?php

namespace App\Controller\Admin;

use App\Entity\MailType;
use App\Form\MailTypeType;
use App\Repository\MailTypeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/mailType')]
class AdminMailTypeController extends AbstractController
{
    #[Route('/', name: 'admin.mailtype.index', methods: ['GET'])]
    public function index(MailTypeRepository $mailTypeRepository): Response
    {
        return $this->render('admin/mailType/index.html.twig', [
            'mailTypes' => $mailTypeRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'admin.mailtype.new', methods: ['GET', 'POST'])]
    public function new(Request $request, MailTypeRepository $mailTypeRepository): Response
    {
        $mailType = new MailType();
        $form = $this->createForm(MailTypeType::class, $mailType);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $mailTypeRepository->save($mailType, true);

            return $this->redirectToRoute('admin.mailtype.index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('admin/mailType/new.html.twig', [
            'mailType' => $mailType,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'admin.mailtype.show', methods: ['GET'])]
    public function show(MailType $mailType): Response
    {
        return $this->render('admin/mailType/show.html.twig', [
            'mailType' => $mailType,
        ]);
    }

    #[Route('/{id}/edit', name: 'admin.mailtype.edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, MailType $mailType, MailTypeRepository $mailTypeRepository): Response
    {
        $form = $this->createForm(MailTypeType::class, $mailType);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $mailTypeRepository->save($mailType, true);

            return $this->redirectToRoute('admin.mailtype.index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('admin/mailType/edit.html.twig', [
            'mailType' => $mailType,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'admin.mailtype.delete', methods: ['POST'])]
    public function delete(Request $request, MailType $mailType, MailTypeRepository $mailTypeRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$mailType->getId(), $request->request->get('_token'))) {
            $mailTypeRepository->remove($mailType, true);
        }

        return $this->redirectToRoute('admin.mailtype.index', [], Response::HTTP_SEE_OTHER);
    }
}
