import React, {useEffect, useState} from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import {clearStore, clearDBInformations} from "../../../request/orderRequest";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Paiement réussi !");
                    break;
                case "processing":
                    setMessage("Votre paiement est en cours de traitement.");
                    break;
                case "requires_payment_method":
                    setMessage("Votre paiement n'a pas abouti, veuillez réessayer.");
                    break;
                default:
                    setMessage("Quelque chose s'est mal passé.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}`,
            },
            redirect: "if_required",
        }).then(async (res) => {


            const {error, paymentIntent} = res


            if (paymentIntent) {

                const payItentForm = document.querySelector('#orders_payment_intent')
                payItentForm.value = await paymentIntent.id
                const orderF = await document.forms.orders
                await clearStore()
                await clearDBInformations()
                orderF.submit()

            }


            if (error) {

                if (error.type === "card_error" || error.type === "validation_error") {
                    setMessage(error.message);
                } else {
                    setMessage("An unexpected error occurred.");
                }

                setIsLoading(false);
            }

        })

    }

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element"/>
            <div className="">
                <button className="mt-4 mb-8 w-full rounded-md bg-primary px-6 py-3 font-medium text-white"
                        disabled={isLoading || !stripe || !elements} id="submit">
                    <span id="button-text">
                        {isLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
                                <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
                                <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
                            </div>
                        ) : "Payer"}
                    </span>
                </button>
            </div>
            {/* Show any error or success messages */}
            {message &&
                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700"
                     role="alert" id="payment-message">
                    <p>
                        {message}
                    </p>
                </div>
            }
        </form>
    );
}