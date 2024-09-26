<?php

namespace App\DataFixtures;

use App\Entity\Bookbinding;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class BookbindingsFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {

        $bookbindingList = [
            [
                "name" => "Reliure plastique (film plastique recto / verso cartonné)",
                "price" => 0,
            ],
            [
                "name" => "Plastification",
                "price" => 0,
            ],
            [
                "name" => "Reliure métallique (film plastique recto / verso cartonné)",
                "price" => 0,
            ],
            [
                "name" => "Agrafage haut gauche",
                "price" => 0,
            ],
            [
                "name" => "Double agrafage côté long",
                "price" => 0,
            ],
        ];

        foreach ($bookbindingList as $item) {

            $bookbinding = new Bookbinding();
            $bookbinding->setName($item["name"])
                ->setPrice($item["price"]);

            $manager->persist($bookbinding);
        }

        $manager->flush();
    }
}
