import jwt_decode from 'jwt-decode'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect, useMemo } from 'react'
import { styled } from '@mui/system'
import {
    MenuItem,
    TableCell,
    TableHead,
    Table,
    TableRow,
    TableBody,
    Card,
    TablePagination,
    TextField,
    Box,
    Button,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { axiosMisUser } from '../../../../axios'
import Swal from 'sweetalert2'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import { User } from '@auth0/auth0-spa-js'
import useAuth from 'app/hooks/useAuth'
import { saveAs } from 'file-saver'
import SaveIcon from '@mui/icons-material/Save'

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
    const [page, setPage] = React.useState(0)
    const [item, setItem] = useState([])
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [data, setData] = useState([])
    const [deliveryCount, setDeliveryCount] = useState([])
    const [dataForDownload, setDataForDownload] = useState([])
    const [downloadText, setDownlaodText] = useState('Export to Excel')
    const navigate = useNavigate()
    const { user } = useAuth()
    const [search, setSearch] = useState({
        type: '',
        searchData: '',
        location: '',
    })

    const download = () => {
        setDownlaodText('Downloading...')
        let arr = []
        for (let x of dataForDownload) {
            let obj = {
                'Delivery Status': x?.delivery_status,
                'Order ID': x?.order_id,
                'Order Date': new Date(x?.order_date).toLocaleString('en-GB', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                }),
                'Order TimeStamp': new Date(x?.order_timestamp).toLocaleString(
                    'en-GB',
                    {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    }
                ),
                'Order Status': x?.order_status,
                'Partner ID': x?.partner_id,
                'Item ID': x?.item_id,
                'Old Item Details': x?.old_item_details,
                IMEI: x?.imei,
                'Base Disscount': x?.base_discount,
                Diganostic: x?.diagnostic,
                'Partner Purchase Price': x?.partner_purchase_price,
                'Tracking ID': x?.tracking_id,
                'Delivery Date': new Date(x?.delivery_date).toLocaleString(
                    'en-GB',
                    {
                        hour12: true,
                    }
                ),
                'Order ID Replaced': x?.order_id_replaced,
                'Deliverd With OTP': x?.deliverd_with_otp,
                'Deliverd With Bag Exception': x?.deliverd_with_bag_exception,
                'GC Amount Redeemed': x?.gc_amount_redeemed,
                'GC Amount Refund': x?.gc_amount_refund,
                'GC Redeem Time': new Date(x?.gc_redeem_time).toLocaleString(
                    'en-GB',
                    {
                        hour12: true,
                    }
                ),
                'GC Amount Refund Time': x?.gc_amount_refund_time,
                'Diagonstic Status': x?.diagnstic_status,
                'VC Eligible': x?.vc_eligible,
                'Customer Declaration Physical Defect Present':
                    x?.customer_declaration_physical_defect_present,
                'Customer Declaration Physical Defect Type':
                    x?.customer_declaration_physical_defect_type,
                'Partner Price No Defect': x?.partner_price_no_defect,
                'Revised Partner Price': x?.revised_partner_price,
                'Delivery Fee': x?.delivery_fee,
                'Exchange Facilitation Fee': x?.exchange_facilitation_fee,
            }
            if (obj['Order Date'] == 'Invalid Date') {
                obj['Order Date'] = ''
            }
            if (obj['Order TimeStamp'] == 'Invalid Date') {
                obj['Order TimeStamp'] = ''
            }
            if (
                obj['Delivery Date'] == 'Invalid Date' ||
                obj['Delivery Date'] == '01/01/1970, 5:30:00 am'
            ) {
                obj['Delivery Date'] = ''
            }
            if (
                obj['GC Redeem Time'] == 'Invalid Date' ||
                obj['GC Redeem Time'] == '01/01/1970, 5:30:00 am'
            ) {
                obj['GC Redeem Time'] = ''
            }
            arr.push(obj)
        }
        const fileExtension = '.xlsx'
        const fileType =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        const ws = XLSX.utils.json_to_sheet(arr)
        ws['!cols'] = []
        ws['!cols'][0] = { hidden: true }
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: fileType })
        if(arr.length !== 0){
            saveAs(data, `Not Delivered Orders ${fileExtension}`)
        }
        setDownlaodText('Export to Excel')
    }

    useEffect(() => {
        const fetChData = async () => {
            try {
                const res = await axiosMisUser.post(
                    '/notDeliveredOrdersForDownload/' + user.location
                )
                if (res.status == 200) {
                    setDataForDownload(res.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetChData()
    }, [])

    useEffect(() => {
        try {
            let admin = localStorage.getItem('prexo-authentication')
            if (admin) {
                let { location } = jwt_decode(admin)
                const fetchData = async () => {
                    if (search.searchData != '') {
                        let obj = {
                            location: location,
                            type: search.type,
                            searchData: search.searchData,
                            page: page,
                            rowsPerPage: rowsPerPage,
                        }
                        let res = await axiosMisUser.post('/ordersSearch', obj)

                        if (res.status == 200) {
                            setItem(res.data.data)
                            setDeliveryCount(res.data.count)
                            setDataForDownload(res.data.data)
                        } else {
                            setItem(res.data.data)
                            setDeliveryCount(res.data.count)
                        }
                    } else {
                        let res = await axiosMisUser.post(
                            '/notDeliveredOrders/' +
                                location +
                                '/' +
                                page +
                                '/' +
                                rowsPerPage
                        )
                        if (res.status === 200) {
                            setItem(res.data.data)
                            setDeliveryCount(res.data.count)
                        }
                    }
                }
                fetchData()
            } else {
                navigate('/')
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Ok',
                text: error,
            })
        }
    }, [page, isAlive])

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
        width: 5050,
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
            paddingLeft: '36px !important',
        },
    }))

    const searchOrders = async (e) => {
        e.preventDefault()
        try {
            let admin = localStorage.getItem('prexo-authentication')
            if (admin) {
                let { location } = jwt_decode(admin)
                if (e.target.value === '') {
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
                    setRowsPerPage(10)
                    setPage(0)
                    if (res.status == 200) {
                        setItem(res.data.data)
                        setDeliveryCount(res.data.count)
                        setDataForDownload(res.data.data)
                    } else {
                        setItem(res.data.data)
                        setDeliveryCount(res.data.count)
                        setDataForDownload(res.data.data)
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
                                width: '200px',
                            }}
                        >
                            Order ID
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '150px',
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
                                width: '150px',
                            }}
                        >
                            Order Status
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '150px',
                            }}
                        >
                            Partner ID
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '150px',
                            }}
                        >
                            Item ID
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '150px',
                            }}
                        >
                            Old Item Details
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '150px',
                            }}
                        >
                            IMEI
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '150px',
                            }}
                        >
                            Base Disscount
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '150px',
                            }}
                        >
                            Diganostic
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            Partner Purchase Price
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '150px',
                            }}
                        >
                            Tracking ID
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '150px',
                            }}
                        >
                            Delivery Date
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '150px',
                            }}
                        >
                            Order ID Replaced
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '150px',
                            }}
                        >
                            Deliverd With OTP
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '250px',
                            }}
                        >
                            Deliverd With Bag Exception
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            GC Amount Redeemed
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            GC Amount Refund
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            GC Redeem Time
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            GC Amount Refund Time
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            Diagonstic Status
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            VC Eligible
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '400px',
                            }}
                        >
                            Customer Declaration Physical Defect Present
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '350px',
                            }}
                        >
                            Customer Declaration Physical Defect Type
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            Partner Price No Defect
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            Revised Partner Price
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            Delivery Fee
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            Exchange Facilitation Fee
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((data, index) => (
                        <TableRow tabIndex={-1}>
                            <TableCell>{data.id}</TableCell>
                            <TableCell
                                style={
                                    data.delivery_status === 'Pending'
                                        ? { color: 'red' }
                                        : { color: 'green' }
                                }
                            >
                                {data?.delivery_status}
                            </TableCell>
                            <TableCell>{data.order_id?.toString()}</TableCell>
                            <TableCell>
                                {data.order_date === null
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
                                {' '}
                                {data.order_timestamp === null
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

                            <TableCell>{data.partner_id?.toString()}</TableCell>

                            <TableCell>{data.item_id?.toString()}</TableCell>
                            <TableCell>
                                {data.old_item_details?.toString()}
                            </TableCell>
                            <TableCell>{data.imei?.toString()}</TableCell>

                            <TableCell>
                                {data.base_discount?.toString()}
                            </TableCell>
                            <TableCell>{data.diagnostic}</TableCell>
                            <TableCell>{data.partner_purchase_price}</TableCell>
                            <TableCell>{data.tracking_id}</TableCell>
                            <TableCell>
                                {' '}
                                {data.delivery_date === null
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
                                {data.gc_redeem_time === null
                                    ? ''
                                    : new Date(
                                          data.gc_redeem_time
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })}
                            </TableCell>
                            <TableCell>
                                {data.gc_amount_refund_time?.toString()}
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
                                {data.revised_partner_price?.toString()}
                            </TableCell>
                            <TableCell>
                                {data.delivery_fee?.toString()}
                            </TableCell>
                            <TableCell>
                                {data.exchange_facilitation_fee?.toString()}
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
                        { name: 'Recon-Sheet', path: '/' },
                        { name: 'Not-Delivered-Orders' },
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
                            searchOrders(e)
                        }}
                        disabled={search.type === '' ? true : false}
                        label="Search"
                        variant="outlined"
                        sx={{ ml: 2, mb: 1 }}
                    />
                </Box>
                <Box>
                    <Button
                        sx={{ mb: 2 }}
                        variant="contained"
                        color="secondary"
                        disabled={
                            downloadText == 'Downloading...' ||
                            dataForDownload?.length == 0
                        }
                        onClick={(e) => {
                            download(e)
                        }}
                        startIcon={<SaveIcon />}
                    >
                        {downloadText}
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
