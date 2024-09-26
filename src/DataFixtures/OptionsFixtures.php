<?php

namespace App\DataFixtures;

use App\Entity\Options;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpKernel\KernelInterface;

class OptionsFixtures extends Fixture
{


    public function __construct(private KernelInterface $kernel)
    {
    }

    public function load(ObjectManager $manager): void
    {

        $projectDir = $this->kernel->getProjectDir();
        $publicDir = $projectDir . '/public';

        $optionsLists = [
            [
                "name" => "Enveloppes C4 - Lettre suivi",
                "description" => "Simplifiez vos envois avec des enveloppes préaffranchies, prêtes à l'emploi et dotées d'un code-barres pour le suivi, idéales pour des envois jusqu'à 100g et 3cm d'épaisseur.",
                "image" => "EnveloppesC4Suivi.webp",
                "price" => 4.13,
            ],
            [
                "name" => "Enveloppes C4 - Lettre verte",
                "description" => "L'enveloppe préaffranchie Prêt-à-Poster lettre verte 100g est idéale pour tous vos envois de documents en France métropolitaine et dans les DOM.",
                "image" => "EnveloppesC4Verte.webp",
                "price" => 3.63,
            ],
            [
                "name" => "Enveloppes DL - Lettre suivi",
                "description" => "Simplifiez vos envois avec des enveloppes préaffranchies, prêtes à l'emploi et dotées d'un code-barres pour le suivi, idéales pour des envois jusqu'à 100g et 3cm d'épaisseur.",
                "image" => "EnveloppesDLSuivi.webp",
                "price" => 1.99,
            ],
            [
                "name" => "Enveloppes DL - Lettre verte",
                "description" => "L'enveloppe préaffranchie Prêt-à-Poster lettre verte 100g est idéale pour tous vos envois de documents en France métropolitaine et dans les DOM.",
                "image" => "EnveloppesDLVerte.webp",
                "price" => 1.49,
            ],
        ];

        foreach ($optionsLists as $optionsList) {

            $option = new Options();



            $filePath = $publicDir . '/images/models/' . $optionsList["image"];
            $copyPath = $publicDir . '/images/copies/' . basename($filePath);
            copy($filePath, $copyPath);

            $imageFile = new UploadedFile(
                $copyPath,
                basename($copyPath),
                'image/png',
                null,
                true
            );


            $option->setName($optionsList["name"])
                ->setDescription($optionsList["description"])
                ->setPrice($optionsList["price"])
                ->setImageFile($imageFile)
            ;

            $manager->persist($option);
        }

        $manager->flush();
    }
}
