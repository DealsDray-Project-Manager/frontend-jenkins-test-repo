import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { axiosWarehouseIn } from '../../../../../axios'
import { useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import jwt_decode from 'jwt-decode'
import {
    Typography,
    Table,
    DialogContent,
    DialogActions,
    Dialog,
    DialogTitle,
    IconButton,
    TextField,
    Button,
    MenuItem,
    Box,
} from '@mui/material'
import '../../../../../app.css'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
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
    const navigate = useNavigate()
    const [whtTray, setWhtTray] = useState({})
    const { trayId } = useParams()
    const [open, setOpen] = React.useState(false)
    const { user } = useAuth()
    const [uic, setUic] = useState('')
    const [addButDis, setAddButDis] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [description, setDescription] = useState([])
    const [loading, setLoading] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }

    const schema = Yup.object().shape({
        pmt_bin_status: Yup.string().required('Required*').nullable(),
        pmt_bin_user_remark: Yup.string().required('Required*').max(100).nullable(),
    })
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axiosWarehouseIn.post(
                    `/getOnePmtDataForPmtBin/${trayId}/${user.location}`
                )
                if (response.status === 200) {
                    setWhtTray(response.data.data)
                } else {
                    navigate(-1)
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: response?.data?.message,
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
        fetchData()
    }, [refresh])

    const onSubmit = async (value) => {
        setAddButDis(true)
        try {
            let obj = {
                uic: uic,
                trayId: trayId,
                actionUsername: user.username,
                pmt_bin_user_remark: value.pmt_bin_user_remark,
                pmt_bin_status: value?.pmt_bin_status,
            }
            let res = await axiosWarehouseIn.post('/add-unit-to-pmt-bin', obj)
            if (res.status == 200) {
                handleClose()
                setAddButDis(false)
                setUic('')
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                setRefresh((refresh) => !refresh)
            } else {
                handleClose()
                setUic('')
                setAddButDis(false)
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

    const handelPmtBin = (uic) => {
        setUic(uic)
        reset({})
        setOpen(true)
    }

    // HANDEL CLOSE THE TRAY
    const handelIssue = async (e, sortId) => {
        try {
            setLoading(true)
            let obj = {
                trayId: trayId,
                description: description,
                actionUsername: user.username,
            }
            let res = await axiosWarehouseIn.post(
                '/close-pmt-tray-pmt-bin',
                obj
            )
            if (res.status == 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                setLoading(false)
                navigate('/warehouse/all-pmt-tray')
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
            name: 'uic',
            label: <Typography sx={{ fontWeight: 'bold' }}>UIC</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'muic',
            label: <Typography sx={{ fontWeight: 'bold' }}>MUIC</Typography>,
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
            name: 'uic',
            label: <Typography sx={{ fontWeight: 'bold' }}>Action</Typography>,
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
                                onClick={() => handelPmtBin(value)}
                                style={{ backgroundColor: 'green' }}
                                component="span"
                            >
                                Add to PMT BIN
                            </Button>
                        </>
                    )
                },
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: 'Tray Items', path: '/' }]}
                />
            </div>
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
                    Add
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <TextField
                        label="Description"
                        fullWidth
                        name="description"
                        sx={{
                            mb: 2,
                        }}
                        disabled
                        value={uic}
                        type="text"
                        variant="outlined"
                    />
                    <TextField
                        label="Select Status"
                        fullWidth
                        name="cbt"
                        sx={{
                            mb: 2,
                        }}
                        type="text"
                        select
                        variant="outlined"
                        {...register('pmt_bin_status')}
                        error={errors.pmt_bin_status ? true : false}
                        helperText={errors.pmt_bin_status?.message}
                    >
                        <MenuItem value="Reusable">Reusable</MenuItem>
                        <MenuItem value="Reusable">Not Reusable</MenuItem>
                    </TextField>

                    <TextField
                        label="Description"
                        fullWidth
                        name="description"
                        sx={{
                            mb: 2,
                        }}
                        {...register('pmt_bin_user_remark')}
                        error={errors.pmt_bin_user_remark ? true : false}
                        helperText={errors.pmt_bin_user_remark?.message}
                        type="text"
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{ ml: 2 }}
                        disabled={addButDis}
                        onClick={handleSubmit(onSubmit)}
                        variant="contained"
                        color="primary"
                    >
                        ADD TO PMT BIN
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Box>
                    <Typography>Tray ID:-{whtTray?.code}</Typography>
                </Box>
                <Box>
                    <Typography>Rack ID:-{whtTray?.rack_id}</Typography>
                    <Typography>
                        Rack Display:-{whtTray?.rackData?.[0]?.display}
                    </Typography>
                </Box>
            </Box>
            <Table className="custom-table">
                <MUIDataTable
                    title={'Units'}
                    data={whtTray?.items}
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
            <div style={{ float: 'right' }}>
                <Box sx={{ float: 'right' }}>
                    <textarea
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                        style={{ width: '300px', height: '60px' }}
                        placeholder="Description"
                    ></textarea>
                    <Button
                        sx={{ mt: 2, ml: 2, mb: 9 }}
                        variant="contained"
                        disabled={
                            whtTray?.items?.length !== 0 ||
                            loading == true ||
                            description == ''
                                ? true
                                : false
                        }
                        style={{ backgroundColor: 'green' }}
                        onClick={(e) => {
                            if (window.confirm('You Want to Close?')) {
                                handelIssue(e)
                            }
                        }}
                    >
                        Tray Release
                    </Button>
                </Box>
            </div>
        </Container>
    )
}

export default SimpleMuiTable
