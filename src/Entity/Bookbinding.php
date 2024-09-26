<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\BookbindingRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: BookbindingRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/bookbindings',
            normalizationContext: ['groups' => 'bookbinding:list']
        ),
        new Get(
            uriTemplate: '/bookbindings/{id}',
            normalizationContext: ['groups' => 'bookbinding:item']
        )
    ],
    order: ['name' => 'ASC'],
    paginationEnabled: false,
)]
class Bookbinding
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['bookbinding:list', 'bookbinding:item'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['bookbinding:list', 'bookbinding:item'])]
    private ?string $name = null;

    #[ORM\Column]
    #[Groups(['bookbinding:list', 'bookbinding:item'])]
    private ?float $price = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;


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
