import React, { useEffect, useState, useMemo, useRef } from 'react'
import {
    Box,
    Button,
    TextField,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Grid,
    DialogContent,
    DialogActions,
    Dialog,
    DialogTitle,
    IconButton,
} from '@mui/material'
import { Breadcrumb } from 'app/components'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'
import jwt_decode from 'jwt-decode'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import useAuth from 'app/hooks/useAuth'
import SelectCanBin from './select-can-bin'
// import jwt from "jsonwebtoken"
import { axiosWarehouseIn } from '../../../../../axios'

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

export default function DialogBox() {
    const navigate = useNavigate()
    const [trayData, setTrayData] = useState([])
    const { trayId } = useParams()
    const [loading, setLoading] = useState(false)
    const [textDisable, setTextDisable] = useState(false)
    const { user } = useAuth()
    /**************************************************************************** */
    const [uic, setUic] = useState('')
    const [addButDis, setAddButDis] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [stateData, setStateData] = useState({})
    const [itemDataVer, setItemDataVer] = useState({})
    const [open, setOpen] = React.useState(false)
    const [description, setDescription] = useState([])
    const [dialogOne, setDialogOne] = useState(false)
    const [countOfNr, setCountOfNr] = useState(0)

    /*********************************************************** */

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axiosWarehouseIn.post(
                    `/oneTrayViewForCanBin/${trayId}/${user.location}`
                )
                if (response.status === 200) {
                    if (
                        response?.data?.data?.[0]?.can_bin_tray == null ||
                        response?.data?.data?.[0]?.can_bin_tray === undefined
                    ) {
                        setCountOfNr(response?.data?.countOfNr)
                        setDialogOne(true)
                    }
                    //  else if (response?.data?.data?.[1]?.sort_id == 'Closed') {
                    //     setCountOfNr(response?.data?.countOfNr)
                    //     setDialogOne(true)
                    // }
                    setTrayData(response?.data?.data)
                } else {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: response?.data?.message,
                        confirmButtonText: 'Ok',
                    })
                    navigate(-1)
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

    const schema = Yup.object().shape({
        description: Yup.string().required('Required*').nullable(),
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

    const handelUic = async (e) => {
        if (e.target.value.length === 11) {
            try {
                let obj = {
                    uic: e.target.value,
                    trayId: trayId,
                }
                setTextDisable(true)

                let res = await axiosWarehouseIn.post('/canBinUicScan', obj)
                if (res?.status == 200) {
                    setTextDisable(false)
                    if (res.data.flag === 1) {
                        setItemDataVer(res.data.data)
                        handleOpen()
                    } else {
                        setUic('')
                        // Swal.fire({
                        //     position: 'top-center',
                        //     icon: 'success',
                        //     title: res?.data?.message,
                        //     confirmButtonText: 'Ok',
                        // })
                        setRefresh((refresh) => !refresh)
                    }
                } else {
                    setTextDisable(false)
                    setUic('')

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
    }

    /************************************************************************** */
    const onSubmit = async (value) => {
        setAddButDis(true)
        let admin = localStorage.getItem('prexo-authentication')
        if (admin) {
            const { user_name } = jwt_decode(admin)
            try {
                let obj = {
                    uic: uic,
                    trayId: trayId,
                    item: itemDataVer,
                    username: user_name,
                    description: value.description,
                    cbt: trayData?.[1]?.code,
                }
                let res = await axiosWarehouseIn.post('/addToCanBin', obj)
                if (res.status == 200) {
                    handleClose()
                    setAddButDis(false)
                    setUic('')
                    // Swal.fire({
                    //     position: 'top-center',
                    //     icon: 'success',
                    //     title: res?.data?.message,
                    //     confirmButtonText: 'Ok',
                    // })
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
    }

    const handleChange = ({ target: { name, value } }) => {
        if (name === 'stage') {
            setStateData({
                [name]: value,
            })
        } else {
            setStateData({
                ...stateData,
                [name]: value,
            })
        }
    }
    const handleClose = () => {
        setOpen(false)
        setStateData({})
    }

    const handleOpen = () => {
        reset({})
        setOpen(true)
    }

    /************************************************************************** */
    const handelIssue = async (e, sortId) => {
        try {
            setLoading(true)
            let obj = {
                trayId: trayId,
                sortId: trayData?.[0]?.sort_id,
                actionUser: user.username,
                description: description,
            }
            let res = await axiosWarehouseIn.post('/closeCanBinTray', obj)
            if (res.status == 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                navigate('/warehouse/can-bin-pending-units')
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

    const tableExpected = useMemo(() => {
        return (
            <Paper sx={{ width: '95%', overflow: 'hidden', m: 1 }}>
                <Box sx={{}}>
                    <Box
                        sx={{
                            float: 'left',
                            ml: 2,
                        }}
                    >
                        <h5>CAN BIN :-{trayData?.[1]?.code}</h5>
                    </Box>
                    <Box
                        sx={{
                            float: 'right',
                            mr: 2,
                        }}
                    >
                        <Box sx={{}}>
                            <h5 style={{ marginLeft: '12px' }}>Total</h5>
                            <p style={{ paddingLeft: '5px', fontSize: '22px' }}>
                                {trayData?.[1]?.items?.length}/
                                {trayData?.[1]?.limit}
                            </p>
                        </Box>
                    </Box>
                </Box>
                <TableContainer>
                    <Table
                        style={{ width: '100%' }}
                        id="example"
                        stickyHeader
                        aria-label="sticky table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ pl: 2 }}>S.NO</TableCell>
                                <TableCell>UIC</TableCell>
                                <TableCell>MUIC</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {trayData?.[0]?.temp_array?.map((data, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell sx={{ pl: 3 }}>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{data?.uic}</TableCell>
                                    <TableCell>{data?.muic}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }, [trayData?.[0]?.temp_array])

    const tableActual = useMemo(() => {
        return (
            <Paper sx={{ width: '98%', overflow: 'hidden', m: 1 }}>
                <Box sx={{}}>
                    <Box
                        sx={{
                            float: 'left',
                            ml: 2,
                        }}
                    >
                        <h5>
                            LEAVE THE ITEM IN THE TRAY :-{trayData?.[0]?.code}
                        </h5>
                    </Box>
                    <Box
                        sx={{
                            float: 'right',
                            mr: 2,
                        }}
                    >
                        <Box sx={{}}>
                            <h5 style={{ marginLeft: '12px' }}>Total</h5>
                            <p style={{ marginLeft: '5px', fontSize: '24px' }}>
                                {trayData?.[0]?.actual_items?.length}/
                                {trayData?.[0]?.limit}
                            </p>
                        </Box>
                    </Box>
                </Box>
                <TableContainer>
                    <Table
                        style={{ width: '100%' }}
                        id="example"
                        stickyHeader
                        aria-label="sticky table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ pl: 2 }}>S.NO</TableCell>
                                <TableCell>UIC</TableCell>
                                <TableCell>MUIC</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {trayData?.[0]?.actual_items?.map((data, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell sx={{ pl: 3 }}>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{data?.uic}</TableCell>
                                    <TableCell>{data?.muic}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }, [trayData?.[0]?.actual_items, textDisable, uic])

    const ScanUic = useMemo(() => {
        return (
            <TextField
                sx={{ mt: 1, ml: 1 }}
                id="outlined-password-input"
                type="text"
                disabled={textDisable}
                name="doorsteps_diagnostics"
                label="SCAN UIC"
                inputRef={(input) => input && input.focus()}
                autoFocus
                value={uic}
                onKeyPress={(e) => {
                    if (user.serverType == 'Live') {
                        // Prevent manual typing by intercepting key presses
                        e.preventDefault()
                    }
                }}
                onPaste={(e) => {
                    if (user.serverType == 'Live') {
                        // Prevent manual typing by intercepting key presses
                        e.preventDefault()
                    }
                }}
                onChange={(e) => {
                    setUic(e.target.value)
                    handelUic(e)
                }}
                inputProps={{
                    style: {
                        width: 'auto',
                    },
                }}
            />
        )
    }, [uic])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Can Bin', path: '/' },
                        { name: 'Start' },
                    ]}
                />
            </div>
            <Box>
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
                            label="CBT Tray ID"
                            fullWidth
                            name="cbt"
                            sx={{
                                mb: 2,
                            }}
                            type="text"
                            disabled
                            value={trayData?.[1]?.code}
                            variant="outlined"
                        />

                        <TextField
                            label="Description"
                            fullWidth
                            name="description"
                            sx={{
                                mb: 2,
                            }}
                            {...register('description')}
                            error={errors.description ? true : false}
                            helperText={errors.description?.message}
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
                            ADD TO CAN BIN
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
                {dialogOne ? (
                    <SelectCanBin
                        dialogOne={dialogOne}
                        setDialogOne={setDialogOne}
                        trayId={trayId}
                        setRefresh={setRefresh}
                        countOfNr={countOfNr}
                    />
                ) : null}

                <Box>
                    <Box
                        sx={{
                            float: 'left',
                        }}
                    >
                        <h4 style={{ marginLeft: '13px' }}>
                            TRAY ID - {trayId}
                        </h4>
                        {ScanUic}
                    </Box>

                    <Box
                        sx={{
                            float: 'right',
                        }}
                    >
                        <h4 style={{ marginRight: '13px' }}>
                            Brand -- {trayData?.[0]?.brand}
                        </h4>
                        <h4 style={{ marginRight: '13px' }}>
                            Model -- {trayData?.[0]?.model}
                        </h4>
                    </Box>
                </Box>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        {tableExpected}
                    </Grid>
                    <Grid item xs={6}>
                        {tableActual}
                    </Grid>
                </Grid>
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
                            sx={{ m: 3, mb: 9 }}
                            variant="contained"
                            disabled={
                                trayData?.[0]?.items?.length != 0 ||
                                loading == true ||
                                description == ''
                            }
                            style={{ backgroundColor: 'green' }}
                            onClick={(e) => {
                                if (window.confirm('You Want to Close?')) {
                                    handelIssue(e)
                                }
                            }}
                        >
                            Close
                        </Button>
                    </Box>
                </div>
            </Box>
        </Container>
    )
}
