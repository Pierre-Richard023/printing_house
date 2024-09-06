import React, { useEffect } from "react"
import OrderStep from "../../components/orderStep/orderStep"
import Step1View from "../../views/step1/step1View"
import { useDispatch, useSelector } from "react-redux"
import Step2View from "../../views/step2/step2View"
import Step3View from "../../views/step3/step3View"
import Step4View from "../../views/step4/step4View"
import Step5View from "../../views/step5/step5View"
import { deleteAllTable, getStatus } from "../../services/orders"
import { uploadStatus } from "../../store/slice/orderSlice"
import Loading from "../../components/loading/loading"
import OrderFooter from "../../components/orderFooter/orderFooter"

const Main = () => {

    const dispatch = useDispatch()
    const step = useSelector(state => state.order.step)
    const load = useSelector(state => state.order.load)

    useEffect(() => {
        // deleteAllTable()
        getStatus().then(response => {
            dispatch(uploadStatus(response))
        })
    }, [])


    return (
        <>

            <OrderStep />

            {
                load
                &&
                <Loading />
            }


            {
                !load
                &&
                <section className="">

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
                </section>
            }
            <OrderFooter />

        </>
    )
}

export default Main