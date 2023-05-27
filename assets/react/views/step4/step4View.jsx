import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { chooseBookbinding, getBookbinding, initInformationsStep4, setStepData } from '../../store/slice/orderSlice'
import Loading from "../../components/loading/loading"
import { getStepInformations } from "../../services/orders"
import OptionLists from "../../components/optionLists/optionLists"

const Step4View = () => {

    const dispatch = useDispatch()
    const hasChoose = useSelector((state) => state.order.bookbinding.hasChoose)
    const bookbinding = useSelector((state) => state.order.bookbinding.bookbinding)
    const bookbindingChoose = useSelector((state) => state.order.bookbinding.bookbindingChoose)
    const priceChoose = useSelector((state) => state.order.bookbinding.priceChoose)
    const price = useSelector((state) => state.order.bookbinding.price)
    const loadOptions = useSelector((state) => state.order.bookbinding.load)

    useEffect(() => {
        if (bookbinding.length === 0)
            dispatch(getBookbinding())
    }, [])

    useEffect(() => {
            getStepInformations("step4").then(response => {
                dispatch(initInformationsStep4(response))
            })

    }, [])

    const choose = (data) => {
        dispatch(chooseBookbinding(data))
        uploadStep()
    }

    const uploadStep = () => {

        const stp4 = {
            name: 'step4',
            informations: {
                bookbindingChoose,
                priceChoose,
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