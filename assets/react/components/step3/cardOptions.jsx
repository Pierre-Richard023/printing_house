import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chooseOption, getOptions } from '../../store/slice/orderSlice'


const CardOptions = () => {

    const dispatch = useDispatch()
    const optionChoose = useSelector((state) => state.order.options.optionChoose)
    const options = useSelector((state) => state.order.options.options)

    useEffect(() => {
        if (options.length === 0)
            dispatch(getOptions())
    }, [])


    return (
        <>
            <div className="py-6">
                <div className="container mx-auto p-4 sm:p-10">

                        <ul className="grid grid-cols-6 w-full ">

                            {
                                options?.map((val, i) =>

                                    <li key={i} className="relative col-span-full sm:col-span-2 m-4">
                                        <input className="sr-only peer" type="radio" name="radio" id={"option" + i}
                                            defaultChecked={optionChoose == val.id}
                                            onClick={(e) => dispatch(chooseOption({ id: val.id, price: val.price }))} readOnly
                                        />
                                        <label className="flex w-full p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-2 peer-checked:border-transparent text-center"
                                            htmlFor={"option" + i}
                                        >
                                            <div className="w-full text-center">
                                                <h2 className='font-bold'>{val.name}</h2>
                                                <p className='py-2'>{val.description}</p>
                                            </div>
                                        </label>
                                    </li>

                                )

                            }

                        </ul>

                </div>
            </div>
        </>
    )
}

export default CardOptions