import React from "react"
import { useDispatch } from 'react-redux'
import { savePdfFile } from '../../request/orderRequest'
import { isLoading, uploadFile } from '../../store/slice/step1Slice'


const Upload = () => {

    const dispatch= useDispatch()

    const change = async (e) => {
        if (!e.target.files[0])
            return

        const key = await savePdfFile(e.target.files[0])
        dispatch(uploadFile(key))

        e.target.value = ""
    }

    return (
        <div className="max-w-2xl mx-auto">

            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-primary border-dashed text-primary cursor-pointer hover:bg-primary hover:text-white">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <h1 className="text-xl">
                            Faites glisser et déposez un fichier ou sélectionnez ajouter un fichier
                        </h1>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" 
                        accept="application/pdf" onChange={(e) => change(e)}
                    />
                </label>
            </div>

        </div>
    )
}

export default Upload