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
    Box,
    TableContainer,
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

const ScrollableTableContainer = styled(TableContainer)`
    overflow-x: auto;
`

const TrackItem = () => {
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(100)
    const [item, setItem] = useState([])
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const [displayText, setDisplayText] = useState('')
    const [inputSearch, setInputSearch] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [elasticSearchButDis, setElasticSearchButDis] = useState(false)
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

    const updateElasticSearch = async () => {
        try {
            setElasticSearchButDis(true)
            const res = await axiosSuperAdminPrexo.post('/update/elasticSearch')
            if (res.status == 200) {
                setElasticSearchButDis(false)
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res.data.message,
                    confirmButtonText: 'Ok',
                })
            } else {
                setElasticSearchButDis(false)
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: res.data.message,
                    confirmButtonText: 'Ok',
                })
            }
        } catch (error) {
            alert(error)
        }
    }

    const ProductTable = styled(Table)(() => ({
        minWidth: 750,
        // width: 10000,
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
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '120px',
                            }}
                        >
                            Record No
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '160px',
                            }}
                        >
                            Delivery Status
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '160px',
                            }}
                        >
                            Tracking ID
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '160px',
                            }}
                        >
                            Order ID
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '160px',
                            }}
                        >
                            Uic Status
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '160px',
                            }}
                        >
                            UIC
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '160px',
                            }}
                        >
                            IMEI
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '160px',
                            }}
                        >
                            Item ID
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '170px',
                            }}
                        >
                            Stockin Date
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '160px',
                            }}
                        >
                            Bag ID
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '160px',
                            }}
                        >
                            Stockin Status
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '160px',
                            }}
                        >
                            Bag close Date
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '160px',
                            }}
                        >
                            BOT User Name
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '240px',
                            }}
                        >
                            Assigned to BOT User Date
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '100px',
                            }}
                        >
                            Tray ID
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '100px',
                            }}
                        >
                            Tray Type
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '190px',
                            }}
                        >
                            Tray Status
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '140px',
                            }}
                        >
                            Tray Location
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '200px',
                            }}
                        >
                            Tray Closed Time BOT
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '360px',
                            }}
                        >
                            Tray Received From BOT Time Warehouse
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '240px',
                            }}
                        >
                            Tray Closed Time Warehouse
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '240px',
                            }}
                        >
                            Sorting User Name
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '240px',
                            }}
                        >
                            Handover to Sorting Date
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '100px',
                            }}
                        >
                            WHT Tray
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '240px',
                            }}
                        >
                            WHT Tray Assigned Date
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '300px',
                            }}
                        >
                            WHT Tray Received From Sorting
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '280px',
                            }}
                        >
                            WHT Tray Closed After Sorting
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '200px',
                            }}
                        >
                            Charging Username
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '200px',
                            }}
                        >
                            Charging Assigned Date
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '200px',
                            }}
                        >
                            Charge In Date
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '200px',
                            }}
                        >
                            Charge Done Date
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '380px',
                            }}
                        >
                            Tray Received From Charging Time Warehouse
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '380px',
                            }}
                        >
                            Charging Done Tray Closed Time Warehouse
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '200px',
                            }}
                        >
                            BQC User Name
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '200px',
                            }}
                        >
                            Assigned to BQC
                        </TableCell>

                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '200px',
                            }}
                        >
                            BQC Done Date
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '340px',
                            }}
                        >
                            Tray Received From BQC Time Warehouse
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '340px',
                            }}
                        >
                            Bqc Done Tray Closed Time Warehouse
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '200px',
                            }}
                        >
                            Issued to Audit Date
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '200px',
                            }}
                        >
                            Audit Agnet Name
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '200px',
                            }}
                        >
                            Audit Done Date
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '300px',
                            }}
                        >
                            Audit Done Tray Recieved Date
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '340px',
                            }}
                        >
                            Audit Done Tray Closed By Warehouse Date
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '200px',
                            }}
                        >
                            CTX Tray Id
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '200px',
                            }}
                        >
                            RDL-1 User name
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '240px',
                            }}
                        >
                            Tray Issued to RDL-1 Date
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '240px',
                            }}
                        >
                            Tray Closed By RDL-1 Date
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '300px',
                            }}
                        >
                            Tray Received From RDL-1 Date
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '300px',
                            }}
                        >
                            RDL-1 Done Closed By Warehouse
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '300px',
                            }}
                        >
                            CTX Tray Transfer to Sales Date
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '350px',
                            }}
                        >
                            CTX Tray Received From Processing and Close By WH
                            Date
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                               
                                width: '240px',
                            }}
                        >
                            STX Tray Id
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '240px',
                            }}
                        >
                            Item Moved to Billed Bin
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            Issued to Sorting (WHT TO RP)
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            Sorting User Name
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            Sorting User Name
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            Rp Tray
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            Sorting Done Closed by User
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            Received from Sorting By WH
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            Sorting Closed By WH
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            Issued to RDL-2
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            RDL-2 Username
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            RDL-2 Done Closed By User
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '200px',
                            }}
                        >
                            RDL-2 Done Received By WH
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '120px',
                            }}
                        >
                            RDL-2 Done Closed By WH
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '150px',
                            }}
                        >
                            Display Grade
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
                            <TableCell>
                                {data?.delivery.item_moved_to_billed_bin}
                            </TableCell>
                            <TableCell>
                                {data?.delivery?.issued_to_wht_to_rp !=
                                undefined
                                    ? new Date(
                                          data?.delivery?.issued_to_wht_to_rp
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data?.delivery?.wht_to_rp_sorting_agent}
                            </TableCell>
                            <TableCell>{data?.delivery?.rp_tray}</TableCell>
                            <TableCell>
                                {data?.delivery?.wht_to_rp_sorting_done !=
                                undefined
                                    ? new Date(
                                          data?.delivery?.wht_to_rp_sorting_done
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data?.delivery
                                    ?.wht_to_rp_sorting_done_received !=
                                undefined
                                    ? new Date(
                                          data?.delivery?.wht_to_rp_sorting_done_received
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data?.delivery
                                    ?.wht_to_rp_sorting_done_received !=
                                undefined
                                    ? new Date(
                                          data?.delivery?.wht_to_rp_sorting_done_received
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data?.delivery
                                    ?.wht_to_rp_sorting_done_wh_closed !=
                                undefined
                                    ? new Date(
                                          data?.delivery?.wht_to_rp_sorting_done_wh_closed
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data?.delivery?.issued_to_rdl_two_date !=
                                undefined
                                    ? new Date(
                                          data?.delivery?.issued_to_rdl_two_date
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                           
                            <TableCell>
                                {data?.delivery?.rdl_two_user_name}
                            </TableCell>
                          
                            <TableCell>
                                {data?.delivery?.rdl_two_closed_date !=
                                undefined
                                    ? new Date(
                                          data?.delivery?.rdl_two_closed_date
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data?.delivery?.received_from_rdl_two !=
                                undefined
                                    ? new Date(
                                          data?.delivery?.received_from_rdl_two
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell>
                                {data?.delivery
                                    ?.rdl_two_done_close_by_warehouse !=
                                undefined
                                    ? new Date(
                                          data?.delivery?.rdl_two_done_close_by_warehouse
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </TableCell>
                            <TableCell sx={{mr:2}}> 
                                {data?.delivery?.copy_grading_report?.scree_type}
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
                    routeSegments={[{ name: 'Track-Item', path: '/' }]}
                />
            </div>
            <Box
                sx={{
                    mt: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <TextField
                    onChange={(e) => {
                        searchTrackItem(e)
                    }}
                    label="Search"
                    variant="outlined"
                    sx={{ mb: 2 }}
                />
                {/* <Button
                    sx={{ mb: 2 }}
                    variant="contained"
                    disabled={elasticSearchButDis}
                    style={{ backgroundColor: 'green' }}
                    onClick={(e) => {
                        updateElasticSearch(e)
                    }}
                >
                    {elasticSearchButDis == true
                        ? 'Updating'
                        : 'Update ElasticSearch'}
                </Button> */}
            </Box>

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
