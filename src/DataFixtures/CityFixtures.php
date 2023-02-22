<?php

namespace App\DataFixtures;

use App\Entity\City;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class CityFixtures extends Fixture
{

    public function __construct(private HttpClientInterface $client)
    {}

    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);


        $response = $this->client->request(
            'GET',
            'https://geo.api.gouv.fr/departements/973/communes'
        );

        $content = $response->toArray();

        foreach ($content as $c) {
            
            $city =new City();

            $city   ->setName($c['nom'])
                    ->setZip($c['codesPostaux'][0])
                    ->setPrice(2)
            ;
            

            $manager->persist($city);

        }

        $manager->flush();
    }
}
