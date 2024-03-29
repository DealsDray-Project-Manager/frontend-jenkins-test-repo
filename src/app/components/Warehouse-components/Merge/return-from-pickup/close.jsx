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
    MenuItem,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { axiosWarehouseIn, axiosSuperAdminPrexo } from '../../../../../axios'
import Swal from 'sweetalert2'
import useAuth from 'app/hooks/useAuth'

const TextFieldCustOm = styled(TextField)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

export default function DialogBox() {
    const navigate = useNavigate()
    const [tray, setTray] = useState([])
    const { trayId } = useParams()
    /**************************************************************************** */
    const [awbn, setAwbn] = useState('')
    const { user } = useAuth()
    const [description, setDescription] = useState([])
    const [loading, setLoading] = useState(false)
    const [textDisable, setTextDisable] = useState(false)
    const [stage, setStage] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [rackiddrop, setrackiddrop] = useState([])
    const [rackId, setRackId] = useState('')
    /******************************************************************************** */

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
                    '/getBagItemRequest/' +
                        trayId +
                        '/' +
                        'Pickup Done Received'
                )
                if (response.status === 200) {
                    setTray(response.data.data)
                } else {
                    alert(response.data.message)
                    navigate(-1)
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [refresh])

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
                    setRefresh((refresh) => !refresh)
                } else {
                    setTextDisable(false)
                    alert(res.data.message)
                }
            } catch (error) {
                alert(error)
            }
        }
    }
    /************************************************************************** */
    const addActualitem = async (uic) => {
        setTextDisable(true)
        try {
            uic.bag_id = trayId
            let res = await axiosWarehouseIn.post('/addActualitem', uic)
            if (res?.status == 200) {
                setAwbn('')
                setTextDisable(false)
                setRefresh((refresh) => !refresh)
            } else {
                alert(res.data.message)
            }
        } catch (error) {
            alert(error)
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
                    trayId: trayId,
                    stage: tray[0].pickup_type,
                    length: length,
                    rackId: rackId,
                    actUser: user.username,
                }
                if (tray?.[0]?.to_tray_for_pickup == null) {
                    obj.stage = tray[0]?.pickup_next_stage
                }

                let res = await axiosWarehouseIn.post('/pickupDone/close', obj)
                if (res.status === 200) {
                    alert(res.data.message)
                    setLoading(false)
                    navigate('/wareshouse/wht/pickup/return-from-pickup')
                } else {
                    setLoading(false)
                    alert(res.data.message)
                }
            }
        } catch (error) {
            alert(error)
        }
    }

    /***************************************************************************************** */
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
    /******************************************************************************** */
    const tableExpected = useMemo(() => {
        return (
            <Paper sx={{ width: '95%', overflow: 'hidden', m: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h5 style={{ marginLeft: '15px' }}>EXPECTED</h5>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                        }}
                    >
                        <Box
                            sx={{
                                mr: 2,
                            }}
                        >
                            <Box sx={{}}>
                                <h5 style={{ paddingLeft: '18px' }}>Total</h5>
                                <p
                                    style={{
                                        paddingLeft: '5px',
                                        fontSize: '22px',
                                    }}
                                >
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

                                <TableCell>Brand</TableCell>
                                <TableCell>Model</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tray[0]?.items?.map((data, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell sx={{ pl: 3 }}>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{data?.uic}</TableCell>
                                    <TableCell>{data?.brand_name}</TableCell>
                                    <TableCell>{data?.model_name}</TableCell>
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        <h5 style={{ marginLeft: '15px' }}>ACTUAL</h5>
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
                            display: 'flex',
                            justifyContent: 'end',
                        }}
                    >
                        <Box
                            sx={{
                                mr: 2,
                            }}
                        >
                            <Box sx={{}}>
                                <h5 style={{ paddingLeft: '18px' }}>Total</h5>
                                <p
                                    style={{
                                        marginLeft: '5px',
                                        fontSize: '22px',
                                    }}
                                >
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

                                <TableCell>Brand</TableCell>
                                <TableCell>Model</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tray[0]?.actual_items?.map((data, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell sx={{ pl: 3 }}>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{data?.uic}</TableCell>
                                    <TableCell>{data?.brand_name}</TableCell>
                                    <TableCell>{data?.model_name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }, [tray[0]?.actual_items, textDisable, awbn])
    return (
        <>
            <Box
                sx={{
                    mt: 1,
                    height: 70,
                    borderRadius: 1,
                }}
            >
                <Box
                    sx={{
                        float: 'left',
                    }}
                >
                    <h4 style={{ marginLeft: '13px' }}>Tray ID - {trayId}</h4>
                    <h4 style={{ marginLeft: '13px' }}>
                        User NAME - {tray[0]?.issued_user_name}
                    </h4>
                </Box>
                <Box
                    sx={{
                        float: 'right',
                    }}
                >
                    <h4 style={{ marginRight: '13px' }}>
                        Closed On --{' '}
                        {new Date(tray?.[0]?.closed_date_agent).toLocaleString(
                            'en-GB',
                            { hour12: true }
                        )}
                    </h4>
                    <h4 style={{ marginRight: '13px' }}>
                        Type :- {tray?.[0]?.pickup_type}
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
                        style={{ backgroundColor: 'green' }}
                        disabled={
                            loading == true ||
                            description == '' ||
                            tray[0]?.actual_items?.length !==
                                tray[0]?.items?.length
                                ? true
                                : false || rackId == ''
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
        </>
    )
}
