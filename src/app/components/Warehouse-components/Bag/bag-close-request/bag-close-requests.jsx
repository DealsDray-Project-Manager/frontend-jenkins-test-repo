import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { axiosWarehouseIn } from '../../../../../axios'
import jwt_decode from 'jwt-decode'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import Swal from 'sweetalert2'
import useAuth from 'app/hooks/useAuth'
import '../../../../../app.css'

import {
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
    Table,
} from '@mui/material'

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
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}))
const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props
    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    )
}
BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
}

const SimpleMuiTable = () => {
    const { user } = useAuth()
    const [isAlive, setIsAlive] = useState(true)
    const [bot, setBot] = useState([])
    const [trayId, setTrayId] = useState('')
    const [counts, setCounts] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = React.useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let botTray = await axiosWarehouseIn.post(
                        '/closeBotTray/' + location
                    )
                    if (botTray.status == 200) {
                        setIsLoading(false)
                        setBot(botTray.data.data)
                    }
                } else {
                    navigate('/')
                }
            } catch (error) {
                setIsLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonText: 'Ok',
                    text: error,
                })
            }
        }
        fetchData()
        return () => {
            setIsAlive(false)
            setIsLoading(false)
        }
    }, [isAlive])

    const handelViewTray = (e, id) => {
        e.preventDefault()
        navigate('/wareshouse/tray/item/' + id)
    }
    const handelViewDetailTray = (e, id) => {
        e.preventDefault()
        navigate('/wareshouse/bot-done/tray-close/' + id)
    }
    const handelViewSummery = (e, id) => {
        e.preventDefault()
        navigate('/wareshouse/bag/bag-close-requests/summary/' + id)
    }

    const handelTrayReceived = async () => {
        setLoading(true)
        try {
            let obj = {
                trayId: trayId,
                count: counts,
                username: user.username,
            }
            let res = await axiosWarehouseIn.post('/receivedTray', obj)
            if (res.status == 200) {
                setLoading(false)

                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                setOpen(false)
                setIsAlive((isAlive) => !isAlive)
            } else {
                setLoading(false)
                setOpen(false)

                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
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

    const handleClose = () => {
        setOpen(false)
    }

    const columns = [
        {
            name: 'index',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 1 }}>
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
            name: 'items',
            label: <Typography sx={{ fontWeight: 'bold' }}>Bag ID</Typography>,
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.[0]?.bag_id,
            },
        },
        {
            name: 'type_taxanomy',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Tray Type</Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'sort_id',
            label: <Typography sx={{ fontWeight: 'bold' }}>Status</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'status_change_time',
            label: (
                <Typography sx={{ fontWeight: 'bold' }} noWrap>
                    Assigned Date
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },
        {
            name: 'closed_time_bot',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Closed Date</Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },
        {
            name: 'issued_user_name',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Agent Name</Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'sort_id',
            label: <Typography sx={{ fontWeight: 'bold' }}>Actions</Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <>
                            <Button
                                sx={{
                                    m: 1,
                                }}
                                variant="contained"
                                disabled={value === 'Closed By Bot'}
                                style={{ backgroundColor: '#21b6ae' }}
                                onClick={(e) => {
                                    handelViewSummery(
                                        e,
                                        tableMeta.rowData[2]?.[0]?.bag_id
                                    )
                                }}
                            >
                                Summary
                            </Button>
                            <Button
                                sx={{
                                    m: 1,
                                }}
                                variant="contained"
                                disabled={value === 'Closed By Bot'}
                                style={{ backgroundColor: '#206CE2' }}
                                onClick={(e) => {
                                    handelViewTray(e, tableMeta.rowData[1])
                                }}
                            >
                                View
                            </Button>

                            {value !== 'Received From BOT' ? (
                                <Button
                                    sx={{
                                        m: 1,
                                    }}
                                    disabled={loading}
                                    variant="contained"
                                    style={{ backgroundColor: 'green' }}
                                    onClick={(e) => {
                                        setOpen(true)
                                        setTrayId(tableMeta.rowData[1])
                                    }}
                                >
                                    RECEIVE
                                </Button>
                            ) : (
                                <Button
                                    sx={{
                                        m: 1,
                                    }}
                                    variant="contained"
                                    style={{ backgroundColor: 'red' }}
                                    onClick={(e) => {
                                        handelViewDetailTray(
                                            e,
                                            tableMeta.rowData[1]
                                        )
                                    }}
                                >
                                    Close
                                </Button>
                            )}
                        </>
                    )
                },
            },
        },
    ]

    return (
        <Container>
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
                maxWidth="xs"
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                >
                    Please verify the count of - {trayId}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <TextField
                        label="Enter Item Count"
                        variant="outlined"
                        onChange={(e) => {
                            setCounts(e.target.value)
                        }}
                        inputProps={{ maxLength: 3 }}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault()
                            }
                        }}
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{
                            m: 1,
                        }}
                        variant="contained"
                        disabled={counts === '' || loading}
                        style={{ backgroundColor: 'green' }}
                        onClick={(e) => {
                            handelTrayReceived(e)
                        }}
                    >
                        RECEIVED
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Bag', path: '/' },
                        { name: 'Bag-Close-Request' },
                    ]}
                />
            </div>
            <Table className="custom-table">
                <MUIDataTable
                    title={'Requests'}
                    data={bot}
                    columns={columns}
                    options={{
                        filterType: 'textField',
                        responsive: 'simple',
                        download: false,
                        print: false,
                        textLabels: {
                            body: {
                                noMatch: isLoading
                                    ? 'Loading...'
                                    : 'Sorry, there is no matching data to display',
                            },
                        },
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
            </Table>
        </Container>
    )
}

export default SimpleMuiTable
