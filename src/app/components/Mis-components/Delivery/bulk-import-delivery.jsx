import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    TextField,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Box, styled } from '@mui/system'
import { SimpleCard, Breadcrumb } from 'app/components'
import { useNavigate } from 'react-router-dom'
import DoneIcon from '@mui/icons-material/Done'
import ClearIcon from '@mui/icons-material/Clear'
import jwt_decode from 'jwt-decode'
import * as XLSX from 'xlsx'
import { axiosMisUser } from '../../../../axios'
import CircularProgress from '@mui/material/CircularProgress'
import moment from 'moment'
import Swal from 'sweetalert2'

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

const StyledLoading = styled('div')(() => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& img': {
        width: 'auto',
        height: '25px',
    },
    '& .circleProgress': {
        position: 'absolute',
        left: -7,
        right: 0,
        top: 'calc(50% - 25px)',
    },
}))

const ProductTable = styled(Table)(() => ({
    minWidth: 750,
    width: 3000,
    whiteSpace: 'pre',
    '& thead': {
        '& th:first-of-type': {
            paddingLeft: 16,
        },
    },
    '& td': {
        borderBottom: '1px solid #ddd',
    },
    '& td:first-of-type': {
        paddingLeft: '16px !important',
    },
}))

const PaginationTable = () => {
    const navigate = useNavigate()
    const [validate, setValidate] = useState(false)
    const [loading, setLoading] = useState(false)
    const [deliveryData, setDeliveryDate] = useState('')
    const [err, setErr] = useState({})
    const [item, setItem] = useState([])
    const [exFile, setExfile] = useState(null)
    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
        item: [],
        totalPage: 0,
    })
    const [fileExt, setFileExt] = useState('')
    const { format, isValid, parse } = require('date-fns')

    const importExcel = () => {
        if (exFile == null) {
            Swal.fire({
                position: 'top-center',
                icon: 'warning',
                title: 'Please Select a File',
                confirmButtonText: 'Ok',
            })
        } else {
            setLoading(true)
            readExcel(exFile)
        }
    }
    useEffect(() => {
        setItem((_) =>
            pagination.item
                .slice(
                    (pagination.page - 1) * pagination.size,
                    pagination.page * pagination.size
                )
                .map((d, index) => {
                    d.id = (pagination.page - 1) * pagination.size + index + 1
                    return d
                })
        )
    }, [pagination.page, pagination.item])
    const readExcel = async (file) => {
        let aa = file
        const promise = new Promise((resolve, reject) => {
            const filReader = new FileReader()
            filReader.readAsArrayBuffer(file)
            filReader.onload = (e) => {
                const bufferArray = e.target.result
                const wb = XLSX.read(bufferArray, {
                    cellDates: true,
                })
                const wsname = wb.SheetNames[0]
                const ws = wb.Sheets[wsname]
                const data = XLSX.utils.sheet_to_json(ws, { raw: false })
                resolve(data)
            }
            filReader.onerror = (error) => {
                reject(error)
            }
        })
        const data = await promise
        setPagination((p) => ({
            ...p,
            page: 1,
            item: data.map((d, index) => toLowerKeys(d, index)),
            totalPage: Math.ceil(data.length / p.size),
        }))
        setLoading(false)
    }
    function toLowerKeys(obj, id) {
        return Object.keys(obj).reduce((accumulator, key) => {
            accumulator.created_at = Date.now()
            accumulator[key.toLowerCase().split(' ').join('_')] = obj[key]
            accumulator.delet_id = id
            if (key == 'Order Date') {
                if (accumulator.order_date?.includes('-')) {
                    // Date is in "DD-MM-YYYY" format
                    const [day, month, year] =
                        accumulator.order_date?.split('-')
                    const formattedDateStr = `${month}/${day}/${year}`
                    accumulator.order_date = new Date(formattedDateStr)
                } else {
                    // Date is in "MM/DD/YYYY" format
                    if (fileExt == 'csv') {
                        const parsedDate = parse(
                            accumulator.order_date,
                            'MM/dd/yyyy',
                            new Date()
                        )

                        if (isValid(parsedDate)) {
                            accumulator.order_date = format(
                                parsedDate,
                                'dd/MM/yyyy'
                            )
                        } else {
                            console.error(
                                'Invalid date:',
                                accumulator.order_date
                            )
                            // Handle the invalid date case here
                            accumulator.order_date = accumulator.order_date
                        }
                    } else {
                        const parsedDate = parse(
                            accumulator.order_date,
                            'MM/dd/yyyy HH:mm:ss',
                            new Date()
                        )

                        if (isValid(parsedDate)) {
                            accumulator.order_date = format(
                                parsedDate,
                                'dd/MM/yyyy HH:mm:ss'
                            )
                        } else {
                            console.error(
                                'Invalid date:',
                                accumulator.order_date
                            )
                            // Handle the invalid date case here
                            accumulator.order_date = accumulator.order_date
                        }
                    }
                }
            }
            if (
                key === 'Delivery Date' &&
                accumulator.delivery_date != undefined
            ) {
                accumulator.delivery_date = forDateFormat(
                    accumulator?.delivery_date
                )
            }
            return accumulator
        }, {})
    }

    const forDateFormat = (field) => {
        if (field?.includes('-')) {
            // Timestamp is in "DD-MM-YYYY HH:mm:ss" format
            const [datePart, timePart] = field?.split(' ')
            const [day, month, year] = datePart?.split('-')
            let formattedTimestampStr
            if (timePart) {
                const [hours, minutes, seconds] = timePart?.split(':')
                if (seconds) {
                    formattedTimestampStr = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`
                } else {
                    formattedTimestampStr = `${month}/${day}/${year} ${hours}:${minutes}`
                }
            } else {
                formattedTimestampStr = `${month}/${day}/${year}`
            }
            return new Date(formattedTimestampStr)
        } else {
            const parsedDate = parse(field, 'MM/dd/yyyy', new Date())
            if (isValid(parsedDate)) {
                return format(parsedDate, 'dd/MM/yyyy')
            } else {
                console.error('Invalid date:', field)
                // Handle the invalid date case here
                return field
            }
        }
    }

    const handelSubmit = async () => {
        try {
            setLoading(true)
            let obj = {
                validItem: [],
                invalidItem: [],
            }
            pagination.item.forEach((data) => {
                data.delivery_date = deliveryData

                data.reason = []
                if (data?.base_discount !== undefined) {
                    data.base_discount = data.base_discount.toString()
                }
                if (data?.partner_purchase_price !== undefined) {
                    data.partner_purchase_price =
                        data.partner_purchase_price.toString()
                }
                if (data?.diagnostics_discount !== undefined) {
                    data.diagnostics_discount =
                        data.diagnostics_discount.toString()
                }
                if (data?.storage_discount !== undefined) {
                    data.storage_discount = data.storage_discount.toString()
                }

                if (
                    err?.delivery_date?.includes(data?.order_date) ||
                    data?.order_date == undefined ||
                    data?.order_date == ''
                ) {
                    data.reason.push('Order date does not exists')
                }
                if (
                    err?.duplicate_tracking_id?.includes(data?.tracking_id) ||
                    data?.tracking_id == undefined ||
                    data?.tracking_id == ''
                ) {
                    data.reason.push(
                        'Tracking id is empty or duplicate tracking id'
                    )
                }
                if (err?.tracking_id_digit?.includes(data?.tracking_id)) {
                    data.reason.push('Tracking Id Must Be 12 Digits')
                }
                if (
                    err?.duplicate_order_id_found?.includes(data?.order_id) ||
                    data?.order_id == undefined ||
                    data?.order_id == ''
                ) {
                    data.reason.push('Duplicate order id or order id is empty')
                }
                if (err?.no_orders?.includes(data?.order_id)) {
                    data.reason.push('Order not found')
                }
                if (
                    err?.item_does_not_exist?.includes(data?.item_id) ||
                    data?.item_id == undefined ||
                    data?.item_id == ''
                ) {
                    data.reason.push('Item does not exitsts')
                }
                if (
                    err?.location_does_not_exist?.includes(
                        data?.partner_shop
                    ) ||
                    data?.partner_shop == undefined ||
                    data?.partner_shop == ''
                ) {
                    data.reason.push('Partner shop does not exitsts')
                }

                if (
                    err?.delivery_date?.includes(data?.order_date) ||
                    data?.order_date == undefined ||
                    data?.order_date == ''
                ) {
                    obj.invalidItem.push(data)
                } else if (
                    err?.duplicate_tracking_id?.includes(data?.tracking_id) ||
                    data?.tracking_id == undefined ||
                    data?.tracking_id == ''
                ) {
                    obj.invalidItem.push(data)
                } else if (
                    err?.tracking_id_digit?.includes(data?.tracking_id)
                ) {
                    obj.invalidItem.push(data)
                } else if (
                    err?.duplicate_order_id_found?.includes(data?.order_id) ||
                    data?.order_id == undefined ||
                    data?.order_id == ''
                ) {
                    obj.invalidItem.push(data)
                } else if (err?.no_orders?.includes(data?.order_id)) {
                    obj.invalidItem.push(data)
                } else if (
                    err?.item_does_not_exist?.includes(data?.item_id) ||
                    data?.item_id == undefined ||
                    data?.item_id == ''
                ) {
                    obj.invalidItem.push(data)
                } else if (
                    err?.location_does_not_exist?.includes(
                        data?.partner_shop
                    ) ||
                    data?.partner_shop == undefined ||
                    data?.partner_shop == ''
                ) {
                    obj.invalidItem.push(data)
                } else {
                    obj.validItem.push(data)
                }
            })

            let res = await axiosMisUser.post('/importDelivery', obj)
            if (res.status == 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                setLoading(false)
                navigate('/mis/delivery')
            } else {
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Ok',
                text: error,
            })
        }
    }
    const handelValidate = async () => {
        try {
            if (deliveryData == '') {
                Swal.fire({
                    position: 'top-center',
                    icon: 'warning',
                    title: 'Please Select The Date',
                    confirmButtonText: 'Ok',
                })
            } else {
                setLoading(true)
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let obj = {
                        item: pagination.item,
                        location: location,
                    }

                    let res = await axiosMisUser.post(
                        '/bulkValidationDelivery',
                        obj
                    )
                    if (res.status == 200) {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: res?.data?.message,
                            confirmButtonText: 'Ok',
                        })
                        setErr({})
                        setLoading(false)
                        setValidate(true)
                    } else {
                        setErr(res.data.data)

                        Swal.fire({
                            position: 'top-center',
                            icon: 'error',
                            title: 'Please Check Errors',
                            confirmButtonText: 'Ok',
                        })
                        setLoading(false)
                        setValidate(true)
                    }
                }
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Ok',
                text: error,
            })
        }
    }
    // ----------------------------------------------------------------------------------------------------------------------------
    const updateFieldChanged = (delet_id) => (e) => {
        setValidate(false)
        setPagination((p) => ({
            ...p,
            item: pagination.item.map((data, i) => {
                if (data.delet_id === delet_id) {
                    return { ...data, [e.target.name]: e.target.value }
                } else {
                    return data
                }
            }),
        }))
    }
    // DATA DELETE FROM ARRAY
    const handelDelete = (delet_id) => {
        setValidate(false)
        setPagination((p) => ({
            ...p,
            item: pagination.item.filter((item) => item.delet_id != delet_id),
        }))
    }

    const addFileData = (fileData) => {
        if (fileData?.type === 'text/csv' || fileData?.type === "application/vnd.ms-excel" ) {
            setExfile(fileData)
            const fileName = fileData.name
            const fileExtension = fileName.split('.').pop() // Get the last part as the extension

            setFileExt(fileExtension)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                confirmButtonText: 'Ok',
                text: 'Please select a CSV file',
            })
        }
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Delivery', path: '/' },
                        { name: 'Bulk Delivery', path: '/' },
                    ]}
                />
            </div>
            <SimpleCard title="Bulk Delivery">
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <h4>Upload file</h4>
                    <Box>
                        <Button
                            sx={{ mb: 2 }}
                            variant="contained"
                            color="secondary"
                            onClick={() => navigate('/mis/delivery')}
                        >
                            Back to list
                        </Button>
                        <Button
                            sx={{ mb: 2, ml: 2 }}
                            variant="contained"
                            color="primary"
                            href={
                                process.env.PUBLIC_URL +
                                '/bulk-delivery-sheet-sample.xlsx'
                            }
                            download
                        >
                            Download Sample Sheet
                        </Button>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        mb: 5,
                    }}
                >
                    <TextField
                        size="small"
                        variant="outlined"
                        type="file"
                        inputProps={{ accept: '.csv' }}
                        onChange={(e) => {
                            addFileData(e.target.files[0])
                        }}
                    />
                    <TextField
                        size="small"
                        sx={{ mt: 2, width: '300px' }}
                        onChange={(e) => {
                            setDeliveryDate(e.target.value)
                        }}
                        inputProps={{
                            max: moment().format('YYYY-MM-DD'),
                        }}
                        variant="outlined"
                        type="date"
                    />
                    {item.length == 0 ? (
                        <Button
                            variant="contained"
                            sx={{ mt: 3, mb: 1 }}
                            disabled={loading}
                            onClick={(e) => {
                                importExcel(e)
                            }}
                        >
                            Import
                        </Button>
                    ) : validate ? (
                        <Button
                            variant="contained"
                            sx={{ mt: 3, mb: 1 }}
                            disabled={loading}
                            style={{ backgroundColor: '#206CE2' }}
                            onClick={(e) => {
                                handelSubmit(e)
                            }}
                        >
                            Submit
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            sx={{ mt: 3, mb: 1 }}
                            disabled={loading}
                            style={{ backgroundColor: '#206CE2' }}
                            onClick={(e) => {
                                handelValidate(e)
                            }}
                        >
                            Validate Data
                        </Button>
                    )}
                </Box>
                <>
                    {item.length != 0 && loading !== true ? (
                        <>
                            <Box
                                sx={{ maxHeight: '100%', overflow: 'auto' }}
                                elevation={6}
                            >
                                <ProductTable>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>S.NO</TableCell>
                                            <TableCell>Tracking ID</TableCell>
                                            <TableCell>Order ID</TableCell>
                                            <TableCell>Order Date</TableCell>
                                            <TableCell>Item ID</TableCell>
                                            <TableCell>GEP Order</TableCell>
                                            <TableCell>IMEI</TableCell>
                                            <TableCell>
                                                Partner Purchase Price
                                            </TableCell>
                                            <TableCell>Partner Shop</TableCell>
                                            <TableCell>Base Discount</TableCell>
                                            <TableCell>
                                                Diagnostics Discount
                                            </TableCell>
                                            <TableCell>
                                                Storage Disscount
                                            </TableCell>
                                            <TableCell>
                                                Buyback Category
                                            </TableCell>
                                            <TableCell>
                                                Doorsteps Diagnostics
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {item.map((data, index) => (
                                            <TableRow tabIndex={-1}>
                                                <TableCell>{data.id}</TableCell>
                                                <TableCell>
                                                    <TextField
                                                        onChange={updateFieldChanged(
                                                            data.delet_id
                                                        )}
                                                        id="outlined-password-input"
                                                        type="text"
                                                        name="tracking_id"
                                                        value={data.tracking_id?.toString()}
                                                        inputProps={{
                                                            style: {
                                                                width: 'auto',
                                                            },
                                                        }}
                                                    />
                                                    {err?.duplicate_tracking_id?.includes(
                                                        data.tracking_id
                                                    ) ||
                                                    err?.tracking_id_digit?.includes(
                                                        data.tracking_id
                                                    ) ||
                                                    (Object.keys(err).length !=
                                                        0 &&
                                                        data.tracking_id ==
                                                            undefined) ||
                                                    (Object.keys(err).length !=
                                                        0 &&
                                                        data.tracking_id ==
                                                            '') ? (
                                                        <ClearIcon
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                        />
                                                    ) : Object.keys(err)
                                                          .length != 0 ? (
                                                        <DoneIcon
                                                            style={{
                                                                color: 'green',
                                                            }}
                                                        />
                                                    ) : (
                                                        ''
                                                    )}
                                                    {err?.duplicate_tracking_id?.includes(
                                                        data.tracking_id
                                                    ) ? (
                                                        <p
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                        >
                                                            Duplicate Tracking
                                                            ID
                                                        </p>
                                                    ) : err?.tracking_id_digit?.includes(
                                                          data.tracking_id
                                                      ) ? (
                                                        <p
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                        >
                                                            Tracking Id Must Be
                                                            12 Digits
                                                        </p>
                                                    ) : (Object.keys(err)
                                                          .length != 0 &&
                                                          data.tracking_id ==
                                                              undefined) ||
                                                      (Object.keys(err)
                                                          .length != 0 &&
                                                          data.tracking_id ==
                                                              '') ? (
                                                        <p
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                        >
                                                            Tracking Id Does Not
                                                            Exist
                                                        </p>
                                                    ) : (
                                                        ''
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        onChange={updateFieldChanged(
                                                            data.delet_id
                                                        )}
                                                        id="outlined-password-input"
                                                        type="text"
                                                        name="order_id"
                                                        value={data.order_id?.toString()}
                                                        inputProps={{
                                                            style: {
                                                                width: 'auto',
                                                            },
                                                        }}
                                                    />
                                                    {err?.duplicate_order_id_found?.includes(
                                                        data.order_id
                                                    ) ||
                                                    err?.no_orders?.includes(
                                                        data.order_id
                                                    ) ||
                                                    (Object.keys(err).length !=
                                                        0 &&
                                                        data.order_id ==
                                                            undefined) ||
                                                    (Object.keys(err).length !=
                                                        0 &&
                                                        data.order_id == '') ? (
                                                        <ClearIcon
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                        />
                                                    ) : Object.keys(err)
                                                          .length != 0 ? (
                                                        <DoneIcon
                                                            style={{
                                                                color: 'green',
                                                            }}
                                                        />
                                                    ) : (
                                                        ''
                                                    )}
                                                    {err?.duplicate_order_id_found?.includes(
                                                        data.order_id
                                                    ) ? (
                                                        <p
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                        >
                                                            Duplicate Order Id
                                                            Found
                                                        </p>
                                                    ) : (Object.keys(err)
                                                          .length != 0 &&
                                                          data?.order_id ==
                                                              undefined) ||
                                                      (Object.keys(err)
                                                          .length != 0 &&
                                                          data.order_id ==
                                                              '') ? (
                                                        <p
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                        >
                                                            Order Id Does Not
                                                            Exist
                                                        </p>
                                                    ) : err?.no_orders?.includes(
                                                          data.order_id
                                                      ) ? (
                                                        <p
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                        >
                                                            Order not found
                                                        </p>
                                                    ) : null}
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        onChange={updateFieldChanged(
                                                            data.delet_id
                                                        )}
                                                        id="outlined-password-input"
                                                        type="text"
                                                        name="order_date"
                                                        value={
                                                            data?.order_date !==
                                                                undefined &&
                                                            data?.order_date !==
                                                                '' &&
                                                            !isNaN(
                                                                new Date(
                                                                    data?.order_date
                                                                )
                                                            )
                                                                ? new Date(
                                                                      data?.order_date
                                                                  ).toLocaleString(
                                                                      'en-GB',
                                                                      {
                                                                          year: 'numeric',
                                                                          month: '2-digit',
                                                                          day: '2-digit',
                                                                      }
                                                                  )
                                                                : ''
                                                        }
                                                        inputProps={{
                                                            style: {
                                                                width: 'auto',
                                                            },
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        onChange={updateFieldChanged(
                                                            data.delet_id
                                                        )}
                                                        id="outlined-password-input"
                                                        type="text"
                                                        name="item_id"
                                                        value={data.item_id?.toString()}
                                                        inputProps={{
                                                            style: {
                                                                width: 'auto',
                                                            },
                                                        }}
                                                    />
                                                    {err?.item_does_not_exist?.includes(
                                                        data.item_id
                                                    ) ||
                                                    (Object.keys(err).length !=
                                                        0 &&
                                                        data?.item_id ==
                                                            undefined) ||
                                                    (Object.keys(err).length !=
                                                        0 &&
                                                        data?.item_id == '') ? (
                                                        <ClearIcon
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                        />
                                                    ) : Object.keys(err)
                                                          .length != 0 ? (
                                                        <DoneIcon
                                                            style={{
                                                                color: 'green',
                                                            }}
                                                        />
                                                    ) : (
                                                        ''
                                                    )}
                                                    {err?.item_does_not_exist?.includes(
                                                        data.item_id
                                                    ) ? (
                                                        <p
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                        >
                                                            Item Does Not Exist
                                                        </p>
                                                    ) : (Object.keys(err)
                                                          .length != 0 &&
                                                          data?.item_id ==
                                                              undefined) ||
                                                      (Object.keys(err)
                                                          .length != 0 &&
                                                          data?.item_id ==
                                                              '') ? (
                                                        <p
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                        >
                                                            Item Does Not Exist
                                                        </p>
                                                    ) : (
                                                        ''
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        onChange={updateFieldChanged(
                                                            data.delet_id
                                                        )}
                                                        id="outlined-password-input"
                                                        type="text"
                                                        name="gep_order"
                                                        value={data.gep_order?.toString()}
                                                        inputProps={{
                                                            style: {
                                                                width: 'auto',
                                                            },
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        onChange={updateFieldChanged(
                                                            data.delet_id
                                                        )}
                                                        id="outlined-password-input"
                                                        type="text"
                                                        name="imei"
                                                        value={data.imei?.toString()}
                                                        inputProps={{
                                                            style: {
                                                                width: 'auto',
                                                            },
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        onChange={updateFieldChanged(
                                                            data.delet_id
                                                        )}
                                                        id="outlined-password-input"
                                                        type="text"
                                                        name="partner_purchase_price"
                                                        value={data.partner_purchase_price?.toString()}
                                                        inputProps={{
                                                            style: {
                                                                width: 'auto',
                                                            },
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        onChange={updateFieldChanged(
                                                            data.delet_id
                                                        )}
                                                        id="outlined-password-input"
                                                        type="text"
                                                        name="partner_shop"
                                                        value={data.partner_shop?.toString()}
                                                        inputProps={{
                                                            style: {
                                                                width: 'auto',
                                                            },
                                                        }}
                                                    />
                                                    {err?.location_does_not_exist?.includes(
                                                        data.partner_shop
                                                    ) ||
                                                    (Object.keys(err).length !=
                                                        0 &&
                                                        data?.partner_shop ==
                                                            undefined) ||
                                                    (Object.keys(err).length !=
                                                        0 &&
                                                        data?.partner_shop ==
                                                            '') ? (
                                                        <ClearIcon
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                        />
                                                    ) : Object.keys(err)
                                                          .length != 0 ? (
                                                        <DoneIcon
                                                            style={{
                                                                color: 'green',
                                                            }}
                                                        />
                                                    ) : (
                                                        ''
                                                    )}
                                                    {err?.location_does_not_exist?.includes(
                                                        data.partner_shop
                                                    ) ? (
                                                        <p
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                        >
                                                            You Can't Add This
                                                            Data
                                                        </p>
                                                    ) : (Object.keys(err)
                                                          .length != 0 &&
                                                          data?.partner_shop ==
                                                              undefined) ||
                                                      (Object.keys(err)
                                                          .length != 0 &&
                                                          data?.partner_shop ==
                                                              '') ? (
                                                        <p
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                        >
                                                            Location Does Not
                                                            Exist
                                                        </p>
                                                    ) : (
                                                        ''
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        onChange={updateFieldChanged(
                                                            data.delet_id
                                                        )}
                                                        id="outlined-password-input"
                                                        type="text"
                                                        name="base_discount"
                                                        value={data.base_discount?.toString()}
                                                        inputProps={{
                                                            style: {
                                                                width: 'auto',
                                                            },
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        onChange={updateFieldChanged(
                                                            data.delet_id
                                                        )}
                                                        id="outlined-password-input"
                                                        type="text"
                                                        name="diagnostics_discount"
                                                        value={data.diagnostics_discount?.toString()}
                                                        inputProps={{
                                                            style: {
                                                                width: 'auto',
                                                            },
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        onChange={updateFieldChanged(
                                                            data.delet_id
                                                        )}
                                                        id="outlined-password-input"
                                                        type="text"
                                                        name="storage_disscount"
                                                        value={data.storage_disscount?.toString()}
                                                        inputProps={{
                                                            style: {
                                                                width: 'auto',
                                                            },
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        onChange={updateFieldChanged(
                                                            data.delet_id
                                                        )}
                                                        id="outlined-password-input"
                                                        type="text"
                                                        name="buyback_category"
                                                        value={data.buyback_category?.toString()}
                                                        inputProps={{
                                                            style: {
                                                                width: 'auto',
                                                            },
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        onChange={updateFieldChanged(
                                                            data.delet_id
                                                        )}
                                                        id="outlined-password-input"
                                                        type="text"
                                                        name="doorsteps_diagnostics"
                                                        value={data.doorsteps_diagnostics?.toString()}
                                                        inputProps={{
                                                            style: {
                                                                width: 'auto',
                                                            },
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {(Object.keys(err).length !=
                                                        0 &&
                                                        data?.tracking_id ==
                                                            '') ||
                                                    err?.no_orders?.includes(
                                                        data.order_id
                                                    ) ||
                                                    (Object.keys(err).length !=
                                                        0 &&
                                                        data?.order_id == '') ||
                                                    (Object.keys(err).length !=
                                                        0 &&
                                                        data?.item_id == '') ||
                                                    (Object.keys(err).length !=
                                                        0 &&
                                                        data?.partner_shop ==
                                                            '') ||
                                                    err?.duplicate_tracking_id?.includes(
                                                        data.tracking_id
                                                    ) == true ||
                                                    (Object.keys(err).length !=
                                                        0 &&
                                                        data?.tracking_id ==
                                                            undefined) ||
                                                    err?.duplicate_order_id_found?.includes(
                                                        data.order_id
                                                    ) == true ||
                                                    (Object.keys(err).length !=
                                                        0 &&
                                                        data?.order_id ==
                                                            undefined) ||
                                                    err?.item_does_not_exist?.includes(
                                                        data.item_id
                                                    ) == true ||
                                                    (Object.keys(err).length !=
                                                        0 &&
                                                        data.item_id ==
                                                            undefined) ||
                                                    err?.location_does_not_exist?.includes(
                                                        data.partner_shop
                                                    ) == true ||
                                                    (Object.keys(err).length !=
                                                        0 &&
                                                        data.partner_shop ==
                                                            undefined) ? (
                                                        <Button
                                                            sx={{
                                                                ml: 2,
                                                            }}
                                                            variant="contained"
                                                            style={{
                                                                backgroundColor:
                                                                    'red',
                                                            }}
                                                            component="span"
                                                            onClick={() => {
                                                                if (
                                                                    window.confirm(
                                                                        'You Want to Remove?'
                                                                    )
                                                                ) {
                                                                    handelDelete(
                                                                        data.delet_id
                                                                    )
                                                                }
                                                            }}
                                                        >
                                                            Remove
                                                        </Button>
                                                    ) : (
                                                        ''
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </ProductTable>
                            </Box>
                            {pagination.item.length != 0 ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'end',
                                        mt: 1,
                                        mr: 3,
                                        ml: 3,
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        sx={{ m: 1 }}
                                        disabled={pagination.page === 1}
                                        style={{ backgroundColor: '#206CE2' }}
                                        onClick={(e) =>
                                            setPagination((p) => ({
                                                ...p,
                                                page: --p.page,
                                            }))
                                        }
                                    >
                                        Previous
                                    </Button>

                                    <h6 style={{ marginTop: '19px' }}>
                                        {pagination.page}/{pagination.totalPage}
                                    </h6>
                                    <Button
                                        variant="contained"
                                        sx={{ m: 1 }}
                                        disabled={
                                            pagination.page ===
                                            pagination.totalPage
                                        }
                                        style={{ backgroundColor: '#206CE2' }}
                                        onClick={(e) =>
                                            setPagination((p) => ({
                                                ...p,
                                                page: ++p.page,
                                            }))
                                        }
                                    >
                                        Next
                                    </Button>
                                </Box>
                            ) : null}
                        </>
                    ) : item.length != 0 ? (
                        <StyledLoading>
                            <Box position="relative">
                                <img
                                    src="/assets/images/logo-circle.svg"
                                    alt=""
                                />
                                <CircularProgress className="circleProgress">
                                    <p>Please Wait...</p>
                                </CircularProgress>
                            </Box>
                        </StyledLoading>
                    ) : null}
                </>
            </SimpleCard>
        </Container>
    )
}

export default PaginationTable
