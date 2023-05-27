import React from "react"
import OrderStep from "../../components/orderStep/orderStep"
import OrderBottom from "../../components/orderBottom/orderBottom"
import Step1View from "../../views/step1/step1View"
import { useSelector } from "react-redux"
import Step2View from "../../views/step2/step2View"
import Step3View from "../../views/step3/step3View"
import Step4View from "../../views/step4/step4View"
import Step5View from "../../views/step5/step5View"

const Main = () => {

    const step = useSelector(state => state.order.step)



    return (
        <>
            <OrderStep />

            {
                (step === 1)
                &&
                <Step1View />
            }
            {
                (step === 2)
                &&
                <Step2View />
            }
            {
                (step === 3)
                &&
                <Step3View />
            }
            {
                (step === 4)
                &&
                <Step4View />
            }
            {
                (step === 5)
                &&
                <Step5View />
            }


            <OrderBottom />
        </>
    )
}

export default Main