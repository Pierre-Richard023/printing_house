<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use App\Repository\BookbindingRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: BookbindingRepository::class)]
#[Vich\Uploadable]
#[ApiResource(
    operations: [
        new Get(
            normalizationContext: ['groups' => 'bookbinding:list']
        ),
        new Get(
            uriTemplate: '/bookbindings/{id}',
            normalizationContext: ['groups' => 'bookbinding:item']
        )
    ],
    // collectionOperations: ['get' => ['normalization_context' => ['groups' => 'bookbinding:list']]],
    // itemOperations: ['get' => ['normalization_context' => ['groups' => 'bookbinding:item']]],
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

    #[Vich\UploadableField(mapping: 'bookbinding', fileNameProperty: 'imageName')]
    private ?File $imageFile = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['bookbinding:list', 'bookbinding:item'])]
    private ?string $imageName = null;

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

    public function setImageFile(?File $imageFile = null): void
    {
        $this->imageFile = $imageFile;

        if (null !== $imageFile) {
            // It is required that at least one field changes if you are using doctrine
            // otherwise the event listeners won't be called and the file is lost
            $this->updatedAt = new \DateTimeImmutable();
        }
    }

    public function getImageFile(): ?File
    {
        return $this->imageFile;
    }

    public function setImageName(?string $imageName): void
    {
        $this->imageName = $imageName;
    }

    public function getImageName(): ?string
    {
        return $this->imageName;
    }
}
