import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { saveAddress } from "../../store/slice/orderSlice"


const Address = () => {

    const dispatch = useDispatch()
    const address = useSelector((state) => state.order.informations.address)

    return (
        <>
            <div className="relative">
                <input type="text" id="address"
                    className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer" placeholder=" "
                    onChange={(e) => dispatch(saveAddress(e.target.value))}
                    value={address}
                />
                <label
                    htmlFor="address"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-secondary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                    Adresse
                </label>
            </div>
        </>
    )
}

export default Address