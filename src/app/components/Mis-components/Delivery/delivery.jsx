import jwt_decode from 'jwt-decode'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect, useMemo } from 'react'
import { styled } from '@mui/system'
import {
    Button,
    TableCell,
    TableHead,
    Table,
    TableRow,
    TableBody,
    Card,
    TablePagination,
    MenuItem,
    Box,
    TextField,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { axiosMisUser } from '../../../../axios'

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
    const [item, setItem] = useState([])
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [data, setData] = useState([])
    const [deliveryCount, setDeliveryCount] = useState([])
    const [search, setSearch] = useState({
        type: '',
        searchData: '',
        location: '',
    })
    const navigate = useNavigate()
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        try {
            let admin = localStorage.getItem('prexo-authentication')
            if (admin) {
                let { location } = jwt_decode(admin)
                const fetchData = async () => {
                    let deliveryCountRes = await axiosMisUser.post(
                        '/getDeliveryCount/' + location
                    )
                    if (deliveryCountRes.status === 200) {
                        setDeliveryCount(deliveryCountRes.data.data)
                    }
                    let res = await axiosMisUser.post(
                        '/getAllDelivery/' +
                            location +
                            '/' +
                            page +
                            '/' +
                            rowsPerPage
                    )
                    if (res.status == 200) {
                        setItem(res.data.data)
                    }
                }
                fetchData()
            } else {
                navigate('/')
            }
        } catch (error) {
            alert(error)
        }
    }, [page, refresh])

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
        width: 3050,
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

    const searchDelivery = async (e) => {
        e.preventDefault()

        try {
            let admin = localStorage.getItem('prexo-authentication')
            if (admin) {
                let { location } = jwt_decode(admin)
                if (e.target.value == '') {
                    setRefresh((refresh) => !refresh)
                } else {
                    let obj = {
                        location: location,
                        type: search.type,
                        searchData: e.target.value,
                    }
                    let res = await axiosMisUser.post('/searchDelivery', obj)
                    if (res.status == 200) {
                        setRowsPerPage(10)
                        setPage(0)
                        setItem(res.data.data)
                    }
                }
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
                        <TableCell>Record.NO</TableCell>
                        <TableCell>Delivery Status</TableCell>
                        <TableCell>Delivery Imported Date</TableCell>
                        <TableCell>UIC Status</TableCell>
                        <TableCell>Tracking ID</TableCell>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Order Date</TableCell>
                        <TableCell>Item ID</TableCell>
                        <TableCell>GEP Order</TableCell>
                        <TableCell>IMEI</TableCell>
                        <TableCell>Partner Purchase Price</TableCell>
                        <TableCell>Partner Shop</TableCell>
                        <TableCell>Base Discount</TableCell>
                        <TableCell>Diagnostics Discount</TableCell>
                        <TableCell>Storage Disscount</TableCell>
                        <TableCell>Buyback Category</TableCell>
                        <TableCell>Doorsteps Diagnostics</TableCell>
                        <TableCell>Actual Delivered Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((data, index) => (
                        <TableRow tabIndex={-1}>
                            <TableCell>{data.id}</TableCell>
                            <TableCell
                                style={
                                    data.result.length != 0
                                        ? { color: 'green' }
                                        : { color: 'red' }
                                }
                            >
                                {data.result.length != 0
                                    ? 'Match'
                                    : 'Not Match'}
                            </TableCell>
                            <TableCell>
                                {new Date(data.created_at).toLocaleString(
                                    'en-GB',
                                    {
                                        hour12: true,
                                    }
                                )}
                            </TableCell>
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
                            <TableCell>
                                {data.tracking_id?.toString()}
                            </TableCell>
                            <TableCell>{data.order_id?.toString()}</TableCell>
                            <TableCell>
                                {data?.order_date == null
                                    ? ''
                                    : new Date(data?.order_date).toLocaleString(
                                          'en-GB',
                                          {
                                              year: 'numeric',
                                              month: '2-digit',
                                              day: '2-digit',
                                          }
                                      ) == 'Invalid Date'
                                    ? data?.order_date
                                    : new Date(data?.order_date).toLocaleString(
                                        'en-GB',
                                        {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                        }
                                    )}
                            </TableCell>
                            <TableCell>{data.item_id?.toString()}</TableCell>
                            <TableCell>{data.gep_order?.toString()}</TableCell>
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
                        </TableRow>
                    ))}
                </TableBody>
            </ProductTable>
        )
    }, [data, item])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Delivery', path: '/' },
                        { name: 'Delivery' },
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
                        select
                        label="Select"
                        variant="outlined"
                        sx={{ mb: 1, width: '140px' }}
                        onChange={(e) => {
                            setSearch((p) => ({ ...p, type: e.target.value }))
                        }}
                    >
                        <MenuItem value="order_id">Order Id</MenuItem>
                        <MenuItem value="imei">IMEI</MenuItem>
                        <MenuItem value="tracking_id">Tracking ID</MenuItem>
                        <MenuItem value="item_id">Item ID</MenuItem>
                    </TextField>
                    <TextField
                        onChange={(e) => {
                            searchDelivery(e)
                        }}
                        disabled={search.type == '' ? true : false}
                        label="Search"
                        variant="outlined"
                        sx={{ ml: 2, mb: 1 }}
                    />
                </Box>
                <Box>
                    <Button
                        sx={{ mb: 2 }}
                        variant="contained"
                        color="primary"
                        onClick={(e) => navigate('/mis/delivery/bulk-import')}
                    >
                        Add Bulk Delivery
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
                count={deliveryCount}
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
