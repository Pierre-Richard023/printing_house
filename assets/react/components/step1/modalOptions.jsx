import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { updateFile } from "../../store/slice/orderSlice"

const ModalOptions = ({ data, isOpen, onClose, onPriceChange }) => {

    if (!isOpen) return null

    const dispatch = useDispatch()
    const [price, setPrice] = useState(data.price)
    const [defaultPrice, setDefaultPrice] = useState(data.starting_price)
    const [copies, setCopies] = useState(data.amount)
    const [color, setColor] = useState(data.color)
    const [bothSide, setBothSide] = useState(data.both_sides)
    const [reliure, setReliure] = useState(data.reliure)


    const colorClicked = (val) => {

        if (color !== val) {

            let prx
            let prxBase

            if (val) {
                prx = parseFloat((price * 1.6).toFixed(2))
                prxBase = parseFloat((defaultPrice * 1.6).toFixed(2))

            } else {
                prx = parseFloat((price / 1.6).toFixed(2))
                prxBase = parseFloat((defaultPrice / 1.6).toFixed(2))
            }

            setDefaultPrice(prxBase)
            setPrice(prx)
            setColor(val)

            const dataUpSt = {
                id: data.id,
                champ: 'starting_price',
                value: prxBase,
                price: prx
            }

            const dataUpCl = {
                id: data.id,
                champ: 'color',
                value: val,
                price: prx
            }

            dispatch(updateFile(dataUpSt))
            dispatch(updateFile(dataUpCl))
            onPriceChange(prx)
        }

    }

    const bothSideClicked = (val) => {

        setBothSide(val)
        const dataUpBS = {
            id: data.id,
            champ: 'both_sides',
            value: val,
            price: price
        }

        dispatch(updateFile(dataUpBS))

    }

    const reilureClicked = (val) => {

        if (reliure !== val) {

            let p
            let dp
            if (val) {
                p = parseFloat(((defaultPrice + 1.5) * copies).toFixed(2))
                dp = defaultPrice + 1.5
            }
            else {
                p = parseFloat(((defaultPrice - 1.5) * copies).toFixed(2))
                dp = defaultPrice - 1.5
            }

            const dataUpSt = {
                id: data.id,
                champ: 'starting_price',
                value: dp,
                price: p
            }

            const dataUpR = {
                id: data.id,
                champ: 'reliure',
                value: val,
                price: p
            }

            dispatch(updateFile(dataUpSt))
            dispatch(updateFile(dataUpR))
            onPriceChange(p)
            setPrice(p)
            setReliure(val)
            setDefaultPrice(dp)

        }

    }

    const handleCopiesChange = async (e) => {

        if (e.target.value <= 0)
            return

        const amount = e.target.value
        let p = parseFloat((defaultPrice * amount).toFixed(2))
        setPrice(p)
        setCopies(amount)

        const dataUpCp = {
            id: data.id,
            champ: 'copies',
            value: amount,
            price: p
        }

        onPriceChange(p)
        dispatch(updateFile(dataUpCp))
    }

    return (

        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">

                <div className="relative flex flex-col items-center max-w-lg gap-4 p-6 rounded-md bg-white shadow-md sm:py-8 sm:px-12">
                    <button className="absolute top-2 right-2" onClick={() => onClose()} >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                            <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
                        </svg>
                    </button>

                    <h1>Fichier : {data.file.name}</h1>

                    <div className="grid w-68 grid-cols-2 space-x-2 rounded-xl bg-gray-200 p-2" x-data="app">
                        <div>
                            <input type="radio" className="peer hidden" name={'color' + data.id} id={'radioColor1' + data.id} onClick={(e) => colorClicked(true)} defaultChecked={color} />
                            <label htmlFor={'radioColor1' + data.id} className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">Couleur</label>
                        </div>

                        <div>
                            <input type="radio" className="peer hidden" name={'color' + data.id} id={'radioColor2' + data.id} onClick={(e) => colorClicked(false)} defaultChecked={!color} />
                            <label htmlFor={'radioColor2' + data.id} className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">Noir et blanc</label>
                        </div>
                    </div>

                    <hr />

                    <div className="grid w-68 grid-cols-2 space-x-2 rounded-xl bg-gray-200 p-2" x-data="app">
                        <div>
                            <input type="radio" className="peer hidden" name={'bothSide' + data.id} id={'radioBothSide1' + data.id} onClick={(e) => bothSideClicked(false)} defaultChecked={!bothSide} />
                            <label htmlFor={'radioBothSide1' + data.id} className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">Recto</label>
                        </div>

                        <div>
                            <input type="radio" className="peer hidden" name={'bothSide' + data.id} id={'radioBothSide2' + data.id} onClick={(e) => bothSideClicked(true)} defaultChecked={bothSide} />
                            <label htmlFor={'radioBothSide2' + data.id} className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">Recto/Verso</label>
                        </div>
                    </div>

                    <hr />

                    <div className="grid w-68 grid-cols-2 space-x-2 rounded-xl bg-gray-200 p-2" x-data="app">
                        <div>
                            <input type="radio" className="peer hidden" name={'reliure' + data.id} id={'radioReliure1' + data.id} onClick={(e) => reilureClicked(true)} defaultChecked={reliure} />
                            <label htmlFor={'radioReliure1' + data.id} className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">Avec reilure</label>
                        </div>

                        <div>
                            <input type="radio" className="peer hidden" name={'reliure' + data.id} id={'radioReliure2' + data.id} onClick={(e) => reilureClicked(false)} defaultChecked={!reliure} />
                            <label htmlFor={'radioReliure2' + data.id} className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">Sans reliure</label>
                        </div>
                    </div>

                    <hr />

                    <fieldset className="w-68 text-center">
                        <label htmlFor={'copies' + data.id} className="block text-sm font-medium">Nombres copies</label>
                        <div className="flex">
                            <input type="number" id={'copies' + data.id} value={copies} min="1" onChange={handleCopiesChange}
                                className="flex flex-1 text-center border sm:text-sm rounded-l-md focus:ring-inset  focus:ring-secondary" />
                        </div>
                    </fieldset>

                    <hr />


                    <button type="button" className="px-8 py-3 font-semibold rounded-full bg-gray-400" onClick={() => onClose()} >Fermer</button>
                </div>


            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )

}

export default ModalOptions