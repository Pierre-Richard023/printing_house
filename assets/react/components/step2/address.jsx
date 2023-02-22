import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addressValid, saveAddress } from "../../store/slice/step2Slice"


const Address = () => {

    const dispatch = useDispatch()
    const address = useSelector((state) => state.step2.address)
    const addValid = useSelector((state) => state.step2.addressValid)

    useEffect(() => {
        if (address.length == 0)
            dispatch(addressValid(false))
        else if (address.length > 0 & !addValid)
            dispatch(addressValid(true))

    }, [address])

    return (

        <div className="col-span-full">
            <label htmlFor="address" className="text-sm">Adresse</label>
            <input className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                type="text" id="address" placeholder="14 rue voie" value={address}
                onChange={(e) => dispatch(saveAddress(e.target.value))}
            />
        </div>

    )
}

export default Address