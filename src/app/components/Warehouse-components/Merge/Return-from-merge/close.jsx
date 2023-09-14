import React, { useEffect, useState, useMemo } from 'react'
import useAuth from 'app/hooks/useAuth'

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
import { Breadcrumb } from 'app/components'
import { styled } from '@mui/system'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { axiosWarehouseIn, axiosSuperAdminPrexo } from '../../../../../axios'
import Checkbox from '@mui/material/Checkbox'
import Swal from 'sweetalert2'

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
    const [tray, setTray] = useState([])
    const { trayId } = useParams()
    /**************************************************************************** */
    const [awbn, setAwbn] = useState('')
    const [bagReuse, setBagReuse] = useState(false)
    const [description, setDescription] = useState([])
    const [loading, setLoading] = useState(false)
    const [textDisable, setTextDisable] = useState(false)
    const [rackiddrop, setrackiddrop] = useState([])
    const [rackId,setRackId]=useState("")
    /******************************************************************************** */

    useEffect(() => {

        const fetchData = async () => {
            
            try {
                let res = await axiosSuperAdminPrexo.post('/trayracks/view' + "/"  + user.warehouse )
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
                    '/getBagItemRequest/' +
                        trayId +
                        '/' +
                        'Received From Merging'
                )
                if (response.status === 200) {
                    setTray(response.data.data)
                } else {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: 'Please check',
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
    }, [])
    /******************************************************************************** */
    const getitem = async () => {
        try {
            let response = await axiosWarehouseIn.post(
                '/getBagItemRequest/' + trayId + '/' + 'Received From Merging'
            )
            if (response.status === 200) {
                setTray(response.data.data)

                //   dataTableFun()
            } else if (response.status == 201) {
                setTray(response.data.data)
                alert(response.data.message)
            } else if (response.status == 202) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
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
    /******************************************************************************** */
    const handelAwbn = async (e) => {
        if (e.target.value.length === 11) {
            try {
                let obj = {
                    uic: e.target.value,
                    trayId: trayId,
                }
                setTextDisable(true)
                let res = await axiosWarehouseIn.post('/check-uic', obj)
                if (res?.status == 200) {
                    setAwbn('')
                    setTextDisable(false)
                    getitem()
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
    const addActualitem = async (uic) => {
        setTextDisable(true)
        try {
            let obj = {
                bag_id: trayId,
                awbn_number: uic.awbn_number,
                order_id: uic.order_id,
                order_date: uic.order_date,
                uic: uic.uic,
                status: uic.status,
                stock_in: new Date(),
            }
            let res = await axiosWarehouseIn.post('/addActualitem', obj)
            if (res?.status == 200) {
                setAwbn('')
                setTextDisable(false)
                getitem()
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
    /************************************************************************** */
    const handelIssue = async (e, trayId, type, length, limit, status) => {
        e.preventDefault()
        setLoading(true)
        try {
            let admin = localStorage.getItem('prexo-authentication')
            if (admin) {
                let obj = {
                    toTray: trayId,
                    type: type,
                    length: length,
                    limit: limit,
                    status: status,
                    rackId:rackId,
                    actionUser: user.username,

                }
                if (type == 'MMT') {
                    obj.fromTray = tray[0].from_merge
                }

                let res = await axiosWarehouseIn.post(
                    '/mergeDoneMmttrayClose',
                    obj
                )
                if (res.status === 200) {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: res?.data?.message,
                        confirmButtonText: 'Ok',
                    })
                    setLoading(false)
                    navigate('/wareshouse/merge/return-from-merge')
                } else {
                    setLoading(false)

                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: res?.data?.message,
                        confirmButtonText: 'Ok',
                    })
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

    /***************************************************************************************** */
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
    /******************************************************************************** */
    const tableExpected = useMemo(() => {
        return (
            <Paper sx={{ width: '95%', overflow: 'hidden', m: 1 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        ml: 2,
                    }}
                >
                    <h5>EXPECTED</h5>

                    <Box
                        sx={{
                            mr: 2,
                        }}
                    >
                        <Box sx={{}}>
                            <h4 style={{ marginLeft: '7px' }}>Total</h4>
                            <p style={{ fontSize: '22px' }}>
                                {
                                    tray[0]?.items?.filter(function (item) {
                                        return item.status != 'Duplicate'
                                    }).length
                                }
                                /{tray[0]?.limit}
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

                                {/* <TableCell>AWBN Number</TableCell> */}
                                <TableCell>Order ID</TableCell>
                                <TableCell>Order Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tray[0]?.items?.map((data, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell sx={{ pl: 3 }}>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{data?.uic}</TableCell>

                                    <TableCell>{data?.order_id}</TableCell>
                                    <TableCell>
                                        {new Date(
                                            data?.order_date
                                        ).toLocaleString('en-GB', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                        })}
                                    </TableCell>
                                    <TableCell
                                        style={
                                            data.status == 'Valid'
                                                ? { color: 'green' }
                                                : { color: 'red' }
                                        }
                                    >
                                        {data.status}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }, [tray[0]?.items])
    const tableActual = useMemo(() => {
        return (
            <Paper sx={{ width: '98%', overflow: 'hidden', m: 1 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        ml: 2,
                    }}
                >
                    <Box>
                        <h5>ACTUAL</h5>
                        <TextField
                            sx={{ m: 1 }}
                            id="outlined-password-input"
                            type="text"
                            inputRef={(input) => input && input.focus()}
                            disabled={textDisable}
                            name="doorsteps_diagnostics"
                            label="SCAN UIC"
                            value={awbn}
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
                                setAwbn(e.target.value)
                                handelAwbn(e)
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
                            mr: 2,
                        }}
                    >
                        <Box sx={{}}>
                            <h4 style={{ marginLeft: '7px' }}>Total</h4>
                            <p style={{ fontSize: '24px' }}>
                                {
                                    tray[0]?.actual_items?.filter(function (
                                        item
                                    ) {
                                        return item.status != 'Duplicate'
                                    }).length
                                }
                                /{tray[0]?.limit}
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
                                {/* <TableCell>Bag Id</TableCell> */}
                                {/* <TableCell>AWBN Number</TableCell> */}
                                <TableCell>Order ID</TableCell>
                                <TableCell>Order Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tray[0]?.actual_items?.map((data, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell sx={{ pl: 3 }}>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{data?.uic}</TableCell>
                                    <TableCell>{data?.order_id}</TableCell>
                                    <TableCell>
                                        {new Date(
                                            data?.order_date
                                        ).toLocaleString('en-GB', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                        })}
                                    </TableCell>
                                    <TableCell
                                        style={
                                            data.status == 'Valid'
                                                ? { color: 'green' }
                                                : { color: 'red' }
                                        }
                                    >
                                        {data.status}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }, [tray[0]?.actual_items, textDisable, awbn])
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Merge', path: '/' },
                        { name: 'Return-From-Merge', path: '/' },
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
                        AGENT NAME - {tray[0]?.issued_user_name}
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
                            tray[0]?.closed_time_sorting_agent
                        ).toLocaleString('en-GB', { hour12: true })}
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
                    {tray?.[0]?.type_taxanomy == 'MMT' ? (
                        <>
                            <Checkbox
                                checked={bagReuse}
                                onClick={(e) => {
                                    if (
                                        window.confirm(
                                            bagReuse
                                                ? 'Already Added'
                                                : 'You Want to Release Tray ?'
                                        )
                                    ) {
                                        setBagReuse(true)
                                    }
                                }}
                                {...label}
                            />
                            <label>{tray[0]?.from_merge} - Release</label>
                        </>
                    ) : null}

                    <Button
                        sx={{ m: 3, mb: 9 }}
                        variant="contained"
                        style={{ backgroundColor: 'green' }}
                        disabled={
                            loading == true ||
                            description == '' ||
                            (bagReuse == false &&
                                tray?.[0]?.type_taxanomy == 'MMT') ||
                            tray[0]?.actual_items?.length !==
                                tray[0]?.items?.length
                                ? true
                                : false || rackId == "" 
                        }
                        onClick={(e) => {
                            handelIssue(
                                e,
                                tray[0]?.code,
                                tray[0]?.type_taxanomy,
                                tray[0]?.items.length,
                                tray[0]?.limit,
                                tray[0]?.sort_id
                            )
                        }}
                    >
                        Tray Close
                    </Button>
                </Box>
            </div>
        </Container>
    )
}
