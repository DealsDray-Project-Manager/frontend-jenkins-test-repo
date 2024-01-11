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
    MenuItem,
    Grid,
} from '@mui/material'
import { Breadcrumb } from 'app/components'
import { styled } from '@mui/system'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { axiosWarehouseIn } from '../../../../../axios'
import { axiosSuperAdminPrexo } from '../../../../../axios'
import Swal from 'sweetalert2'
import useAuth from 'app/hooks/useAuth'

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

export default function DialogBox() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [trayData, setTrayData] = useState([])
    const { trayId } = useParams()
    const [loading, setLoading] = useState(false)
    const [textDisable, setTextDisable] = useState(false)
    /**************************************************************************** */
    const [refresh, setRefresh] = useState(false)
    const [uic, setUic] = useState('')
    const [description, setDescription] = useState([])
    const [rackiddrop, setrackiddrop] = useState([])
    const [rackId, setRackId] = useState('')
    /************************************************************/

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axiosWarehouseIn.post(
                    '/charging-done-recieved/' +
                        trayId +
                        '/' +
                        'Received From Sorting'
                )
                if (response.status === 200) {
                    setTrayData(response.data.data)
                } else {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: 'Please check Details',
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
    /************************************************************************** */
    const addActualitem = async (obj) => {
        if (trayData?.items.length < trayData?.actual_items?.length) {
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'All Items Are Verified',
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
                    '/sorting-done-put-item',
                    objData
                )
                if (res?.status == 200) {
                    setRefresh((refresh) => !refresh)
                    setTextDisable(false)
                    setUic('')
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
        try {
            setLoading(true)
            trayData.description = description
            trayData.rackId = rackId
            trayData.username = user.username
            let res = await axiosWarehouseIn.post(
                '/wht-tray-close-from-sorting',
                trayData
            )
            if (res.status == 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                setLoading(false)
                navigate('/wareshouse/sorting/return-from-sorting')
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
    const handelUic = async (e) => {
        if (e.target.value.length === 11) {
            try {
                let obj = {
                    uic: e.target.value,
                    trayId: trayId,
                }
                setTextDisable(true)
                let res = await axiosWarehouseIn.post(
                    '/check-uic-sorting-done',
                    obj
                )
                if (res?.status == 200) {
                    addActualitem(res.data.data)
                } else {
                    setUic('')
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
    /***************************************************************************************** */
    const tableExpected = useMemo(() => {
        return (
            <Paper sx={{ width: '95%', overflow: 'hidden', m: 1 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box sx={{ ml: 2 }}>
                        <h5>EXPECTED</h5>
                    </Box>

                    <Box sx={{ justifyContent: 'end', display: 'flex' }}>
                        <Box
                            sx={{
                                m: 0,
                            }}
                        >
                            <Box sx={{ mr: 2 }}>
                                <h5 style={{ marginLeft: '10px' }}>Total</h5>
                                <p
                                    style={{
                                        paddingLeft: '5px',
                                        fontSize: '22px',
                                    }}
                                >
                                    {trayData?.items?.length}/{trayData?.limit}
                                </p>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                mr: 2,
                            }}
                        >
                            <Box sx={{ mr: 2 }}>
                                <h5 style={{ marginLeft: '10px' }}>Valid</h5>
                                <p
                                    style={{
                                        marginLeft: '14px',
                                        fontSize: '22px',
                                    }}
                                >
                                    {trayData?.items?.length}
                                </p>
                            </Box>
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
                                <TableCell>IMEI</TableCell>
                                <TableCell>Brand Name</TableCell>
                                <TableCell>Model Name</TableCell>
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
                                    <TableCell>{data?.imei}</TableCell>
                                    <TableCell>{data?.brand_name}</TableCell>
                                    <TableCell>{data?.model_name}</TableCell>
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
                <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
                    <Box sx={{ ml: 2 }}>
                        <h5>ACTUAL</h5>
                        <TextField
                            sx={{ mt: 1 }}
                            id="outlined-password-input"
                            type="text"
                            inputRef={(input) => input && input.focus()}
                            disabled={textDisable}
                            name="doorsteps_diagnostics"
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
                            // onChange={(e) => setAwbn(e.target.value)}
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
                            display: 'flex',
                            justifyContent: 'end',
                        }}
                    >
                        <Box
                            sx={{
                                m: 0,
                            }}
                        >
                            <Box sx={{ mr: 2 }}>
                                <h5 style={{ marginLeft: '10px' }}>Total</h5>
                                <p
                                    style={{
                                        marginLeft: '5px',
                                        fontSize: '24px',
                                    }}
                                >
                                    {trayData?.actual_items?.length}/
                                    {trayData?.limit}
                                </p>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                mr: 2,
                            }}
                        >
                            <Box sx={{}}>
                                <h5 style={{ marginLeft: '10px' }}>Valid</h5>
                                <p
                                    style={{
                                        marginLeft: '19px',
                                        fontSize: '24px',
                                    }}
                                >
                                    {trayData?.actual_items?.length}
                                </p>
                            </Box>
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
                                <TableCell>IMEI</TableCell>
                                <TableCell>Brand Name</TableCell>
                                <TableCell>Model Name</TableCell>
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
                                    <TableCell>{data?.imei}</TableCell>
                                    <TableCell>{data?.brand_name}</TableCell>
                                    <TableCell>{data?.model_name}</TableCell>
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
                        { name: 'Return-From-Sorting', path: '/' },
                        { name: 'Tray Close' },
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
                    <h4 style={{ marginLeft: '13px' }}>Tray ID - {trayId}</h4>
                    <h4 style={{ marginLeft: '13px' }}>
                        User NAME - {trayData?.issued_user_name}
                    </h4>
                </Box>
                <Box
                    sx={{
                        float: 'right',
                    }}
                >
                    <h4 style={{ marginRight: '13px' }}>
                        Closed On --{' '}
                        {new Date(
                            trayData?.closed_time_sorting_agent
                        ).toLocaleString('en-GB', {
                            hour12: true,
                        })}
                    </h4>
                    <h4 style={{ marginRight: '13px' }}>
                        Brand -- {trayData?.brand}
                    </h4>
                    <h4 style={{ marginRight: '13px' }}>
                        Model -- {trayData?.model}
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
                        sx={{ m: 3, mb: 9 }}
                        variant="contained"
                        disabled={
                            trayData?.items?.length !==
                                trayData?.actual_items?.length ||
                            description == '' ||
                            loading == true ||
                            rackId == ''
                        }
                        style={{ backgroundColor: 'green' }}
                        onClick={(e) => {
                            if (window.confirm('You Want to Close?')) {
                                handelIssue(e)
                            }
                        }}
                    >
                        Tray Close
                    </Button>
                </Box>
            </div>
        </Container>
    )
}
