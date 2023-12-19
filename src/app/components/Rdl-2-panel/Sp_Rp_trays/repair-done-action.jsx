import React, { useEffect, useState, useMemo } from 'react'
import {
    Box,
    Button,
    TextField,
    Card,
    Typography,
    MenuItem,
    Checkbox,
    FormControlLabel,
    Radio,
    RadioGroup,
    Grid,
    TextareaAutosize,
    DialogContent,
    DialogActions,
    Dialog,
    DialogTitle,
    IconButton,
} from '@mui/material'
import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import { styled } from '@mui/system'
import ChargingDetails from '../../Audit-components/Audit-request/Report/charging-user-report'
import AuditReport from '../../Rdl_one-components/Tray/Report/Audit-report'
import BqcApiReport from '../../Audit-components/Audit-request/Report/bqc-api-data'
import { useNavigate, useLocation } from 'react-router-dom'
import {
    axiosMisUser,
    axiosRDL_oneAgent,
    axiosRdlTwoAgent,
    axiosRpBqcAgent,
    axiosWarehouseIn,
} from '../../../../axios'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import useAuth from 'app/hooks/useAuth'

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

const SimpleMuiTable = () => {
    const [isCheck, setIsCheck] = useState([])
    const navigate = useNavigate()
    const { state } = useLocation()
    const [selectReason, setSelectReason] = useState('')
    const [loading, setLoading] = useState(false)
    const [displayContent, setDisplayContent] = useState('')
    const { reportData, uic, whtTrayId, spTray } = state
    const [description, setDescription] = useState('')
    const [descriptionCount, setDescriptionCount] = useState([])
    const [radioButtonCount, setRadioButtonCount] = useState([])
    const [requredPart, setRequredPart] = useState([])
    /**************************************************************************** */
    const [selectedValue, setSelectedValue] = useState('')
    const [partData, setPartData] = useState([])
    const [open, setOpen] = useState(false)
    const [rpbqcUsers, setRpbqcUsers] = useState([])
    const [rbqcTrays, setRbqcTrays] = useState([])
    const [popdata, setPopData] = useState({
        rpbqc_username: '',
        rbqc_tray: '',
    })

    const { user } = useAuth()

    // USEEFFECT FOR RPBQC USERS FETCH
    useEffect(() => {
        const fetchRpbqcUsers = async () => {
            const res = await axiosMisUser.post(
                `/get-charging-users/${'RP-BQC'}/${user.location}`
            )
            if (res.status == 200) {
                setRpbqcUsers(res.data.data)
            }
        }
        fetchRpbqcUsers()
    }, [])
    useEffect(() => {
        const fetchDataFun = async () => {
            try {
                const response = await axiosRDL_oneAgent.post(
                    '/rdl-1/fetchPart/' + reportData?.muic?.muic
                )
                if (response.status === 200) {
                    const fetchedData = response.data.data.map((item) => ({
                        ...item,
                        quantity: 1,
                    }))
                    if (
                        reportData?.delivery?.rdl_fls_one_report
                            ?.partRequired !== undefined
                    ) {
                        setRequredPart(
                            reportData?.delivery?.rdl_fls_one_report
                                ?.partRequired
                        )
                    }

                    setPartData(fetchedData)
                }
            } catch (error) {
                // Handle error here
                console.error('Error fetching data:', error)
            }
        }
        fetchDataFun()
        return () => {
            setDescriptionCount([])
            setRadioButtonCount([])
        }
    }, [])

    const handleChangeThePopValue = ({ target: { name, value } }) => {
        setPopData({
            ...popdata,
            [name]: value,
        })
    }

    const handleChange = (event) => {
        setDisplayContent('Spare parts used')
        setSelectReason('')
        setDescriptionCount([])
        setRadioButtonCount([])
        setSelectedValue(event.target.value)
    }

    const handleClick = (e, rowIndex, quantity) => {
        const { id, checked } = e.target
        setIsCheck([...isCheck, id])
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id))
        }
    }

    const handleChangeStatus = (rowIndex, newValue, status, uniqueId) => {
        // Use Date.now() to get a timestamp in milliseconds (13 digits)
        const timestamp = Date.now().toString()

        // Use Math.random() to get a random number (16 digits) and remove the leading "0."
        const randomNumber = Math.random().toString().substring(2, 18)

        // Combine the timestamp and random number to create a unique ID
        const newId = `${timestamp}-${randomNumber}`
        if (status == 'Status') {
            if (radioButtonCount.includes(uniqueId) == false) {
                setRadioButtonCount([...radioButtonCount, uniqueId])
            }
            setRequredPart((prevValues) => {
                const updatedValues = [...prevValues]
                updatedValues[rowIndex]['unique_id_gen'] = newId
                updatedValues[rowIndex].rdl_two_status = newValue
                return updatedValues
            })
        } else {
            if (descriptionCount.includes(uniqueId) == false) {
                setDescriptionCount([...descriptionCount, uniqueId])
            }
            setRequredPart((prevValues) => {
                const updatedValues = [...prevValues]
                updatedValues[rowIndex].rdl_two_description = newValue
                return updatedValues
            })
        }
    }

    const handleClose = () => {
        setOpen(false)
    }
    // GET RBQC TRAY
    const handelFetchRbqcTray = async (username) => {
        try {
            const res = await axiosRpBqcAgent.post(
                `/getRpbqcTrayRdlTwoSelection/${username}`
            )
            if (res.status === 200) {
                setRbqcTrays(res.data.data)
            }
        } catch (error) {
            alert(error)
        }
    }

    const handelSubmit = async (e, type) => {
        try {
            if (selectedValue == 'Repair Done' && type == 'Direct') {
                setOpen(true)
            } else {
                setLoading(true)
                let obj = {
                    uic: uic,
                    rpbqc_username: popdata.rpbqc_username,
                    rbqc_tray: popdata.rbqc_tray,
                    trayId: whtTrayId,
                    spTray: spTray,
                    rdl_repair_report: {
                        status: selectedValue,
                        reason: selectReason,
                        description: description,
                        more_part_required: [],
                        used_parts: [],
                        rdl_two_part_status: requredPart,
                        rdl_two_user: user.username,
                        rdl_two_tray: whtTrayId,
                    },
                }
                if (selectReason == 'More part required') {
                    let arr1 = []
                    for (let x of partData) {
                        if (isCheck.includes(x.part_code)) {
                            let obj = {
                                part_id: x.part_code,
                                part_name: x.name,
                                quantity: x.quantity,
                            }
                            arr1.push(obj)
                        }
                    }
                    obj.rdl_repair_report.more_part_required = arr1
                }
                let arr = []
                for (let y of requredPart) {
                    if (y.rdl_two_status == 'Used') {
                        arr.push(y)
                    }
                }
                obj.rdl_repair_report.used_parts = arr
                const res = await axiosRdlTwoAgent.post(
                    '/repairDone/action',
                    obj
                )
                if (res.status == 200) {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: res?.data?.message,
                        confirmButtonText: 'Ok',
                    })

                    navigate('/rdl-2/tray/start/' + whtTrayId)
                } else {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: res?.data?.message,
                        confirmButtonText: 'Ok',
                    })
                }
            }
        } catch (error) {
            alert(error)
        }
    }

    const columnsSelect = [
        {
            name: 'part_code',
            label: (
                <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 'bold', ml: 2 }}
                >
                    <>Select</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <Checkbox
                            sx={{ ml: 2 }}
                            onClick={(e) => {
                                handleClick(
                                    e,
                                    tableMeta.rowIndex,
                                    tableMeta.rowData[5]
                                )
                            }}
                            id={value}
                            key={value}
                            checked={isCheck.includes(value)}
                        />
                    )
                },
            },
        },
        {
            name: 'index',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Record No</Typography>
            ),
            options: {
                filter: false,
                sort: false,
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 4 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'part_code',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Spare Part ID
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'name',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Part Name</Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'color',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Color</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'quantity',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Quantity</Typography>
            ),
            options: {
                filter: true,
            },
        },
    ]

    const sprequired_data_assigned = [
        {
            name: 'index',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 2 }}>
                    Record No
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 4 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'part_id',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Spare Part ID
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'part_name',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Part Name</Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'quantity',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Quantity</Typography>
            ),
            options: {
                filter: true,
            },
        },
    ]

    const sprequired_data = [
        {
            name: 'index',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 2 }}>
                    Record No
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 4 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'part_id',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Spare Part ID
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'part_name',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Part Name</Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'quantity',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Quantity</Typography>
            ),
            options: {
                filter: true,
            },
        },

        {
            name: 'action',
            label: 'Action',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    const radioGroupName = `radio-group-${tableMeta.rowIndex}`
                    let labels
                    if (selectedValue === 'Repair Done') {
                        labels = ['Used', 'Not used', 'Not required']
                    } else if (selectReason == 'Part not available') {
                        labels = [
                            'Used',
                            'Not used',
                            'Not required',
                            'Not available',
                        ]
                    } else {
                        labels = [
                            'Used',
                            'Not used',
                            'Not required',
                            'Faulty',
                            'Damaged',
                        ]
                    }

                    return (
                        <RadioGroup
                            name={radioGroupName}
                            onChange={(e) => {
                                handleChangeStatus(
                                    tableMeta.rowIndex,
                                    e.target.value,
                                    'Status',
                                    tableMeta.rowData[1]
                                )
                            }}
                            style={{ display: 'flex', flexDirection: 'row' }}
                        >
                            {labels.map((label, index) => (
                                <FormControlLabel
                                    key={`radio-${index}`}
                                    value={label}
                                    control={<Radio />}
                                    labelPlacement="end"
                                    label={
                                        <Typography component="span">
                                            {label}
                                        </Typography>
                                    }
                                />
                            ))}
                        </RadioGroup>
                    )
                },
            },
        },
        {
            name: 'description',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Description</Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <TextareaAutosize
                            rowsMin={2}
                            placeholder="Enter description"
                            value={value}
                            onChange={(e) => {
                                handleChangeStatus(
                                    tableMeta.rowIndex,
                                    e.target.value,
                                    'description',
                                    tableMeta.rowData[1]
                                )
                            }}
                            style={{
                                width: '135px',
                                minHeight: '150px',
                                resize: 'none',
                            }}
                        />
                    )
                },
            },
        },
    ]

    const handelReason = (value) => {
        setDisplayContent('')
        if (value == 'Device not repairable')
            setDisplayContent(
                'Were the Spare parts consumed if so then please select'
            )
        else if (value == 'Spare part faulty') {
            setDisplayContent('Select the Faulty Spare part')
        } else if (value == 'Part not available') {
            setDisplayContent(
                'Select the Spare part which was allocated with the device but not found in the Spare Tray'
            )
        } else if (value == 'More part required') {
            setDisplayContent('Search Results to check the spare part required')
        }
        setSelectReason(value)
    }

    /*******************************USEMEMO******************************************* */

    const uicDetails = useMemo(() => {
        return (
            <Card sx={{ width: '100%', height: '50%' }}>
                <Box sx={{ display: 'flex', mb: 2 }}>
                    <Box sx={{ ml: 2 }}>
                        <Typography sx={{ mt: 2 }}>UIC : {uic}</Typography>
                        <Typography sx={{ mt: 2 }}>
                            MUIC : {reportData?.muic?.muic}
                        </Typography>
                    </Box>
                    <Box sx={{ ml: 5 }}>
                        <Typography sx={{ mt: 2 }}>
                            BRAND : {reportData?.muic?.brand_name}
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                            MODEL : {reportData?.muic?.model_name}
                        </Typography>
                    </Box>
                    <Box sx={{ ml: 5 }}>
                        <Typography sx={{ mt: 2 }}>
                            Auditor Description:{' '}
                            {reportData?.delivery?.audit_report?.description}
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                            RDL 1 Description:{' '}
                            {
                                reportData?.delivery?.rdl_fls_one_report
                                    ?.description
                            }
                        </Typography>
                    </Box>
                </Box>
            </Card>
        )
    }, [reportData])

    const BqcAndAllReport = useMemo(() => {
        return (
            <>
                <Card sx={{ mt: 2, width: '100%' }}>
                    <MUIDataTable
                        title={'Assigned Spare Parts'}
                        data={
                            reportData?.delivery?.rdl_fls_one_report
                                ?.partRequired
                        }
                        columns={sprequired_data_assigned}
                        options={{
                            filterType: 'textField',
                            responsive: 'simple',
                            download: false,
                            print: false,
                            selectableRows: 'none', // set checkbox for each row
                            // search: false, // set search option
                            // filter: false, // set data filter option
                            // download: false, // set download option
                            // print: false, // set print option
                            // pagination: true, //set pagination option
                            // viewColumns: false, // set column option
                            customSort: (data, colIndex, order) => {
                                return data.sort((a, b) => {
                                    if (colIndex === 1) {
                                        return (
                                            (a.data[colIndex].price <
                                            b.data[colIndex].price
                                                ? -1
                                                : 1) *
                                            (order === 'desc' ? 1 : -1)
                                        )
                                    }
                                    return (
                                        (a.data[colIndex] < b.data[colIndex]
                                            ? -1
                                            : 1) * (order === 'desc' ? 1 : -1)
                                    )
                                })
                            },
                            elevation: 0,
                            rowsPerPageOptions: [10, 20, 40, 80, 100],
                        }}
                    />
                </Card>

                <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item lg={6} md={12} xs={12}>
                        <ChargingDetails
                            Charging={reportData?.delivery?.charging}
                            ChargeDoneDate={
                                reportData?.delivery?.charging_done_date
                            }
                        />
                    </Grid>
                    <Grid item lg={6} md={12} xs={12}>
                        <AuditReport
                            AuditData={reportData?.delivery?.audit_report}
                            otherAuditFeedBack={reportData?.otherAudFeedBack}
                        />
                    </Grid>
                    <Grid
                        // sx={{ boxShadow: 1 }}
                        item
                        lg={12}
                        md={12}
                        xs={12}
                    >
                        <BqcApiReport
                            BqcSowftwareReport={
                                reportData?.delivery?.bqc_software_report
                            }
                            grade={
                                reportData?.delivery?.bqc_software_report
                                    ?.final_grade
                            }
                            imei={reportData?.delivery?.imei}
                        />
                    </Grid>
                </Grid>
            </>
        )
    }, [])

    return (
        <>
            <Container>
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
                        Select RBQC Tray
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <TextField
                            label="Select RP-BQC User"
                            variant="outlined"
                            fullWidth
                            select
                            onChange={handleChangeThePopValue}
                            name="rpbqc_username"
                            sx={{ mt: 2 }}
                        >
                            {rpbqcUsers.map((data) => (
                                <MenuItem
                                    key={data.user_name}
                                    value={data.user_name}
                                    onClick={(e) => {
                                        handelFetchRbqcTray(data.user_name)
                                    }}
                                >
                                    {data.user_name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            label="Select RPB Tray"
                            variant="outlined"
                            fullWidth
                            select
                            name="rbqc_tray"
                            onChange={handleChangeThePopValue}
                            sx={{ mt: 2 }}
                        >
                            {rbqcTrays.map((data) => (
                                <MenuItem key={data.code} value={data.code}>
                                    {data.code}
                                </MenuItem>
                            ))}
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            sx={{
                                m: 1,
                            }}
                            disabled={
                                popdata.rpbqc_username == '' ||
                                popdata.rbqc_tray == ''
                            }
                            variant="contained"
                            style={{ backgroundColor: 'green' }}
                            onClick={(e) => {
                                handelSubmit(e, 'Finelcall')
                            }}
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
                <div className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Repair done', path: '/' },
                            { name: 'Unit details' },
                        ]}
                    />
                </div>
                <Box>
                    <Typography sx={{ fontSize: 'large', fontWeight: 'bold' }}>
                        Add Unit Repair Details
                    </Typography>
                </Box>
                <br />
                <>
                    {uicDetails}

                    {BqcAndAllReport}

                    <Box sx={{ mt: 2 }}>
                        <Typography
                            sx={{
                                ml: 0,
                                fontSize: 'large',
                                fontWeight: 'bold',
                            }}
                        >
                            Repair Status
                        </Typography>

                        <RadioGroup
                            value={selectedValue}
                            onChange={handleChange}
                            sx={{ ml: 0 }}
                        >
                            <Box sx={{ display: 'flex', mt: 2 }}>
                                <FormControlLabel
                                    value="Repair Done"
                                    control={<Radio />}
                                    label="Repair Done"
                                />
                                <FormControlLabel
                                    value="Repair Not Done"
                                    sx={{ ml: 5 }}
                                    // disabled={
                                    //     reportData?.checkIntray?.sp_tray == null
                                    // }
                                    control={<Radio />}
                                    label="Repair Not Done"
                                />
                            </Box>
                        </RadioGroup>

                        {selectedValue == 'Repair Not Done' &&
                        reportData?.checkIntray?.sp_tray != null ? (
                            <Box sx={{ ml: 2 }}>
                                <TextFieldCustOm
                                    label="Select Reason"
                                    select
                                    type="text"
                                    value={selectReason}
                                    style={{
                                        width: '200px',
                                        marginRight: '20px',
                                    }}
                                >
                                    <MenuItem
                                        onClick={(e) => {
                                            handelReason(
                                                'Device not repairable'
                                            )
                                        }}
                                        value="Device not repairable"
                                    >
                                        Device not repairable
                                    </MenuItem>
                                    <MenuItem
                                        onClick={(e) => {
                                            handelReason('Spare part faulty')
                                        }}
                                        value="Spare part faulty"
                                    >
                                        Spare part faulty
                                    </MenuItem>
                                    <MenuItem
                                        onClick={(e) => {
                                            handelReason('Part not available')
                                        }}
                                        value="Part not available"
                                    >
                                        Part not available
                                    </MenuItem>
                                    <MenuItem
                                        onClick={(e) => {
                                            handelReason('More part required')
                                        }}
                                        value="More part required"
                                    >
                                        More part required
                                    </MenuItem>
                                </TextFieldCustOm>
                            </Box>
                        ) : (
                            ''
                        )}
                        {selectedValue == 'Repair Not Done' &&
                        reportData?.checkIntray?.sp_tray == null ? (
                            <Box sx={{ ml: 2 }}>
                                <TextFieldCustOm
                                    label="Select Reason"
                                    select
                                    type="text"
                                    value={selectReason}
                                    style={{
                                        width: '200px',
                                        marginRight: '20px',
                                    }}
                                >
                                    <MenuItem
                                        onClick={(e) => {
                                            handelReason(
                                                'Device not repairable'
                                            )
                                        }}
                                        value="Device not repairable"
                                    >
                                        Device not repairable
                                    </MenuItem>
                                </TextFieldCustOm>
                            </Box>
                        ) : (
                            ''
                        )}

                        <Box sx={{ ml: 0, mb: 2 }}>
                            <Typography
                                sx={{
                                    fontSize: '16px',
                                    marginBottom: '15px',
                                }}
                            >
                                Description :
                            </Typography>

                            <textarea
                                onChange={(e) => setDescription(e.target.value)}
                                style={{
                                    marginLeft: '5px',
                                    width: '100%',
                                    height: '100px',
                                }}
                            ></textarea>
                        </Box>
                        {selectedValue !== '' ? (
                            <MUIDataTable
                                title={displayContent}
                                data={
                                    reportData?.delivery?.rdl_fls_one_report
                                        ?.partRequired
                                }
                                columns={sprequired_data}
                                options={{
                                    filterType: 'textField',
                                    responsive: 'simple',
                                    download: false,
                                    print: false,
                                    selectableRows: 'none', // set checkbox for each row
                                    // search: false, // set search option
                                    // filter: false, // set data filter option
                                    // download: false, // set download option
                                    // print: false, // set print option
                                    // pagination: true, //set pagination option
                                    // viewColumns: false, // set column option
                                    customSort: (data, colIndex, order) => {
                                        return data.sort((a, b) => {
                                            if (colIndex === 1) {
                                                return (
                                                    (a.data[colIndex].price <
                                                    b.data[colIndex].price
                                                        ? -1
                                                        : 1) *
                                                    (order === 'desc' ? 1 : -1)
                                                )
                                            }
                                            return (
                                                (a.data[colIndex] <
                                                b.data[colIndex]
                                                    ? -1
                                                    : 1) *
                                                (order === 'desc' ? 1 : -1)
                                            )
                                        })
                                    },
                                    elevation: 0,
                                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                                }}
                            />
                        ) : null}
                    </Box>
                    {selectedValue !== '' &&
                    selectReason == 'More part required' ? (
                        <Box sx={{ mt: 2 }}>
                            <>
                                <MUIDataTable
                                    title={
                                        'Search for the Spare part you need for this device, that is not assigned for repairs'
                                    }
                                    data={partData}
                                    columns={columnsSelect}
                                    options={{
                                        filterType: 'textField',
                                        responsive: 'simple',
                                        download: false,
                                        print: false,
                                        selectableRows: 'none', // set checkbox for each row
                                        // search: false, // set search option
                                        // filter: false, // set data filter option
                                        // download: false, // set download option
                                        // print: false, // set print option
                                        // pagination: true, //set pagination option
                                        // viewColumns: false, // set column option
                                        customSort: (data, colIndex, order) => {
                                            return data.sort((a, b) => {
                                                if (colIndex === 1) {
                                                    return (
                                                        (a.data[colIndex]
                                                            .price <
                                                        b.data[colIndex].price
                                                            ? -1
                                                            : 1) *
                                                        (order === 'desc'
                                                            ? 1
                                                            : -1)
                                                    )
                                                }
                                                return (
                                                    (a.data[colIndex] <
                                                    b.data[colIndex]
                                                        ? -1
                                                        : 1) *
                                                    (order === 'desc' ? 1 : -1)
                                                )
                                            })
                                        },
                                        elevation: 0,
                                        rowsPerPageOptions: [
                                            10, 20, 40, 80, 100,
                                        ],
                                    }}
                                />
                            </>

                            <br />
                        </Box>
                    ) : null}

                    <Box sx={{ textAlign: 'right' }}>
                        {reportData?.checkIntray?.sp_tray == null ? (
                            <Button
                                sx={{
                                    m: 1,
                                }}
                                variant="contained"
                                disabled={
                                    loading ||
                                    selectedValue == '' ||
                                    description == ''
                                }
                                onClick={(e) => {
                                    handelSubmit(e, 'Not-Direct')
                                }}
                                style={{ backgroundColor: 'green' }}
                                component="span"
                            >
                                Submit
                            </Button>
                        ) : (
                            <Button
                                sx={{
                                    m: 1,
                                }}
                                variant="contained"
                                disabled={
                                    loading ||
                                    selectedValue == '' ||
                                    description == '' ||
                                    (selectedValue == 'Repair Not Done' &&
                                        selectReason == '') ||
                                    (selectReason == 'More part required' &&
                                        isCheck.length == 0) ||
                                    requredPart?.length !==
                                        descriptionCount?.length ||
                                    requredPart.length !==
                                        radioButtonCount?.length
                                }
                                onClick={(e) => {
                                    handelSubmit(e, 'Direct')
                                }}
                                style={{ backgroundColor: 'green' }}
                                component="span"
                            >
                                Submit
                            </Button>
                        )}
                    </Box>
                </>
            </Container>
        </>
    )
}

export default SimpleMuiTable
