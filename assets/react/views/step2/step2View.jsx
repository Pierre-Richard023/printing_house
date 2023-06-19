import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initInformationsStep2, setStepData, getOptions, chooseOption, setOrderStatus } from '../../store/slice/orderSlice'
import Loading from "../../components/loading/loading"
import { getStepInformations } from "../../services/orders"
import OptionLists from "../../components/optionLists/optionLists"

const Step2View = () => {

    const dispatch = useDispatch()
    const options = useSelector((state) => state.order.options.options)
    const hasChoose = useSelector((state) => state.order.options.hasChoose)
    const optionChoose = useSelector((state) => state.order.options.optionChoose)
    const price = useSelector((state) => state.order.options.price)
    const loadOptions = useSelector((state) => state.order.options.loadOptions)

    useEffect(() => {
        dispatch(getOptions())

        getStepInformations("step2")
        .then(response => {
            dispatch(initInformationsStep2(response))
        })
        .catch(error => console.error(error))

        const data = {
            step : 2
        }

        dispatch(setOrderStatus(data))

    }, [])

    useEffect(() =>{

        const stp2 = {
            name: 'step2',
            informations: {
                optionChoose,
                hasChoose,
            }
        }

        const stp3 = {
            name: 'step3',
            informations: {
                prevStepPrice: price
            }
        }
        dispatch(setStepData(stp2))
        dispatch(setStepData(stp3))

    },[optionChoose])

    const chooseOpt = (data) => {
        dispatch(chooseOption(data))

    }


    return (

        <>
            <h1 className="my-4 text-center xl:text-4xl font-bold">
                <span className="text-secondary">Sélectionner</span> une option d'envoi
            </h1>

            <div className="py-4">

                {(!loadOptions) &&
                    <OptionLists lists={options} choose={chooseOpt} optionChoose={optionChoose} />
                }

                {(loadOptions) &&
                    <Loading />
                }

            </div>
        </>
    )

}

export default Step2View