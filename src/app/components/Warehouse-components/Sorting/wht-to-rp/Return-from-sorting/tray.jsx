import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import '../../../../../../app.css'
import {
    Button,
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    DialogActions,
    TextField,
    Typography,
    Table,
} from '@mui/material'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import { axiosWarehouseIn } from '../../../../../../axios'
import Swal from 'sweetalert2'
import useAuth from 'app/hooks/useAuth'

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
    const [isAlive, setIsAlive] = useState(true)
    const [tray, setTray] = useState([])
    const [open, setOpen] = React.useState(false)
    const [counts, setCounts] = useState('')
    const [trayId, setTrayId] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [receiveBut, setReceiveBut] = useState(false)
    const navigate = useNavigate()
    const { user } = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    setIsLoading(true)
                    let { location } = jwt_decode(admin)
                    let res = await axiosWarehouseIn.post(
                        '/returnFromWhtToRpSorting/' + location
                    )
                    if (res.status == 200) {
                        setIsLoading(false)
                        setTray(res?.data?.data)
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
    }, [isAlive])

    const handelViewDetailTray = (e, id) => {
        e.preventDefault()
        navigate('/warehouse/sorting/return-from-wht-to-rp/close/' + id)
    }

    const handelTrayReceived = async () => {
        try {
            setReceiveBut(true)
            let obj = {
                trayId: trayId,
                counts: counts,
                actUser: user.username,
            }
            let res = await axiosWarehouseIn.post(
                '/recieved-from-sortingWhtToRp',
                obj
            )

            if (res.status == 200) {
                setOpen(!open)
                setReceiveBut(false)
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                setIsAlive((isAlive) => !isAlive)
            } else {
                setReceiveBut(false)
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                setOpen(!open)
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

    const handelViewTray = (e, id) => {
        e.preventDefault()
        navigate('/wareshouse/wht/return-from-rdl-1/view/' + id)
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
            name: 'issued_user_name',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Agent Name</Typography>
            ),
            options: {
                filter: true,
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
            label: 'limit',
            options: {
                filter: true,
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
                    return (
                        <>
                            {tableMeta.rowData[3] !=
                            'Received from sorting (Wht to rp)' ? (
                                <Button
                                    sx={{
                                        m: 1,
                                    }}
                                    variant="contained"
                                    style={{ backgroundColor: 'green' }}
                                    onClick={(e) => {
                                        setOpen(true)
                                        setTrayId(value)
                                    }}
                                >
                                    RECEIVE
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        sx={{
                                            m: 1,
                                        }}
                                        variant="contained"
                                        style={{ backgroundColor: '#206CE2' }}
                                        onClick={(e) => {
                                            handelViewTray(e, value)
                                        }}
                                    >
                                        View
                                    </Button>
                                    <Button
                                        sx={{
                                            m: 1,
                                        }}
                                        variant="contained"
                                        style={{ backgroundColor: 'red' }}
                                        onClick={(e) => {
                                            handelViewDetailTray(e, value)
                                        }}
                                    >
                                        Close
                                    </Button>
                                </>
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
                        disabled={counts === '' || receiveBut}
                        variant="contained"
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
                        { name: 'Return from sorting wht-rp', path: '/' },
                    ]}
                />
            </div>
            <Table className="custom-table">
                <MUIDataTable
                    title={'Tray'}
                    data={tray}
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
