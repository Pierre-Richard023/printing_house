import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"


const OrderStep = () => {
    const stepTitles = [
        {
            step : 1 ,
            name : "Vos documents"
        },
        {
            step : 2 ,
            name : "Option d'envoi"
        },
        {
            step : 3 ,
            name : "Type de courrier"
        },
        {
            step : 4 ,
            name : "Type de reliure"
        },
        {
            step : 5 ,
            name : "Adresse de livraison"
        },
    ]

  
    const [actualStep,setActualStep] = useState({})
    const step = useSelector ( state => state.order.step )


    useEffect(()=>{
        const res = stepTitles.find(item => item.step === step )
        setActualStep(res)
    },[])


    return (
        <>
            <div className="p-4 space-y-2">
                <h3 className="text-base font-semibold">
                    {
                        actualStep?.name
                    }
                </h3>
                <div className="flex w-full space-x-3">
                    <span className={ (step === 1) ? "w-1/6 h-2 rounded-sm bg-secondary" : "w-1/6 h-2 rounded-sm bg-primary" }></span>
                    <span className={ (step === 2) ? "w-1/6 h-2 rounded-sm bg-secondary" : (step > 2 ) ? "w-1/6 h-2 rounded-sm bg-primary" : "w-1/6 h-2 rounded-sm bg-gray-400" }></span>
                    <span className={ (step === 3) ? "w-1/6 h-2 rounded-sm bg-secondary" : (step > 3 ) ? "w-1/6 h-2 rounded-sm bg-primary" : "w-1/6 h-2 rounded-sm bg-gray-400" }></span>
                    <span className={ (step === 4) ? "w-1/6 h-2 rounded-sm bg-secondary" : (step > 4 ) ? "w-1/6 h-2 rounded-sm bg-primary" : "w-1/6 h-2 rounded-sm bg-gray-400" }></span>
                    <span className={ (step === 5) ? "w-1/6 h-2 rounded-sm bg-secondary" : (step > 5 ) ? "w-1/6 h-2 rounded-sm bg-primary" : "w-1/6 h-2 rounded-sm bg-gray-400" }></span>
                    <span className={ (step === 6) ? "w-1/6 h-2 rounded-sm bg-secondary" : (step > 6 ) ? "w-1/6 h-2 rounded-sm bg-primary" : "w-1/6 h-2 rounded-sm bg-gray-400" }></span>
                </div>
            </div>

        </>
    )
}

export default OrderStep