import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
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
    MenuItem,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { axiosWarehouseIn, axiosMisUser } from '../../../../../axios'
import jwt_decode from 'jwt-decode'
import CloseIcon from '@mui/icons-material/Close'
import PropTypes from 'prop-types'
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

const CtxToStxPage = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [tray, setTray] = useState([])
    const [sortingAgent, setSortingAgent] = useState([])
    const [toStxTray, setStxTray] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [mergreData, setMergeData] = useState({
        fromTray: '',
        toTray: '',
        sort_agent: '',
    })
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    setIsLoading(true)
                    let { location } = jwt_decode(admin)
                    let response = await axiosWarehouseIn.post(
                        '/ctxTray/' + 'Ready to Transfer to STX/' + location
                    )
                    if (response.status === 200) {
                        setIsLoading(false)
                        setTray(response.data.data)
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

    useEffect(() => {
        try {
            let token = localStorage.getItem('prexo-authentication')
            if (token) {
                const { location } = jwt_decode(token)
                const fetchData = async () => {
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
                fetchData()
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Ok',
                text: error,
            })
        }
    }, [isAlive])

    /* OPEN DIALOG BOX */
    const handelSorting = async (
        e,
        model,
        brand,
        trayId,
        itemCount,
        status,
        type
    ) => {
        e.preventDefault()
        try {
            let token = localStorage.getItem('prexo-authentication')
            if (token) {
                const { location } = jwt_decode(token)
                let obj = {
                    location: location,
                    model: model,
                    brand: brand,
                    fromTray: trayId,
                    itemCount: itemCount,
                    status: status,
                    type: type,
                }

                let res = await axiosMisUser.post(
                    '/sorting/ctxToStx/stxTray',
                    obj
                )
                if (res.status === 200) {
                    setOpen(true)
                    setStxTray(res.data.data)
                } else {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: res?.data?.message,
                        confirmButtonText: 'Ok',
                    })
                }
                setMergeData((p) => ({ ...p, fromTray: trayId }))
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
    /******************************************************************************* */
    const handelViewTray = (e, id) => {
        e.preventDefault()
        navigate('/wareshouse/wht/tray/item/' + id)
    }

    /* REQUEST SEND TO WAREHOUSE */
    const handelSendRequest = async (e) => {
        e.preventDefault()
        try {
            let res = await axiosMisUser.post(
                '/sorting/ctxToStx/request/sendToWh',
                mergreData
            )
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

    const columns = [
        {
            name: 'index',
            label: 'Record No',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) =>
                    dataIndex.rowIndex + 1,
            },
        },
        {
            name: 'code', // field name in the row object
            label: 'Tray Id', // column title that will be shown in table
            options: {
                filter: true,
            },
        },

        {
            name: 'name',
            label: 'Tray Display Name',
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
            label: 'Quantity',
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                    value?.length + '/' + tableMeta?.rowData[3],
            },
        },
        {
            name: 'type_taxanomy',
            label: 'Tray Type',
            options: {
                filter: true,
            },
        },
        {
            name: 'display',
            label: 'Tray Display',
            options: {
                filter: true,
            },
        },
        {
            name: 'brand',
            label: 'Brand',
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: 'Model',
            options: {
                filter: true,
            },
        },
        {
            name: 'sort_id',
            label: 'Status',
            options: {
                filter: true,
            },
        },

        {
            name: 'code',
            label: 'Action',
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
                                    handelViewTray(e, value)
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
                                    handelSorting(
                                        e,
                                        tableMeta.rowData[8],
                                        tableMeta.rowData[7],
                                        value,
                                        tableMeta.rowData[5]?.length,
                                        tableMeta.rowData[10],
                                        tableMeta.rowData[5]
                                    )
                                }}
                                style={{ backgroundColor: 'green' }}
                            >
                                Sorting
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
                    <FormControl fullWidth>
                        <InputLabel
                            sx={{ pt: 2 }}
                            id="demo-simple-select-label"
                        >
                            To CTX Tray
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            label="Cpc"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            {toStxTray.map((data) => (
                                <MenuItem
                                    onClick={(e) => {
                                        setMergeData((p) => ({
                                            ...p,
                                            toTray: data.code,
                                        }))
                                    }}
                                    value={data.code}
                                >
                                    {data.code} - ({data.items.length})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
                        { name: 'Sorting', path: '/' },
                        { name: 'CTX to  STX' },
                    ]}
                />
            </div>

            <MUIDataTable
                title={'CTX Tray'}
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
                                (a.data[colIndex] < b.data[colIndex] ? -1 : 1) *
                                (order === 'desc' ? 1 : -1)
                            )
                        })
                    },
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            />
        </Container>
    )
}

export default CtxToStxPage
