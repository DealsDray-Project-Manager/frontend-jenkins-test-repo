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
import { styled } from '@mui/system'
import { useParams, useNavigate } from 'react-router-dom'
import { axiosWarehouseIn } from '../../../../../axios'
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
    const { trayId, sortId } = useParams()
    const [textDisable, setTextDisable] = useState(false)
    /**************************************************************************** */
    const [uic, setUic] = useState('')
    const [refresh, setRefresh] = useState(false)
    const { user } = useAuth()

    /*********************************************************** */
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axiosWarehouseIn.post(
                    '/get-tray-sorting/' + trayId
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
                let res = await axiosWarehouseIn.post('/check-uic', obj)
                if (res?.status === 200) {
                    setUic('')
                    setTextDisable(false)
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
        if (trayData.limit <= trayData?.actual_items?.length) {
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'All Items Scanned',
                confirmButtonText: 'Ok',
            })
        } else {
            setTextDisable(true)
            try {
                let objData = {
                    trayId: trayId,
                    item: obj,
                }
                let res = await axiosWarehouseIn.post(
                    '/wht-add-actual-item',
                    objData
                )
                if (res.status === 200) {
                    setUic('')
                    setTextDisable(false)
                    setRefresh((refresh) => !refresh)
                } else {
                    setTextDisable(false)

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
    const handelIssue = async (e) => {
        e.preventDefault()
        navigate(-1)
    }
    /************************************************************************** */
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
                            <h5 style={{ marginLeft: '14px' }}>Total</h5>
                            <p style={{ paddingLeft: '5px', fontSize: '22px' }}>
                                {trayData?.items?.length}/{trayData?.limit}
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
                                {trayData?.type_taxanomy === 'MMT' &&
                                trayData?.prefix == 'tray-master' ? (
                                    <TableCell>AWBN Number</TableCell>
                                ) : (
                                    <TableCell>MUIC</TableCell>
                                )}
                                {trayData?.type_taxanomy === 'MMT' &&
                                trayData?.prefix == 'tray-master' ? (
                                    <TableCell>Bag ID</TableCell>
                                ) : (
                                    ''
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {trayData?.items?.map((data, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell sx={{ pl: 3 }}>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{data?.uic}</TableCell>
                                    {trayData?.type_taxanomy === 'MMT' &&
                                    trayData?.prefix == 'tray-master' ? (
                                        <TableCell>
                                            {data?.awbn_number}
                                        </TableCell>
                                    ) : (
                                        <TableCell>{data?.muic}</TableCell>
                                    )}
                                    {trayData?.type_taxanomy === 'MMT' &&
                                    trayData?.prefix == 'tray-master' ? (
                                        <TableCell>{data?.bag_id}</TableCell>
                                    ) : (
                                        ''
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }, [trayData?.items])
    const tableActul = useMemo(() => {
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
                            inputRef={(input) => input && input.focus()}
                            name="doorsteps_diagnostics"
                            disabled={textDisable}
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
                            <h5 style={{ marginLeft: '14px' }}>Total</h5>

                            <p style={{ marginLeft: '5px', fontSize: '24px' }}>
                                {trayData.actual_items?.length}/
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
                                {trayData?.type_taxanomy === 'MMT' &&
                                trayData?.prefix == 'tray-master' ? (
                                    <TableCell>AWBN Number</TableCell>
                                ) : (
                                    <TableCell>MUIC</TableCell>
                                )}
                                {trayData?.type_taxanomy === 'MMT' &&
                                trayData?.prefix == 'tray-master' ? (
                                    <TableCell>Bag ID</TableCell>
                                ) : (
                                    ''
                                )}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {trayData?.actual_items?.map((data, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell sx={{ pl: 3 }}>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{data?.uic}</TableCell>
                                    {trayData?.type_taxanomy === 'MMT' &&
                                    trayData?.prefix == 'tray-master' ? (
                                        <TableCell>
                                            {data?.awbn_number}
                                        </TableCell>
                                    ) : (
                                        <TableCell>{data?.muic}</TableCell>
                                    )}
                                    {trayData?.type_taxanomy === 'MMT' &&
                                    trayData?.prefix == 'tray-master' ? (
                                        <TableCell>{data?.bag_id}</TableCell>
                                    ) : (
                                        ''
                                    )}
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
                        { name: 'Sorting', path: '/' },
                        { name: 'Request-Approve', path: '/' },
                        { name: 'Verification' },
                    ]}
                />
            </div>
            <Box
            // sx={{
            //     mt: 1,
            //     height: 70,
            //     borderRadius: 1,
            // }}
            >
                <Box
                    sx={{
                        float: 'left',
                    }}
                >
                    <h4 style={{ marginLeft: '13px' }}>TRAY ID - {trayId}</h4>
                    <h4 style={{ marginLeft: '13px' }}>
                        User NAME - {trayData?.issued_user_name}
                    </h4>
                </Box>
            </Box>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    {tableExpected}
                </Grid>
                <Grid item xs={6}>
                    {tableActul}
                </Grid>
            </Grid>
            <div style={{ float: 'right' }}>
                <Box sx={{ float: 'right' }}>
                    <Button
                        sx={{ m: 3, mb: 9 }}
                        variant="contained"
                        style={{ backgroundColor: 'primery' }}
                        onClick={(e) => {
                            handelIssue(e)
                        }}
                    >
                        Back to List
                    </Button>
                </Box>
            </div>
        </Container>
    )
}
