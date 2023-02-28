<?php

namespace App\EventSubscriber;

use App\Entity\User;
use App\Service\UserService;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Event\AuthenticationSuccessEvent;

class UserSubscriber implements EventSubscriberInterface
{

    public function __construct(private UserService $userService)
    {}

    public function onSecurityAuthenticationSuccess(AuthenticationSuccessEvent $event): void
    {
        // dd($event);

        $user= $event->getAuthenticationToken()->getUser();
        $this->userService->setDateConnection($user);
    }

    public static function getSubscribedEvents(): array
    {
        return [
            'security.authentication.success' => 'onSecurityAuthenticationSuccess',
        ];
    }
}
