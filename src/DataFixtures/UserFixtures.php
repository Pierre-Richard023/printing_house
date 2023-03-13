<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    public function __construct(private UserPasswordHasherInterface $hasher)
    {
    }

    public function load(ObjectManager $manager): void
    {

        $user =new User();
        $admin=new User();

        $user   ->setEmail('user@imprimerie.com')
                ->setLastname('John')
                ->setFirstname('Doe')
                ->setRegisteredSince(new \DateTime())
                ->setPassword($this->hasher->hashPassword($user, 'Azerty0'))
        ;

        $admin   ->setEmail('admin@imprimerie.com')
        ->setLastname('Jane')
        ->setFirstname('Doe')
        ->setRegisteredSince(new \DateTime())
        ->setPassword($this->hasher->hashPassword($user, 'Azerty0'))
;

        $manager->persist($user);
        $manager->persist($admin);
        $manager->flush();
    }
}
