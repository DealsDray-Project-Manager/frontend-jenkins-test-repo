import { Breadcrumb } from 'app/components'
import React, { useState, useEffect, useMemo } from 'react'
import { styled } from '@mui/system'
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Card,
    Box,
    IconButton,
    TextField,
    Checkbox,
    TableContainer,
    Grid,
    InputAdornment,
    Paper,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import jwt_decode from 'jwt-decode'
import { axiosWarehouseIn } from '../../../../../axios'
import { H5 } from 'app/components/Typography'

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

const SimpleMuiTable = () => {
    const navigate = useNavigate()
    const [bagData, setBagData] = useState([])
    const { bagId } = useParams()
    const [loading, setLoading] = useState(false)
    /**************************************************************************** */
    const [awbn, setAwbn] = useState('')
    const [uic, setUic] = useState(false)
    const [sleaves, setSleaves] = useState(false)
    const [description, setDescription] = useState([])
    const [readyForAssign, setReadyForAssign] = useState(0)
    const [textBoxDis, setTextBoxDis] = useState(false)
    /*********************************************************** */
    const [botTray, setBotTray] = useState('')
    const [pmtTray, setPmtTray] = useState(null)
    const [autoTray, setAutoTray] = useState({
        mmtTray: '',
        pmtTray: '',
        botTray: '',
    })
    const [mmtTray, setMmtTray] = useState(null)
    const [trayId, setTrayid] = useState({
        mmtTray: '',
        pmtTray: '',
        botTray: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axiosWarehouseIn.post(
                    '/getBagItemRequest/' +
                        bagId +
                        '/' +
                        'Requested to Warehouse'
                )
                if (
                    response.status === 200 &&
                    response.data.data[0]?.sort_id != 'Issued'
                ) {
                    setBagData(response.data.data)
                    setUic(response.data.data[0]?.uic === 'true')

                    setSleaves(response.data.data[0]?.sleaves === 'true')
                    let res = await axiosWarehouseIn.post(
                        '/autoFetchAlreadyAssignedTray/' +
                            response.data.data[0]?.issued_user_name
                    )
                    if (res.status == 200) {
                        setAutoTray({
                            botTray: res.data.botTray,
                            mmtTray: res.data.mmtTray,
                            pmtTray: res.data.pmtTray,
                        })
                    } else {
                        alert(res.data.message)
                        navigate(-1)
                    }
                } else {
                    navigate('/wareshouse/bag/bag-issue-request')
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchAgentStatus = async () => {
            try {
                let res = await axiosWarehouseIn.post(
                    '/checkBotUserStatus/' + bagData[0]?.issued_user_name
                )
                if (res.status === 200) {
                    setReadyForAssign(res.data.data)
                } else {
                    alert(res.data.message)
                    navigate(-1)
                }
            } catch (error) {
                alert(error)
            }
        }
        if (bagData[0]?.issued_user_name !== undefined) {
            fetchAgentStatus()
        }
    }, [bagData])

    const getitem = async () => {
        try {
            let response = await axiosWarehouseIn.post(
                '/getBagItemRequest/' + bagId + '/' + 'Requested to Warehouse'
            )
            if (response.status === 200) {
                setBagData(response.data.data)
                setUic(response.data.data[0]?.uic === 'true')
                setSleaves(response.data.data[0]?.sleaves === 'true')
                //   dataTableFun()
            } else if (response.status == 201) {
                setBagData(response.data.data)
                setUic(response.data.data[0]?.uic === 'true')
                setSleaves(response.data.data[0]?.sleaves === 'true')
                alert(response.data.message)
            } else if (response.status == 202) {
                alert(response.data.status)
                navigate(-1)
            }
        } catch (error) {
            alert(error)
        }
    }

    const handelAwbn = async (e) => {
        if (e.target.value.length === 12) {
            try {
                let obj = {
                    awbn: e.target.value,
                    id: bagId,
                }
                setTextBoxDis(true)
                let res = await axiosWarehouseIn.post('/actualCheckAwbn', obj)
                if (res?.status == 200) {
                    addActualitem(res.data.data)
                } else if (res.status == 202) {
                    setTextBoxDis(false)
                    setAwbn('')
                    alert(res.data.message)
                } else if (res.status == 203) {
                    setTextBoxDis(false)
                    setAwbn('')
                    alert('This Item Does Not Exist In This Bag')
                }
            } catch (error) {
                alert(error)
            }
        }
    }

    /************************************************************************** */
    const addActualitem = async (awbn) => {
        if (
            bagData[0]?.actual_items?.filter(function (item) {
                return item.status == 'Valid'
            }).length +
                bagData[0]?.actual_items?.filter(function (item) {
                    return item.status == 'Invalid'
                }).length >=
            bagData[0].limit
        ) {
            alert('Bag Is Full')
        } else {
            setTextBoxDis(true)
            let data = bagData[0]?.items?.filter(function (item) {
                return item.awbn_number == awbn.tracking_id
            })
            try {
                let obj = {
                    bag_id: bagId,
                    awbn_number: awbn.tracking_id,
                    order_id: awbn.order_id,
                    order_date: awbn.order_date,
                    stock_in: new Date(),
                    status: data[0].status,
                }
                let res = await axiosWarehouseIn.post('/addActualitem', obj)
                if (res?.status == 200) {
                    setAwbn('')
                    setTextBoxDis(false)
                    getitem()
                } else {
                    alert(res.data.message)
                }
            } catch (error) {
                alert(error)
            }
        }
    }

    /************************************************************************** */
    const handelIssue = async (e, type) => {
        try {
            setLoading(true)
            if (uic == false) {
                alert('Please Confirm UIC')
                setLoading(false)
            } else if (sleaves == false) {
                alert('Please Confirm Sleeves')
                setLoading(false)
            } else if (readyForAssign !== 'User is free' && type == 'Issued') {
                alert(readyForAssign)
                setLoading(false)
            } else if (
                (pmtTray == null && type == 'Issued') ||
                (mmtTray == null && type == 'Issued') ||
                (botTray == '' && type == 'Issued')
            ) {
                alert('Please Assign Tray')
                setLoading(false)
            } else {
                let obj = {
                    bagId: bagId,
                    description: description,
                    sleaves: sleaves,
                    uic: uic,
                    try: [pmtTray, mmtTray, botTray],
                    status: type,
                }

                let res = await axiosWarehouseIn.post('/issueToBot', obj)
                if (res.status == 200) {
                    alert(res.data.message)
                    setLoading(false)
                    navigate('/wareshouse/bag/bag-issue-request')
                } else {
                    alert(res.data.message)
                }
            }
        } catch (error) {
            alert(error)
        }
    }

    const handelDelete = async (id) => {
        try {
            let obj = {
                bagId: bagId,
                id: id,
            }
            let data = await axiosWarehouseIn.post('/actualBagItem', obj)
            if (data.status == 200) {
                alert(data.data.message)
                getitem()
            } else {
                alert(data.data.message)
            }
        } catch (error) {
            alert(error)
        }
    }

    /*********************************TRAY ASSIGNEMENT********************************** */
    const handelBotTray = async (e, trayId) => {
        try {
            let admin = localStorage.getItem('prexo-authentication')
            if (admin) {
                let { location } = jwt_decode(admin)
                if (trayId !== '') {
                    setBotTray('')
                    let res = await axiosWarehouseIn.post(
                        '/checkBotTray/' + trayId + '/' + location
                    )
                    if (res.status == 200) {
                        alert(res.data.message)
                        setBotTray(res.data.data)
                    } else {
                        alert(res.data.message)
                    }
                }
            } else {
                alert('Please enter tray id')
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const handelMmtTray = async (e, trayId) => {
        try {
            if (trayId !== '') {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    setMmtTray(null)
                    let res = await axiosWarehouseIn.post(
                        '/checkMmtTray/' + trayId + '/' + location
                    )
                    if (res.status == 200) {
                        alert(res.data.message)
                        setMmtTray(res.data.data)
                    } else {
                        alert(res.data.message)
                    }
                } else {
                    alert('Please enter tray id')
                }
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const handelPmtTray = async (e, trayId) => {
        try {
            if (trayId !== '') {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    setPmtTray(null)
                    let res = await axiosWarehouseIn.post(
                        '/checkPmtTray/' + trayId + '/' + location
                    )
                    if (res.status == 200) {
                        alert(res.data.message)
                        setPmtTray(res.data.data)
                    } else {
                        alert(res.data.message)
                    }
                }
            } else {
                alert('Please enter tray id')
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const tabelDataExpected = useMemo(() => {
        return (
            <Paper sx={{ width: '95%', overflow: 'hidden', m: 1 }}>
                <h5>Expected</h5>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                    }}
                >
                    <Box
                        sx={{
                            m: 2,
                        }}
                    >
                        <Box sx={{}}>
                            <h5>Total</h5>
                            <p style={{ paddingLeft: '5px', fontSize: '22px' }}>
                                {
                                    bagData[0]?.items?.filter(function (item) {
                                        return item.status != 'Duplicate'
                                    }).length
                                }
                                /{bagData[0]?.limit}
                            </p>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            m: 2,
                        }}
                    >
                        <Box sx={{}}>
                            <h5>Valid</h5>
                            <p style={{ marginLeft: '14px', fontSize: '24px' }}>
                                {
                                    bagData[0]?.items?.filter(function (item) {
                                        return item.status == 'Valid'
                                    }).length
                                }
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
                                <TableCell>S.NO</TableCell>
                                <TableCell>AWBN Number</TableCell>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Order Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bagData[0]?.items?.map((data, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{data?.awbn_number}</TableCell>
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
    }, [bagData[0]?.items])

    const tableDataActul = useMemo(() => {
        return (
            <Paper sx={{ width: '98%', overflow: 'hidden', m: 1 }}>
                <h5>ACTUAL</h5>
                <TextField
                    sx={{ m: 1 }}
                    id="outlined-password-input"
                    type="text"
                    disabled={textBoxDis}
                    inputRef={(input) => input && input.focus()}
                    name="doorsteps_diagnostics"
                    label="Please Enter AWB Number"
                    value={awbn}
                    // onChange={(e) => setAwbn(e.target.value)}
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

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                    }}
                >
                    <Box
                        sx={{
                            m: 2,
                        }}
                    >
                        <Box sx={{}}>
                            <h5>Total</h5>
                            <p style={{ marginLeft: '5px', fontSize: '24px' }}>
                                {
                                    bagData[0]?.actual_items?.filter(function (
                                        item
                                    ) {
                                        return item.status != 'Duplicate'
                                    }).length
                                }
                                /{bagData[0]?.limit}
                            </p>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            m: 2,
                        }}
                    >
                        <Box sx={{}}>
                            <h5>Valid</h5>
                            <p style={{ marginLeft: '19px', fontSize: '24px' }}>
                                {
                                    bagData[0]?.actual_items?.filter(function (
                                        item
                                    ) {
                                        return item.status == 'Valid'
                                    }).length
                                }
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
                                <TableCell>S.NO</TableCell>
                                <TableCell>AWBN Number</TableCell>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Order Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {bagData[0]?.actual_items?.map((data, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{data?.awbn_number}</TableCell>
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
    }, [bagData[0]?.actual_items, textBoxDis, awbn])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Bag', path: '/pages' },
                        { name: 'Bag-Issue-Request' },
                    ]}
                />
            </div>

            <Card sx={{ maxHeight: '100%', overflow: 'auto' }} elevation={6}>
                <Box
                    sx={{
                        height: 70,
                        borderRadius: 1,
                    }}
                >
                    <Box
                        sx={{
                            float: 'left',
                        }}
                    >
                        <h4 style={{ marginLeft: '13px' }}>BAG ID - {bagId}</h4>
                        <H5 style={{ marginLeft: '13px' }}>
                            AGENT NAME - {bagData[0]?.issued_user_name}
                        </H5>
                    </Box>
                    <Box
                        sx={{
                            float: 'right',
                        }}
                    >
                        <h4 style={{ marginRight: '13px' }}>
                            Closed On --{' '}
                            {new Date(
                                bagData[0]?.status_change_time
                            ).toLocaleString('en-GB', { hour12: true })}
                        </h4>

                        <Checkbox
                            checked={uic}
                            onClick={(e) => {
                                if (
                                    window.confirm(
                                        uic
                                            ? 'Already Added'
                                            : 'You Want to add UIC ?'
                                    )
                                ) {
                                    setUic(true)
                                }
                            }}
                        />
                        <label>UIC Label</label>
                        <Checkbox
                            checked={sleaves}
                            onClick={(e) => {
                                if (
                                    window.confirm(
                                        sleaves
                                            ? 'Already Added'
                                            : 'You Want to add sleeves ?'
                                    )
                                ) {
                                    setSleaves(true)
                                }
                            }}
                        />
                        <label>Sleeves</label>
                    </Box>
                </Box>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        {tabelDataExpected}
                    </Grid>
                    <Grid item xs={6}>
                        {tableDataActul}
                    </Grid>
                </Grid>
            </Card>
            <Grid container spacing={3} sx={{ mt: 2 }}>
                {bagData[0]?.sort_id !== 'Requested to Warehouse' ? (
                    <Grid item xs={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            <Box>
                                <TextField
                                    sx={{
                                        m: 1,
                                    }}
                                    onChange={(e) =>
                                        setTrayid({ botTray: e.target.value })
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment>
                                                <IconButton
                                                    onClick={(e) => {
                                                        handelBotTray(
                                                            e,
                                                            trayId.botTray
                                                        )
                                                    }}
                                                >
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    label="BOT Tray"
                                    id="standard-size-normal"
                                    variant="standard"
                                />
                                <p style={{ color: 'red', marginLeft: '8px' }}>
                                    {autoTray.botTray}
                                </p>
                            </Box>
                            <Box>
                                <TextField
                                    sx={{
                                        m: 1,
                                    }}
                                    onChange={(e) =>
                                        setTrayid({ pmtTray: e.target.value })
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment>
                                                <IconButton
                                                    onClick={(e) => {
                                                        handelPmtTray(
                                                            e,
                                                            trayId.pmtTray
                                                        )
                                                    }}
                                                >
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    label="PMT Tray"
                                    id="standard-size-normal"
                                    value={pmtTray}
                                    variant="standard"
                                />
                                <p style={{ color: 'red', marginLeft: '8px' }}>
                                    {autoTray.pmtTray}
                                </p>
                            </Box>
                            <Box>
                                <TextField
                                    sx={{
                                        m: 1,
                                    }}
                                    onChange={(e) =>
                                        setTrayid({ mmtTray: e.target.value })
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment>
                                                <IconButton
                                                    onClick={(e) => {
                                                        handelMmtTray(
                                                            e,
                                                            trayId.mmtTray
                                                        )
                                                    }}
                                                >
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    label="MMT Tray"
                                    value={mmtTray}
                                    id="standard-size-normal"
                                    variant="standard"
                                />
                                <p style={{ color: 'red', marginLeft: '8px' }}>
                                    {autoTray.mmtTray}
                                </p>
                            </Box>
                        </Box>
                    </Grid>
                ) : (
                    <Grid item xs={6}></Grid>
                )}

                <Grid item xs={6}>
                    {bagData[0]?.sort_id !== 'Requested to Warehouse' ? (
                        <Box sx={{ float: 'right', mb: 4 }}>
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
                                    loading == true ||
                                    description == '' ||
                                    readyForAssign == ''
                                }
                                style={{ backgroundColor: 'primery' }}
                                onClick={(e) => {
                                    if (window.confirm('You Want to Issue?')) {
                                        handelIssue(e, 'Issued')
                                    }
                                }}
                            >
                                Handeover to Agent
                            </Button>
                        </Box>
                    ) : (
                        <Button
                            sx={{ m: 3, mb: 9, float: 'right' }}
                            variant="contained"
                            disabled={
                                bagData[0]?.actual_items?.length !==
                                bagData[0]?.items?.length
                            }
                            style={{ backgroundColor: 'primery' }}
                            onClick={(e) => {
                                handelIssue(e, 'Ready For Issue')
                            }}
                        >
                            Save Data
                        </Button>
                    )}
                </Grid>
            </Grid>
        </Container>
    )
}

export default SimpleMuiTable
