import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPriceFiles, setStepData } from "../../store/slice/orderSlice"
import Files from "../../components/step1/files"
import Upload from "../../components/step1/Upload"

const Step1View = () => {

    const dispatch = useDispatch()
    const price = useSelector((state) => state.order.files.price)

    useEffect(() => {
        dispatch(getPriceFiles())
    }, [])


    useEffect(() => {
        const data = {
            name: 'step2',
            informations: {
                prevStepPrice: price
            }
        }
        dispatch(setStepData(data))
    }, [price])


    return (
        <>
            <h1 className="my-4 text-center xl:text-4xl font-bold">
                <span className="text-secondary">Chargez</span> vos documents
            </h1>

            <div className="py-4">
                <Upload />
                <Files />
            </div>

        </>
    )
}

export default Step1View