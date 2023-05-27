import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { chooseBookbinding, getBookbinding, initInformationsStep4, setStepData } from '../../store/slice/orderSlice'
import Loading from "../../components/loading/loading"
import { getStepInformations } from "../../services/orders"
import OrderStep from "../../components/orderStep/orderStep"
import OptionLists from "../../components/optionLists/optionLists"

const Step4Page = () => {

    const dispatch = useDispatch()
    const isDataSet = useSelector((state) => state.order.isDataSet)
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
        if (!isDataSet)
            getStepInformations("step4").then(response => {
                dispatch(initInformationsStep4(response))
            })

    }, [isDataSet])

    const choose = (data) => {
        dispatch(chooseBookbinding(data))
    }

    const nextStep = () => {

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
        <div className="py-2 px-8">

            <OrderStep step={4} name={"Reliure"} />

            <h1 className="my-4 text-center xl:text-4xl font-bold">
                <span className="text-secondary">Reliure</span>
            </h1>

            <section className="py-4">

                {(!loadOptions) &&
                    <OptionLists lists={bookbinding} choose={choose} optionChoose={bookbindingChoose} />
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
                        <Link className="px-8 py-3 mx-1 font-semibold rounded-full bg-primary text-white" to={"/step-3"} >
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
                                to={"/step-5"}
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

export default Step4Page