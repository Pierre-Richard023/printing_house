import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { deletePdfFile, getPdfFile, getPdfFiles, updatePdfFile } from "../../request/orderRequest"
import { deletePdfFile, getPdfFile, getPdfFiles, updatePdfFile } from "../../services/orders"
import { getPriceFiles, hasFiles, isUpload } from "../../store/slice/orderSlice"
import File from "./file"



const Files = () => {

    const dispatch = useDispatch()
    const isUploading = useSelector((state) => state.order.files.isUploadFile)
    const keyFileUpload = useSelector((state) => state.order.files.keyFileUpload)
    const [files, setFiles] = useState([])

    useEffect(() => {
        getPdfFiles().then(res => setFiles(res))
    }, [])

    useEffect(() => {
        dispatch(getPriceFiles())

        if (files.length === 0)
            dispatch(hasFiles(false))
        else
            dispatch(hasFiles(true))

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
        <div className='flex gap-6 p-4'>
            {files.map((val, i) => <File key={i} data={val} delFile={delFile} />)}
        </div>
    )

}

export default Files