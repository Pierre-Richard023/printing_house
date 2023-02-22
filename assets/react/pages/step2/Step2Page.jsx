import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Form from "../../components/step2/form"
import { getInformations, saveInformation } from "../../store/slice/step2Slice"

const Step2Page = () => {


    const dispatch = useDispatch()
    const phoneValid = useSelector((state) => state.step2.phoneValid)
    const addressValid = useSelector((state) => state.step2.addressValid)
    const filesPrice = useSelector((state) => state.step2.priceFiles)
    const cityPrice = useSelector((state) => state.step2.cityPrice)
    
    const price = filesPrice + cityPrice
    const isValid = phoneValid && addressValid

    useEffect(() => {
        dispatch(getInformations())
    }, [])


    return (
        <div className="py-2 px-8">

            <div className="p-4 space-y-2">
                <h3 className="text-base font-semibold">
                    Adresse de livraison
                </h3>
                <div className="flex w-full space-x-3">
                    <span className={"w-1/4 h-2 rounded-sm bg-primary"}></span>
                    <span className={"w-1/4 h-2 rounded-sm bg-secondary"}></span>
                    <span className={"w-1/4 h-2 rounded-sm bg-gray-400"}></span>
                    <span className={"w-1/4 h-2 rounded-sm bg-gray-400"}></span>
                </div>
            </div>

            <section className="py-4 flex justify-center">
                <Form />
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
                            !isValid &&
                            <button type="button" disabled className="px-8 py-3 font-semibold rounded-full bg-gray-400 cursor-not-allowed ">
                                Suivant
                            </button>
                        }
                        {
                            isValid &&
                            <Link   className="px-8 py-3 font-semibold rounded-full text-white bg-primary"
                                    to={"/step-3"} onClick={ () => dispatch(saveInformation()) }
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