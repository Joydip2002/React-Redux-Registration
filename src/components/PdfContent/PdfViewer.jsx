import React from 'react'
import Pdf from './Pdf'
import { PDFDownloadLink } from '@react-pdf/renderer'

const PdfViewer = () => {
    return (
        <div>
            <PDFDownloadLink document={<Pdf />} fileName='FROM'>
                {({loading,error})=>(loading?'Loading Document...':(<div className='text-center mt-5'><button className='btn btn-primary'>Downlaod</button></div>))}
            </PDFDownloadLink>
        </div>
    )
}

export default PdfViewer
