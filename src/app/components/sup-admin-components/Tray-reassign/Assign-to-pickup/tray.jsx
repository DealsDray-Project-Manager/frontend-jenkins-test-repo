import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import '../../../../../app.css'
import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    Typography,
    MenuItem,
    TextField,
    Table,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { axiosMisUser, axiosSuperAdminPrexo } from '../../../../../axios'
import CloseIcon from '@mui/icons-material/Close'
import PropTypes from 'prop-types'
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
    const navigate = useNavigate()
    const [mmtTray, setMmtTray] = useState([])
    const [open, setOpen] = useState(false)
    const [submitDis, setSubmitDis] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [sortingAgent, setSortingAgent] = useState([])

    const [mergreData, setMergeData] = useState({
        fromTray: '',
        toTray: '',
        sort_agent: '',
        location: '',
    })
    const [oneStepBackButLoad, setOneStepBackButLoad] = useState(false)
    const { user } = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                let obj = {
                    trayType: 'WHT',
                    sort_id: 'Pickup Request sent to Warehouse',
                }
                let res = await axiosSuperAdminPrexo.post('/tray/assigned', obj)
                if (res.status == 200) {
                    setIsLoading(false)
                    setMmtTray(res.data.data)
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                let token = localStorage.getItem('prexo-authentication')
                if (token) {
                    const { location } = jwt_decode(token)
                    let res = await axiosMisUser.post(
                        '/getSortingAgentMergeMmt/' + location
                    )
                    if (res.status === 200) {
                        setSortingAgent(res.data.data)
                    } else {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'error',
                            title: res?.data?.message,
                            confirmButtonText: 'Ok',
                        })
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
        fetchData()
        return () => setIsAlive(false)
    }, [isAlive])

    const handleClose = () => {
        setOpen(false)
        setSubmitDis(false)
        setMergeData((p) => ({
            fromTray: '',
            toTray: '',
            sort_agent: '',
        }))
    }
    /* OPEN DIALOG BOX */
    const handelMerge = async (e, trayId, totray, locationData) => {
        e.preventDefault()
        try {
            let res = await axiosMisUser.post(
                '/getSortingAgentMergeMmt/' + locationData
            )
            if (res.status === 200) {
                setSortingAgent(res.data.data)
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
        setOpen(true)
        setMergeData((p) => ({
            ...p,
            fromTray: trayId,
            toTray: totray,
            location: locationData,
        }))
    }

    // ONE STEP BACK API
    const handelOneStepBack = async (fromTray, toTray) => {
        try {
            setOneStepBackButLoad(true)
            let trayIds = [
                {
                    tray_status: 'Empty',
                    code: toTray,
                },
                {
                    tray_status: 'Not-empty',
                    code: fromTray,
                },
            ]
            let obj = {
                trayIds: trayIds,
                status: 'Closed By Warehouse',
                actionDoneBy: user.username,
                currentStatus: 'Sorting Request Sent To Warehouse',
            }
            const res = await axiosSuperAdminPrexo.post('/one-step-back', obj)
            if (res.status === 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        setIsAlive((isAlive) => !isAlive)
                        setOneStepBackButLoad(false)
                    }
                })
            } else {
                setOneStepBackButLoad(false)
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
            }
        } catch (error) {
            setOneStepBackButLoad(false)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Ok',
                text: error,
            })
        }
    }

    /* REQUEST SEND TO WAREHOUSE */
    const handelSendRequest = async (e) => {
        e.preventDefault()
        try {
            setSubmitDis(true)
            let res = await axiosMisUser.post('/pickup/reAssign', mergreData)
            if (res.status === 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                handleClose()
                setIsAlive((isAlive) => !isAlive)
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

    const handelViewItem = (id) => {
        navigate('/sup-admin/tray/item-view/' + id)
    }

    const columns = [
        {
            name: 'index',
            label: (
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ marginLeft: '7px' }}
                >
                    <>Record No</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 4 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'cpc', // field name in the row object
            label: (
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ marginLeft: '7px' }}
                >
                    <>CPC</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'code', // field name in the row object
            label: (
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ marginLeft: '7px' }}
                >
                    <>Tray ID</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'rack_id', // field name in the row object
            label: (
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ marginLeft: '7px' }}
                >
                    <>Rack ID</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'rackDetails', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Rack Display</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => value?.[0]?.display,
            },
        },
        {
            name: 'to_tray_for_pickup', // field name in the row object
            label: (
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ marginLeft: '7px' }}
                >
                    <>To Tray</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'limit',
            label: 'Tray Id',
            options: {
                filter: false,
                sort: false,
                display: false,
            },
        },
        {
            name: 'items',
            label: (
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ marginLeft: '7px' }}
                >
                    <>Quantity</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                    value?.length + '/' + tableMeta?.rowData[6],
            },
        },

        {
            name: 'sort_id',
            label: (
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ marginLeft: '7px' }}
                >
                    <>Status</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'issued_user_name',
            label: (
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ marginLeft: '7px' }}
                >
                    <>Assigned to</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'code',
            label: (
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ marginLeft: '7px' }}
                >
                    <>Actions</>
                </Typography>
            ),
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
                                onClick={(e) => {
                                    handelViewItem(value)
                                }}
                                style={{ backgroundColor: 'primery' }}
                            >
                                View
                            </Button>
                            <Button
                                sx={{
                                    m: 1,
                                }}
                                variant="contained"
                                onClick={(e) => {
                                    handelMerge(
                                        e,
                                        value,
                                        tableMeta.rowData[5],
                                        tableMeta.rowData[1]
                                    )
                                }}
                                style={{ backgroundColor: 'green' }}
                            >
                                Reassign
                            </Button>
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
                    Tray Merge
                </BootstrapDialogTitle>

                <DialogContent dividers>
                    <TextField
                        label="From Tray"
                        disabled
                        fullWidth
                        margin="normal"
                        value={mergreData.fromTray}
                    />
                    <TextField
                        label="To Tray"
                        disabled
                        fullWidth
                        margin="normal"
                        value={mergreData.toTray}
                    />

                    <FormControl fullWidth>
                        <InputLabel
                            sx={{ pt: 2 }}
                            id="demo-simple-select-label"
                        >
                            Sorting Agent
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            label="Cpc"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            {sortingAgent.map((data) => (
                                <MenuItem
                                    onClick={(e) => {
                                        setMergeData((p) => ({
                                            ...p,
                                            sort_agent: data.user_name,
                                        }))
                                    }}
                                    value={data.user_name}
                                >
                                    {data.user_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={
                            submitDis ||
                            mergreData.sort_agent === '' ||
                            mergreData.toTray === ''
                        }
                        style={{ backgroundColor: 'green' }}
                        onClick={(e) => {
                            handelSendRequest(e)
                        }}
                    >
                        SUBMIT
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Tray-Reassign', path: '/' },
                        { name: 'Tray' },
                    ]}
                />
            </div>
            <Table className="custom-table">
                <MUIDataTable
                    title={'Pickup'}
                    data={mmtTray}
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
