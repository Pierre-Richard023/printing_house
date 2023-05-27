import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { chooseType, getMailTypes, initInformationsStep3, setStepData } from '../../store/slice/orderSlice'
import Loading from "../../components/loading/loading"
import { getStepInformations } from "../../services/orders"
import OrderStep from "../../components/orderStep/orderStep"
import OptionLists from "../../components/optionLists/optionLists"

const Step3Page = () => {

    const dispatch = useDispatch()
    const isDataSet = useSelector((state) => state.order.isDataSet)
    const hasChoose = useSelector((state) => state.order.types.hasChoose)
    const mailTypes = useSelector((state) => state.order.types.types)
    const price = useSelector((state) => state.order.types.price)
    const priceChoose = useSelector((state) => state.order.types.priceChoose)
    const loadOptions = useSelector((state) => state.order.types.load)
    const typeChoose = useSelector((state) => state.order.types.typeChoose)

    useEffect(()=>{
        if(mailTypes.length ===0 )
            dispatch(getMailTypes())
    },[])


    useEffect(() => {
        if (!isDataSet)
            getStepInformations("step3").then(response => {
                dispatch(initInformationsStep3(response))
            })
    }, [isDataSet])


    const choose = (data) => {
        dispatch(chooseType(data))
    }

    const nextStep = () => {

        const stp3 = {
            name: 'step3',
            informations: {
                typeChoose,
                priceChoose,
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
    }




    return (
        <div className="py-2 px-8">

            <OrderStep step={3} name={"Type de courrier"} />

            <h1 className="my-4 text-center xl:text-4xl font-bold">
                <span className="text-secondary">Courrier recommandé</span> ou suivi ?
            </h1>

            <section className="py-4">

                {(!loadOptions) &&
                    <OptionLists lists={mailTypes} choose={choose} optionChoose={typeChoose} />
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
                                to={"/step-4"}
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

export default Step3Page