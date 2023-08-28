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
                        '/procurment/view/' + 'Order Placed'
                    )
                    if (res.status == 200) {
                        setIsLoading(false)
                        setData(res.data.data)
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

    const handleChangeSort = ({ target: { name, value } }) => {
        setFilterData({
            ...filterData,
            [name]: value,
        })
        if (name == 'toDate') {
            handelGetVendor(filterData.fromDate, value)
        }
    }
    const dataFilter = async (type) => {
        try {
            setIsLoading(true)
            const res = await axiosPurchaseAgent.post(
                '/placeOrderDateFilter',
                filterData
            )
            if (res.status === 200) {
                setIsLoading(false)
                setData(res.data.data)
                setTotalPrice(res.data.totalPrice)
            }
        } catch (error) {
            alert(error)
        }
    }
    // EXPORT TO EXCEL
    const downloadExcel = (e) => {
        let arr = []
        let i = 1
        for (let x of data) {
            let obj = {
                'Record No': i,
                POID: x.poid,
                'Part Id': x.spn_number,
                Date: new Date(x.placed_date).toLocaleString('en-GB', {
                    hour12: true,
                }),
                'Part Name': x?.partDetails?.[0]?.name,
                'Vendor Id': x.vendor_id,
                Quantity: x.quantity,
                'Price (Per)': x.per_unit,
                'Total Amount': x.total_price,
                'SP WH Box Id': x?.partDetails?.[0]?.box_id,
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
        FileSaver.saveAs(dataDown, 'Order Details of RM' + fileExtension)
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
            name: 'poid',
            label: <Typography sx={{ fontWeight: 'bold' }}>POID</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'spn_number',
            label: <Typography sx={{ fontWeight: 'bold' }}>Part Id</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'partDetails',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Part Name</Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value) => value?.[0]?.name,
            },
        },
        {
            name: 'placed_date',
            label: <Typography sx={{ fontWeight: 'bold' }}>Date</Typography>,
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
            name: 'quantity',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Quantity</Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'per_unit',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Price (Per)</Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'total_price',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Total Amount
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'partDetails',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Box Id
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value) => value?.[0]?.box_id,

            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: 'Order placed', path: '/' }]}
                />
            </div>
            {totalPrice !== '' ? (
                <Box sx={{ mb: 1 }}>
                    <H3>Total Amount : ₹{totalPrice?.toFixed(1)}</H3>
                </Box>
            ) : null}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Box>
                    <TextField
                        type="date"
                        label="From Date"
                        variant="outlined"
                        inputProps={{ max: moment().format('YYYY-MM-DD') }}
                        onChange={(e) => {
                            handleChangeSort(e)
                        }}
                        name="fromDate"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        type="date"
                        label="To Date"
                        name="toDate"
                        inputProps={{
                            min: filterData?.fromDate,
                            max: moment().format('YYYY-MM-DD'),
                        }}
                        disabled={filterData.fromDate == ''}
                        variant="outlined"
                        onChange={(e) => {
                            handleChangeSort(e)
                        }}
                        sx={{ ml: 3 }}
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        label="Select Vendor"
                        select
                        type="text"
                        onChange={(e) => {
                            handleChangeSort(e)
                        }}
                        name="vendors"
                        style={{ width: '200px', marginLeft: '20px' }}
                    >
                        {vendors?.map((data) => (
                            <MenuItem value={data.name}>{data.name}</MenuItem>
                        ))}
                    </TextField>
                    <Button
                        sx={{ ml: 2, mt: 1 }}
                        variant="contained"
                        disabled={
                            (filterData.fromDate == '' &&
                                filterData.toDate == '' &&
                                filterData.vendors == '') ||
                            (filterData.fromDate !== '' &&
                                filterData.toDate == '') ||
                            (filterData.fromDate == '' &&
                                filterData.toDate !== '')
                        }
                        onClick={(e) => {
                            dataFilter('Date')
                        }}
                    >
                        Filter
                    </Button>
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
