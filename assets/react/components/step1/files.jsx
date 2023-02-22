import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deletePdfFile, getPdfFile, getPdfFiles, updatePdfFile } from "../../request/orderRequest"
import { getPriceFiles, hasFiles, isUpload } from "../../store/slice/step1Slice"
import File from "./file"



const Files = () => {

    const dispatch = useDispatch()
    const isUploading = useSelector((state) => state.step1.isUploadFile)
    const keyFileUpload = useSelector((state) => state.step1.keyFileUpload)
    const [files, setFiles] = useState([])

    useEffect(() => {
        getPdfFiles().then(res => setFiles(res))
    }, [])

    useEffect(() => {
        dispatch(getPriceFiles())

        if (files.length == 0)
            dispatch(hasFiles(true))
        else
            dispatch(hasFiles(false))

    }, [files])

    useEffect(() => {
        if (isUploading) {
            getPdfFile(keyFileUpload).then(res => setFiles(r => [...r, res]))
            dispatch(isUpload())
        }
    }, [isUploading])

    const delFile = async (id) => {
        setFiles(files.filter((val, i) => val.id !== id))
        await deletePdfFile(id)
    }

    return (
        <div className='md:grid md:grid-cols-4 gap-6 py-4'>
            {files.map((val, i) => <File key={i} data={val} delFile={delFile} />)}
        </div>
    )

}

export default Files