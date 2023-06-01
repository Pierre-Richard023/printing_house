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

        <>
            <div className="relative">
                <input type="tel" id="phone" maxLength={14}
                    className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer"
                    placeholder=" " value={phone}
                    onChange={(e) => changeFormat(e)}
                    onKeyDown={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                            if (event.code == 'Backspace') {
                                const ph = phone.trimEnd()
                                dispatch(savePhone(ph.slice(0, -1)))
                            }
                            event.preventDefault();
                        }

                    }}
                />
                <label
                    htmlFor="phone"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-secondary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                    Téléphone
                </label>
            </div>
        </>
    )
}

export default Phone