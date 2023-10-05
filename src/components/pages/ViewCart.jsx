import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';
import edata from '../ExcelData/ExcelDatafile';
import * as XLSX from 'xlsx'; 

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 10,
    },
    pageNumber: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    table: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        alignItems: 'center',
        height: 24,
    },
    headerCell: {
        fontWeight: 'bold',
        borderRightWidth: 1,
        borderRightColor: '#000',
        padding: 4,
    },
    cell: {
        borderRightWidth: 1,
        borderRightColor: '#000',
        padding: 4,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        fontWeight: 'bold',
        padding: 4,
    },
    headerText: {
        width: '20%',
        textAlign: 'center',
        marginLeft: '12%'
    },
    cellText: {
        width: '20%',
        textAlign: 'center',
        marginLeft: '20%'
    },
    user: {
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
        margin: '5px 0',
        color: 'red',
        backgroundColor: 'yellow'
    }
});


const ViewCart = () => {
    const cartData = useSelector((state) => state.cart.cartItem);
    const cart = cartData;

    const [getExcelData, setExcelData] = useState([]); 
    const [getInputFileData,setInputFileData] = useState();

    const exportExcelData = () => {
        if (getExcelData.length > 0) {
            edata(getExcelData, 'cart_data');
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            // console.log(workbook);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            setInputFileData(jsonData);
          };
          reader.readAsArrayBuffer(file);
        }
      };

      const handleSubmit=()=>{
        if (getInputFileData) {
            console.log('Excel Data:', getInputFileData);
          } else {
            console.log('No Excel file selected.');
          }
      }

    useEffect(() => {
        if (cart.length > 0) {
            if (cart) {
                setExcelData(cart.map((cd) => ({
                    'Product Image': cd.thumbnail,
                    'Product Name': cd.title,
                    'Price': cd.price,
                })));
            }
        }
    }, [cart])

    return (
        <div>
            <h5>My Cart</h5>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Product Image</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {cart ?
                            cart.map((cd, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row"><img src={cd.thumbnail} width='100px' alt="" /></th>
                                        <td>{cd.title}</td>
                                        <td>{cd.price}</td>
                                    </tr>
                                )
                            })
                            : (<p className='text-center fs-4'>Your cart is empty!😢</p>)}
                    </tbody>
                </table>
            </div>
            <div className="text-center">
                <PDFDownloadLink document={<PdfDocument cart={cart} />} fileName="cart.pdf">
                    {({ blob, url, loading, error }) =>
                        loading ? 'Loading document...' : <button className='btn btn-info m-2'>Download PDF</button>
                    }
                </PDFDownloadLink>
                <button className='btn btn-warning' onClick={exportExcelData}>Download Excel Format</button>

                <div className='d-flex justify-content-center'>
                    <input type="file" name='file' className='form-control align-items-center w-50' accept=".xls, .xlsx" onChange={handleFileChange} />
                </div>
                <button className='btn btn-primary mt-2' onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

const PdfDocument = ({ cart }) => {
    const itemsPerPage = 3;
    const numPages = Math.ceil(cart.length / itemsPerPage);

    return (
        <Document>
            {Array.from({ length: numPages }, (_, pageIndex) => (
                <Page key={pageIndex} size="A4" style={styles.page}>
                    <Text style={styles.user}>Name: {localStorage.getItem('user')}</Text>
                    <View style={styles.tableHeader}>
                        <Text style={styles.headerText}>Product Image</Text>
                        <Text style={styles.headerText}>Product Name</Text>
                        <Text style={styles.headerText}>Price</Text>
                    </View>
                    {cart.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).map((cd, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Image src={cd.thumbnail} style={{ width: '20%' }} />
                            <Text style={styles.cellText}>{cd.title}</Text>
                            <Text style={styles.cellText}>{cd.price}</Text>
                        </View>
                    ))}
                    <Text style={styles.pageNumber}>Page {pageIndex + 1} of {numPages}</Text>
                </Page>
            ))}
        </Document>
    );
};

export default ViewCart;

