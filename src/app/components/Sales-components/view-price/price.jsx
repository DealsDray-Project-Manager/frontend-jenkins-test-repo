import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { Button, Typography, TextField, Box, TableCell } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { axiosSalsAgent, axiospricingAgent } from '../../../../axios'
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
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
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        let admin = localStorage.getItem('prexo-authentication')
        if (admin) {
            setIsLoading(true)
            const { location } = jwt_decode(admin)
            const fetchData = async () => {
                try {
                    let res = await axiosSalsAgent.post(
                        '/viewPrice/' + location
                    )
                    if (res.status === 200) {
                        setIsLoading(false)
                        setItem(res.data.data)
                    }
                } catch (error) {
                    setIsLoading(false)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        confirmButtonText: 'Ok',
                        text: error,
                    })
                }
            }
            fetchData()
        } else {
            navigate('/')
        }
        return () => {
            setIsAlive(false)
            setIsLoading(false)
        }
    }, [isAlive])
    const handelViewItem = (brand, model, grade, date) => {
        navigate(
            '/sales/ready-for-sales/view-units/' +
                brand +
                '/' +
                model +
                '/' +
                grade +
                '/' +
                date
        )
    }

    const download = (e) => {
        let arr = []
        for (let i = 0; i < item.length; i++) {
            let obj = {
                Record_N0: i + 1,
                muic: item[i].muic_one,
                brand_name: item[i]._id.brand,
                model_name: item[i]._id.model,
                units: item[i].itemCount,
                tray_grade: item[i]._id.grade,
                mrp_price: item[i].mrp,
                sp_price: item[i].sp,
            }
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
        const doc = new jsPDF()
        doc.setFontSize(16)
        doc.text('Ready For Sales ', 15, 10)
        const downloadTime = new Date(Date.now()).toLocaleString('en-GB', {
            hour12: true,
        })

        doc.setFontSize(10)
        doc.text(`Downloaded on: ${downloadTime}`, 15, 20)
        const headers = [
            'Record No',
            'MUIC',
            'Brand',
            'Model',
            'Units',
            'Grade',
            'MRP',
            'SP',
        ]
        const data = item.map((item, index) => [
            index + 1,
            item.muic_one,
            item._id.brand,
            item._id.model,
            item.itemCount,
            item._id.grade,
            item.mrp,
            item.sp,
        ])

        doc.autoTable({
            head: [headers],
            body: data,
            startY: 30,
            theme: 'grid',
            showHead: 'firstPage',
        })
        doc.save('ReadyForSales.pdf')
    }

    const columns = [
        {
            name: 'index',
            label: (
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    marginLeft="7px"
                >
                    <>Record No</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 4 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'muicDetails', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Image</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <img
                            height="80px"
                            width="80px"
                            src={
                                value?.[0]?.image == undefined
                                    ? 'https://prexo-v8-5-dev-api.dealsdray.com/product/image/' +
                                      value?.[0]?.vendor_sku_id +
                                      '.jpg'
                                    : value?.[0]?.image
                            }
                        />
                    )
                },
            },
        },
        {
            name: 'muic',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>MUIC</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.[0] || '',
            },
        },
        {
            name: '_id',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Brand</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.brand || '',
            },
        },
        {
            name: '_id',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Model</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.model || '',
            },
        },
        {
            name: 'itemCount',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Units</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return (
                        <Typography
                            style={{
                                textAlign: 'left',
                                marginLeft: '15px',
                                padding: '0',
                            }}
                        >
                            {value}
                        </Typography>
                    )
                },
            },
        },
        {
            name: '_id',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Grade</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => (
                    <Typography
                        style={{
                            textAlign: 'left',
                            marginLeft: '15px',
                            padding: '0',
                        }}
                    >
                        {value?.grade || ''}
                    </Typography>
                ),
            },
        },
        {
            name: 'mrp',
            label: <Typography sx={{ fontWeight: 'bold' }}>MRP</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'sp',
            label: <Typography sx={{ fontWeight: 'bold' }}>SP</Typography>,
            options: {
                filter: true,
                customHeadRender: (columnMeta) => (
                    <TableCell
                        sx={{
                            width: '100px',
                        }}
                    >
                        {columnMeta.label}
                    </TableCell>
                ),
            },
        },
        {
            name: 'price_creation_date',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Creation Date</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    }),
            },
        },
        {
            name: 'price_updation_date',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Updation Date</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    }),
            },
        },
        // {
        //     name: 'code',
        //     label: (
        //         <Typography
        //             variant="subtitle1"
        //             fontWeight="bold"
        //             marginLeft="8px"
        //         >
        //             <>Action</>
        //         </Typography>
        //     ),
        //     options: {
        //         filter: false,
        //         sort: false,
        //         customBodyRender: (value, tableMeta) => {
        //             return (
        //                 <Button
        //                     sx={{
        //                         m: 1,
        //                     }}
        //                     variant="contained"
        //                     onClick={() =>
        //                         handelViewItem(
        //                             tableMeta.rowData[3]?.brand,
        //                             tableMeta.rowData[4]?.model,
        //                             tableMeta.rowData[6]?.grade,
        //                             tableMeta.rowData[9]
        //                         )
        //                     }
        //                     style={{ backgroundColor: 'green' }}
        //                     component="span"
        //                 >
        //                     View
        //                 </Button>
        //             )
        //         },
        //     },
        // },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: 'Ready for sales', path: '/' }]}
                />
            </div>
            <Button
                sx={{ mb: 2 }}
                variant="contained"
                color="success"
                onClick={(e) => download(e)}
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
                title={'Ready for sales'}
                data={item}
                columns={columns}
                options={{
                    filterType: 'textField',
                    responsive: 'simple',
                    download: false,
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
                    // download: false, // set download option
                    // print: false, // set print option
                    // pagination: true, //set pagination option
                    // viewColumns: false, // set column option
                    customSort: (data, colIndex, order) => {
                        const columnProperties = {
                            1: 'muic',
                            2: 'brand',
                            3: 'model',
                            5: 'grade',
                        }

                        const property = columnProperties[colIndex]

                        if (property) {
                            return data.sort((a, b) => {
                                const aPropertyValue = getValueByProperty(
                                    a.data[colIndex],
                                    property
                                )
                                const bPropertyValue = getValueByProperty(
                                    b.data[colIndex],
                                    property
                                )

                                if (
                                    typeof aPropertyValue === 'string' &&
                                    typeof bPropertyValue === 'string'
                                ) {
                                    return (
                                        (order === 'asc' ? 1 : -1) *
                                        aPropertyValue.localeCompare(
                                            bPropertyValue
                                        )
                                    )
                                }

                                return (
                                    (parseFloat(aPropertyValue) -
                                        parseFloat(bPropertyValue)) *
                                    (order === 'desc' ? -1 : 1)
                                )
                            })
                        }

                        return data.sort((a, b) => {
                            const aValue = a.data[colIndex]
                            const bValue = b.data[colIndex]

                            if (aValue === bValue) {
                                return 0
                            }

                            if (aValue === null || aValue === undefined) {
                                return 1
                            }

                            if (bValue === null || bValue === undefined) {
                                return -1
                            }

                            if (
                                typeof aValue === 'string' &&
                                typeof bValue === 'string'
                            ) {
                                return (
                                    (order === 'asc' ? 1 : -1) *
                                    aValue.localeCompare(bValue)
                                )
                            }

                            return (
                                (parseFloat(aValue) - parseFloat(bValue)) *
                                (order === 'desc' ? -1 : 1)
                            )
                        })

                        function getValueByProperty(data, property) {
                            const properties = property.split('.')
                            let value = properties.reduce(
                                (obj, key) => obj?.[key],
                                data
                            )

                            return value !== undefined ? value : ''
                        }
                    },
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            />
        </Container>
    )
}

export default SimpleMuiTable
