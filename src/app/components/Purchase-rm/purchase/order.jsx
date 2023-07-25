import React, { useEffect, useState, useMemo } from 'react'
import {
    Box,
    TextField,
    Paper,
    Card,
    Button,
    Typography,
    MenuItem,
} from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import { styled } from '@mui/system'
import { useParams, useNavigate } from 'react-router-dom'
import { axiosPurchaseAgent } from '../../../../axios'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

const TextFieldCustOm = styled(TextField)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

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
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { spnNumber, muic } = useParams()
    const [textDisable, setTextDisable] = useState(false)
    const [pageData, setPageData] = useState({})
    const [selectedDate, setSelectedDate] = React.useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axiosPurchaseAgent.post(
                    '/placeOrderScreen/' + spnNumber + '/' + muic
                )
                if (res.status == 200) {
                    setPageData(res.data.data)
                } else {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: res?.data?.message,
                        confirmButtonText: 'Ok',
                    })
                    navigate(-1)
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [])

    const schema = Yup.object().shape({
        brand_name: Yup.string()
            .required('Required*')
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid name')
            .max(40)
            .nullable(),
    })
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
    } = useForm({
        resolver: yupResolver(schema),
    })

    const handleDateChange = (date) => {
        setSelectedDate(date)
    }

    const columns = [
        {
            name: 'index',
            label: (
                <Typography sx={{ fontWeight: 'bold' }} noWrap>
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
            name: 'id',
            label: (
                <Typography sx={{ fontWeight: 'bold' }} noWrap>
                    Vendor ID
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'name',
            label: <Typography sx={{ fontWeight: 'bold' }}>Name</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'category',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Category</Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'address',
            label: <Typography sx={{ fontWeight: 'bold' }}>Address</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'pincode',
            label: <Typography sx={{ fontWeight: 'bold' }}>Pincode</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'mob',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Mobile 1</Typography>
            ),
            options: {
                filter: true,
            },
        },
    ]

    const columns2 = [
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
            name: 'date',
            label: <Typography sx={{ fontWeight: 'bold' }}>Date</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'id',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Vendor ID</Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'qty',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Quantity</Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'price',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Price (Per)</Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'total',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Total Amount
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
    ]

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            let response = await axiosPurchaseAgent.post('/placeOrder', data)
            if (response.status == 200) {
                setLoading(false)

                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Successfully Created',
                    confirmButtonText: 'Ok',
                })
            } else {
                setLoading(false)

                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: response.data.message,
                    showConfirmButton: false,
                })
            }
        } catch (error) {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    }

    /************************************************************************** */
    // const tableExpected = useMemo(() => {
    return (
        <>
            <Container>
                <div className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Requests', path: '/' },
                            { name: 'Order' },
                        ]}
                    />
                </div>
                <Box>
                    <Typography sx={{ fontSize: 'large', fontWeight: 'bold' }}>
                        Place order on request
                    </Typography>
                </Box>
                <br />
                <Box
                    sx={{
                        display: 'inline-flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Card sx={{ width: '45%', height: '50%' }}>
                        <Box
                            sx={{
                                // float: 'left',
                                ml: 2,
                            }}
                        >
                            <h4>Desired spare part & Quantity</h4>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                mb: 2,
                            }}
                        >
                            <Box sx={{ ml: 2 }}>
                                <Typography>
                                    Sare Part Number : {spnNumber}
                                </Typography>
                                <Typography>
                                    Technical Qc :{' '}
                                    {pageData?.findTheSpnDetails?.technical_qc}
                                </Typography>
                                <Typography sx={{ mt: 1 }}>
                                    Request ID :{' '}
                                    {pageData?.purchaseRequest?.request_id?.join(
                                        ','
                                    )}
                                </Typography>
                            </Box>
                            <Box sx={{ mr: 2 }}>
                                <Typography>
                                    Quantity :{' '}
                                    {pageData?.purchaseRequest?.requred_qty}
                                </Typography>
                                <Typography sx={{ mt: 1 }}>
                                    Request date :{' '}
                                    {new Date(
                                        pageData?.purchaseRequest?.request_date
                                    ).toLocaleString('en-GB', {
                                        hour12: true,
                                    })}
                                </Typography>
                            </Box>
                        </Box>
                    </Card>

                    <Card sx={{ width: '53%' }}>
                        <MUIDataTable
                            title={'Vendors'}
                            data={pageData?.vendor}
                            columns={columns}
                            options={{
                                filterType: 'textField',
                                responsive: 'simple',
                                download: false,
                                print: false,
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
                                                    : 1) *
                                                (order === 'desc' ? 1 : -1)
                                            )
                                        }
                                        return (
                                            (a.data[colIndex] < b.data[colIndex]
                                                ? -1
                                                : 1) *
                                            (order === 'desc' ? 1 : -1)
                                        )
                                    })
                                },
                                elevation: 0,
                                rowsPerPageOptions: [10, 20, 40, 80, 100],
                            }}
                        />
                    </Card>
                </Box>

                <Card sx={{ mt: 3 }}>
                    <MUIDataTable
                        title={'Purchase History'}
                        data={pageData?.purchaseHistory}
                        columns={columns2}
                        options={{
                            filterType: 'textField',
                            responsive: 'simple',
                            download: false,
                            print: false,
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
                                                : 1) *
                                            (order === 'desc' ? 1 : -1)
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
                </Card>

                <Card sx={{ p: 2, mt: 3 }}>
                    <Typography
                        sx={{ fontSize: 'large', fontWeight: 'bold', mb: 2 }}
                    >
                        Place Order
                    </Typography>
                    <Box>
                        <TextFieldCustOm
                            label="Select Vendor"
                            select
                            type="text"
                            style={{ width: '200px', marginRight: '20px' }}
                        />

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        style={{
                                            width: '200px',
                                            marginRight: '20px',
                                        }}
                                    />
                                )}
                            />
                        </LocalizationProvider>

                        <TextFieldCustOm
                            label="Unit Price"
                            type="number"
                            style={{ width: '200px', marginRight: '20px' }}
                            {...register('per_unit')}
                            error={errors.per_unit ? true : false}
                            helperText={
                                errors.per_unit ? errors.per_unit?.message : ''
                            }
                        />

                        <TextFieldCustOm
                            label="Total"
                            type="number"
                            {...register('total_price')}
                            error={errors.total_price ? true : false}
                            helperText={
                                errors.total_price
                                    ? errors.total_price?.message
                                    : ''
                            }
                            style={{ width: '200px', marginRight: '20px' }}
                        />

                        <TextFieldCustOm
                            label="Payment Terms"
                            select
                            type="text"
                            style={{ width: '200px', marginRight: '20px' }}
                            {...register('payment_terms')}
                            error={errors.payment_terms ? true : false}
                            helperText={
                                errors.payment_terms
                                    ? errors.payment_terms?.message
                                    : ''
                            }
                        >
                            <MenuItem>Yes</MenuItem>
                            <MenuItem>No</MenuItem>
                        </TextFieldCustOm>

                        <TextFieldCustOm
                            label="Warranty Terms"
                            select
                            type="text"
                            style={{ width: '200px', marginRight: '20px' }}
                            {...register('warranty_terms')}
                            error={errors.warranty_terms ? true : false}
                            helperText={
                                errors.warranty_terms
                                    ? errors.warranty_terms?.message
                                    : ''
                            }
                        >
                            <MenuItem>Yes</MenuItem>
                            <MenuItem>No</MenuItem>
                        </TextFieldCustOm>
                    </Box>
                    <Button
                        sx={{
                            float: 'right',
                            mr: 2,
                            mb: 2,
                        }}
                        variant="contained"
                        disabled={loading}
                        onClick={handleSubmit(onSubmit)}
                        style={{ backgroundColor: 'green' }}
                        component="span"
                        type="submit"
                    >
                        Submit
                    </Button>
                </Card>
            </Container>
        </>
    )
}

export default SimpleMuiTable
