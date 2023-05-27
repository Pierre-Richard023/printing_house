import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { downStep, upStep } from '../../store/slice/orderSlice'

const OrderBottom = () => {

    const dispatch = useDispatch()
    const step = useSelector(state => state.order.step)
    const stepValid = useSelector(state => state.order.stepValid)
    const price = useSelector(state => state.order.price)



    const nextStep = () => {
        dispatch(upStep())
    }

    return (
        <>

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
                            (step > 1)
                            &&
                            < button type="button"
                                className="px-8 py-3 mx-1 font-semibold rounded-full bg-primary text-white"
                                onClick={(e) => dispatch(downStep())}
                            >
                                Retour
                            </button>
                        }

                        <button type="button"
                            className={`px-8 py-3 font-semibold rounded-full  ${stepValid ? " bg-primary text-white" : " bg-gray-400 cursor-not-allowed"} `}
                            onClick={nextStep}
                            disabled={!stepValid}
                        >
                            Suivant
                        </button>

                    </div>
                </div>
            </div >
        </>
    )
}

export default OrderBottom