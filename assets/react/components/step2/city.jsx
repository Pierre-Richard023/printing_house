import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { saveCity, saveZip } from "../../store/slice/orderSlice"

const City = () => {

    const dispatch = useDispatch()
    const city = useSelector((state) => state.order.informations.city)
    const zip = useSelector((state) => state.order.informations.zip)


    return (
        <>
            <div className="col-span-full sm:col-span-3">
                <label htmlFor="zip" className="text-sm">Ville</label>
                <input className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-secondary border-gray-700 text-gray-900"
                    type="text" id="city" placeholder="Ville" value={city}
                    onChange={(e) => dispatch(saveCity(e.target.value))}
                />
            </div>

            <div className="col-span-full sm:col-span-3">
                <label htmlFor="zip" className="text-sm">Code Postal</label>
                <input className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-secondary border-gray-700 text-gray-900"
                    type="text" id="zip" placeholder="Code postal" value={zip}
                    onChange={(e) => dispatch(saveZip(e.target.value))}
                />
            </div>
        </>
    )
}

export default City