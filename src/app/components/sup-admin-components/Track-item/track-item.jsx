import jwt_decode from 'jwt-decode'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect, useMemo } from 'react'
import { styled } from '@mui/system'
import {
    TextField,
    TableCell,
    TableHead,
    Table,
    TableRow,
    TableBody,
    Card,
    TablePagination,
    TableFooter,
    Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { axiosSuperAdminPrexo } from '../../../../axios'
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

const TrackItem = () => {
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(100)
    const [item, setItem] = useState([])
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const [displayText, setDisplayText] = useState('')
    const [inputSearch, setInputSearch] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [count, setCount] = useState(0)

    useEffect(() => {
        let admin = localStorage.getItem('prexo-authentication')
        if (admin) {
            if (inputSearch !== '') {
                let { location } = jwt_decode(admin)
                const search = async () => {
                    let obj = {
                        searchData: inputSearch,
                        page: page,
                        rowsPerPage: rowsPerPage,
                    }
                    let res = await axiosSuperAdminPrexo.post(
                        '/search-admin-track-item',
                        obj
                    )
                    if (res.status == 200) {
                        setItem(res.data.data)
                        setCount(res.data.count)
                        setDisplayText('')
                    } else {
                        setItem(res.data.data)
                        setCount(res.data.count)
                        setDisplayText('Sorry no data found')
                    }
                }
                search()
            } else {
                setDisplayText('Loading...')
                const fetchData = async () => {
                    try {
                        let res = await axiosSuperAdminPrexo.post(
                            '/itemTracking/' + page + '/' + rowsPerPage
                        )
                        if (res.status == 200) {
                            setDisplayText('')
                            setCount(res.data.count)
                            setItem(res.data.data)
                        }
                    } catch (error) {
                        alert(error)
                    }
                }
                fetchData()
            }
        } else {
            navigate('/')
        }
    }, [refresh, page, rowsPerPage])

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
        width: 6050,
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
                    let obj = {
                        location: location,
                        searchData: e.target.value,
                        page: page,
                        rowsPerPage: rowsPerPage,
                    }
                    let res = await axiosSuperAdminPrexo.post(
                        '/search-admin-track-item',
                        obj
                    )
                    if (res.status == 200) {
                        setItem(res.data.data)
                        setDisplayText('')
                        setCount(res.data.count)
                        setRowsPerPage(100)
                        setPage(0)
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
                        <TableCell>Delivery Status</TableCell>
                        <TableCell>Tracking ID</TableCell>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Uic Status</TableCell>
                        <TableCell>UIC</TableCell>
                        <TableCell>IMEI</TableCell>
                        <TableCell>Item ID</TableCell>
                        <TableCell>Stockin Date</TableCell>
                        <TableCell>Bag ID</TableCell>
                        <TableCell>Stockin Status</TableCell>
                        <TableCell>Bag close Date</TableCell>
                        <TableCell>BOT Agent Name</TableCell>
                        <TableCell>Assigned to BOT Agent Date</TableCell>
                        <TableCell>Tray ID</TableCell>
                        <TableCell>Tray Type</TableCell>
                        <TableCell>Tray Status</TableCell>
                        <TableCell>Tray Location</TableCell>
                        <TableCell>Tray Closed Time BOT</TableCell>
                        <TableCell>
                            Tray Received From BOT Time Warehouse
                        </TableCell>
                        <TableCell>Tray Closed Time Warehouse</TableCell>
                        <TableCell>Sorting Agent Name</TableCell>
                        <TableCell>Handover to Sorting Date</TableCell>
                        <TableCell>WHT Tray</TableCell>
                        <TableCell>WHT Tray Assigned Date</TableCell>
                        <TableCell>WHT Tray Received From Sorting</TableCell>
                        <TableCell>WHT Tray Closed After Sorting</TableCell>
                        <TableCell>Charging Username</TableCell>
                        <TableCell>Charging Assigned Date</TableCell>
                        <TableCell>Charge In Date</TableCell>
                        <TableCell>Charge Done Date</TableCell>
                        <TableCell>
                            Tray Received From Charging Time Warehouse
                        </TableCell>
                        <TableCell>
                            Charging Done Tray Closed Time Warehouse
                        </TableCell>
                        <TableCell>BQC Agent Name</TableCell>
                        <TableCell>Assigned to BQC</TableCell>

                        <TableCell>BQC Done Date</TableCell>
                        <TableCell>
                            Tray Received From BQC Time Warehouse
                        </TableCell>
                        <TableCell>
                            Bqc Done Tray Closed Time Warehouse
                        </TableCell>
                        <TableCell>Issued to Audit Date</TableCell>
                        <TableCell>Audit Agnet Name</TableCell>
                        <TableCell>Audit Done Date</TableCell>
                        <TableCell>Audit Done Tray Recieved Date</TableCell>
                        <TableCell>
                            Audit Done Tray Closed By Warehouse Date
                        </TableCell>
                        <TableCell>CTX Tray Id</TableCell>
                        <TableCell>RDL FLS Agent name</TableCell>
                        <TableCell>Tray Issued to RDL FLS Date</TableCell>
                        <TableCell>Tray Closed By RDL FLS Date</TableCell>
                        <TableCell>Tray Received From RDL FLS Date</TableCell>
                        <TableCell>RDL FLS Done Closed By Warehouse</TableCell>
                        <TableCell>CTX Tray Transfer to Sales Date</TableCell>
                        <TableCell>
                            CTX Tray Received From Processing and Close By WH
                            Date
                        </TableCell>
                        <TableCell>STX Tray Id</TableCell>
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
                            <TableCell
                                style={
                                    data.delivery_status == 'Pending'
                                        ? { color: 'red' }
                                        : { color: 'green' }
                                }
                            >
                                {data?.delivery_status}
                            </TableCell>
                            <TableCell>{data.delivery.tracking_id}</TableCell>
                            <TableCell>{data.delivery.order_id}</TableCell>
                            <TableCell
                                style={
                                    data.delivery.uic_status == 'Printed'
                                        ? { color: 'green' }
                                        : data.delivery.uic_status == 'Created'
                                        ? { color: 'orange' }
                                        : { color: 'red' }
                                }
                            >
                                {data.delivery.uic_status}
                            </TableCell>
                            <TableCell>
                                {data.delivery.uic_code?.code}
                            </TableCell>
                            <TableCell>{data.delivery.imei}</TableCell>

                            <TableCell>{data.delivery.item_id}</TableCell>
                            <TableCell>
                                {data?.delivery.stockin_date != undefined
                                    ? new Date(
                                          data?.delivery.stockin_date
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>{data.delivery.bag_id}</TableCell>
                            <TableCell
                                style={
                                    data.delivery.stock_in_status == 'Valid'
                                        ? { color: 'green' }
                                        : { color: 'red' }
                                }
                            >
                                {data.delivery.stock_in_status}
                            </TableCell>
                            <TableCell>
                                {data?.delivery.bag_close_date != undefined
                                    ? new Date(
                                          data?.delivery.bag_close_date
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>{data.delivery.agent_name}</TableCell>
                            <TableCell>
                                {data?.delivery.assign_to_agent != undefined
                                    ? new Date(
                                          data?.delivery.assign_to_agent
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>{data.delivery.tray_id}</TableCell>
                            <TableCell>{data.delivery.tray_type}</TableCell>
                            <TableCell>{data.delivery.tray_status}</TableCell>
                            <TableCell>{data.delivery.tray_location}</TableCell>
                            <TableCell>
                                {data?.delivery.tray_closed_by_bot != undefined
                                    ? new Date(
                                          data?.delivery.tray_closed_by_bot
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data?.delivery.bot_done_received != undefined
                                    ? new Date(
                                          data?.delivery.bot_done_received
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data?.delivery.warehouse_close_date !=
                                undefined
                                    ? new Date(
                                          data?.delivery.warehouse_close_date
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : data?.delivery.tray_close_wh_date !=
                                      undefined
                                    ? new Date(
                                          data?.delivery.tray_close_wh_date
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : null}
                            </TableCell>
                            <TableCell>
                                {data.delivery.sorting_agent_name}
                            </TableCell>
                            <TableCell>
                                {data?.delivery.handover_sorting_date !=
                                undefined
                                    ? new Date(
                                          data?.delivery.handover_sorting_date
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>{data.delivery.wht_tray}</TableCell>
                            <TableCell>
                                {data?.delivery.wht_tray_assigned_date !=
                                undefined
                                    ? new Date(
                                          data?.delivery.wht_tray_assigned_date
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data?.delivery.received_from_sorting !=
                                undefined
                                    ? new Date(
                                          data?.delivery.received_from_sorting
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data?.delivery.closed_from_sorting != undefined
                                    ? new Date(
                                          data?.delivery.closed_from_sorting
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data.delivery.agent_name_charging}
                            </TableCell>
                            <TableCell>
                                {data?.delivery.assign_to_agent_charging !=
                                undefined
                                    ? new Date(
                                          data?.delivery.assign_to_agent_charging
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data?.delivery.charging_in_date != undefined
                                    ? new Date(
                                          data?.delivery.charging_in_date
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data?.delivery.charging_done_date != undefined
                                    ? new Date(
                                          data?.delivery.charging_done_date
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data?.delivery.charging_done_received !=
                                undefined
                                    ? new Date(
                                          data?.delivery.charging_done_received
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data?.delivery.charging_done_close != undefined
                                    ? new Date(
                                          data?.delivery.charging_done_close
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data.delivery.agent_name_bqc}
                            </TableCell>
                            <TableCell>
                                {data?.delivery.assign_to_agent_bqc != undefined
                                    ? new Date(
                                          data?.delivery.assign_to_agent_bqc
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>

                            <TableCell>
                                {data?.delivery.bqc_out_date != undefined
                                    ? new Date(
                                          data?.delivery.bqc_out_date
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data?.delivery.bqc_done_received != undefined
                                    ? new Date(
                                          data?.delivery.bqc_done_received
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data?.delivery.bqc_done_close != undefined
                                    ? new Date(
                                          data?.delivery.bqc_done_close
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data?.delivery.issued_to_audit != undefined
                                    ? new Date(
                                          data?.delivery.issued_to_audit
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data?.delivery.audit_user_name}
                            </TableCell>
                            <TableCell>
                                {data?.delivery.audit_done_date != undefined
                                    ? new Date(
                                          data?.delivery.audit_done_date
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data?.delivery.audit_done_recieved != undefined
                                    ? new Date(
                                          data?.delivery.audit_done_recieved
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data?.delivery.audit_done_close != undefined
                                    ? new Date(
                                          data?.delivery.audit_done_close
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>{data?.delivery.ctx_tray_id}</TableCell>
                            <TableCell>
                                {data?.delivery?.rdl_fls_one_user_name}
                            </TableCell>
                            <TableCell>
                                {data?.delivery.rdl_fls_issued_date != undefined
                                    ? new Date(
                                          data?.delivery.rdl_fls_issued_date
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data?.delivery.rdl_fls_closed_date != undefined
                                    ? new Date(
                                          data?.delivery.rdl_fls_closed_date
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data?.delivery.rdl_fls_done_recieved_date !=
                                undefined
                                    ? new Date(
                                          data?.delivery.rdl_fls_done_recieved_date
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data?.delivery.rdl_fls_done_closed_wh !=
                                undefined
                                    ? new Date(
                                          data?.delivery.rdl_fls_done_closed_wh
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data?.delivery
                                    .ctx_tray_transferTo_sales_date != undefined
                                    ? new Date(
                                          data?.delivery.ctx_tray_transferTo_sales_date
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data?.delivery.ctx_tray_receive_and_close_wh !=
                                undefined
                                    ? new Date(
                                          data?.delivery.ctx_tray_receive_and_close_wh
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>{data?.delivery.stx_tray_id}</TableCell>
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
                    routeSegments={[{ name: 'Track-Item', path: '/' }]}
                />
            </div>
            <TextField
                onChange={(e) => {
                    searchTrackItem(e)
                }}
                label="Search"
                variant="outlined"
                sx={{ mb: 2 }}
            />

            <Card sx={{ maxHeight: '100%', overflow: 'auto' }} elevation={6}>
                {tableData}
            </Card>
            <TableFooter>
                <TableRow>
                    <TablePagination
                        sx={{ px: 2 }}
                        rowsPerPageOptions={[100, 150, 200]}
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
                </TableRow>
            </TableFooter>
        </Container>
    )
}

export default TrackItem
