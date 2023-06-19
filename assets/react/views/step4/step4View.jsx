import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { chooseBookbinding, getBookbinding, initInformationsStep4, setStepData,setOrderStatus } from '../../store/slice/orderSlice'
import Loading from "../../components/loading/loading"
import { getStepInformations } from "../../services/orders"
import OptionLists from "../../components/optionLists/optionLists"

const Step4View = () => {

    const dispatch = useDispatch()
    const hasChoose = useSelector((state) => state.order.bookbinding.hasChoose)
    const bookbinding = useSelector((state) => state.order.bookbinding.bookbinding)
    const bookbindingChoose = useSelector((state) => state.order.bookbinding.bookbindingChoose)
    const price = useSelector((state) => state.order.bookbinding.price)
    const loadOptions = useSelector((state) => state.order.bookbinding.load)

    useEffect(() => {
        dispatch(getBookbinding())
        getStepInformations("step4").then(response => {
            dispatch(initInformationsStep4(response))
        })
        const data = {
            step : 4
        }

        dispatch(setOrderStatus(data))

    }, [])

    useEffect(() => {

        const stp4 = {
            name: 'step4',
            informations: {
                bookbindingChoose,
                hasChoose,
            }
        }

        const stp5 = {
            name: 'step5',
            informations: {
                prevStepPrice: price
            }
        }

        dispatch(setStepData(stp4))
        dispatch(setStepData(stp5))

    }, [bookbindingChoose])

    const choose = (data) => {
        dispatch(chooseBookbinding(data))
    }


    return (
        <>

            <h1 className="my-4 text-center xl:text-4xl font-bold">
                <span className="text-secondary">Reliure</span>
            </h1>

            <div className="py-4">

                {(!loadOptions) &&
                    <OptionLists lists={bookbinding} choose={choose} optionChoose={bookbindingChoose} />
                }

                {(loadOptions) &&
                    <Loading />
                }

            </div>

        </>
    )

}

export default Step4View