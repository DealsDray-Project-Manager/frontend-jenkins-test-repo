import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import AssignTrayDialogBox from './assign-tray'
import Swal from 'sweetalert2'

import {
    Button,
    TextField,
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    DialogActions,
} from '@mui/material'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import Checkbox from '@mui/material/Checkbox'
import { axiosMisUser, axiosWarehouseIn } from '../../../../../axios'

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
    const [auditUsers, setAuditUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let res = await axiosWarehouseIn.post(
                        '/retunrFromAudit/' + location
                    )
                    if (res.status == 200) {
                        setIsLoading(false)
                        setTray(res.data.data)
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
        navigate('/wareshouse/wht/return-from-audit/close/' + id)
    }

    const handelTrayReceived = async () => {
        if (counts === '') {
            Swal.fire({
                position: 'top-center',
                icon: 'warning',
                title: 'Please Confirm Counts',
                confirmButtonText: 'Ok',
            })
        } else {
            try {
                let obj = {
                    trayId: trayId,
                    counts: counts,
                }
                let res = await axiosWarehouseIn.post(
                    '/recievedFromOtherTray',
                    obj
                )
                if (res.status == 200) {
                    setOpen(false)
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: res?.data?.message,
                        confirmButtonText: 'Ok',
                    })
                    setIsAlive((isAlive) => !isAlive)
                } else {
                    setOpen(false)
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
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handelViewTray = (e, id) => {
        e.preventDefault()
        navigate('/wareshouse/wht/return-from-audit/tray-items/' + id)
    }

    const handleDialogClose = () => {
        setShouldOpenEditorDialog(false)
    }

    const handleDialogOpen = () => {
        setShouldOpenEditorDialog(true)
    }

    const handelGetAuditUser = () => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let res = await axiosMisUser.post(
                        '/get-charging-users/' + 'Audit/' + location
                    )
                    if (res.status == 200) {
                        setAuditUsers(res.data.data)
                        handleDialogOpen()
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
            name: 'code',
            label: 'Tray Id',
            options: {
                filter: true,
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
            name: 'sort_id',
            label: 'Status',
            options: {
                filter: true,
            },
        },
        {
            name: 'issued_user_name',
            label: 'Agent Name',
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
            name: 'limit',
            label: 'limit',
            options: {
                filter: false,
                sort: false,
                display: false,
            },
        },

        {
            name: 'closed_time_bot',
            label: 'Audit Done Date',
            options: {
                filter: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
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
                            {tableMeta.rowData[3] != 'Received From Audit' ? (
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
                        disabled={counts === ''}
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
                        { name: 'WHT', path: '/' },
                        { name: 'Return-from-Audit' },
                    ]}
                />
            </div>
            <Button
                variant="contained"
                sx={{ mb: 1 }}
                style={{ backgroundColor: 'primery' }}
                onClick={(e) => {
                    handelGetAuditUser()
                }}
            >
                Assign new tray
            </Button>

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
                    elevation: 0,
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
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            />
            {shouldOpenEditorDialog && (
                <AssignTrayDialogBox
                    handleClose={handleDialogClose}
                    open={handleDialogOpen}
                    auditUsers={auditUsers}
                    setIsAlive={setIsAlive}
                />
            )}
        </Container>
    )
}

export default SimpleMuiTable
