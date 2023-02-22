<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;


use App\Repository\CityRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CityRepository::class)]
#[ApiResource(
    collectionOperations: ['get' => ['normalization_context' => ['groups' => 'city:list']]],
    itemOperations: ['get' => ['normalization_context' => ['groups' => 'city:item']]],
    order: ['name' => 'ASC'],
    paginationEnabled: false,
)]
class City
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['city:list', 'city:item'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['city:list', 'city:item'])]
    private ?string $name = null;

    #[ORM\Column(length: 5)]
    #[Groups(['city:list', 'city:item'])]
    private ?string $zip = null;

    #[ORM\Column]
    #[Groups(['city:list', 'city:item'])]
    private ?float $price = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getZip(): ?string
    {
        return $this->zip;
    }

    public function setZip(string $zip): self
    {
        $this->zip = $zip;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

        return $this;
    }
}
