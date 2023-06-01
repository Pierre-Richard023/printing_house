import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { saveCity, saveZip } from "../../store/slice/orderSlice"

const City = () => {

    const dispatch = useDispatch()
    const city = useSelector((state) => state.order.informations.city)
    const zip = useSelector((state) => state.order.informations.zip)


    return (
        <>
            <div className="grid items-end gap-6 md:grid-cols-2 my-4">
                <div className="relative">
                    <input type="text" id="city"
                        className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer" placeholder=" "
                        onChange={(e) => dispatch(saveCity(e.target.value))}
                        value={city}
                    />
                    <label
                        htmlFor="city"
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-secondary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                        Ville
                    </label>
                </div>

                <div className="relative">
                    <input type="text" id="zip" maxLength={5}
                        className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer" placeholder=" "
                        onChange={(e) => dispatch(saveZip(e.target.value))}
                        value={zip}
                        onKeyDown={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                if (event.code == 'Backspace') {
                                    const ph = zip.trimEnd()
                                    dispatch(saveZip(ph.slice(0, -1)))
                                }
                                event.preventDefault();
                            }
                        }}
                    />
                    <label
                        htmlFor="zip"
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-secondary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                        Code postal
                    </label>
                </div>


            </div>
        </>
    )
}

export default City