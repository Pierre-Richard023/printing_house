import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPdfFiles } from "../../request/orderRequest"
import { getAllInformation } from "../../store/slice/paymentSlice"


const Received = () => {


    const dispatch = useDispatch()
    const name = useSelector((state) => state.payment.name)
    const informations = useSelector((state) => state.payment.informations)
    const today = useSelector((state) => state.payment.today)

    const [files, setFiles] = useState([])


    useEffect(() => {
        getPdfFiles().then(res => setFiles(res))
        dispatch(getAllInformation())
    }, [])


    return (
        <>


            <p className="text-xl font-medium">Récapitulatif de la commande</p>
            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                <p className="mt-2 text-lg font-medium">Adresse de Livraison :</p>

                {name}<br />
                {informations.address} <br />
                {informations.zip} {informations.city}<br />
                Guyane
            </div>

            <div className="mt-5 grid gap-6">


                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold leading-none text-gray-900">Listes des fihiers :</h3>
                </div>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {files.map((val, i) => (
                            <li key={i} className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {val.file.name}  x{val.amount}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                                        {val.price} €
                                    </div>
                                </div>
                            </li>

                        ))}
                    </ul>
                </div>


            </div>
        </>
    )

}

export default Received