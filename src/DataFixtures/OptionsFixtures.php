<?php

namespace App\DataFixtures;

use App\Entity\Options;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class OptionsFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {

        for($i=0;$i < 3;$i++)
        {
            $option=new Options();

            $option ->setName('Option '.$i)
                    ->setDescription('PAS DE DESC')
                    ->setPrice(2)
            ;

            $manager->persist($option);

        }

        $manager->flush();
    }
}
