import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Receive from "../../components/payment/receive"
import { getOrderInformations , setName } from "../../store/slice/paymentSlice"
import { ORDER_LINK } from '../../utils/urls'

const PaymentsPage = (props) => {

    const dispatch = useDispatch()
    const informations = useSelector(state => state.payment.informations)
    const name = useSelector(state => state.payment.name)

    useEffect(() => {
        dispatch(getOrderInformations())
        dispatch(setName(props.name))

    }, [])

    const handleClickReturn = () => {
        window.location = ORDER_LINK
    }

    return (
        <>
            <div className="min-w-screen min-h-screen bg-white sm:px-10 sm:py-5">

                <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800">

                    <div className="w-full">
                        <button className="inline-block rounded border border-secondary bg-secondary px-12 py-3 text-sm font-medium text-white hover:bg-white hover:text-secondary focus:outline-none focus:ring active:text-secondary"
                            onClick={handleClickReturn}
                        >
                            Retour
                        </button>
                    </div>

                    <div className="w-full">
                        <div className="-mx-3 md:flex items-start">
                            <div className="px-3 md:w-7/12 lg:pr-10">
                                <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                                    <Receive />
                                </div>

                                <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                                    <div className="w-full flex items-center">
                                        <div className="flex-grow">
                                            <span className="text-gray-600">
                                                {
                                                    informations?.step2
                                                    &&
                                                    `Option d'envoi :  ${informations?.step2[0]?.optionChoose?.name} `
                                                }
                                            </span>
                                        </div>
                                        <div className="pl-3">
                                            <span className="font-semibold">
                                                {
                                                    informations?.step2
                                                    &&
                                                    informations?.step2[0]?.optionChoose?.price
                                                }€
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full flex items-center">
                                        <div className="flex-grow">
                                            <span className="text-gray-600">
                                                {
                                                    informations?.step3
                                                    &&
                                                     `Type de courier : ${informations?.step3[0]?.typeChoose?.name}`
                                                }
                                            </span>
                                        </div>
                                        <div className="pl-3">
                                            <span className="font-semibold">
                                                {
                                                    informations?.step3
                                                    &&
                                                    informations?.step3[0]?.typeChoose?.price
                                                }€
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full flex items-center">
                                        <div className="flex-grow">
                                            <span className="text-gray-600">
                                                {
                                                    informations?.step4
                                                    &&
                                                    `Type de reliure : ${informations?.step4[0]?.bookbindingChoose?.name}`
                                                }
                                            </span>
                                        </div>
                                        <div className="pl-3">
                                            <span className="font-semibold">
                                                {
                                                    informations?.step4
                                                    &&
                                                    informations?.step4[0]?.bookbindingChoose?.price
                                                }€
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                                    <div className="w-full flex items-center">
                                        <div className="flex-grow">
                                            <span className="text-gray-600">Total</span>
                                        </div>
                                        <div className="pl-3">
                                            <span className="font-semibold text-gray-400 text-sm">EUR</span> <span className="font-semibold">
                                                {
                                                    informations?.status
                                                    &&
                                                    informations?.status[0]?.price
                                                }€
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="px-3 md:w-5/12">
                                <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                                    <div className="w-full flex mb-3 items-center">
                                        <div className="w-32">
                                            <span className="text-gray-600 font-semibold">Contact</span>
                                        </div>
                                        <div className="flex-grow pl-3">
                                            <span>{name}</span>
                                        </div>
                                    </div>
                                    <div className="w-full flex items-center">
                                        <div className="w-32">
                                            <span className="text-gray-600 font-semibold">Adresse de facturation</span>
                                        </div>
                                        <div className="flex-grow pl-3">

                                            {
                                                informations?.step5
                                                &&
                                                <span> {informations?.step5[0]?.address}, {informations?.step5[0]?.city} - {informations?.step5[0]?.zip} </span>

                                            }

                                        </div>
                                    </div>
                                </div>

                                <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
                                    fhfghfdhfgghdf
                                </div>
                                <div>
                                    <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold"><i className="mdi mdi-lock-outline mr-1"></i> PAY NOW</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default PaymentsPage