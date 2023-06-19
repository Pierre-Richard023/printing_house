import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { chooseType, getMailTypes, initInformationsStep3, setStepData,setOrderStatus } from '../../store/slice/orderSlice'
import Loading from "../../components/loading/loading"
import { getStepInformations } from "../../services/orders"
import OptionLists from "../../components/optionLists/optionLists"

const Step3View = () => {

    const dispatch = useDispatch()
    const hasChoose = useSelector((state) => state.order.types.hasChoose)
    const mailTypes = useSelector((state) => state.order.types.types)
    const price = useSelector((state) => state.order.types.price)
    const loadOptions = useSelector((state) => state.order.types.load)
    const typeChoose = useSelector((state) => state.order.types.typeChoose)

    useEffect(() => {
        dispatch(getMailTypes())

        getStepInformations("step3").then(response => {
            dispatch(initInformationsStep3(response))
        })
        const data = {
            step : 3
        }

        dispatch(setOrderStatus(data))

    }, [])


    useEffect(() => {
        const stp3 = {
            name: 'step3',
            informations: {
                typeChoose,
                hasChoose,
            }
        }

        const stp4 = {
            name: 'step4',
            informations: {
                prevStepPrice: price
            }
        }

        dispatch(setStepData(stp3))
        dispatch(setStepData(stp4))
    }, [typeChoose])


    const choose = (data) => {
        dispatch(chooseType(data))
    }

    return (
        <>
            <h1 className="my-4 text-center xl:text-4xl font-bold">
                <span className="text-secondary">Courrier recommandé</span> ou suivi ?
            </h1>

            <div className="py-4">

                {(!loadOptions) &&
                    <OptionLists lists={mailTypes} choose={choose} optionChoose={typeChoose} />
                }

                {(loadOptions) &&
                    <Loading />
                }

            </div>

        </>

    )

}

export default Step3View