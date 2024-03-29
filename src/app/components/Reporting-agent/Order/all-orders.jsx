import { Breadcrumb } from 'app/components'
import React, { useState, useEffect, useMemo } from 'react'
import { styled } from '@mui/system'

import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Card,
    MenuItem,
    Box,
    Button,
    TextField,
    Typography,
} from '@mui/material'
import moment from 'moment'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import jwt_decode from 'jwt-decode'
import { axiosMisUser, axiosReportingAgent } from '../../../../axios'
import { DatePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import '../../../../app.css'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

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

const ScrollableTableContainer = styled(TableContainer)`
    overflow-x: auto;
`

const SimpleMuiTable = () => {
    const [stateForFilterUn, setFilterUn] = useState(false)
    const [count, setCount] = useState(0)
    const [dataForDownload, setDataForDownload] = useState([])
    const [isAlive, setIsAlive] = useState(true)
    const [rowsPerPage, setRowsPerPage] = useState(50)
    const [page, setPage] = useState(0)
    const [orderCount, setOrderCount] = useState(0)
    const [data, setData] = useState([])
    const [item, setItem] = useState([])
    const [lastOrderDate, setLastOrderDate] = useState('')
    const [location, setLocation] = useState('')
    const [displayText, setDisplayText] = useState('')
    const [searchType, setSearchType] = useState('')
    const [filterData, setFilterData] = useState({
        fromDate: '',
        toDate: '',
    })
    const [search, setSearch] = useState({
        type: '',
        searchData: '',
        location: '',
    })

    const handleChangeSort = ({ target: { name, value } }) => {
        setFilterData({
            ...filterData,
            [name]: value,
        })
    }

    const navigate = useNavigate()
    const [inputSearch, setInputSearch] = useState('')
    const [refresh, setRefresh] = useState(false)

    const download = (e) => {
        let arr = []
        for (let x of dataForDownload) {
            let obj = {
                'Delivery Status': x?.delivery_status,
                'Order Imported TimeStamp': new Date(
                    x?.created_at
                ).toLocaleString('en-GB', {
                    hour12: true,
                }),
            }
            obj['Order ID'] = x?.order_id
            if (x?.order_date !== undefined && x?.order_date !== null) {
                obj['Order Date'] = new Date(x?.order_date).toLocaleString(
                    'en-GB',
                    {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    }
                )
            } else {
                obj['Order Date'] = ''
            }
            if (
                x.order_timestamp !== undefined &&
                x?.order_timestamp !== null
            ) {
                obj['Order TimeStamp'] = new Date(
                    x?.order_timestamp
                ).toLocaleString('en-GB', {
                    hour12: true,
                })
            } else {
                obj['Order TimeStamp'] = ''
            }
            obj['RAM'] = x?.delivery?.[0]?.audit_report?.ram_verification
            obj['Storage'] =
                x?.delivery?.[0]?.audit_report?.storage_verification

            obj['Item ID'] = x?.item_id
            obj['Old Item details'] = x?.old_item_details

            obj['Brand Name'] = x?.products?.[0]?.brand_name
            obj['Product Name'] = x?.products?.[0]?.model_name
            obj['MUIC'] = x?.products?.[0]?.muic
            obj['IMEI'] = x?.imei
            arr.push(obj)
        }
        const fileExtension = '.xlsx'
        const fileType =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        const ws = XLSX.utils.json_to_sheet(arr)

        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(data, 'Total Order Placed' + fileExtension)
    }

    useEffect(() => {
        setDisplayText('Loading...')
        const fetchOrder = async () => {
            try {
                let user = localStorage.getItem('prexo-authentication')
                if (user) {
                    let { location } = jwt_decode(user)
                    setLocation(location)
                    if (search.searchData !== '') {
                        let obj = {
                            location: location,
                            type: search.type,
                            searchData: search.searchData,
                            page: page,
                            rowsPerPage: rowsPerPage,
                        }
                        let res = await axiosMisUser.post('/ordersSearch', obj)

                        if (res.status == 200) {
                            setDisplayText('')
                            setItem(res.data.data)
                            setOrderCount(res.data.count)
                        } else {
                            setItem(res.data.data)
                            setOrderCount(res.data.count)
                            setDisplayText('Sorry no data found')
                        }
                    } else if (filterData?.toDate != '') {
                        dataFilter()
                    } else {
                        let orderCount = await axiosMisUser.post(
                            '/getOrdersCount/' + location
                        )
                        if (orderCount.status === 200) {
                            setOrderCount(orderCount.data.data)
                        }
                        let res = await axiosReportingAgent.post(
                            '/getOrders/orderDateWise/' +
                                location +
                                '/' +
                                page +
                                '/' +
                                rowsPerPage
                        )

                        if (res.status == 200) {
                            setDisplayText('')
                            setItem(res.data.data)
                        }
                    }
                } else {
                    localStorage.removeItem('prexo-authentication')
                    navigate('/')
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }
        }
        fetchOrder()
        return () => setIsAlive(false)
    }, [isAlive, page, rowsPerPage])

    useEffect(() => {
        setData((_) =>
            item.map((d, index) => {
                d.id = page * rowsPerPage + index + 1
                return d
            })
        )
    }, [page, item, rowsPerPage])

    useEffect(() => {
        const fetchLastOrderDate = async () => {
            try {
                let user = localStorage.getItem('prexo-authentication')
                if (user) {
                    let { location } = jwt_decode(user)
                    let res = await axiosReportingAgent.post(
                        '/order/lastOrderDate/' + location
                    )
                    if (res.status == 200) {
                        setLastOrderDate(res.data.data)
                    }
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchLastOrderDate()
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const searchOrders = async (e) => {
        e.preventDefault()
        try {
            let admin = localStorage.getItem('prexo-authentication')
            if (admin) {
                // setSearch((p) => ({ ...p, searchData: e.target.value }))
                setDisplayText('Searching...')
                let { location } = jwt_decode(admin)
                if (e.target.value == '') {
                    setIsAlive((isAlive) => !isAlive)
                } else {
                    let obj = {
                        location: location,
                        type: search.type,
                        searchData: e.target.value,
                        page: page,
                        rowsPerPage: rowsPerPage,
                    }

                    let res = await axiosMisUser.post('/ordersSearch', obj)
                    setRowsPerPage(100)
                    setPage(0)
                    if (res.status == 200) {
                        setItem(res.data.data)
                        setOrderCount(res.data.count)
                        setDisplayText('')
                    } else {
                        setItem(res.data.data)
                        setOrderCount(res.data.count)
                        setDisplayText('Sorry no data found')
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

    const searchTrackItem = async (e) => {
        setInputSearch(e.target.value)

        e.preventDefault()
        try {
            let admin = localStorage.getItem('prexo-authentication')
            if (admin) {
                setDisplayText('Searching...')
                let { location } = jwt_decode(admin)
                if (e.target.value == '') {
                    setRefresh((refresh) => !refresh)
                } else {
                    setRowsPerPage(100)
                    setPage(0)
                    let obj = {
                        location: location,
                        searchData: e.target.value,
                        page: page,
                        rowsPerPage: rowsPerPage,
                    }
                    let res = await axiosReportingAgent.post(
                        '/search-delivery-item',
                        obj
                    )
                    if (res.status == 200) {
                        setDisplayText('')
                        setCount(res.data.count)
                        setDataForDownload(res.data.allMatchedResult)
                        setItem(res.data.data)
                    } else {
                        setItem(res.data.data)
                        setCount(res.data.count)
                        setDisplayText('Sorry no data found')
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

    const dataFilter = async () => {
        try {
            filterData.location = location
            filterData.page = page
            filterData.type = searchType
            filterData.size = rowsPerPage
            filterData.totalCount = count
            setDisplayText('Please wait...')
            setFilterUn(true)
            const res = await axiosReportingAgent.post(
                '/orderDateReport/item/filter',
                filterData
            )

            if (res.status === 200) {
                setDisplayText('')
                setOrderCount(res.data.count)
                setDataForDownload(res.data.forXlsx)
                setItem(res.data.data)
            } else {
                setItem(res.data.data)
                setOrderCount(res.data.count)
                setDataForDownload(res.data.forXlsx)
                setDisplayText('Sorry no data found')
            }
        } catch (error) {
            alert(error)
        }
    }

    const ProductTable = styled(Table)(() => ({
        minWidth: 750,
        width: '130%',
        height: '100%',
        whiteSpace: 'pre',
        '& thead': {
            '& th:first-of-type': {
                paddingLeft: 16,
            },
        },
        '& td': {
            borderBottom: 'none',
        },
        '& td:first-of-type': {
            paddingLeft: '16px !important',
        },
    }))

    const tableData = useMemo(() => {
        return (
            <ProductTable className="custom-table">
                <TableHead>
                    <TableRow>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '150px',
                            }}
                        >
                            Record.NO
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '150px',
                            }}
                        >
                            Delivery Status
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '250px',
                            }}
                        >
                            Order Imported TimeStamp
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            Order ID
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            Order Date
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            Order TimeStamp
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            RAM
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            Storage
                        </TableCell>
                        {/* <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            Partner ID
                        </TableCell> */}
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            Item ID
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            Old Item Details
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            Brand Name
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            Product Name
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            MUIC
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            IMEI
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {displayText !== '' ? (
                        <TableCell
                            colSpan={8}
                            align="center"
                            sx={{ verticalAlign: 'top' }}
                        >
                            <Typography variant="p" gutterBottom>
                                {displayText}
                            </Typography>
                        </TableCell>
                    ) : null}
                    {data.map((data, index) => (
                        <TableRow tabIndex={-1}>
                            <TableCell>{data?.id}</TableCell>
                            <TableCell
                                style={
                                    data?.delivery_status == 'Pending'
                                        ? { color: 'red' }
                                        : { color: 'green' }
                                }
                            >
                                {data?.delivery_status}
                            </TableCell>
                            <TableCell>
                                {new Date(data?.created_at).toLocaleString(
                                    'en-GB',
                                    {
                                        hour12: true,
                                    }
                                )}
                            </TableCell>
                            <TableCell>{data.order_id?.toString()}</TableCell>
                            <TableCell>
                                {data?.order_date == null
                                    ? ''
                                    : new Date(data.order_date).toLocaleString(
                                          'en-GB',
                                          {
                                              year: 'numeric',
                                              month: '2-digit',
                                              day: '2-digit',
                                          }
                                      )}
                            </TableCell>
                            <TableCell>
                                {data?.order_timestamp == null
                                    ? ''
                                    : new Date(
                                          data.order_timestamp
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })}
                            </TableCell>
                            <TableCell>
                                {data?.delivery?.[0]?.audit_report?.ram_verification?.toString()}
                            </TableCell>
                            <TableCell>
                                {data?.delivery?.[0]?.audit_report?.storage_verification?.toString()}
                            </TableCell>
                            {/* <TableCell>{data.buyback_category?.toString()}</TableCell> */}
                            {/* <TableCell>{data.partner_id?.toString()}</TableCell> */}
                            {/* <TableCell>{data.partner_email?.toString()}</TableCell> */}
                            {/* <TableCell>{data.partner_shop?.toString()}</TableCell> */}
                            <TableCell>{data.item_id?.toString()}</TableCell>
                            <TableCell>
                                {data.old_item_details?.toString()}
                            </TableCell>
                            <TableCell>
                                {data?.products?.[0]?.brand_name}
                            </TableCell>
                            <TableCell>
                                {data?.products?.[0]?.model_name}
                            </TableCell>
                            <TableCell>{data?.products?.[0]?.muic}</TableCell>
                            <TableCell>{data.imei?.toString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </ProductTable>
        )
    }, [data, displayText])
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'All Order', path: '/' },
                        { name: 'Orders', path: '/' },
                    ]}
                />
            </div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={{ mb: 1 }}>
                    <TextField
                        select
                        label="Select"
                        variant="outlined"
                        sx={{ width: '140px' }}
                        onChange={(e) => {
                            setSearch((p) => ({ ...p, type: e.target.value }))
                        }}
                    >
                        <MenuItem
                            value="Order Date"
                            onClick={(e) => {
                                setSearchType('Order Date')
                            }}
                        >
                            Order Date
                        </MenuItem>
                        <MenuItem value="order_id">Order Id</MenuItem>
                        <MenuItem value="order_status">
                            Delivery Status
                        </MenuItem>
                        <MenuItem value="imei">IMEI</MenuItem>
                        <MenuItem value="tracking_id">Tracking ID</MenuItem>
                        <MenuItem value="item_id">Item ID</MenuItem>
                        <MenuItem value="old_item_details">
                            OLD Item Details
                        </MenuItem>
                    </TextField>
                    <TextField
                        onChange={(e) => {
                            searchOrders(e)
                        }}
                        // disabled={search.type == '' ? true : false}
                        label="Search"
                        variant="outlined"
                        sx={{ ml: 2, mr: 2 }}
                    />

                    <TextField
                        type="date"
                        disabled={searchType == ''}
                        label="From Date"
                        variant="outlined"
                        inputProps={{ max: moment().format('YYYY-MM-DD') }}
                        onChange={(e) => {
                            handleChangeSort(e)
                        }}
                        sx={{ ml: 3 }}
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
                    <Button
                        sx={{ ml: 2, mt: 1 }}
                        variant="contained"
                        disabled={
                            filterData.fromDate == '' || filterData.toDate == ''
                        }
                        style={{ backgroundColor: 'green' }}
                        onClick={(e) => {
                            dataFilter(e)
                        }}
                    >
                        Filter
                    </Button>

                    <Button
                        sx={{ ml: 2, mt: 1 }}
                        variant="contained"
                        color="primary"
                        disabled={
                            inputSearch == '' && stateForFilterUn == false
                        }
                        onClick={(e) => {
                            download(e)
                        }}
                    >
                        Download XLSX
                    </Button>
                </Box>
            </Box>

            <Card sx={{ maxHeight: '100%', overflow: 'auto' }} elevation={6}>
                {tableData}
            </Card>
            <TablePagination
                sx={{ px: 2 }}
                rowsPerPageOptions={[50, 100, 150]}
                component="div"
                count={orderCount}
                rowsPerPage={rowsPerPage}
                page={page}
                showFirstButton="true"
                showLastButton="true"
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={({ target: { value } }) =>
                    setRowsPerPage(value)
                }
            />
        </Container>
    )
}

export default SimpleMuiTable
