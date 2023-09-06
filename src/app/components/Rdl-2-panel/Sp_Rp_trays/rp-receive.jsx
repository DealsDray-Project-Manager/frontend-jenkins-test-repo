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
} from '@mui/material'
import { Breadcrumb } from 'app/components'
import { styled } from '@mui/material/styles'
import { axiosRdlTwoAgent, axiosWarehouseIn } from '../../../../axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
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

export default function DialogBox() {
    const navigate = useNavigate()
    const [trayData, setTrayData] = useState([])
    const { trayId } = useParams()
    const [loading, setLoading] = useState(false)
    const [textDisable, setTextDisable] = useState(false)
    /**************************************************************************** */
    const [uic, setUic] = useState('')
    const [refresh, setRefresh] = useState(false)
    const { user } = useAuth()
    /*********************************************************** */

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let response = await axiosWarehouseIn.post(
                        '/getWhtTrayItem/' +
                            trayId +
                            '/' +
                            'Issued to RDL-two/' +
                            location
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

                let res = await axiosWarehouseIn.post('/check-uic', obj)
                if (res?.status == 200) {
                    setUic('')
                    setTextDisable(false)
                    setLoading(false)
                    setRefresh((refresh) => !refresh)
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
    const addActualitem = async (obj) => {
        if (trayData.items.length < trayData?.actual_items?.length) {
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'All items Scanned',
                confirmButtonText: 'Ok',
            })
        } else {
            try {
                let objData = {
                    trayId: trayId,
                    item: obj,
                }
                setTextDisable(true)
                let res = await axiosWarehouseIn.post(
                    '/wht-add-actual-item',
                    objData
                )
                if (res.status == 200) {
                    setUic('')
                    setTextDisable(false)
                    setRefresh((refresh) => !refresh)
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
    const handelIssue = async (e) => {
        try {
            setLoading(true)
            let res = await axiosRdlTwoAgent.post('/recieved-sp-tray/' + trayId)
            if (res.status == 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                navigate('/rdl-two/tray')
            } else {
                alert(res.data.message)
            }
        } catch (error) {
            alert(error)
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
                        <h5>EXPECTED</h5>
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
                                {trayData?.items?.length} / {trayData?.limit}
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
                                    <TableCell sx={{ pl: 4 }}>
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
                        <h5>ACTUAL</h5>
                        <TextField
                            sx={{ mt: 1 }}
                            id="outlined-password-input"
                            type="text"
                            disabled={textDisable}
                            name="doorsteps_diagnostics"
                            inputRef={(input) => input && input.focus()}
                            label="SCAN UIC"
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
                    </Box>
                    <Box
                        sx={{
                            float: 'right',
                            mr: 2,
                        }}
                    >
                        <Box sx={{}}>
                            <h5 style={{ marginLeft: '12px' }}>Total</h5>
                            <p style={{ marginLeft: '5px', fontSize: '22px' }}>
                                {trayData?.actual_items?.length} /{' '}
                                {trayData?.limit}
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
                                    <TableCell sx={{ pl: 4 }}>
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
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Tray', path: '/' },
                        { name: 'Resticker' },
                    ]}
                />
            </div>
            <Box
                sx={{
                    mt: 1,
                    height: 70,
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Box
                    sx={{
                        float: 'left',
                    }}
                >
                    <h4 style={{ marginLeft: '13px' }}>
                        Issued Date :{' '}
                        {new Date(trayData?.requested_date).toLocaleString(
                            'en-GB',
                            {
                                hour12: true,
                            }
                        )}
                    </h4>
                    <h4 style={{ marginLeft: '13px' }}>RP Tray : {trayId}</h4>
                </Box>

                <Box
                    sx={{
                        float: 'left',
                    }}
                >
                    <h4 style={{ marginLeft: '13px' }}>
                        Brand : {trayData?.brand}
                    </h4>
                    <h4 style={{ marginLeft: '13px' }}>
                        Model : {trayData?.model}
                    </h4>
                </Box>
            </Box>
            <Grid container spacing={1} sx={{ mt: 2 }}>
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
                        sx={{ m: 3, mb: 9 }}
                        variant="contained"
                        disabled={
                            loading == true ||
                            trayData?.actual_items?.length !==
                                trayData?.items?.length
                        }
                        style={{ backgroundColor: 'green' }}
                        onClick={(e) => {
                            handelIssue()
                        }}
                    >
                        Recieved
                    </Button>
                </Box>
            </div>
        </Container>
    )
}
