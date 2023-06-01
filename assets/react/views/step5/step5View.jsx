import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Form from "../../components/step2/form"
import { initInformationsStep5, setStepData, setOrderStatus, validInformations } from "../../store/slice/orderSlice"
import Loading from "../../components/loading/loading"
import { getStepInformations } from "../../services/orders"

const Step5View = () => {


    const dispatch = useDispatch()
    const stepValid = useSelector(state => state.order.stepValid)
    const loadForm = useSelector((state) => state.order.informations.loadForm)
    const address = useSelector((state) => state.order.informations.address)
    const city = useSelector((state) => state.order.informations.city)
    const zip = useSelector((state) => state.order.informations.zip)
    const phone = useSelector((state) => state.order.informations.phone)
    const price = useSelector((state) => state.order.informations.price)

    useEffect(() => {
        getStepInformations('step5').then(response => {
            dispatch(initInformationsStep5(response))
        })
        const data = {
            step: 5
        }

        dispatch(setOrderStatus(data))
    }, [])


    useEffect(() => {

        if (address.length > 5 && phone.length === 14 && city.length > 2 && zip.length === 5)
            dispatch(validInformations(true))
        else
            if (stepValid)
                dispatch(validInformations(false))

    }, [address, phone, city, zip])


    useEffect(() => {

        if (stepValid) {

            const data = {
                name: 'step5',
                informations: {
                    address,
                    phone,
                    price,
                    city,
                    zip
                }
            }
            dispatch(setStepData(data))
        }

    }, [stepValid])

    return (
        <>
            <h1 className="my-4 text-center xl:text-4xl font-bold">
                <span className="text-secondary">Adresse</span> de livraison
            </h1>

            <div className="py-4 flex justify-center">

                {(!loadForm) &&
                    <Form />
                }

                {(loadForm) &&
                    <Loading />
                }
            </div>
        </>
    )

}

export default Step5View