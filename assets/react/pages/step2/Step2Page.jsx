import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import CardOptions from "../../components/step3/cardOptions"
import { initInformationsStep2, setStepData, getOptions, chooseOption } from '../../store/slice/orderSlice'
import Loading from "../../components/loading/loading"
import { getStepInformations } from "../../services/orders"
import OrderStep from "../../components/orderStep/orderStep"
import OptionLists from "../../components/optionLists/optionLists"

const Step2Page = () => {

    const dispatch = useDispatch()
    const isDataSet = useSelector((state) => state.order.isDataSet)
    const options = useSelector((state) => state.order.options.options)
    const hasChoose = useSelector((state) => state.order.options.hasChoose)
    const optionChoose = useSelector((state) => state.order.options.optionChoose)
    const priceChoose = useSelector((state) => state.order.options.priceChoose)
    const price = useSelector((state) => state.order.options.price)
    const loadOptions = useSelector((state) => state.order.options.loadOptions)

    useEffect(() => {
        if (options.length === 0)
            dispatch(getOptions())
    }, [])

    useEffect(() => {
        if (!isDataSet)
            getStepInformations("step2").then(response => {
                dispatch(initInformationsStep2(response))
            })
    }, [isDataSet])

    const choose = (data) => {
        dispatch(chooseOption(data))
    }

    const nextStep = () => {

        const stp2 = {
            name: 'step2',
            informations: {
                optionChoose,
                priceChoose,
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
    }




    return (
        <div className="py-2 px-8">

            <OrderStep step={2} name={"Option d'envoi"} />

            <h1 className="my-4 text-center xl:text-4xl font-bold">
                <span className="text-secondary">Sélectionner</span> une option d'envoi
            </h1>

            <section className="py-4">

                {(!loadOptions) &&
                    <OptionLists lists={options} choose={choose} optionChoose={optionChoose} />
                }

                {(loadOptions) &&
                    <Loading />
                }

            </section>

            <hr />

            <div className="grid grid-cols-3 gap-3 justify-items-stretch py-4 ">
                <div className="">
                    Prix
                </div>
                <div className="justify-self-center text-center ">
                    {price}€
                </div>
                <div className="justify-self-end text-end ">
                    <div className="flex items-end">
                        <Link className="px-8 py-3 mx-1 font-semibold rounded-full bg-primary text-white" to={"/"} >
                            Retour
                        </Link>
                        {
                            !hasChoose &&
                            <button type="button" disabled className="px-8 py-3 font-semibold rounded-full bg-gray-400 cursor-not-allowed ">
                                Suivant
                            </button>
                        }
                        {
                            hasChoose &&
                            <Link className="px-8 py-3 font-semibold rounded-full text-white bg-primary"
                                to={"/step-3"}
                                onClick={nextStep}
                            >
                                Suivant
                            </Link>
                        }
                    </div>
                </div>
            </div>

        </div>
    )

}

export default Step2Page