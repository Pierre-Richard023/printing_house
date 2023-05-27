import React from "react"

const OptionLists = ({ lists, optionChoose,choose }) => {


    return (
        <>
            <div className="py-6">
                <div className="container mx-auto p-4 sm:p-10">

                    <ul className="grid grid-cols-6 w-full ">

                        {
                            lists?.map((val, i) =>

                                <li key={i} className="relative col-span-full sm:col-span-2 m-4">
                                    <input className="sr-only peer" type="radio" name="radio" id={"option" + i}
                                        defaultChecked={optionChoose == val.id}
                                        onClick={(e) => choose({ id: val.id, price: val.price }) } readOnly
                                    />
                                    <label className="flex w-full p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-primary peer-checked:ring-2 peer-checked:border-transparent text-center"
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

export default OptionLists