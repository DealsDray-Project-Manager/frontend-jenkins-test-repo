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
    MenuItem
} from '@mui/material'
import { styled } from '@mui/system'
import { Breadcrumb } from 'app/components'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import jwt_decode from 'jwt-decode'
import { axiosWarehouseIn } from '../../../../../../axios'
import { axiosSuperAdminPrexo } from '../../../../../../axios'

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
    const navigate = useNavigate()
    const [trayData, setTrayData] = useState([])
    const { trayId } = useParams()
    const [loading, setLoading] = useState(false)
    const [textDisable, setTextDisable] = useState(false)
    /**************************************************************************** */
    const [uic, setUic] = useState('')
    const [rackiddrop, setrackiddrop] = useState([])
    const [rackId,setRackId]=useState("")
    const [description, setDescription] = useState([])
    const [refresh, setRefresh] = useState(false)
    /*********************************************************** */

    useEffect(() => {

        const fetchData = async () => {
            
            try {
                let res = await axiosSuperAdminPrexo.post('/trayracks/view')
                if (res.status == 200) {
                    console.log(res.data.data);
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
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let response = await axiosWarehouseIn.post(
                        '/getWhtTrayItem/' +
                            trayId +
                            '/' +
                            'Received from sorting (Wht to rp)/' +
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
                setTextDisable(true)
                let obj = {
                    uic: e.target.value,
                    trayId: trayId,
                }

                let res = await axiosWarehouseIn.post('/check-uic', obj)
                if (res?.status == 200) {
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
    const handelIssue = async (e, sortId) => {
        try {
            setLoading(true)
            let obj = {
                trayId: trayId,
                description: description,
                sortId: trayData?.sort_id,
                screen: 'return-from-wht-to-rp-sorting',
            }
            let res = await axiosWarehouseIn.post('/rdl-fls/closedByWh', obj)
            if (res.status == 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                setLoading(false)
                navigate('/warehouse/sorting/return-from-wht-to-rp')
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

    const handleclosetray = () => {
        Swal.fire({
            title: 'Closed Successfully',
            icon: 'success',
        })
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
                            <h5 style={{ marginLeft: '5px' }}>Total</h5>
                            <p style={{ paddingLeft: '0px', fontSize: '22px' }}>
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
                                <TableCell>BOT Tray</TableCell>
                                <TableCell>BOT Agent</TableCell>
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
                                    <TableCell>{data?.tray_id}</TableCell>
                                    <TableCell>{data?.bot_agent}</TableCell>
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
                        <Box sx={{ pl: 8 }}>
                            <h5 style={{ marginLeft: '12px' }}>Total</h5>
                            <p style={{ marginLeft: '0px', fontSize: '24px' }}>
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
                                <TableCell>BOT Tray</TableCell>
                                <TableCell>BOT Agent</TableCell>
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
                                    <TableCell>{data?.tray_id}</TableCell>
                                    <TableCell>{data?.bot_agent}</TableCell>
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
                        { name: 'Return from sorting wht-rp', path: '/' },

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
                        AGENT NAME - {trayData?.issued_user_name}
                    </h4>
                </Box>
                <Box
                    sx={{
                        float: 'right',
                    }}
                >
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
                    sx={{m:1}}
                        label='Rack ID'
                        select
                        style={{ width: '150px'}}
                     
                         
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
                            trayData?.actual_items?.length !==
                                trayData?.items?.length ||
                            loading == true || rackId == "" ||
                            description == ''
                                ? true
                                : false
                        }
                        style={{ backgroundColor: 'green' }}
                        onClick={(e) => {
                            handelIssue()
                        }}
                    >
                        Close Tray
                    </Button>
                </Box>
            </div>
        </Container>
    )
}
