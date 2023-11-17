import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import MUIDataTable from 'mui-datatables'
import { axiosMisUser, axiosWarehouseIn } from '../../../../axios'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import jwt_decode from 'jwt-decode'
import useAuth from 'app/hooks/useAuth'
import {
    Button,
    Typography,
    Table,
    TextField,
    Box,
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    DialogActions,
    MenuItem,
    Grid,
} from '@mui/material'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

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

function Search() {
    const [uicNum, setUic] = useState('')
    const [uicData, setUicData] = useState([])
    const [open, setOpen] = React.useState(false)
    const [location, setLocation] = useState([])
    const [stxTray, setStxTray] = useState([])
    const { user } = useAuth()
    const [muicDetails, setMuicDetails] = useState({})
    const [butDiss, setButDiss] = useState(false)
    const schema = Yup.object().shape({
        stXTrayId: Yup.string().required('Required*').nullable(),
    })
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    })

    useEffect(() => {
        let admin = localStorage.getItem('prexo-authentication')
        if (admin) {
            const { location } = jwt_decode(admin)
            setLocation(location)
        }
    }, [])
    const searchOldUic = async () => {
        try {
            let res = await axiosWarehouseIn.post(
                '/stxToStxUtilityScan/' + uicNum
            )
            if (res.status == 200) {
                setUicData(res.data.data)
            } else {
                setUicData([])
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonText: 'Ok',
                    text: res.data.message,
                })
            }
        } catch (error) {
            alert(error)
        }
    }

    const handleClose = () => {
        setOpen(false)
    }
    const onsubmit = async (value) => {
        try {
            setButDiss(true)
            handleClose()
            value.uic = uicData?.[0]?.uic
            value.ctxTrayId = uicData?.[0]?.ctx_tray_id
            value.brand = muicDetails.brand
            value.model = muicDetails.model
            value.muic = muicDetails.muic
            value.grade = uicData?.[0]?.grade
            value.screen = 'Stx to Stx'
            value.system_status = uicData?.[0]?.system_status

            let res = await axiosMisUser.post('/stxUtilityAddToStx', value)
            if (res.status == 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    title: res.data.message,
                })

                window.location.reload(true)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonText: 'Ok',
                    text: res.data.message,
                })
            }
        } catch (error) {
            alert(error)
        }
    }
    const handleOpen = async () => {
        try {
            let obj = {
                uic: uicNum,
                location: location,
                grade: uicData?.[0]?.grade,
            }
            let res = await axiosMisUser.post('/stxUtilityGetStx', obj)
            if (res.status == 200) {
                setStxTray(res.data.data)
                setMuicDetails(res.data.muiDetails)
                reset({})
                setOpen(true)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonText: 'Ok',
                    text: res.data.message,
                })
            }
        } catch (error) {
            alert(error)
        }
    }

    const columns = [
        {
            name: 'index',
            label: (
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ marginLeft: '7px' }}
                >
                    <>Record No</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 4 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'uic', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Uic</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: true,
            },
        },

        {
            name: 'model_name',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Model Name</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'grade',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>New Grade</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'ctx_tray_id',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Tray id</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'old_grade',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Old Grade</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'system_status',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>System Status</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'description',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Description</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
    ]

    return (
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
                    Add to Stx
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <TextField
                        label="Select Stx Id"
                        variant="outlined"
                        select
                        fullWidth
                        name="stXTrayId"
                        {...register('stXTrayId')}
                        error={errors.stXTrayId ? true : false}
                        helperText={errors.stXTrayId?.message}
                        sx={{ mt: 2 }}
                    >
                        {stxTray.map((tray) => (
                            <MenuItem value={tray.code} key={tray.code}>
                                {tray.code}-({tray?.items?.length})
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{
                            m: 1,
                        }}
                        variant="contained"
                        style={{ backgroundColor: 'green' }}
                        type="submit"
                        disabled={butDiss}
                        onClick={handleSubmit(onsubmit)}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: 'STX Utility', path: '/' }]}
                />
            </div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                }}
            >
                <Box>
                    <TextField
                        label="SCAN UIC"
                        variant="outlined"
                        onChange={(e) => {
                            setUic(e.target.value)
                        }}
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
                    />
                </Box>
                <Box>
                    <Button
                        sx={{ mb: 2, mt: 1, ml: 3 }}
                        variant="contained"
                        color="primary"
                        disabled={uicNum == ''}
                        onClick={(e) => {
                            searchOldUic(e)
                        }}
                    >
                        Search
                    </Button>
                </Box>
            </Box>
            <MUIDataTable
                title={'Uic Data'}
                data={uicData}
                columns={columns}
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
                                        : 1) * (order === 'desc' ? 1 : -1)
                                )
                            }
                            return (
                                (a.data[colIndex] < b.data[colIndex] ? -1 : 1) *
                                (order === 'desc' ? 1 : -1)
                            )
                        })
                    },
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            />
            <Box sx={{ textAlign: 'right' }}>
                <Button
                    sx={{
                        mt: 2,
                    }}
                    disabled={uicData.length == 0}
                    variant="contained"
                    style={{ backgroundColor: '#206CE2' }}
                    onClick={(e) => {
                        handleOpen(e)
                    }}
                >
                    Add to Stx
                </Button>
            </Box>
        </Container>
    )
}

export default Search
