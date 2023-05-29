import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import {
    Button,
    MenuItem,
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    TextField,
    Typography,
    InputAdornment,
} from '@mui/material'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import SearchIcon from '@mui/icons-material/Search'
import jwt_decode from 'jwt-decode'
import { axiosWarehouseIn } from '../../../../../axios'
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
    const [isAlive, setIsAlive] = useState(true)
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false)
    const [assingNewTray, setAssignNewTray] = useState(false)
    const [trayData, setTrayData] = useState([])
    const [counts, setCounts] = useState('')
    const [botUsers, setBotUsers] = useState([])
    const [trayId, setTrayId] = useState('')
    const [userTray, setUserTray] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [trayStatus, setTrayStatus] = useState('')
    const [trayIdCheck, setTrayIdCheck] = useState('')
    const [loadingAssign, setLoadingAssign] = useState(false)
    const [laodingRecieved, setLoadinRecieved] = useState(false)
    const schema = Yup.object().shape({
        user_name: Yup.string().required('Required*').nullable(),
        tray_type: Yup.string().required('Required*').nullable(),
        tray_Id: Yup.string().required('Required*').nullable(),
    })
    // ON SUBMIT FOR ASSIGN NEW TRAY
    const onSubmit = async (values) => {
        try {
            setLoadingAssign(true)
            let res = await axiosWarehouseIn.post('/assignNewTray', values)
            if (res.status === 200) {
                setLoadingAssign(false)

                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                setAssignNewTray(false)
                setUserTray('')
                setTrayStatus('')
            } else {
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
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    })
    const handelOpen = async () => {
        try {
            let admin = localStorage.getItem('prexo-authentication')
            if (admin) {
                let { location } = jwt_decode(admin)
                let res = await axiosWarehouseIn.post('/botUsers/' + location)
                if (res.status == 200) {
                    setAssignNewTray(true)
                    setBotUsers(res.data.data)
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
    useEffect(() => {
        try {
            let admin = localStorage.getItem('prexo-authentication')
            if (admin) {
                setIsLoading(true)
                let { location } = jwt_decode(admin)
                const fetchData = async () => {
                    let res = await axiosWarehouseIn.post(
                        '/trayCloseRequest/' + location
                    )
                    if (res.status == 200) {
                        setIsLoading(false)
                        setTrayData(res.data.data)
                    }
                }
                fetchData()
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
    }, [isAlive])
    const handleClose = () => {
        setOpen(false)
    }
    const handleCloseAssignNewTray = () => {
        setAssignNewTray(false)
        reset({
            tray_Id: '',
            tray_type: '',
            user_name: '',
        })
        setUserTray('')
        setTrayStatus('')
    }

    const handelTrayReceived = async () => {
        setLoadinRecieved(true)
        try {
            let obj = {
                trayId: trayId,
                count: counts,
            }
            let res = await axiosWarehouseIn.post('/receivedTray', obj)
            if (res.status == 200) {
                setLoadinRecieved(false)

                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                setOpen(false)
                setIsAlive((isAlive) => !isAlive)
            } else {
                setLoadinRecieved(false)
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
            setLoadinRecieved(false)
        }
    }
    // CHECK TRAY
    const handelBotTrayCheck = async (username, trayType) => {
        if (username === '') {
            Swal.fire({
                position: 'top-center',
                icon: 'warning',
                title: 'Please Select User',
                confirmButtonText: 'Ok',
            })
            reset({
                user_name: null,
            })
        } else {
            try {
                setUserTray('')
                let obj = {
                    username: username,
                    trayType: trayType,
                }
                let res = await axiosWarehouseIn.post('/checkBotUserTray', obj)
                if (res.status === 200) {
                } else {
                    setUserTray(res.data.message)
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
    }

    const handelTrayId = async (e) => {
        try {
            let admin = localStorage.getItem('prexo-authentication')
            if (admin) {
                let { location } = jwt_decode(admin)
                if (
                    getValues('user_name') === '' ||
                    getValues('tray_type') === ''
                ) {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'warning',
                        title: 'Please Select User and Tray Type',
                        confirmButtonText: 'Ok',
                    })
                } else if (trayIdCheck == '') {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'warning',
                        title: 'Please Add Tray ID',
                        confirmButtonText: 'Ok',
                    })
                } else {
                    if (getValues('tray_type') == 'MMT') {
                        let res = await axiosWarehouseIn.post(
                            '/checkMmtTray/' + trayIdCheck + '/' + location
                        )
                        if (res.status == 200) {
                            setTrayStatus(res.data.status)
                        } else {
                            Swal.fire({
                                position: 'top-center',
                                icon: 'error',
                                title: res?.data?.message,
                                confirmButtonText: 'Ok',
                            })
                        }
                    } else if (getValues('tray_type') == 'PMT') {
                        let res = await axiosWarehouseIn.post(
                            '/checkPmtTray/' + trayIdCheck + '/' + location
                        )
                        if (res.status == 200) {
                            setTrayStatus(res.data.status)
                        } else {
                            Swal.fire({
                                position: 'top-center',
                                icon: 'error',
                                title: res?.data?.message,
                                confirmButtonText: 'Ok',
                            })
                        }
                    } else {
                        let res = await axiosWarehouseIn.post(
                            '/checkBotTray/' + trayIdCheck + '/' + location
                        )
                        if (res.status == 200) {
                            setTrayStatus(res.data.status)
                        } else {
                            Swal.fire({
                                position: 'top-center',
                                icon: 'error',
                                title: res?.data?.message,
                                confirmButtonText: 'Ok',
                            })
                        }
                    }
                }
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Ok',
                text: error?.response?.data?.message,
            })
        }
    }

    const handelViewTray = (e, id) => {
        e.preventDefault()
        navigate('/wareshouse/tray/item/' + id)
    }
    const handelViewDetailTray = (e, id) => {
        e.preventDefault()
        navigate('/wareshouse/bot-done/tray-close/' + id)
    }

    const columns = [
        {
            name: 'index',
            label: <Typography sx={{fontWeight:'bold', ml:1}}>Record No</Typography>,
            options: {
                filter: true,
                sort: true,
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) =>
                <Typography sx={{pl:4}}>{dataIndex.rowIndex + 1}</Typography>
            },
        },
        {
            name: 'code',
            label: <Typography sx={{fontWeight:'bold'}}>Tray ID</Typography>,
            options: {
                filter: true,
            },
        },

        {
            name: 'type_taxanomy',
            label: <Typography sx={{fontWeight:'bold'}}>Tray Type</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'sort_id',
            label: <Typography sx={{fontWeight:'bold'}}>Status</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'status_change_time',
            label: <Typography sx={{fontWeight:'bold'}}>Assigned Date</Typography>,
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
            label: <Typography sx={{fontWeight:'bold'}}>Closed Date</Typography>,
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
            label: <Typography sx={{fontWeight:'bold'}}>Agent Name</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'sort_id',
            label: <Typography sx={{fontWeight:'bold'}}>Actions</Typography>,
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <>
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
                                    disabled={laodingRecieved}
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
                    {/* <h6>
            {" "}
            <Checkbox
              onClick={(e) => {
                receiveCheck == ""
                  ? setReceiveCheck("I have validated the counts")
                  : receiveCheck("");
              }}
              {...label}
              sx={{ ml: 3 }}
            />
            I have validated the counts
          </h6> */}
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
                        disabled={counts === '' || laodingRecieved}
                        style={{ backgroundColor: 'green' }}
                        onClick={(e) => {
                            handelTrayReceived(e)
                        }}
                    >
                        RECEIVED
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={assingNewTray}
                fullWidth
                maxWidth="xs"
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleCloseAssignNewTray}
                >
                    Assign new tray
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <FormControl fullWidth>
                        <InputLabel
                            sx={{ pt: 2 }}
                            id="demo-simple-select-label"
                        >
                            Bot users
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            fullWidth
                            label="User Type"
                            onChange={(e) => {
                                reset({ tray_type: null })
                            }}
                            {...register('user_name')}
                            error={errors.user_name ? true : false}
                            helperText={errors.user_name?.message}
                            sx={{ mt: 2 }}
                        >
                            {botUsers.map((data) => (
                                <MenuItem value={data.user_name}>
                                    {data.user_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel
                            sx={{ pt: 2 }}
                            id="demo-simple-select-label"
                        >
                            Tray Type
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            fullWidth
                            label="User Type"
                            {...register('tray_type')}
                            error={errors.tray_type ? true : false}
                            helperText={errors.tray_type?.message}
                            sx={{ mt: 2 }}
                        >
                            <MenuItem value="">Select</MenuItem>

                            <MenuItem
                                onClick={(e) =>
                                    handelBotTrayCheck(
                                        getValues('user_name'),
                                        'PMT'
                                    )
                                }
                                value="PMT"
                            >
                                PMT
                            </MenuItem>
                            <MenuItem
                                onClick={(e) =>
                                    handelBotTrayCheck(
                                        getValues('user_name'),
                                        'MMT'
                                    )
                                }
                                value="MMT"
                            >
                                MMT
                            </MenuItem>
                        </Select>
                    </FormControl>

                    {userTray != '' ? (
                        <h6 style={{ marginTop: '4px', color: 'red' }}>
                            {userTray}
                        </h6>
                    ) : (
                        ''
                    )}

                    <TextField
                        label="Tray Id"
                        variant="outlined"
                        fullWidth
                        {...register('tray_Id')}
                        error={errors.tray_Id ? true : false}
                        helperText={
                            errors.tray_Id ? errors.tray_Id.message : ''
                        }
                        onChange={(e) => setTrayIdCheck(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton
                                        onClick={(e) => {
                                            handelTrayId(e)
                                        }}
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{ mt: 2 }}
                    />
                    {trayStatus !== '' ? (
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            label="Tray Status"
                            variant="standard"
                            fullWidth
                            value={trayStatus}
                            sx={{ mt: 2 }}
                        />
                    ) : (
                        ''
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{
                            m: 1,
                        }}
                        disabled={
                            (trayStatus !== 'Open' && trayStatus !== 'Inuse') ||
                            userTray !== ''
                                ? true
                                : false || loadingAssign == true
                                ? true
                                : false
                        }
                        variant="contained"
                        style={{ backgroundColor: 'green' }}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Assign
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'PMT And MMT', path: '/' },
                        { name: 'Tray-Close-Request' },
                    ]}
                />
            </div>
            <Button
                variant="contained"
                style={{ backgroundColor: 'primery' }}
                onClick={(e) => {
                    handelOpen()
                }}
            >
                Assign new tray
            </Button>

            <MUIDataTable
                title={'Tray'}
                data={trayData}
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
                    selectableRows: 'none', // set checkbox for each row
                    // search: false, // set search option
                    // filter: false, // set data filter option
                    // download: false, // set download option
                    // print: false, // set print option
                    // pagination: true, //set pagination option
                    // viewColumns: false, // set column option
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            />
        </Container>
    )
}

export default SimpleMuiTable
