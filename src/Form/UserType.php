<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('email',EmailType::class,[
                'attr'=>[
                    'placeholder'=>"name@example.com",
                    'class'=>'w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900'
                ]
            ])
            ->add('lastname',TextType::class,[
                'label'=>"Nom ",
                'attr'=>[
                    'placeholder'=>"Doe",
                    'class'=>'w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900'
                ]
            ])
            ->add('firstname',TextType::class,[
                'label'=>"Prénom ",
                'attr'=>[
                    'placeholder'=>"John",
                    'class'=>'w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900'
                ]
            ])
            ->add('roles',ChoiceType::class,[
                'choices'=> [
                    'Utilisateur'=> 'ROLE_USER',
                    'Administrateur'=> 'ROLE_ADMIN'
                ],
                'expanded'=>true,
                'multiple'=>true,
                'label'=> 'Rôles'
            ])
            ->add('password',PasswordType::class,[
                'label'=>"Mot de passe ",
                'attr'=>[
                    'placeholder'=>"**********",
                    'class'=>'w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900'

                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
