<?php

namespace App\Form;

use App\Entity\Contact;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ContactType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name',TextType::class,[
                "label"=>"Nom",
                'attr'=>[
                    'placeholder'=>'Nom',
                    'class'=>'w-full rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary'
                    ]
            ])
            ->add('subject',TextType::class,[
                "label"=>"Sujet",
                'attr'=>[
                    'placeholder'=>'Sujet',
                    'class'=>'w-full rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary'

                ]
            ])
            ->add('email',EmailType::class,[
                "label"=>"Email",
                'attr'=>[
                    'placeholder'=>'Email',
                    'class'=>'w-full rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary'

                ]
            ])
            ->add('message',TextareaType::class,[
                "label"=>"Message",
                'attr'=>[
                    'placeholder'=>'Message',
                    'class'=>'w-full rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] resize-none outline-none focus-visible:shadow-none focus:border-primary',
                    'rows'=>'6'
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Contact::class,
        ]);
    }
}
