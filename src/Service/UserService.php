<?php 

namespace App\Service;

use App\Entity\User;
use Doctrine\ORM\EntityManager;

class UserService
{

    public function __construct(private EntityManager $em)
    {}

    public function setDateConnection(User $user):void
    {

        $userRepo=$this->em->getRepository(User::class);
        $user->setLastConnection(new \DateTimeImmutable());
        $userRepo->save($user, true);
    }
}