import jwt_decode from 'jwt-decode'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect, useMemo } from 'react'
import { styled } from '@mui/system'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
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
import { axiosMisUser, axiosReportingAgent } from '../../../../axios'
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

const SimpleMuiTable = () => {
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(100)
    const [item, setItem] = useState([])
    const [data, setData] = useState([])
    const [dataForDownload, setDataForDownload] = useState([])
    const navigate = useNavigate()
    const [stateForFilterUn, setFilterUn] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [location, setLocation] = useState('')
    const [count, setCount] = useState(0)
    const [sortColumn, setSortColumn] = useState(null)
    const [sortDirection, setSortDirection] = useState('asc')
    const [searchType, setSearchType] = useState('')
    const [inputSearch, setInputSearch] = useState('')
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
                        // setRowsPerPage(10)
                        // setPage(0)
                        setCount(res.data.count)
                        setItem(res.data.data)
                    } else {
                        setItem(res.data.data)
                        setCount(res.data.count)
                        setDisplayText('Sorry no data found')
                    }
                }
                pageSearch()
            } else if (sortColumn !== null) {
                sort(sortColumn)
            } else if (stateForFilterUn == true) {
                dataFilter()
            } else {
                const fetchData = async () => {
                    try {
                        let res = await axiosReportingAgent.post(
                            '/getDelivery/' +
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

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
            sort(column)
        } else {
            setSortColumn(column)
            setSortDirection('asc')
            sort(column)
        }
    }

    const sort = async (column) => {
        try {
            setDisplayText('Please Wait...')
            let obj = {
                location: location,
                page: page,
                size: rowsPerPage,
                type: column,
            }
            if (sortDirection == 'asc') {
                obj['sortFormate'] = 1
            } else {
                obj['sortFormate'] = -1
            }
            const res = await axiosReportingAgent.post('/report/sort', obj)
            if (res.status == 200) {
                setDisplayText('')
                setItem(res.data.data)
            } else {
                setItem(res.data.data)
            }
        } catch (error) {
            alert(error)
        }
    }

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
    }))

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
    const download = (e) => {
        let arr = []
        for (let x of dataForDownload) {
            let obj = {
                'Order Id': x?.order_id,
                'Tracking Id': x?.tracking_id,
                'Model Name': x?.old_item_details?.replace(/:/g, ' ').toUpperCase(),
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
                '/monthWiseReport/item/filter',
                filterData
            )
          
            if (res.status === 200) {
                setDisplayText('')
                setCount(res.data.count)
                setDataForDownload(res.data.forXlsx)
                setItem(res.data.data)
            } else {
                setItem(res.data.data)
                setDataForDownload(res.data.forXlsx)
                setDisplayText('Sorry no data found')
            }
        } catch (error) {
            alert(error)
        }
    }

    const tableData = useMemo(() => {
        return (
            <ProductTable>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontSize:'16px', fontWeight:'bold', width:'150px'}}>Record.NO</TableCell>
                        <TableCell
                            style={{ fontSize:'16px', fontWeight:'bold', width:'200px', cursor: 'pointer' }}
                            onClick={() => handleSort('order_id')}
                        >
                            Order ID{' '}
                            {sortColumn === 'order_id' &&
                                sortDirection === 'asc' &&
                                '↑'}
                            {sortColumn === 'order_id' &&
                                sortDirection === 'desc' &&
                                '↓'}
                        </TableCell>
                        <TableCell
                            style={{ fontSize:'16px', fontWeight:'bold' , cursor: 'pointer', width:'150px' }}
                            onClick={() => handleSort('tracking_id')}
                        >
                            Tracking ID{' '}
                            {sortColumn === 'tracking_id' &&
                                sortDirection === 'asc' &&
                                '↑'}
                            {sortColumn === 'tracking_id' &&
                                sortDirection === 'desc' &&
                                '↓'}
                        </TableCell>
                        <TableCell
                            style={{ fontSize:'16px', fontWeight:'bold' , cursor: 'pointer', width:'150px' }}
                            onClick={() => handleSort('model_name')}
                        >
                            Model Name{' '}
                            {sortColumn === 'model_name' &&
                                sortDirection === 'asc' &&
                                '↑'}
                            {sortColumn === 'model_name' &&
                                sortDirection === 'desc' &&
                                '↓'}
                        </TableCell>
                        <TableCell
                            style={{ fontSize:'16px', fontWeight:'bold' , width:'150px', cursor: 'pointer' }}
                            onClick={() => handleSort('imei')}
                        >
                            IMEI{' '}
                            {sortColumn === 'imei' &&
                                sortDirection === 'asc' &&
                                '↑'}
                            {sortColumn === 'imei' &&
                                sortDirection === 'desc' &&
                                '↓'}
                        </TableCell>
                        <TableCell
                            style={{ fontSize:'16px', fontWeight:'bold' , cursor: 'pointer', width:'150px' }}
                            onClick={() => handleSort('sku_name')}
                        >
                            SKU Name{' '}
                            {sortColumn === 'sku_name' &&
                                sortDirection === 'asc' &&
                                '↑'}
                            {sortColumn === 'sku_name' &&
                                sortDirection === 'desc' &&
                                '↓'}
                        </TableCell>
                        <TableCell
                            style={{ fontSize:'16px', fontWeight:'bold' , cursor: 'pointer', width:'250px' }}
                            onClick={() => handleSort('bot_remark')}
                        >
                            Received Units Remarks (BOT){' '}
                            {sortColumn === 'bot_remark' &&
                                sortDirection === 'asc' &&
                                '↑'}
                            {sortColumn === 'bot_remark' &&
                                sortDirection === 'desc' &&
                                '↓'}
                        </TableCell>
                        <TableCell
                            style={{ fontSize:'16px', fontWeight:'bold' , cursor: 'pointer', width:'150px' }}
                            onClick={() => handleSort('type')}
                        >
                            Type{' '}
                            {sortColumn === 'type' &&
                                sortDirection === 'asc' &&
                                '↑'}
                            {sortColumn === 'type' &&
                                sortDirection === 'desc' &&
                                '↓'}
                        </TableCell>
                        <TableCell
                            style={{ fontSize:'16px', fontWeight:'bold' , cursor: 'pointer', width:'150px' }}
                            onClick={() => handleSort('uic')}
                        >
                            UIC{' '}
                            {sortColumn === 'uic' &&
                                sortDirection === 'asc' &&
                                '↑'}
                            {sortColumn === 'uic' &&
                                sortDirection === 'desc' &&
                                '↓'}
                        </TableCell>
                        <TableCell
                            style={{ fontSize:'16px', fontWeight:'bold' , cursor: 'pointer' , width:'100px'}}
                            onClick={() => handleSort('price')}
                        >
                            Price{' '}
                            {sortColumn === 'price' &&
                                sortDirection === 'asc' &&
                                '↑'}
                            {sortColumn === 'price' &&
                                sortDirection === 'desc' &&
                                '↓'}
                        </TableCell>
                        <TableCell
                            style={{ fontSize:'16px', fontWeight:'bold' , cursor: 'pointer', width:'150px' }}
                            onClick={() => handleSort('order_date')}
                        >
                            Order Date{' '}
                            {sortColumn === 'order_date' &&
                                sortDirection === 'asc' &&
                                '↑'}
                            {sortColumn === 'order_date' &&
                                sortDirection === 'desc' &&
                                '↓'}
                        </TableCell>
                        <TableCell
                            style={{ fontSize:'16px', fontWeight:'bold' , cursor: 'pointer', width:'150px' }}
                            onClick={() => handleSort('location')}
                        >
                            Location{' '}
                            {sortColumn === 'location' &&
                                sortDirection === 'asc' &&
                                '↑'}
                            {sortColumn === 'location' &&
                                sortDirection === 'desc' &&
                                '↓'}
                        </TableCell>
                        <TableCell
                            style={{ fontSize:'16px', fontWeight:'bold' , cursor: 'pointer', width:'150px' }}
                            onClick={() => handleSort('delivery_date')}
                        >
                            Delivery Date{' '}
                            {sortColumn === 'delivery_date' &&
                                sortDirection === 'asc' &&
                                '↑'}
                            {sortColumn === 'delivery_date' &&
                                sortDirection === 'desc' &&
                                '↓'}
                        </TableCell>
                        <TableCell
                            style={{ fontSize:'16px', fontWeight:'bold' , cursor: 'pointer', width:'200px' }}
                            onClick={() => handleSort('packet_open_date')}
                        >
                            Packet Open Date{' '}
                            {sortColumn === 'packet_open_date' &&
                                sortDirection === 'asc' &&
                                '↑'}
                            {sortColumn === 'packet_open_date' &&
                                sortDirection === 'desc' &&
                                '↓'}
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
                            <TableCell>{data?.order_id}</TableCell>
                            <TableCell>{data?.tracking_id}</TableCell>
                            <TableCell>{data?.old_item_details?.replace(/:/g, ' ')?.toUpperCase()}</TableCell>
                            <TableCell>{data?.imei}</TableCell>
                            <TableCell>{data?.item_id}</TableCell>
                            <TableCell>
                                {data?.bot_report?.body_damage_des}
                            </TableCell>
                            {data.tray_type == 'MMT' ? (
                                <TableCell>Model MisMatch MMT</TableCell>
                            ) : data.tray_type == 'PMT' ? (
                                <TableCell>Product MisMatch MMT</TableCell>
                            ) : (
                                <TableCell>Model Verified BOT</TableCell>
                            )}

                            <TableCell>{data?.uic_code?.code}</TableCell>
                            <TableCell>
                                {data?.partner_purchase_price}
                            </TableCell>
                            <TableCell>
                                {' '}
                                {data?.order_date == null
                                    ? ''
                                    : new Date(data?.order_date).toLocaleString(
                                          'en-GB',
                                          {
                                              year: 'numeric',
                                              month: '2-digit',
                                              day: '2-digit',
                                          }
                                      )}
                            </TableCell>

                            <TableCell>{data.partner_shop}</TableCell>
                            <TableCell>
                                {new Date(data?.delivery_date).toLocaleString(
                                    'en-GB',
                                    {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    }
                                )}
                            </TableCell>
                            <TableCell>
                                {' '}
                                {data?.assign_to_agent == null
                                    ? ''
                                    : new Date(
                                          data?.assign_to_agent
                                      ).toLocaleString('en-GB', {
                                          year: 'numeric',
                                          month: '2-digit',
                                          day: '2-digit',
                                      })}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </ProductTable>
        )
    }, [item, data, displayText, sortDirection, sortColumn])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Month Wise Purchase Details', path: '/' },
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
