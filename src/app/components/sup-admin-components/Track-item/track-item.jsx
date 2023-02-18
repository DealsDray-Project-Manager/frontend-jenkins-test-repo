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
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { axiosSuperAdminPrexo } from '../../../../axios'

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
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [item, setItem] = useState([])
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const [refresh, setRefresh] = useState(false)
    const [count, setCount] = useState(0)
    const [search, setSearch] = useState({
        type: '',
        searchData: '',
        location: '',
    })

    useEffect(() => {
        let admin = localStorage.getItem('prexo-authentication')
        if (admin) {
            const fetchData = async () => {
                try {
                    let res = await axiosSuperAdminPrexo.post(
                        '/itemTracking/' + page + '/' + rowsPerPage
                    )
                    if (res.status == 200) {
                        setCount(res.data.count)
                        setItem(res.data.data)
                    }
                } catch (error) {
                    alert(error)
                }
            }
            fetchData()
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
                        page: page,
                        rowsPerPage: rowsPerPage,
                    }
                    let res = await axiosSuperAdminPrexo.post(
                        '/search-admin-track-item',
                        obj
                    )
                    if (res.status == 200) {
                        setItem(res.data.data)
                        setRowsPerPage(10)
                        setPage(0)
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
                        </TableRow>
                    ))}
                </TableBody>
            </ProductTable>
        )
    }, [item, data])

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
                </TableRow>
            </TableFooter>
        </Container>
    )
}

export default SimpleMuiTable
