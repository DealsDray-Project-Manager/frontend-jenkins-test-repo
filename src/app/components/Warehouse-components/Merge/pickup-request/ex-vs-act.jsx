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
    /*********************************************************** */
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axiosWarehouseIn.post(
                    '/pickup/approve/ex-vs-act/' + trayId
                )
                if (response.status === 200) {
                    setTrayData(response.data.data)
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
                    addActualitem(res.data.data)
                } else {
                    setTextDisable(false)
                    setUic('')
                    alert(res.data.message)
                }
            } catch (error) {
                alert(error)
            }
        }
    }
    /************************************************************************** */
    const addActualitem = async (obj) => {
        if (trayData.limit <= trayData?.actual_items?.length) {
            alert('All Items Scanned')
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
                    alert(res.data.message)
                }
            } catch (error) {
                alert(error)
            }
        }
    }

    const handelIssue = async (e, type) => {
        try {
            let userStatus = await axiosWarehouseIn.post(
                '/sortingAgnetStatus/' +
                    trayData?.issued_user_name +
                    '/' +
                    trayData?.to_tray_for_pickup
            )
            if (userStatus.status === 200) {
                setLoading(true)

                let obj = {
                    fromTray: trayData.code,
                    toTray: trayData.to_tray_for_pickup,
                    username: trayData.issued_user_name,
                }

                let res = await axiosWarehouseIn.post(
                    '/pickup/issueToAgent',
                    obj
                )

                if (res.status == 200) {
                    alert(res.data.message)
                    setLoading(false)
                    navigate('/wareshouse/wht/pickup/request')
                } else {
                    alert(res.data.message)
                }
            } else {
                alert(userStatus.data.data)
            }
        } catch (error) {
            alert(error)
        }
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
                            <h5 style={{marginLeft:'15px'}}>Total</h5>
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
                                <TableCell sx={{pl:2}}>Sl.NO</TableCell>
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
                                    <TableCell>BOT Tray</TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {trayData?.items?.map((data, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell sx={{pl:3}}>{index + 1}</TableCell>
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
                                        <TableCell>{data?.tray_id}</TableCell>
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
                            <h5 style={{marginLeft:'20px'}}>Total</h5>
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
                                <TableCell sx={{pl:2}}>S.NO</TableCell>
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
                                    <TableCell>BOT Tray</TableCell>
                                )}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {trayData?.actual_items?.map((data, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell sx={{pl:3}}>{index + 1}</TableCell>
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
                                        <TableCell>{data?.tray_id}</TableCell>
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
                        { name: 'Pickup', path: '/' },
                        { name: 'Pickup-Requests', path: '/' },
                        { name: 'Verification'}
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
                        disabled={
                            trayData?.items?.length !==
                                trayData?.actual_items?.length || loading
                        }
                        variant="contained"
                        style={{ backgroundColor: 'green' }}
                        onClick={(e) => {
                            handelIssue(e, 'Assigned to sorting agent')
                        }}
                    >
                        Assign To Agent
                    </Button>
                </Box>
            </div>
        </Container>
    )
}
