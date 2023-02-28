import React, { useState, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';




const FileViewController = (props) => {


    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

    const [numPages, setNumPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)
    const [loading, setLoading] = useState(true)

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages)
        setLoading(false)
    }



    return (
        <>
            <Document
                file={props.file}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page height={130} width={110} pageNumber={pageNumber} />
            </Document>
        </>
    )
}

export default FileViewController