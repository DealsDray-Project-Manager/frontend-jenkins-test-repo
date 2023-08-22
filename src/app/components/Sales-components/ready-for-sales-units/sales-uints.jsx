import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect, useRef } from 'react'
import { styled } from '@mui/system'
import { Button, Typography, TextField, Box,IconButton,Icon } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosSalsAgent, axiospricingAgent } from '../../../../axios'
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf';
import 'jspdf-autotable'

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const SimpleMuiTable = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [item, setItem] = useState([])
    const { brand, model, grade, date } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [pdfLoading, setPdfLoading] = useState(false);
    const tableRef = useRef(null);

    useEffect(() => {
        let admin = localStorage.getItem('prexo-authentication');
        if (admin) {
            setIsLoading(true);
            const { location } = jwt_decode(admin);
            const fetchData = async () => {
                try {
                    let obj = {
                        location: location
                    }
                    let res = await axiosSalsAgent.post(
                        '/ReadyForSalesUnits', obj
                    );
                    console.log('Fetched Data:', res.data.data);
                    if (res.status === 200) {
                        setIsLoading(false);
                        setItem(res.data.data);
                    }
                } catch (error) {
                    setIsLoading(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        confirmButtonText: 'Ok',
                        text: error,
                    });
                }
            };
            fetchData();
        } else {
            // navigate('/');
        }
        return () => {
            setIsAlive(false);
            setIsLoading(false);
        };
    }, [isAlive]);


    useEffect(() => { console.log(item) }
        , [item])


    const downloadExcel = (e) => {
        let arr = []
        for (let i = 0; i < item.length; i++) {
            let obj = {
                Record_N0: i + 1,
                uic: item[i].uic,
                muic: item[i].muic,
                brand_name: item[i].brand_name,
                model_name: item[i].model_name,
                tray: item[i].code,
                tray_grade: item[i].tray_grade,
                mrp_price: item[i].mrp_price,
                sp_price: item[i].sp_price,

            };
            arr.push(obj)
        }
        const fileExtension = '.xlsx'
        const fileType =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        const ws = XLSX.utils.json_to_sheet(arr)
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(data, 'Units' + fileExtension)
    }
    
    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Ready For Sales Units", 15, 10);
        const downloadTime = new Date().toLocaleString();
        doc.setFontSize(10);
        doc.text(`Downloaded on: ${downloadTime}`, 15, 20);
        const headers = ['Record No', 'UIC', 'MUIC', 'Brand', 'Model', 'Tray Id', 'Grade', 'MRP', 'SP'];
        const data = item.map((item, index) => [
            index + 1,
            item.uic,
            item.muic,
            item.brand_name,
            item.model_name,
            item.code,
            item.tray_grade,
            item.mrp_price,
            item.sp_price
        ]);
    
        doc.autoTable({
            head: [headers],
            body: data,
            startY: 30,
            theme: "grid",
            showHead: "firstPage",
        });
        doc.save('ReadyForSalesUnits.pdf');
    };
    

    const columns = [
        {
            name: 'index', // Use a unique name for the column
            label: "Record No",
            options: {
                filter: false,
                sort: false,
                display: 'true', // Set this column to always be visible
                customBodyRender: (value, tableMeta, updateValue) => {
                    const rowIndex = tableMeta.rowIndex;
                    return (
                        <Typography sx={{ pl: 4 }}>
                            {rowIndex + 1}
                        </Typography>
                    );
                },
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ pl: 1 }}>
                        Record NO
                    </Typography>
                ),
            },
        },
        {
            name: 'uic',
            label: "UIC",
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        UIC
                    </Typography>
                ),

            },
        },
        {
            name: 'muic',
            label: "MUIC",
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        MUIC
                    </Typography>
                ),


            },
        },
        {
            name: 'brand_name',
            label: "Brand",
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        Brand
                    </Typography>
                ),

            },
        },
        {
            name: 'model_name',
            label: "Model",
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        Model
                    </Typography>
                ),

            },
        },
        {
            name: 'code',
            label: "Tray Id",
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        Tray Id
                    </Typography>
                ),
            },
        },
        {
            name: 'tray_grade',
            label: "Grade",
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        Grade
                    </Typography>
                ),
            },
        },
        {
            name: 'mrp_price',
            label: "MRP",
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        MRP
                    </Typography>
                ),
            },
        },
        {
            name: 'sp_price',
            label: "SP",
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        SP
                    </Typography>
                ),
            },
        },

    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: 'Ready for sales units', path: '/' }]}
                />
            </div>
            <Button
                sx={{ mb: 2 }}
                variant="contained"
                color="success"
                onClick={(e) => downloadExcel(e)}
            >
                Download Excel
            </Button>
            <Button
                sx={{ mb: 2, ml: 2 }}
                variant="contained"
                color="secondary"
                onClick={downloadPDF}
            >
                Download PDF
            </Button>
            <MUIDataTable
                title={'Ready for sales units'}
                data={item}
                columns={columns}
                options={{
                    filterType: 'textField',
                    responsive: 'simple',
                    print: false,
                    textLabels: {
                        body: {
                            noMatch: isLoading
                                ? 'Loading...'
                                : 'Sorry, there is no matching data to display',
                        },
                    },
                    selectableRows: 'none', // set checkbox for each row
                    // search: false, // set search option
                    // filter: false, // set data filter option
                    download: false, // set download option
                    // print: false, // set print option
                    // pagination: true, //set pagination option
                    // viewColumns: false, // set column option
                    // customSort: (data, colIndex, order) => {
                    //     return data.sort((a, b) => {
                    //         if (colIndex === 1) {
                    //             return (
                    //                 (a.data[colIndex].price <
                    //                 b.data[colIndex].price
                    //                     ? -1
                    //                     : 1) * (order === 'desc' ? 1 : -1)
                    //             )
                    //         }
                    //         return (
                    //             (a.data[colIndex] < b.data[colIndex] ? -1 : 1) *
                    //             (order === 'desc' ? 1 : -1)
                    //         )
                    //     })
                    // },
                    customSort: (data, colIndex, order) => {
                        return data.sort((a, b) => {
                            if (colIndex === 1) {
                                return (
                                    (a.data[colIndex].price <
                                        b.data[colIndex].price
                                        ? -1
                                        : 1) * (order === 'desc' ? 1 : -1)
                                )
                            }
                            return (
                                (a.data[colIndex] < b.data[colIndex] ? -1 : 1) *
                                (order === 'desc' ? 1 : -1)
                            )
                        })
                    },
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
                ref={tableRef}
            />
        </Container>
    )
}

export default SimpleMuiTable
