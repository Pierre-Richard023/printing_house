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

        $user   ->setEmail('john@test.com')
                ->setLastname('John')
                ->setFirstname('Doe')
                ->setRegisteredSince(new \DateTime())
                ->setPassword($this->hasher->hashPassword($user, 'password'))
        ;

        $manager->persist($user);
        $manager->flush();
    }
}
