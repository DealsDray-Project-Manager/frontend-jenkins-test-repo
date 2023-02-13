import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Button,
    Card,
    MenuItem,
    Box,
    FormControl,
    InputLabel,
    Select,
    TextField,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import jwt_decode from 'jwt-decode'
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
    const [isAlive, setIsAlive] = useState(true)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [page, setPage] = useState(0)
    const [orderCount, setOrderCount] = useState(0)
    const [data, setData] = useState([])
    const [item, setItem] = useState([])
    const [search, setSearch] = useState({
        type: '',
        searchData: '',
        location: '',
    })
    const navigate = useNavigate()

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                let user = localStorage.getItem('prexo-authentication')
                if (user) {
                    let { location } = jwt_decode(user)
                    let orderCount = await axiosMisUser.post(
                        '/getOrdersCount/' + location
                    )
                    if (orderCount.status === 200) {
                        setOrderCount(orderCount.data.data)
                    }
                    let res = await axiosMisUser.post(
                        '/getOrders/' +
                            location +
                            '/' +
                            page +
                            '/' +
                            rowsPerPage
                    )
                    if (res.status == 200) {
                        setItem(res.data.data)
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

    const searchOrders = async (e) => {
        e.preventDefault()
        try {
            let admin = localStorage.getItem('prexo-authentication')
            if (admin) {
                let { location } = jwt_decode(admin)
                if (e.target.value == '') {
                    setIsAlive((isAlive)=> !isAlive)
                } else {
                    let obj = {
                        location: location,
                        type: search.type,
                        searchData: e.target.value,
                    }
                    let res = await axiosMisUser.post('/ordersSearch', obj)
                    setRowsPerPage(10)
                    setPage(0)
                    if (res.status == 200) {
                        setItem(res.data.data)
                    }
                }
            }
        } catch (error) {
            alert(error)
        }
    }

    const ProductTable = styled(Table)(() => ({
        minWidth: 750,
        width: 5750,
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

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Order', path: '/' },
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
                        align="right"
                        onClick={(e) => navigate('/mis/orders/bulk-import')}
                    >
                        Add Bulk Orders
                    </Button>
                </Box>
            </Box>

            <Card sx={{ maxHeight: '100%', overflow: 'auto' }} elevation={6}>
                <ProductTable>
                    <TableHead>
                        <TableRow>
                            <TableCell>Record.NO</TableCell>
                            <TableCell>Delivery Status</TableCell>
                            <TableCell>Order Imported TimeStamp</TableCell>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Order Date</TableCell>
                            <TableCell>Order TimeStamp</TableCell>
                            <TableCell>Order Status</TableCell>
                            <TableCell>Partner ID</TableCell>
                            <TableCell>Item ID</TableCell>
                            <TableCell>Old Item Details</TableCell>
                            <TableCell>Brand Name</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>MUIC</TableCell>
                            <TableCell>IMEI</TableCell>
                            <TableCell>Base Disscount</TableCell>
                            <TableCell>Diganostic</TableCell>
                            <TableCell>Partner Purchase Price</TableCell>
                            <TableCell>Tracking ID</TableCell>
                            <TableCell>Delivery Date</TableCell>
                            <TableCell>Order ID Replaced</TableCell>
                            <TableCell>Deliverd With OTP</TableCell>
                            <TableCell>Deliverd With Bag Exception</TableCell>
                            <TableCell>GC Amount Redeemed</TableCell>
                            <TableCell>GC Amount Refund</TableCell>
                            <TableCell>GC Redeem Time</TableCell>
                            <TableCell>GC Amount Refund Time</TableCell>
                            <TableCell>Diagonstic Status</TableCell>
                            <TableCell>VC Eligible</TableCell>
                            <TableCell>
                                Customer Declaration Physical Defect Present
                            </TableCell>
                            <TableCell>
                                Customer Declaration Physical Defect Type
                            </TableCell>
                            <TableCell>Partner Price No Defect</TableCell>
                            <TableCell>Revised Partner Price</TableCell>
                            <TableCell>Delivery Fee</TableCell>
                            <TableCell>Exchange Facilitation Fee</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((data, index) => (
                            <TableRow tabIndex={-1}>
                                <TableCell>{data.id}</TableCell>
                                <TableCell
                                    style={
                                        data.delivery_status == 'Pending'
                                            ? { color: 'red' }
                                            : { color: 'green' }
                                    }
                                >
                                    {data.delivery_status}
                                </TableCell>
                                <TableCell>
                                    {new Date(data.created_at).toLocaleString(
                                        'en-GB',
                                        {
                                            hour12: true,
                                        }
                                    )}
                                </TableCell>
                                <TableCell>
                                    {data.order_id?.toString()}
                                </TableCell>
                                <TableCell>
                                    {data?.order_date == null
                                        ? ''
                                        : new Date(
                                              data.order_date
                                          ).toLocaleString('en-GB', {
                                              year: 'numeric',
                                              month: '2-digit',
                                              day: '2-digit',
                                          })}
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
                                    {data.order_status?.toString()}
                                </TableCell>
                                {/* <TableCell>{data.buyback_category?.toString()}</TableCell> */}
                                <TableCell>
                                    {data.partner_id?.toString()}
                                </TableCell>
                                {/* <TableCell>{data.partner_email?.toString()}</TableCell> */}
                                {/* <TableCell>{data.partner_shop?.toString()}</TableCell> */}
                                <TableCell>
                                    {data.item_id?.toString()}
                                </TableCell>
                                <TableCell>
                                    {data.old_item_details?.toString()}
                                </TableCell>
                                <TableCell>
                                    {data?.products[0]?.brand_name}
                                </TableCell>
                                <TableCell>
                                    {data?.products[0]?.model_name}
                                </TableCell>
                                <TableCell>{data?.products[0]?.muic}</TableCell>
                                <TableCell>{data.imei?.toString()}</TableCell>
                                {/* <TableCell>{data.gep_order?.toString()}</TableCell> */}
                                <TableCell>
                                    ₹{data.base_discount?.toString()}
                                </TableCell>
                                <TableCell>{data.diagnostic}</TableCell>
                                <TableCell>
                                    ₹{data.partner_purchase_price}
                                </TableCell>
                                <TableCell>{data.tracking_id}</TableCell>
                                <TableCell>
                                    {data.delivery_date == null
                                        ? ''
                                        : new Date(
                                              data.delivery_date
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })}
                                </TableCell>
                                <TableCell>{data.order_id_replaced}</TableCell>
                                <TableCell>{data.deliverd_with_otp}</TableCell>
                                <TableCell>
                                    {data.deliverd_with_bag_exception}
                                </TableCell>
                                <TableCell>
                                    {data.gc_amount_redeemed?.toString()}
                                </TableCell>
                                <TableCell>
                                    {data.gc_amount_refund?.toString()}
                                </TableCell>
                                <TableCell>
                                    {data.gc_redeem_time == null
                                        ? ''
                                        : new Date(
                                              data.gc_redeem_time
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })}
                                </TableCell>
                                <TableCell>
                                    {data.gc_amount_refund_time == null
                                        ? ''
                                        : new Date(
                                              data.gc_amount_refund_time
                                          ).toLocaleString('en-GB', {
                                              hour12: true,
                                          })}
                                </TableCell>
                                <TableCell>
                                    {data.diagnstic_status?.toString()}
                                </TableCell>
                                <TableCell>
                                    {data.vc_eligible?.toString()}
                                </TableCell>
                                <TableCell>
                                    {data.customer_declaration_physical_defect_present?.toString()}
                                </TableCell>
                                <TableCell>
                                    {data.customer_declaration_physical_defect_type?.toString()}
                                </TableCell>
                                <TableCell>
                                    {data.partner_price_no_defect?.toString()}
                                </TableCell>
                                <TableCell>
                                    ₹{data.revised_partner_price?.toString()}
                                </TableCell>
                                <TableCell>
                                    ₹{data.delivery_fee?.toString()}
                                </TableCell>
                                <TableCell>
                                    ₹
                                    {data.exchange_facilitation_fee?.toString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </ProductTable>
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
                showFirstButton="true"
                showLastButton="true"
                onPageChange={handleChangePage}
                onRowsPerPageChange={({ target: { value } }) =>
                    setRowsPerPage(value)
                }
            />
        </Container>
    )
}

export default SimpleMuiTable
