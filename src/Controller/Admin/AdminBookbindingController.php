<?php

namespace App\Controller\Admin;

use App\Entity\Bookbinding;
use App\Form\BookbindingType;
use App\Repository\BookbindingRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/bookbinding')]
class AdminBookbindingController extends AbstractController
{
    #[Route('/', name: 'admin.bookbinding.index', methods: ['GET'])]
    public function index(BookbindingRepository $bookbindingRepository): Response
    {
        return $this->render('admin/bookbinding/index.html.twig', [
            'bookbindings' => $bookbindingRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'admin.bookbinding.new', methods: ['GET', 'POST'])]
    public function new(Request $request, BookbindingRepository $bookbindingRepository): Response
    {
        $bookbinding = new Bookbinding();
        $form = $this->createForm(BookbindingType::class, $bookbinding);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $bookbindingRepository->save($bookbinding, true);

            return $this->redirectToRoute('admin.bookbinding.index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('admin/bookbinding/new.html.twig', [
            'bookbinding' => $bookbinding,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'admin.bookbinding.show', methods: ['GET'])]
    public function show(Bookbinding $bookbinding): Response
    {
        return $this->render('admin/bookbinding/show.html.twig', [
            'bookbinding' => $bookbinding,
        ]);
    }

    #[Route('/{id}/edit', name: 'admin.bookbinding.edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Bookbinding $bookbinding, BookbindingRepository $bookbindingRepository): Response
    {
        $form = $this->createForm(BookbindingType::class, $bookbinding);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $bookbindingRepository->save($bookbinding, true);

            return $this->redirectToRoute('admin.bookbinding.index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('admin/bookbinding/edit.html.twig', [
            'bookbinding' => $bookbinding,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'admin.bookbinding.delete', methods: ['POST'])]
    public function delete(Request $request, Bookbinding $bookbinding, BookbindingRepository $bookbindingRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$bookbinding->getId(), $request->request->get('_token'))) {
            $bookbindingRepository->remove($bookbinding, true);
        }

        return $this->redirectToRoute('admin.bookbinding.index', [], Response::HTTP_SEE_OTHER);
    }
}
