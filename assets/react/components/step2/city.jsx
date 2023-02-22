import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { cityChange, getCity, initCity } from "../../store/slice/step2Slice"


const City = () => {

    const dispatch = useDispatch()
    const listCity = useSelector((state) => state.step2.cityList)
    const city = useSelector((state) => state.step2.city)
    const zip = useSelector((state) => state.step2.zip)

    useEffect(() => {
        if (listCity.length == 0)
            dispatch(getCity())
    }, [])

    useEffect(()=>{
        if(!city && !zip && listCity.length > 0 )
            dispatch(cityChange({ z : listCity[0].zip, ct : listCity[0].city, p : listCity[0].price }))
        
    },[listCity])

    const handleChange = (event) => {

        const z = event.target[event.target.selectedIndex].getAttribute('data-zip')
        const ct = event.target.value
        const p = parseFloat(event.target[event.target.selectedIndex].getAttribute('data-price'))
        dispatch(cityChange({ z, ct, p }))

    }


    return (
        <>

            <div className="col-span-full sm:col-span-3">
                <label htmlFor="zip" className="text-sm">Code Postal</label>
                <input className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                    type="text" id="zip" placeholder="Code postal" value={zip} readOnly
                />
            </div>

            <div className="col-span-full sm:col-span-3">
                <label htmlFor="city" className="text-sm">Ville</label>
                <select className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                    value={city} id="city" onChange={handleChange}
                >
                    {listCity.map((val, i) =>
                        <option key={i} value={val.name} data-zip={val.zip} data-price={val.price} > {val.name} </option>
                    )}
                </select>
            </div>

        </>
    )
}

export default City