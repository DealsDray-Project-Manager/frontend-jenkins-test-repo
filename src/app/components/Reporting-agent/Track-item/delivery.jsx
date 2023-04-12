import jwt_decode from 'jwt-decode'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect, useMemo } from 'react'
import { styled } from '@mui/system'
import { H1, H3, H4 } from 'app/components/Typography'
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
import {
    axiosMisUser,
    axiosReportingAgent,
    axiosSuperAdminPrexo,
} from '../../../../axios'
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
        borderBottom: 'none',
    },
    '& td:first-of-type': {
        paddingLeft: '16px !important',
    },
}))

const SimpleMuiTable = () => {
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(100)
    const [item, setItem] = useState([])
    const [data, setData] = useState([])
    const [location, setLocation] = useState('')
    const navigate = useNavigate()
    const [refresh, setRefresh] = useState(false)
    const [brand, setbrand] = useState([])
    const [model, setModel] = useState([])
    const [stateForFilterUn, setFilterUn] = useState(false)
    const [count, setCount] = useState(0)
    const [avgPrice, setAvgPrice] = useState('')
    const [inputSearch, setInputSearch] = useState('')
    const [displayText, setDisplayText] = useState('')
    const [filterData, setFilterData] = useState({})

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
                        setItem(res.data.data)
                    } else {
                        setItem(res.data.data)
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
        const FetchModel = async () => {
            let res = await axiosSuperAdminPrexo.post('/getBrands')
            if (res.status == 200) {
                setbrand(res.data.data)
            }
        }
        FetchModel()
    }, [])

    useEffect(() => {
        setData((_) =>
            item.map((d, index) => {
                d.id = page * rowsPerPage + index + 1
                return d
            })
        )
    }, [page, item, rowsPerPage])

    /* Fetch model */
    const fetchModel = async (brandName) => {
        try {
            let res = await axiosSuperAdminPrexo.post(
                '/get-product-model/' + brandName
            )
            if (res.status == 200) {
                setModel(res.data.data)
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const dataFilter = async () => {
        try {
            filterData.location = location
            filterData.page = page
            filterData.size = rowsPerPage
            filterData.totalCount = count
            setDisplayText('Please wait...')
            setFilterUn(true)
            const res = await axiosReportingAgent.post(
                '/delivered/item/filter',
                filterData
            )
            if (res.status === 200) {
                setDisplayText('')
                setCount(res.data.count)
                setAvgPrice(res.data.avgPrice)
                setItem(res.data.data)
            } else {
                setAvgPrice(res.data.avgPrice)
                setItem(res.data.data)
                setCount(res.data.count)
                setDisplayText('Sorry no data found')
            }
        } catch (error) {
            alert(error)
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

    const tableData = useMemo(() => {
        return (
            <ProductTable>
                <TableHead>
                    <TableRow>
                        <TableCell>Record.NO</TableCell>
                        <TableCell>Actual Delivered Date</TableCell>
                        <TableCell>Tracking ID</TableCell>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Uic Status</TableCell>
                        <TableCell>UIC</TableCell>
                        <TableCell>IMEI</TableCell>
                        <TableCell>Item ID</TableCell>
                        <TableCell>Bag ID</TableCell>
                        <TableCell>Bot Tray ID</TableCell>
                        <TableCell>Tray Type</TableCell>
                        <TableCell>Tray Status</TableCell>
                        <TableCell>Tray Location</TableCell>
                        <TableCell>WHT Tray</TableCell>
                        <TableCell>CTX Tray Id</TableCell>
                        <TableCell>STX Tray Id</TableCell>
                        <TableCell>Partner Purchase Price</TableCell>
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
                            <TableCell>{data.tracking_id}</TableCell>
                            <TableCell>{data.order_id}</TableCell>
                            <TableCell
                                style={
                                    data.uic_status == 'Printed'
                                        ? { color: 'green' }
                                        : data.uic_status == 'Created'
                                        ? { color: 'orange' }
                                        : { color: 'red' }
                                }
                            >
                                {data.uic_status}
                            </TableCell>
                            <TableCell>{data.uic_code?.code}</TableCell>
                            <TableCell>{data.imei}</TableCell>
                            <TableCell>{data.item_id}</TableCell>
                            <TableCell>{data.bag_id}</TableCell>
                            <TableCell>{data.tray_id}</TableCell>
                            <TableCell>{data.tray_type}</TableCell>
                            <TableCell>{data.tray_status}</TableCell>
                            <TableCell>{data.tray_location}</TableCell>
                            <TableCell>{data.wht_tray}</TableCell>
                            <TableCell>{data?.ctx_tray_id}</TableCell>
                            <TableCell>{data?.stx_tray_id}</TableCell>
                            <TableCell>
                                {data.partner_purchase_price?.toString()}
                            </TableCell>
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
                    routeSegments={[{ name: 'All Delivered Item', path: '/' }]}
                />
            </div>
            {avgPrice !== '' ? (
                <Box>
                    <H3>Average Price : ₹{avgPrice?.toFixed(1)}</H3>
                </Box>
            ) : null}
            <Box
                sx={{
                    mt: 2,
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
                        label="Search..."
                        variant="outlined"
                        sx={{ mb: 1 }}
                    />
                </Box>

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
                        sx={{ mb: 1 }}
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
                        disabled={filterData.fromDate == undefined}
                        variant="outlined"
                        onChange={(e) => {
                            handleChangeSort(e)
                        }}
                        sx={{ mb: 1, ml: 3 }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        select
                        label="Select Brand"
                        variant="outlined"
                        sx={{ width: 150, ml: 3 }}
                        name="brand"
                        onChange={(e) => {
                            handleChangeSort(e)
                        }}
                    >
                        {brand.map((brandData) => (
                            <MenuItem
                                value={brandData.brand_name}
                                key={brandData.brand_name}
                                onClick={(e) => {
                                    fetchModel(brandData.brand_name)
                                }}
                            >
                                {brandData.brand_name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        label="Select Model"
                        variant="outlined"
                        name="model"
                        disabled={filterData.brand == undefined}
                        onChange={(e) => {
                            handleChangeSort(e)
                        }}
                        sx={{ ml: 2, width: 150 }}
                    >
                        {model.map((modelData) => (
                            <MenuItem
                                key={modelData.model_name}
                                value={modelData.model_name}
                            >
                                {modelData.model_name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        sx={{ ml: 2, mt: 1 }}
                        variant="contained"
                        disabled={
                            (filterData?.fromDate == undefined &&
                                filterData?.toDate == undefined &&
                                filterData?.brand == undefined &&
                                filterData?.model == undefined) ||
                            (filterData?.fromDate !== undefined &&
                                filterData?.toDate == undefined) ||
                            (filterData.brand != undefined &&
                                filterData.model == undefined)
                        }
                        style={{ backgroundColor: 'green' }}
                        onClick={(e) => {
                            dataFilter(e)
                        }}
                    >
                        Filter
                    </Button>
                </Box>

                {/* <Button
                    sx={{ mb: 2 }}
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                        download(e)
                    }}
                >
                    Download XLSX
                </Button> */}
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
