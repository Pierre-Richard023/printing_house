import React, { useState, useEffect } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';
import { useDispatch, useSelector } from 'react-redux';
import { getIntentKey } from '../../../store/slice/paymentSlice';

const stripePromise = loadStripe("pk_test_51IbTqSKwIBcjbfsZothkCdbahP9Mr4zfmYooDds9UBedlRHP6OSEzSZLKkREOe5r769OHtBhKzHWY4T2r6SfhSoN00d1QRShpY");


const Card = ({ orderPrice }) => {

    const dispatch = useDispatch()

    const clientSecret = useSelector((state)=> state.payment.secretKey)
    const hasSecrestK = useSelector((state)=> state.payment.secretKeyLoad)


    useEffect(()=>{
        if(orderPrice)
            dispatch(getIntentKey(orderPrice))
    },[orderPrice])


    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="card-payment">
            {!hasSecrestK && (
                <div className="flex items-center justify-center space-x-2">
                    <div className="w-6 h-6 rounded-full animate-pulse bg-secondary"></div>
                    <div className="w-6 h-6 rounded-full animate-pulse bg-secondary"></div>
                    <div className="w-6 h-6 rounded-full animate-pulse bg-secondary"></div>
                </div>
            )}
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );


}

export default Card 