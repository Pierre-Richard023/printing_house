import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { savePhone } from "../../store/slice/orderSlice";


const Phone = () => {

    const dispatch = useDispatch()

    const phone = useSelector((state) => state.order.informations.phone)

    const formatPhoneNumber = (value) => {

        if (!value) return value;

        const phoneNumber = value.replace(/[^\d]/g, '');
        const phoneNumberLength = phoneNumber.length;

        if (phoneNumberLength < 2)
            return phoneNumber;

        if (phoneNumberLength < 4)
            return `${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2)}`

        if (phoneNumberLength < 6)
            return `${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2, 4)} ${phoneNumber.slice(4)}`

        if (phoneNumberLength < 8)
            return `${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2, 4)} ${phoneNumber.slice(4, 6)} ${phoneNumber.slice(6)}`


        return `${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2, 4)} ${phoneNumber.slice(4, 6)} ${phoneNumber.slice(6, 8)} ${phoneNumber.slice(8, 10)}`

    }


    const changeFormat = (evt) => {
        const value = evt.target.value
        const num = formatPhoneNumber(value)
        dispatch(savePhone(num))
    }


    return (

            <div className="col-span-full">
                <label htmlFor="phone" className="text-sm">Téléphone</label>
                <input  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" 
                        type="tel" id="phone" placeholder="0694 012345" maxLength={14}
                        value={phone}
                        onChange={(e) => changeFormat(e)}
                        onKeyDown={(event) => {
                            if ( !/[0-9]/.test(event.key) ) {
                                if(event.code == 'Backspace'){
                                    const ph=phone.trimEnd()
                                    dispatch(savePhone(ph.slice(0,-1)))
                                }
                                event.preventDefault();
                            }

                        }}
                />
            </div>

    )
}

export default Phone