import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate, useParams } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import {
    Button,
    Typography,
    Table,
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    DialogActions,
    MenuItem,
    TextField,
    Box,
} from '@mui/material'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import { axiosWarehouseIn, axiosSuperAdminPrexo } from '../../../../../axios'
import Swal from 'sweetalert2'
import '../../../../../app.css'
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

const TextFieldCustOm = styled(TextField)(() => ({
    width: '100%',
    marginBottom: '16px',
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
    const [trayData, setTray] = useState({})
    const { trayId } = useParams()
    const [stxTray, setStxTray] = useState([])
    const [butDiss, setButDiss] = useState(false)
    const navigate = useNavigate()
    const { user } = useAuth()
    const [open, setOpen] = React.useState(false)
    const [refresh, setRefresh] = useState(false)
    const [selectedStx, setSelectedStx] = useState({
        uic: '',
        stx: '',
    })
    const [rackiddrop, setrackiddrop] = useState([])
    const [rackId, setRackId] = useState('')
    const [description, setDescription] = useState('')
    const [closeButtonDisable, setCloseButtonDisable] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { user_name } = jwt_decode(admin)
                    let response = await axiosWarehouseIn.post(
                        `/startRpaToStxPage/${trayId}/${'Assigned to Warehouse for Stx Sorting'}/${user_name}`
                    )
                    if (response.status === 200) {
                        setTray(response.data.data)
                    }
                } else {
                    navigate('/')
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }
        }
        fetchData()
    }, [refresh])

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axiosSuperAdminPrexo.post(
                    '/trayracks/view/' + user.warehouse
                )
                if (res.status == 200) {
                    setrackiddrop(res.data.data)
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }
        }
        fetchData()
    }, [])

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = async (uic, brand, model) => {
        try {
            setSelectedStx({
                uic: uic,
                stx: '',
            })
            let obj = {
                uic: uic,
                brand: brand,
                model: model,
                location: user.location,
            }
            let res = await axiosWarehouseIn.post('/getStxTrayForRpaToStx', obj)
            if (res.status == 200) {
                setStxTray(res.data.data)
                setOpen(true)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonText: 'Ok',
                    text: res.data.message,
                })
            }
        } catch (error) {
            alert(error)
        }
    }

    // HANDEL SUBMIT
    const handelSubmit = async () => {
        try {
            handleClose()
            setButDiss(true)
            let obj = {
                uic: selectedStx.uic,
                stxTray: selectedStx.stx,
                rpaTray: trayData.code,
                actionUser: user.username,
            }
            const res = await axiosWarehouseIn.post('/addItemToStxFromRpa', obj)
            if (res.status == 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res.data.message,
                })
                setRefresh((refresh) => !refresh)
                setButDiss(false)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonText: 'Ok',
                    text: res.data.message,
                })
                setRefresh((refresh) => !refresh)
            }
            setButDiss(false)
        } catch (error) {
            setButDiss(false)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Ok',
                text: error,
            })
        }
    }

    // HANDLE CLOSE
    const handelCloseTray = async () => {
        try {
            setCloseButtonDisable(true)
            let obj = {
                code: trayData.code,
                actionUser: user.username,
                rack_id: rackId,
            }
            const res = await axiosWarehouseIn.post(
                '/closeRpaAfterRpaToStx',
                obj
            )
            if (res.status === 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                navigate('/warehouse/rpa-to-stx/assigned-trays')
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

    const columns = [
        {
            name: 'index',
            label: (
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ ml: 2 }}
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
            name: 'uic',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>UIC</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'brand_name',
            label: <Typography sx={{ fontWeight: 'bold' }}>Brand</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'model_name',
            label: <Typography sx={{ fontWeight: 'bold' }}>Model</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'finel_grade',
            label: <Typography sx={{ fontWeight: 'bold' }}>Grade</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'uic',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Action</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <Button
                            sx={{
                                m: 1,
                            }}
                            variant="contained"
                            style={{ backgroundColor: 'green' }}
                            component="span"
                            onClick={(e) => {
                                handleOpen(
                                    tableMeta.rowData[1],
                                    tableMeta.rowData[2],
                                    tableMeta.rowData[3]
                                )
                            }}
                        >
                            STX Tray
                        </Button>
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
                    Add to Stx
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <TextField
                        label="Select Stx Id"
                        variant="outlined"
                        select
                        fullWidth
                        name="stXTrayId"
                        sx={{ mt: 2 }}
                        onChange={(e) => {
                            setSelectedStx({
                                ...selectedStx,
                                stx: e.target.value,
                            })
                        }}
                    >
                        {stxTray.map((tray) => (
                            <MenuItem value={tray.code} key={tray.code}>
                                {tray.code}-({tray?.items?.length})
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{
                            m: 1,
                        }}
                        variant="contained"
                        style={{ backgroundColor: 'green' }}
                        type="submit"
                        disabled={butDiss || selectedStx.stx == ''}
                        onClick={(e) => {
                            handelSubmit()
                        }}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'RPA to STX', path: '/' },
                        { name: 'Assigned Trays Units' },
                    ]}
                />
            </div>
            <Table className="custom-table">
                <MUIDataTable
                    title={'Units'}
                    data={trayData?.items}
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
            </Table>
            <Box
                sx={{
                    float: 'right',
                    mt: 1,
                }}
            >
                <TextFieldCustOm
                    sx={{ m: 1 }}
                    label="Rack ID"
                    select
                    style={{ width: '150px' }}
                    name="rack_id"
                >
                    {rackiddrop?.map((data) => (
                        <MenuItem
                            onClick={(e) => {
                                setRackId(data.rack_id)
                            }}
                            value={data.rack_id}
                        >
                            {data.rack_id}
                        </MenuItem>
                    ))}
                </TextFieldCustOm>

                <textarea
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                    style={{ width: '300px', height: '60px' }}
                    placeholder="Description"
                ></textarea>
                <Button
                    sx={{
                        mb: 4,
                        ml: 2,
                    }}
                    disabled={
                        closeButtonDisable ||
                        description == '' ||
                        rackId == '' ||
                        trayData?.items?.length !== 0
                    }
                    variant="contained"
                    onClick={(e) => {
                        if (window.confirm('You want to Close?')) {
                            handelCloseTray(e)
                        }
                    }}
                    style={{ backgroundColor: 'red' }}
                >
                    Close
                </Button>
            </Box>
        </Container>
    )
}

export default SimpleMuiTable
