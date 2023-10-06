import React, { useEffect, useState, useMemo } from 'react'
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
    Card,
    Typography,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    IconButton,
    MenuItem,
} from '@mui/material'
import { Breadcrumb } from 'app/components'
import { styled } from '@mui/system'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
// import jwt from "jsonwebtoken"
import useAuth from 'app/hooks/useAuth'
import CloseIcon from '@mui/icons-material/Close'
import PropTypes from 'prop-types'
import { axiosSortingAgent, axiosCharging } from '../../../../axios'

const TextFieldCustOm = styled(TextField)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

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
    const [screenType, setScreenType] = useState('')
    const [loading, setLoading] = useState(false)
    const [textDisable, setTextDisable] = useState(false)
    /**************************************************************************** */
    const [uic, setUic] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [open, setOpen] = useState(false)
    const [addUicData, setUicData] = useState({})
    const { user } = useAuth()
    const [copyGradeReport, setCopyGradeReport] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axiosSortingAgent.post(
                    `/copyGradingStartWork/${trayId}/${user.username}`
                )
                if (response.status === 200) {
                    setTrayData(response.data.data)
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

    const handelUic = async (e) => {
        if (e.target.value.length === 11) {
            try {
                let obj = {
                    uic: e.target.value,
                    trayId: trayId,
                }
                setTextDisable(true)
                let res = await axiosSortingAgent.post(
                    '/copyGradingCheckUic',
                    obj
                )
                if (res?.status == 200) {
                    setOpen(true)
                    setCopyGradeReport(res.data.copyGradeReport)
                    setUicData(res.data.data)
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

    const handleClose = () => {
        setOpen(false)
        setLoading(false)
        setUic('')
        setScreenType('')
        setTextDisable(false)
    }

    // HANDEL ACTION
    const handelAction = async () => {
        try {
            handleClose()
            setLoading(true)
            let obj = {
                item: addUicData,
                trayId: trayId,
                username: user.username,
                screenType: screenType,
            }
            const res = await axiosSortingAgent.post(
                '/copyGradingAddItems',
                obj
            )
            if (res.status == 200) {
                setUic('')
                setLoading(false)
                setRefresh((refresh) => !refresh)
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonText: 'Ok',
                    text: res?.data?.message,
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

    // HANDEL CLOSE THE TRAY
    const handelIssue = async () => {
        try {
            setLoading(true)
            const res = await axiosSortingAgent.post(
                `/copyGradingCloseTray/${trayId}`
            )
            if (res.status == 200) {
                setLoading(false)
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                navigate('/sorting/display-grading-requests')
            } else {
                setLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonText: 'Ok',
                    text: res?.data?.message,
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
                        <h4>Tray Items</h4>
                    </Box>
                    <Box
                        sx={{
                            float: 'right',
                            mr: 2,
                        }}
                    >
                        <Box sx={{}}>
                            <h4 style={{ marginLeft: '10px' }}>Total</h4>
                            <p style={{ fontSize: '22px' }}>
                                {
                                    trayData?.items?.filter(function (item) {
                                        return item.status != 'Duplicate'
                                    }).length
                                }
                                /{trayData?.limit}
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
                            {trayData?.items?.map((data, index) => (
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
    }, [trayData?.items])

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
                        <h4>Screen Type Added Items</h4>
                        <TextField
                            sx={{ mt: 1 }}
                            id="outlined-password-input"
                            type="text"
                            disabled={textDisable}
                            name="doorsteps_diagnostics"
                            inputRef={(input) => input && input.focus()}
                            label="SCAN UIC"
                            value={uic}
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
                    </Box>
                    <Box
                        sx={{
                            float: 'right',
                            mr: 2,
                        }}
                    >
                        <Box sx={{}}>
                            <h4 style={{ marginLeft: '5px' }}>Total</h4>
                            <p style={{ fontSize: '24px' }}>
                                {
                                    trayData.actual_items?.filter(function (
                                        item
                                    ) {
                                        return item.status != 'Duplicate'
                                    }).length
                                }
                                /{trayData?.limit}
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
                            {trayData?.actual_items?.map((data, index) => (
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
    }, [trayData?.actual_items, textDisable, uic])

    return (
        <Container>
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                    width="600px"
                >
                    Please Select Screent Type
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <TextFieldCustOm
                        label="Uic"
                        type="text"
                        name="uic"
                        value={addUicData?.uic}
                        disabled
                    />
                    {Object.keys(copyGradeReport).length !== 0 ? (
                        <>
                            <TextFieldCustOm
                                label="Previous Grade"
                                type="text"
                                name="previous Grade"
                                value={copyGradeReport?.grade}
                                disabled
                            />
                            <TextFieldCustOm
                                label="Last Grade Update Date"
                                type="text"
                                name="Last Grade Update Date"
                                value={new Date(
                                    copyGradeReport?.date
                                ).toLocaleString('en-GB', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                })}
                                disabled
                            />
                        </>
                    ) : null}
                    <TextFieldCustOm
                        label="Please select"
                        select
                        type="text"
                        name="uic"
                        onChange={(e) => {
                            setScreenType(e.target.value)
                        }}
                    >
                        <MenuItem value="C">C</MenuItem>
                        <MenuItem value="G">G</MenuItem>
                    </TextFieldCustOm>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{
                            ml: 2,
                        }}
                        fullwidth
                        variant="contained"
                        style={{ backgroundColor: 'primery' }}
                        disabled={loading || screenType == ''}
                        component="span"
                        onClick={(e) => {
                            handelAction(e)
                        }}
                    >
                        Add
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Display Grading Requests', path: '/' },
                        { name: 'Start Display Grading', path: '/' },
                    ]}
                />
            </div>
            <Card>
                <Box display="flex" justifyContent="space-between">
                    <Box>
                        <Box sx={{ display: 'flex' }}>
                            <Typography sx={{ ml: 2 }}>
                                TRAY ID :- {trayId}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <Typography sx={{ ml: 2, mt: 1 }}>
                                Brand :- {trayData?.brand}
                            </Typography>
                            <Typography sx={{ ml: 2, mt: 1 }}>
                                Model :- {trayData?.model}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Card>
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
                    <Button
                        sx={{ m: 3, mb: 7 }}
                        variant="contained"
                        disabled={
                            trayData?.actual_items?.length !==
                                trayData?.items?.length || loading
                        }
                        style={{ backgroundColor: 'green' }}
                        onClick={(e) => {
                            if (window.confirm('You Want to Issue?')) {
                                handelIssue(e)
                            }
                        }}
                    >
                        Close & Send
                    </Button>
                </Box>
            </div>
        </Container>
    )
}
