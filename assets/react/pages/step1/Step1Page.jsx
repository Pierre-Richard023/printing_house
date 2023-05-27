import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getPriceFiles, setStepData } from "../../store/slice/orderSlice"
import Files from "../../components/step1/files"
import Upload from "../../components/step1/Upload"
import OrderStep from "../../components/orderStep/orderStep"

const Step1Page = () => {

    const dispatch = useDispatch()
    const price = useSelector((state) => state.order.files.price)
    const isEmpty = useSelector((state) => state.order.files.isEmpty)


    useEffect(() => {
        dispatch(getPriceFiles())
    }, [])

    const nextStep = () => {

        const data = {
            name: 'step2',
            informations: {
                prevStepPrice: price
            }
        }

        dispatch(setStepData(data))
    }


    return (
        <div className="py-2 px-8">

            <OrderStep step={1} name={"Vos documents"} />

            <h1 className="my-4 text-center xl:text-4xl font-bold">
                <span className="text-secondary">Chargez</span> vos documents
            </h1>


            <section className="py-4">
                <Upload />
                <Files />
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
                        {
                            isEmpty &&
                            <button type="button" disabled className="px-8 py-3 font-semibold rounded-full bg-gray-400 cursor-not-allowed ">
                                Suivant
                            </button>
                        }
                        {
                            !isEmpty &&
                            <Link className="px-8 py-3 font-semibold rounded-full text-white bg-primary"
                                to={"/step-2"}
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

export default Step1Page