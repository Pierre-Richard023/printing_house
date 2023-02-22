import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import CardOptions from "../../components/step3/cardOptions"
import { createBD, getDBInformations, getOptionsDBInformations, setOptionsDBInformations } from '../../request/orderRequest'
import { getOptionsChoose, initOptions, saveOption } from '../../store/slice/step3Slice'

const Step3Page = () => {

    const dispatch = useDispatch()

    const hasChoose = useSelector((state) => state.step3.hasChoose)
    const optionChoose = useSelector((state) => state.step3.optionChoose)
    const priceChoose = useSelector((state) => state.step3.priceChoose)
    const price = useSelector((state) => state.step3.price)

    useEffect(() => {
        dispatch(getOptionsChoose())
    }, [])



    return (
        <div className="py-2 px-8">

            <div className="p-4 space-y-2">
                <h3 className="text-base font-semibold">
                    Option d'envoi
                </h3>
                <div className="flex w-full space-x-3">
                    <span className={"w-1/4 h-2 rounded-sm bg-primary"}></span>
                    <span className={"w-1/4 h-2 rounded-sm bg-primary"}></span>
                    <span className={"w-1/4 h-2 rounded-sm bg-secondary"}></span>
                    <span className={"w-1/4 h-2 rounded-sm bg-gray-400"}></span>
                </div>
            </div>

            <section className="py-4">
                <CardOptions />
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
                        <Link className="px-8 py-3 mx-1 font-semibold rounded-full bg-primary text-white" to={"/step-2"} >
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

export default Step3Page