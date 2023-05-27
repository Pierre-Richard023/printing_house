<?php

namespace App\Form;

use App\Entity\Bookbinding;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class BookbindingType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
        ->add('name', TextType::class, [
            'attr' => [
                'class' => 'w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-secondary dark:border-gray-700 dark:text-gray-900'
            ],
        ])
        ->add('price',NumberType::class,[
            'attr' => [
                'class' => 'w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-secondary dark:border-gray-700 dark:text-gray-900'
            ],
        ])
            ->add('imageFile',FileType::class,[
                "required"=>false
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Bookbinding::class,
        ]);
    }
}
