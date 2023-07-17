import jwt_decode from 'jwt-decode'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect, useMemo } from 'react'
import { styled } from '@mui/system'
import moment from 'moment'

import {
    TableCell,
    TableHead,
    Table,
    TableRow,
    TableBody,
    Card,
    TablePagination,
    TextField,
    Box,
    Typography,
    Button,
    MenuItem,
} from '@mui/material'

import { useNavigate } from 'react-router-dom'
import { axiosReportingAgent } from '../../../../axios'
import Swal from 'sweetalert2'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

const ProductTable = styled(Table)(() => ({
    minWidth: 750,
    width: '150%',
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
    borderCollapse: 'separate',
    borderSpacing: '0',
    '& th, & td': {
        borderBottom: '1px solid rgba(0, 0, 0, 0.2)', // Lighter border color
        borderRight: '1px solid rgba(0, 0, 0, 0.2)',
        padding: '8px',
        textAlign: 'left',
    },
    '& th:last-child, & td:last-child': {
        borderRight: 'none',
    },
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
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(100)
    const [item, setItem] = useState([])
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const [stateForFilterUn, setFilterUn] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [location, setLocation] = useState('')
    const [count, setCount] = useState(0)
    const [searchType, setSearchType] = useState('')
    const [inputSearch, setInputSearch] = useState('')
    const [dataForDownload, setDataForDownload] = useState([])
    const [displayText, setDisplayText] = useState('')
    const [filterData, setFilterData] = useState({
        fromDate: '',
        toDate: '',
    })

    const handleChangeSort = ({ target: { name, value } }) => {
        setFilterData({
            ...filterData,
            [name]: value,
        })
    }

    useEffect(() => {
        let admin = localStorage.getItem('prexo-authentication')
        if (admin) {
            const { location } = jwt_decode(admin)
            setDisplayText('Loading...')
            setLocation(location)
            if (inputSearch !== '') {
                const pageSearch = async () => {
                    let obj = {
                        location: location,
                        searchData: inputSearch,
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
                        setItem(res.data.data)
                    } else {
                        setItem(res.data.data)
                        setCount(res.data.count)
                        setDisplayText('Sorry no data found')
                    }
                }
                pageSearch()
            } else if (stateForFilterUn == true) {
                dataFilter()
            } else {
                const fetchData = async () => {
                    try {
                        let res = await axiosReportingAgent.post(
                            '/unverifiedImeiReport/' +
                                location +
                                '/' +
                                page +
                                '/' +
                                rowsPerPage
                        )
                        if (res.status == 200) {
                            setDisplayText('')
                            setCount(res.data.count)
                            setItem(res.data.data)
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
                fetchData()
            }
        } else {
            navigate('/')
        }
    }, [refresh, page])

    useEffect(() => {
        setData((_) =>
            item.map((d, index) => {
                d.id = page * rowsPerPage + index + 1
                return d
            })
        )
    }, [page, item, rowsPerPage])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
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
                        '/search/unverifiedImei',
                        obj
                    )
                    if (res.status == 200) {
                        setDisplayText('')
                        setCount(res.data.count)
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
    const download = (e) => {
        let arr = []
        for (let x of dataForDownload) {
            let obj = {
                'Order Id': x?.order_id,
                'Tracking Id': x?.tracking_id,
                'Model Name': x?.old_item_details
                    ?.replace(/:/g, ' ')
                    .toUpperCase(),
                IMEI: x?.imei,
                'SKU Name': x?.item_id,
                'Received Units Remarks (BOT)': x?.bot_report?.body_damage_des,
                UIC: x?.uic_code?.code,
                Price: x?.partner_purchase_price,
                'Tray Location': x?.tray_location,
                Location: x?.partner_shop,
            }
            if (x.tray_type == 'MMT') {
                obj['Type'] = 'Model MisMatch MMT'
            } else if (x.tray_type == 'PMT') {
                obj['Type'] = 'Product MisMatch MMT'
            } else {
                obj['Type'] = 'Model Verified BOT'
            }
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

            if (x?.delivery_date !== undefined && x?.delivery_date !== null) {
                obj['Delivery Date'] = new Date(
                    x?.delivery_date
                ).toLocaleString('en-GB', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                })
            } else {
                obj['Delivery Date'] = ''
            }
            if (
                x?.assign_to_agent !== undefined &&
                x?.assign_to_agent !== null
            ) {
                obj['Packet Open Date'] = new Date(
                    x?.assign_to_agent
                ).toLocaleString('en-GB', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                })
            } else {
                obj['Packet Open Date'] = ''
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
        FileSaver.saveAs(data, 'Month Wise Purchase Details' + fileExtension)
    }

    const dataFilter = async () => {
        try {
            filterData.location = location
            filterData.page = page
            filterData.type = searchType
            filterData.size = rowsPerPage
            setDisplayText('Please wait...')
            setFilterUn(true)
            const res = await axiosReportingAgent.post(
                '/unverifiedImei/item/filter',
                filterData
            )
            if (res.status === 200) {
                setDisplayText('')
                setCount(res.data.count)
                setItem(res.data.data)
            } else {
                setItem(res.data.data)
                setDisplayText('Sorry no data found')
            }
        } catch (error) {
            alert(error)
        }
    }

    const tableData = useMemo(() => {
        return (
            <ProductTable elevation={6}>
                <TableHead>
                    <TableRow>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '150px',
                            }}
                        >
                            Record.NO
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '110px',
                                cursor: 'pointer',
                            }}
                        >
                            Uic
                        </TableCell>

                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                width: '150px',
                            }}
                        >
                            Brand and model
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '145px',
                            }}
                        >
                            Delivery IMEI{' '}
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '240px',
                            }}
                        >
                            Bqc software report RO Ril Miui IMEI 0
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '205px',
                            }}
                        >
                            Bqc software report Mobile IMEI
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '209px',
                            }}
                        >
                            Bqc software report Mobile IMEI 2
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '209px',
                            }}
                        >
                            Charging user added CIMEI 1
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '209px',
                            }}
                        >
                            Charging user added CIMEI 2
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '150px',
                            }}
                        >
                            Tray status
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '250px',
                            }}
                        >
                            Wht tray id
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '250px',
                            }}
                        >
                            Ctx tray id
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '250px',
                            }}
                        >
                            Stx tray id
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
                            <TableCell>{data.id}</TableCell>
                            <TableCell>{data?.uic_code?.code}</TableCell>
                            <TableCell>
                                {data?.old_item_details
                                    ?.replace(/:/g, ' ')
                                    ?.toUpperCase()}
                            </TableCell>
                            <TableCell>{data?.imei}</TableCell>
                            <TableCell>
                                {data?.bqc_software_report?._ro_ril_miui_imei0}
                            </TableCell>
                            <TableCell>
                                {data?.bqc_software_report?.mobile_imei}
                            </TableCell>
                            <TableCell>
                                {data?.bqc_software_report?.mobile_imei2}
                            </TableCell>
                            <TableCell>{data?.charging?.cimei_1}</TableCell>
                            <TableCell>{data?.charging?.cimei_2}</TableCell>
                            <TableCell>{data?.tray_status}</TableCell>
                            <TableCell>{data?.wht_tray}</TableCell>
                            <TableCell>{data?.ctx_tray_id}</TableCell>
                            <TableCell>{data?.stx_tray_id}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </ProductTable>
        )
    }, [item, data, displayText])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Unverified imei report', path: '/' },
                    ]}
                />
            </div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Box>
                    <TextField
                        onChange={(e) => {
                            searchTrackItem(e)
                        }}
                        // disabled={search.type == '' ? true : false}
                        label="Search"
                        variant="outlined"
                        sx={{ mb: 1 }}
                    />
                </Box>
                <Box>
                    <TextField
                        type="text"
                        select
                        label="Select Type"
                        variant="outlined"
                        name="searchType"
                        sx={{ width: '140px' }}
                    >
                        <MenuItem
                            value="Order Date"
                            onClick={(e) => {
                                setSearchType('Order Date')
                            }}
                        >
                            Order Date
                        </MenuItem>
                        <MenuItem
                            value="Delivery Date"
                            onClick={(e) => {
                                setSearchType('Delivery Date')
                            }}
                        >
                            Delivery Date
                        </MenuItem>
                    </TextField>
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
                    {/* <Button
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
                    </Button> */}
                </Box>
            </Box>
            <Card sx={{ maxHeight: '100%', overflow: 'auto' }} elevation={6}>
                {tableData}
            </Card>
            <TablePagination
                sx={{ px: 2 }}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={count}
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
