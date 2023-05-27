import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { saveAddress } from "../../store/slice/orderSlice"


const Address = () => {

    const dispatch = useDispatch()
    const address = useSelector((state) => state.order.informations.address)

    return (

        <div className="col-span-full">
            <label htmlFor="address" className="text-sm">Adresse</label>
            <input className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                type="text" id="address" placeholder="14 rue des anges" value={address}
                onChange={(e) => dispatch(saveAddress(e.target.value))}
            />
        </div>

    )
}

export default Address