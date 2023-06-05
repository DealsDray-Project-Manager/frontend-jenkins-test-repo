import { Breadcrumb } from 'app/components'
import React, { useState, useEffect, useMemo } from 'react'
import { styled } from '@mui/system'
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Card,
    Typography,
    Box,
    TextField,
    MenuItem,
} from '@mui/material'

import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import jwt_decode from 'jwt-decode'
import { axiosMisUser, axiosReportingAgent } from '../../../../axios'

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
    const [rowsPerPage, setRowsPerPage] = useState(50)
    const [page, setPage] = useState(0)
    const [orderCount, setOrderCount] = useState(0)
    const [data, setData] = useState([])
    const [item, setItem] = useState([])
    const [displayText, setDisplayText] = useState('')
    const [search, setSearch] = useState({
        type: '',
        searchData: '',
        location: '',
    })

    const navigate = useNavigate()

    useEffect(() => {
        setDisplayText('Loading...')
        const fetchOrder = async () => {
            try {
                let user = localStorage.getItem('prexo-authentication')
                if (user) {
                    let { location } = jwt_decode(user)
                    if (search.searchData !== '') {
                        setDisplayText('Searching')
                        let obj = {
                            location: location,
                            type: search.type,
                            searchData: search.searchData,
                            page: page,
                            rowsPerPage: rowsPerPage,
                        }
                        let res = await axiosReportingAgent.post(
                            '/search/processing',
                            obj
                        )
                        if (res.status == 200) {
                            setDisplayText('')
                            setOrderCount(res.data.count)

                            setItem(res.data.data)
                        } else {
                            setDisplayText('Sorry no data found')
                            setItem(res.data.data)
                            setOrderCount(res.data.count)
                        }
                    } else {
                        let res = await axiosReportingAgent.post(
                            '/units/' +
                                location +
                                '/' +
                                page +
                                '/' +
                                rowsPerPage +
                                '/' +
                                'Processing-units'
                        )
                        if (res.status == 200) {
                            setDisplayText('')
                            setOrderCount(res.data.count)
                            setItem(res.data.data)
                        } else {
                            setDisplayText('Sorry no data found')
                            setOrderCount(res.data.count)
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
    }, [isAlive, page])

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

    const ProductTable = styled(Table)(() => ({
        minWidth: 750,
        width: 4000,
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

    const searchDelivery = async (e) => {
        e.preventDefault()
        setSearch((p) => ({ ...p, searchData: e.target.value }))
        try {
            let admin = localStorage.getItem('prexo-authentication')
            if (admin) {
                let { location } = jwt_decode(admin)
                if (e.target.value == '') {
                    setIsAlive((isAlive) => !isAlive)
                } else {
                    setDisplayText('Searching')
                    let obj = {
                        location: location,
                        type: search.type,
                        searchData: e.target.value,
                        page: page,
                        rowsPerPage: rowsPerPage,
                    }
                    let res = await axiosReportingAgent.post(
                        '/search/processing',
                        obj
                    )
                    if (res.status == 200) {
                        setRowsPerPage(100)
                        setDisplayText('')
                        setOrderCount(res.data.count)
                        setPage(0)
                        setItem(res.data.data)
                    } else {
                        setDisplayText('Sorry no data found')
                        setItem(res.data.data)
                        setOrderCount(res.data.count)
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

    const tableData = useMemo(
        () => (
            <ProductTable>
                <TableHead>
                    <TableRow>
                        <TableCell>Record.NO</TableCell>
                        <TableCell>UIC Code</TableCell>
                        <TableCell>Actual Delivery Date</TableCell>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Tracking ID</TableCell>
                        <TableCell>Item ID</TableCell>
                        <TableCell>IMEI</TableCell>
                        <TableCell>Partner Purchase Price</TableCell>
                        <TableCell>Partner Shop</TableCell>
                        <TableCell>Base Discount</TableCell>
                        <TableCell>Diganostic Discount</TableCell>
                        <TableCell>Storage Discount</TableCell>
                        <TableCell>Buyback Category</TableCell>
                        <TableCell>Doorstep Diganostic</TableCell>
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
                                {new Date(data?.delivery_date).toLocaleString(
                                    'en-GB',
                                    {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    }
                                )}
                            </TableCell>
                            <TableCell>{data.order_id?.toString()}</TableCell>
                            <TableCell>
                                {data?.tracking_id?.toString()}
                            </TableCell>
                            <TableCell>{data?.item_id?.toString()}</TableCell>

                            <TableCell>{data.imei?.toString()}</TableCell>
                            <TableCell>
                                {data.partner_purchase_price?.toString()}
                            </TableCell>
                            <TableCell>
                                {data.partner_shop?.toString()}
                            </TableCell>
                            <TableCell>
                                {data.base_discount?.toString()}
                            </TableCell>
                            <TableCell>
                                {data.diagnostics_discount?.toString()}
                            </TableCell>
                            <TableCell>
                                {data.storage_disscount?.toString()}
                            </TableCell>
                            <TableCell>
                                {data.buyback_category?.toString()}
                            </TableCell>
                            <TableCell>
                                {data.doorsteps_diagnostics?.toString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </ProductTable>
        ),
        [displayText, data]
    )

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Processing', path: '/' },
                        { name: 'Units', path: '/' },
                    ]}
                />
            </div>
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
                    <MenuItem value="order_id">Order Id</MenuItem>
                    <MenuItem value="UIC">UIC</MenuItem>
                    <MenuItem value="imei">IMEI</MenuItem>
                    <MenuItem value="tracking_id">Tracking ID</MenuItem>
                    <MenuItem value="item_id">Item ID</MenuItem>
                </TextField>
                <TextField
                    onChange={(e) => {
                        searchDelivery(e)
                    }}
                    disabled={search.type === '' ? true : false}
                    label="Search"
                    variant="outlined"
                    sx={{ ml: 2 }}
                />
            </Box>
            <Card sx={{ maxHeight: '100%', overflow: 'auto' }} elevation={6}>
                {tableData}
            </Card>
            <TablePagination
                sx={{ px: 2 }}
                rowsPerPageOptions={[5, 10, 25]}
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
