import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate, useLocation } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { axiosWarehouseIn } from '../../../../../../axios'
import useAuth from 'app/hooks/useAuth'

import {
    Button,
    Card,
    Dialog,
    Box,
    DialogTitle,
    IconButton,
    DialogContent,
    DialogActions,
    TextField,
    Typography,
    MenuItem,
} from '@mui/material'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'

import Swal from 'sweetalert2'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'

const TextFieldCustOm = styled(TextField)(() => ({
    width: '100%',
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
    const { state } = useLocation()
    const { whtTray, rpTray } = state
    const [tray, setTray] = useState([])
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()
    const [receiveButDis, setReceiveButDis] = useState(false)

    const {
        register,
        formState: { errors },
    } = useForm({
        // resolver: yupResolver(schema),
    })

    // async function getrackidData(rack_id) {
    //     try {
    //         let obj = {
    //             rack_id: rack_id,
    //         }
    //         let response = await axiosSuperAdminPrexo.post(
    //             '/getWarehouseByLocation',
    //             obj
    //         )
    //         if (response.status == 200) {
    //             setWarehouse(response.data.data.warehouse)
    //         }
    //     } catch (error) {}
    // }

    useEffect(() => {
        try {
            const fetchData = async () => {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let obj = {
                        location: location,
                        whtTray: whtTray,
                    }
                    let res = await axiosWarehouseIn.post(
                        '/whtToRp/whtTray',
                        obj
                    )
                    if (res.status == 200) {
                        setTray(res.data.data)
                    }
                } else {
                    navigate('/')
                }
            }
            fetchData()
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Ok',
                text: error,
            })
        }
    }, [refresh])

    const handelViewTray = (e, code) => {
        e.preventDefault()
        navigate('/wareshouse/sorting/wht-to-rp/scan/' + code)
    }
    const handleIssue = async () => {
        try {
            setLoading(true)
            let userStatus = await axiosWarehouseIn.post(
                '/sortingAgnetStatus/' +
                    tray[0]?.issued_user_name +
                    '/' +
                    tray[0]?.code
            )
            if (userStatus.status == 200) {
                let flag = false
                for (let x of tray) {
                    if (x.items.length !== x.actual_items.length) {
                        flag = true
                        break
                    }
                }
                if (flag == false) {
                    let obj = {
                        whtTray: whtTray,
                        rpTray: rpTray,
                        actUser: user.username,
                    }
                    const res = await axiosWarehouseIn.post(
                        '/whtToRp/issueToAgent',
                        obj
                    )
                    if (res.status == 200) {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: res?.data?.message,
                            confirmButtonText: 'Ok',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                navigate('/wareshouse/sorting/wht-to-rp')
                            }
                        })
                    } else {
                        setLoading(true)
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: res.data.message,
                        })
                    }
                } else {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'warning',
                        title: 'Please scan the tray',
                        confirmButtonText: 'Ok',
                    })
                }
            } else {
                setLoading(false)
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: userStatus?.data?.data,
                    confirmButtonText: 'Ok',
                })
            }
        } catch (error) {
            alert(error)
        }
    }

    const columns = [
        {
            name: 'index',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 2 }}>
                    Record No
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 4 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'code',
            label: <Typography sx={{ fontWeight: 'bold' }}>Tray ID</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'rack_id',
            label: <Typography sx={{ fontWeight: 'bold' }}>Rack ID</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'rackData', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Rack Display</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: true,
                customBodyRender: (value) => value?.[0]?.display,
            },
        },
        {
            name: 'brand',
            label: <Typography sx={{ fontWeight: 'bold' }}>Brand</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: <Typography sx={{ fontWeight: 'bold' }}>Model</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'limit',

            options: {
                filter: false,
                display: false,
            },
        },
        {
            name: 'items',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Quantity</Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                    value?.length + '/' + tableMeta?.rowData[6],
            },
        },
        {
            name: 'actual_items',

            options: {
                filter: false,
                sort: false,
                display: false,
            },
        },
        {
            name: 'code',
            label: <Typography sx={{ fontWeight: 'bold' }}>Actions</Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    const isDisabled =
                        tableMeta?.rowData[6]?.length ===
                        tableMeta?.rowData[7]?.length

                    return isDisabled ? (
                        <Button
                            sx={{
                                m: 1,
                            }}
                            disabled={true}
                            variant="contained"
                            style={{ backgroundColor: '#206CE2' }}
                            onClick={(e) => {
                                handelViewTray(e, value)
                            }}
                        >
                            Scanned
                        </Button>
                    ) : (
                        <Button
                            sx={{
                                m: 1,
                            }}
                            disabled={false}
                            variant="contained"
                            style={{ backgroundColor: '#206CE2' }}
                            onClick={(e) => {
                                handelViewTray(e, value)
                            }}
                        >
                            Scan
                        </Button>
                    )
                },
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Sorting request wht-rp', path: '/' },
                        { name: 'Scanning' },
                    ]}
                />
            </div>
            <Card>
                <Box sx={{ p: 2 }}>
                    <Typography sx={{ fontWeight: 'bold' }}>
                        Username : {tray?.[0]?.issued_user_name}
                    </Typography>
                    <Typography sx={{ mt: 2, fontWeight: 'bold' }}>
                        Assigned Date :
                        {new Date(tray?.[0]?.requested_date).toLocaleString(
                            'en-GB',
                            {
                                hour12: true,
                            }
                        )}
                    </Typography>
                </Box>
                <MUIDataTable
                    // title={'Tray'}
                    data={tray}
                    columns={columns}
                    options={{
                        filterType: 'textField',
                        responsive: 'simple',
                        download: false,
                        print: false,
                        selectableRows: 'none', // set checkbox for each row
                        // search: false, // set search option
                        // filter: false, // set data filter option
                        // download: false, // set download option
                        // print: false, // set print option
                        // pagination: true, //set pagination option
                        // viewColumns: false, // set column option
                        customSort: (data, colIndex, order) => {
                            return data.sort((a, b) => {
                                if (colIndex === 1) {
                                    return (
                                        (a.data[colIndex].price <
                                        b.data[colIndex].price
                                            ? -1
                                            : 1) * (order === 'desc' ? 1 : -1)
                                    )
                                }
                                return (
                                    (a.data[colIndex] < b.data[colIndex]
                                        ? -1
                                        : 1) * (order === 'desc' ? 1 : -1)
                                )
                            })
                        },
                        elevation: 0,
                        rowsPerPageOptions: [10, 20, 40, 80, 100],
                    }}
                />
                <Box sx={{ textAlign: 'right', mr: 6 }}>
                    <Button
                        sx={{
                            m: 1,
                            mt: 2,
                        }}
                        variant="contained"
                        style={{ backgroundColor: '#206CE2' }}
                        onClick={(e) => {
                            handleIssue(e)
                        }}
                    >
                        Issue to User
                    </Button>
                </Box>
            </Card>
        </Container>
    )
}
export default SimpleMuiTable
