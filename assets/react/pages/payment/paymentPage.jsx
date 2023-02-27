import React, { useState, useEffect } from 'react'
import Received from "../../components/payment/received"
import { useDispatch, useSelector } from "react-redux"
import { setName } from '../../store/slice/paymentSlice'
import Card from '../../components/payment/Card/card'
import { fillForm } from '../../request/orderRequest'


const PaymentPage = (props) => {


    const dispatch = useDispatch()
    const informations = useSelector((state) => state.payment.informations)

    useEffect(() => {
        dispatch(setName(props.name))
    }, [])

    useEffect(() => {
        if (informations)
            fillForm(informations)
    }, [informations])

    return (


        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
            <div className="px-4 pt-8">
                <Received />
            </div>

            <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                <div className="">

                    <div className="mt-6 border-b py-2">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Fichier(s) :</p>
                            <p className="font-semibold text-gray-900">{informations.filesPrice}€</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Frais de livraison :</p>
                            <p className="font-semibold text-gray-900">{informations.cityPrice}€</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Option :</p>
                            <p className="font-semibold text-gray-900">{informations.optionPrice}€</p>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Total</p>
                        <p className="text-2xl font-semibold text-gray-900">{informations.orderPrice}€</p>
                    </div>
                </div>
                <Card orderPrice={informations.orderPrice} />
                {/* <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button> */}
            </div>
        </div>



    )
}

export default PaymentPage



