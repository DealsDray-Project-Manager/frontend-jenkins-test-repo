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
    const [pageData, setPageData] = useState({})
    const [totalAmount, setTotalAmount] = useState('')
    const [per_unit, setPer_unit] = useState('')
    const [warrantyAndTerms, setWarrantyAndTerms] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axiosPurchaseAgent.post(
                    '/placeOrderScreen/' + spnNumber + '/' + muic
                )

                if (res.status == 200) {
                    setPageData(res.data.data)
                    let getDrop = await axiosPurchaseAgent.post(
                        '/getWarrantyAndTerms'
                    )
                    if (getDrop.status == 200) {
                        setWarrantyAndTerms(getDrop.data.data)
                    }
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

    useEffect(() => {
        setValue('quantity', pageData?.purchaseRequest?.requred_qty)
    }, [pageData])

    const schema = Yup.object().shape({
        vendor_id: Yup.string().required('Required*').nullable(),
        payment_terms: Yup.string().required('Required*').nullable(),
        warranty_terms: Yup.string().required('Required*').nullable(),
        quantity: Yup.number()
            .min(1, 'Minimum quantity is 1')
            .required('Required*')
            .nullable(),
    })
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
        setValue,
        watch,
    } = useForm({
        resolver: yupResolver(schema),
    })
    const quantityWatch = watch('quantity')

    useEffect(() => {
        setTotalAmount(getValues('quantity') * per_unit)
    }, [quantityWatch])

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
            name: 'vendor_id',
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
            name: 'mobile_one',
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
            name: 'placed_date',
            label: <Typography sx={{ fontWeight: 'bold' }}>Date</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'vendor_id',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Vendor ID</Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'quanitity',
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
    ]

    const onSubmit = async (data) => {
        try {
            console.log(per_unit)
            if (per_unit !== '') {
                data.per_unit = per_unit
                data.muic = muic
                data.total_price = totalAmount
                data.spn_number = spnNumber
                data.placed_date = Date.now()
                setLoading(true)
                let obj = {
                    dataOfOrder: data,
                    muic: muic,
                    spnNumber: spnNumber,
                }

                let response = await axiosPurchaseAgent.post('/placeOrder', obj)
                if (response.status == 200) {
                    setLoading(false)
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: response.data.message,
                        confirmButtonText: 'Ok',
                    })
                    navigate('/purchase-user/purchase')
                } else {
                    setLoading(false)
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: response.data.message,
                        showConfirmButton: false,
                    })
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please check unit price',
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

    const handelCalculateTotal = (value) => {
        setPer_unit(value)
        setTotalAmount(getValues('quantity') * value)
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
                                    Spare Part Number : {spnNumber}
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
                                    Requested Quantity :{' '}
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
                            {...register('vendor_id')}
                            error={errors.vendor_id ? true : false}
                            helperText={
                                errors.vendor_id
                                    ? errors.vendor_id?.message
                                    : ''
                            }
                            style={{ width: '200px', marginRight: '20px' }}
                        >
                            {pageData?.vendor?.map((data) => (
                                <MenuItem value={data.name}>
                                    {data.name}
                                </MenuItem>
                            ))}
                        </TextFieldCustOm>

                        <TextFieldCustOm
                            label="Quantity"
                            type="number"
                            {...register('quantity')}
                            error={errors.quantity ? true : false}
                            helperText={
                                errors.quantity ? errors.quantity?.message : ''
                            }
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onPaste={(e) => {
                                e.preventDefault()
                                return false
                            }}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault()
                                }
                            }}
                            style={{ width: '200px', marginRight: '20px' }}
                        />

                        <TextFieldCustOm
                            label="Unit Price"
                            type="text"
                            style={{ width: '200px', marginRight: '20px' }}
                            onChange={(e) => {
                                handelCalculateTotal(e.target.value)
                            }}
                            onPaste={(e) => {
                                e.preventDefault()
                                return false
                            }}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault()
                                }
                            }}
                        />

                        <TextFieldCustOm
                            label="Total"
                            type="number"
                            value={totalAmount}
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
                            {warrantyAndTerms?.payments?.map((data) => (
                                <MenuItem value={data.name}>
                                    {data.name}
                                </MenuItem>
                            ))}
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
                            {warrantyAndTerms?.warranty?.map((data) => (
                                <MenuItem value={data.name}>
                                    {data.name}
                                </MenuItem>
                            ))}
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
