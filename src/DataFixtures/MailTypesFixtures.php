<?php

namespace App\DataFixtures;

use App\Entity\MailType;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpKernel\KernelInterface;

class MailTypesFixtures extends Fixture
{


    public function __construct(private KernelInterface $kernel)
    {
    }


    public function load(ObjectManager $manager): void
    {


        $projectDir = $this->kernel->getProjectDir();
        $publicDir = $projectDir . '/public';

        $mailTypesList = [
            [
                "name" => "Courrier recommandé",
                "image" => "recommander.webp",
                "price" => 0
            ],
            [
                "name" => "Courrier classique",
                "image" => "classique.webp",
                "price" => 0
            ],

        ];

        foreach ($mailTypesList as $item) {
            $mailType = new MailType();


            $filePath = $publicDir . '/images/models/' . $item["image"];
            $copyPath = $publicDir . '/images/copies/' . basename($filePath);
            copy($filePath, $copyPath);

            $imageFile = new UploadedFile(
                $copyPath,
                basename($copyPath),
                'image/png',
                null,
                true
            );


            $mailType->setName($item["name"])
                ->setPrice($item["price"])
                ->setImageFile($imageFile);

            $manager->persist($mailType);
        }


        $manager->flush();
    }
}
