<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\MailTypeRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: MailTypeRepository::class)]
#[Vich\Uploadable]
#[ApiResource(

    operations: [
        new GetCollection(
            uriTemplate: '/mailTypes',
            normalizationContext: ['groups' => 'mailType:list']
        ),
        new Get(
            uriTemplate: '/mailTypes/{id}',
            normalizationContext: ['groups' => 'mailType:item']
        )
    ],
    order: ['name' => 'ASC'],
    paginationEnabled: false,
)]
class MailType
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['mailType:list', 'mailType:item'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['mailType:list', 'mailType:item'])]
    private ?string $name = null;

    #[ORM\Column]
    #[Groups(['mailType:list', 'mailType:item'])]
    private ?float $price = null;

    #[Vich\UploadableField(mapping: 'mailTypes', fileNameProperty: 'imageName')]
    private ?File $imageFile = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['mailType:list', 'mailType:item'])]
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

    #[Groups(['mailType:list', 'mailType:item'])]
    public function getImageUrl(): ?string
    {
        if ($this->imageName) {
            return '/images/mailTypes/' . $this->imageName;
        }

        return null;
    }
}
