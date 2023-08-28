import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { H1, H3, H4 } from 'app/components/Typography'
import jwt_decode from 'jwt-decode'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import {
    Button,
    Typography,
    Card,
    Box,
    TextField,
    MenuItem,
} from '@mui/material'
import Swal from 'sweetalert2'
import moment from 'moment'
import {
    axiosPurchaseAgent,
    axiosSpMisAgent,
    axiosSuperAdminPrexo,
} from '../../../../axios'

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
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [vendors, setVendors] = useState([])
    const [totalPrice, setTotalPrice] = useState('')
    const [filterData, setFilterData] = useState({
        fromDate: '',
        toDate: '',
        vendors: '',
    })

    useEffect(() => {
        try {
            const fetchData = async () => {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    setIsLoading(true)
                    let { location } = jwt_decode(admin)
                    let res = await axiosPurchaseAgent.post(
                        '/procurementOrderSummary'
                    )
                    if (res.status == 200) {
                        setIsLoading(false)
                        setData(res.data.data)
                        setTotalPrice(res.data.totalAmount)
                    }
                } else {
                    navigate('/')
                }
            }
            fetchData()
        } catch (error) {
            setIsLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Ok',
                text: error,
            })
        }
    }, [])

    // EXPORT TO EXCEL
    const downloadExcel = (e) => {
        let arr = []
        let i = 1
        for (let x of data) {
            let obj = {
                'Record No': i,
                'Last Order Placed Date': new Date(
                    x.last_placed_date
                ).toLocaleString('en-GB', {
                    hour12: true,
                }),
                'Vendor Name': x.vendor_id,
                'Total Purchase Value': x?.total_price,
                'Total Purchase Qty': x.quantity,
            }
            arr.push(obj)
            i++
        }
        const fileExtension = '.xlsx'
        const fileType =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        const ws = XLSX.utils.json_to_sheet(arr)
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const dataDown = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(dataDown, 'Order Summary of RM' + fileExtension)
    }

    // HANDEL GET VENDOR
    const handelGetVendor = async (fromDate, toDate) => {
        let obj = {
            fromDate: fromDate,
            toDate: toDate,
        }
        const res = await axiosPurchaseAgent.post(
            '/vendorMasterforDrp/view',
            obj
        )
        if (res.status == 200) {
            setVendors(res.data.data)
        }
    }

    const columns = [
        {
            name: 'index',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 2 }}>
                    Record No
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 4 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'last_placed_date',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Last Order Placed Date
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },
        {
            name: 'vendor_id',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Vendor Name</Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'total_price',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Total Purchase Value
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'quantity',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Total Purchase Qty
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: 'Order Summary', path: '/' }]}
                />
            </div>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Box>
                    {totalPrice !== '' ? (
                        <Box sx={{ mb: 1 }}>
                            <H3>Total Amount : ₹{totalPrice?.toFixed(1)}</H3>
                        </Box>
                    ) : null}
                </Box>
                <Box>
                    <Button
                        sx={{ mb: 2 }}
                        variant="contained"
                        color="success"
                        onClick={(e) => downloadExcel(e)}
                    >
                        Download Excel
                    </Button>
                </Box>
            </Box>
            <Card sx={{ mt: 1 }}>
                <MUIDataTable
                    title={'Order details'}
                    data={data}
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
                                    (a.data[colIndex] < b.data[colIndex]
                                        ? -1
                                        : 1) * (order === 'desc' ? 1 : -1)
                                )
                            })
                        },
                        elevation: 0,
                        rowsPerPageOptions: [10, 20, 40, 80, 100],
                    }}
                />
                <br />
            </Card>
        </Container>
    )
}

export default SimpleMuiTable
