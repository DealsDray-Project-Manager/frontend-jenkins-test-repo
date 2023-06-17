import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { axiosWarehouseIn } from '../../../../../axios'
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
    Typography
} from '@mui/material'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
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
    const [tray, setTray] = useState([])
    const [counts, setCounts] = useState('')
    const [open, setOpen] = React.useState(false)
    const [trayId, setTrayId] = useState('')
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()
    const [receiveButDis,setReceiveButDis]=useState(false)

    useEffect(() => {
        try {
            const fetchData = async () => {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let res = await axiosWarehouseIn.post(
                        '/return-from-sorting-wht/' + location
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

    const handelTrayReceived = async () => {
        try {
            let obj = {
                trayId: trayId,
                counts: counts,
            }
            setReceiveButDis(true)
            let res = await axiosWarehouseIn.post('/recieved-from-sorting', obj)
            if (res.status == 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                setReceiveButDis(false)
                setOpen(false)
                setRefresh((refresh) => !refresh)
            } else {
                setOpen(false)
                setReceiveButDis(false)
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
            }
        } catch (error) {
            setOpen(false)
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

    const handelViewTray = (e, code) => {
        e.preventDefault()
        navigate('/wareshouse/sorting/wht-to-rp/scan')
    }
    const handleIssue = () => {
        Swal.fire({
            title: 'Issued Successfully',
            icon: 'success'
        })
    }

    const columns = [
        {
            name: 'index',
            label: <Typography sx={{fontWeight:'bold', ml:2}}>Record No</Typography>,
            options: {
                filter: false,
                sort: false,
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) =>
                <Typography sx={{pl:4}}>{dataIndex.rowIndex + 1}</Typography>
            },
        },
        {
            name: 'tray_id',
            label: <Typography sx={{fontWeight:'bold'}}>Tray ID</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'brand',
            label: <Typography sx={{fontWeight:'bold'}}>Brand</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: <Typography sx={{fontWeight:'bold'}}>Model</Typography>,
            options: {
                filter: true,
            },
        },
        // {
        //     name: 'limit',
        //     label: 'Tray',
        //     options: {
        //         filter: true,
        //         display: false,
        //     },
        // },

        {
            name: 'qty',
            label: <Typography sx={{fontWeight:'bold'}}>Quantity</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'code',
            label: <Typography sx={{fontWeight:'bold'}}>Actions</Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
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
                            Scan
                        </Button>
                    )
                },
            },
        },
    ]

    const columns1 = [
        {
            index:1,
            tray_id:'WHT101',
            brand:'Xiomi',
            model:'S5',
            qty:'2'
        },
        {
            index:2,
            tray_id:'WHT101',
            brand:'Xiomi',
            model:'S5',
            qty:'2'
        },
        {
            index:3,
            tray_id:'WHT101',
            brand:'Xiomi',
            model:'S5',
            qty:'2'
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
                    RECEIVED
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
                        disabled={counts === '' || receiveButDis}
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
                        { name: 'WHT Tray', path: '/' },
                        { name: 'Scanning' },
                    ]}
                />
            </div>
            <Card>
                <Box sx={{p:2}}>
                    <Typography sx={{fontWeight:'bold'}}>Username : abc</Typography>
                    <Typography sx={{mt:2,fontWeight:'bold'}}>Assigned Date : 22-03-2023</Typography>
                </Box>
            <MUIDataTable
                // title={'Tray'}
                data={columns1}
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
                                (a.data[colIndex] < b.data[colIndex] ? -1 : 1) *
                                (order === 'desc' ? 1 : -1)
                            )
                        })
                    },
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            />
            <Box sx={{textAlign:'right', mr:6}}>
            <Button
                sx={{
                    m: 1,
                }}
                variant="contained"
                style={{ backgroundColor: '#206CE2' }}
                onClick={(e) => {
                    handleIssue(e)
                }}
            >
                Issue to Agent
            </Button>
            </Box>
            </Card>
            
        </Container>
    )
}

export default SimpleMuiTable
