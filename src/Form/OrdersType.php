<?php

namespace App\Form;

use App\Entity\Orders;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class OrdersType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('files',FileType::class,[
                'mapped' => false,
                'required' => false,
                'attr'=>[
                    'accept'=>'pdf/application',
                    'multiple' => 'multiple',
                    'data-received-target'=>'uploadFiles',
                ],
                'row_attr' => [
                    "class"=>"hidden"
                ],
                'multiple' => true,
            ])
            ->add('orderNumber', HiddenType::class,[])
            ->add('address', HiddenType::class,[])
            ->add('city', HiddenType::class,[])
            ->add('zip', HiddenType::class,[])
            ->add('price', HiddenType::class,[])
            ->add('status', HiddenType::class,[])
            ->add('state', HiddenType::class,[])
            ->add('phone', HiddenType::class,[])
            ->add('payment_intent', HiddenType::class,[
                'mapped'=>false,
            ])
            ->add('option', HiddenType::class,[
                'mapped' => false,
                'required' => false,
            ])
            ->add('optionsFiles', HiddenType::class,[
                'mapped' => false,
                'required' => false,
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Orders::class,
        ]);
    }
}
