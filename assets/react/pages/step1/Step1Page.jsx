import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getPriceFiles, saveFilePrice} from "../../store/slice/step1Slice"
import Files from "../../components/step1/files"
import Upload from "../../components/step1/Upload"

const Step1Page = () => {

    const dispatch = useDispatch()
    const price = useSelector((state) => state.step1.price)
    const isEmpty = useSelector((state) => state.step1.isEmpty)




    useEffect(() => {
        dispatch(getPriceFiles())
    }, [])


    return (
        <div className="py-2 px-8">

            <div className="p-4 space-y-2">
                <h3 className="text-base font-semibold">
                    Vos documents
                </h3>
                <div className="flex w-full space-x-3">
                    <span className={"w-1/4 h-2 rounded-sm bg-secondary"}></span>
                    <span className={"w-1/4 h-2 rounded-sm bg-gray-400"}></span>
                    <span className={"w-1/4 h-2 rounded-sm bg-gray-400"}></span>
                    <span className={"w-1/4 h-2 rounded-sm bg-gray-400"}></span>
                </div>
            </div>

            <section className="py-4">
                <Upload />
                <Files />
            </section>

            <hr />

            <div className="grid grid-cols-3 gap-3 justify-items-stretch py-4 ">
                <div className="">
                    Prix
                </div>
                <div className="justify-self-center text-center ">
                    {price}€
                </div>
                <div className="justify-self-end text-end ">
                    <div className="flex items-end">
                        {
                            isEmpty &&
                            <button type="button" disabled className="px-8 py-3 font-semibold rounded-full bg-gray-400 cursor-not-allowed ">
                                Suivant
                            </button>
                        }
                        {
                            !isEmpty &&
                            <Link   className="px-8 py-3 font-semibold rounded-full text-white bg-primary" 
                                    to={"/step-2"}  onClick={()=>dispatch(saveFilePrice())}  > 
                                Suivant
                            </Link>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Step1Page