import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Form from "../../components/step2/form"
import { initInformationsStep2 ,setStepData } from "../../store/slice/orderSlice"
import Loading from "../../components/loading/loading"
import { getStepInformations } from "../../services/orders"
import OrderStep from "../../components/orderStep/orderStep"

const Step5Page = () => {


    const dispatch = useDispatch()
    const isDataSet = useSelector((state) => state.order.isDataSet)
    const loadForm = useSelector((state) => state.order.informations.loadForm)
    const address = useSelector((state) => state.order.informations.address)
    const city = useSelector((state) => state.order.informations.city)
    const zip = useSelector((state) => state.order.informations.zip)
    const phone = useSelector((state) => state.order.informations.phone)
    const price = useSelector((state) => state.order.informations.price)
    const cityPrice = useSelector((state) => state.order.informations.cityPrice)
    const isValid = (address.length > 3) && ( phone.length === 14)

    useEffect(() =>{
        if(!isDataSet)
            getStepInformations('step2').then(response =>{
                dispatch(initInformationsStep2(response))
            })
    },[isDataSet])

    const handleClick = async () => {
        console.log("next Step")

        const data ={ 
            name : 'step2',
            informations: {
                address,
                phone,
                price,
                city,
                zip,
                cityPrice
            }
        }

        const dataNxt = {
            name : 'step3',
            informations: {
                prevStepPrice: price
            }
        }
        
        dispatch(setStepData(data))
        dispatch(setStepData(dataNxt))
    }


    return (
        <div className="py-2 px-8">

            <OrderStep step={5} name={"Adresse de livraison"} /> 

            <h1 className="my-4 text-center xl:text-4xl font-bold">
                <span className="text-secondary">Adresse</span> de livraison
            </h1>

            <section className="py-4 flex justify-center">

                {(!loadForm) &&
                    <Form />
                }

                {(loadForm) &&
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
                        <Link className="px-8 py-3 mx-1 font-semibold rounded-full bg-primary text-white" to={"/step-4"} >
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
                            <Link className="px-8 py-3 font-semibold rounded-full text-white bg-primary"
                                to={"/step-4"} onClick={handleClick}
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

export default Step5Page