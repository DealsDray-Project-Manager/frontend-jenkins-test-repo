import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import {
    Button,
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    DialogActions,
} from '@mui/material'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import Checkbox from '@mui/material/Checkbox'
import jwt_decode from 'jwt-decode'
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

const SimpleMuiTable = () => {
    const [receiveCheck, setReceiveCheck] = useState('')
    const [trayId, setTrayId] = useState('')
    const [tray, setTray] = useState([])
    const [open, setOpen] = React.useState(false)
    const [refresh,setRefresh]=useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        try {
            const fetchData = async () => {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let res = await axiosWarehouseIn.post(
                        '/returnFromMerging/' + location
                    )
                    if (res.status == 200) {
                        setTray(res.data.data)
                    }
                } else {
                    navigate('/')
                }
            }
            fetchData()
        } catch (error) {
            alert(error)
        }
    }, [refresh])

    const handleClose = () => {
        setOpen(false)
    }

    const handelTrayReceived = async () => {
        if (receiveCheck === '') {
            alert('Please confirm counts')
        } else {
            try {
                let obj = {
                    trayId: trayId,
                    check: receiveCheck,
                    type: 'Merging Done',
                }
                let res = await axiosWarehouseIn.post('/receivedTray', obj)
                if (res.status == 200) {
                    alert(res.data.message)
                    setOpen(false)
                    setRefresh((refresh)=> !refresh)
                }
            } catch (error) {
                alert(error)
            }
        }


    }

    const handelViewDetailTray = (e, id) => {
        e.preventDefault();
        navigate("/wareshouse/merge/return-from-merge/close/" + id);
      };

    const columns = [
        {
            name: 'index',
            label: 'Record No',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (rowIndex, dataIndex) =>
                    dataIndex.rowIndex + 1,
            },
        },
        {
            name: 'code',
            label: 'Tray Id',
            options: {
                filter: true,
            },
        },
        {
            name: 'limit',
            label: 'Tray Id',
            options: {
                filter: true,
                display: false,
            },
        },
        {
            name: 'items',
            label: 'Quantity',
            options: {
                filter: true,

                customBodyRender: (value, tableMeta) =>
                    value.length + '/' + tableMeta.rowData[2],
            },
        },
        {
            name: 'type_taxanomy',
            label: 'Tray Type',
            options: {
                filter: true,
            },
        },
        {
            name: 'issued_user_name',
            label: 'Sorting Agent',
            options: {
                filter: true,
            },
        },
        {
            name: 'sort_id',
            label: 'Status',
            options: {
                filter: true,
            },
        },
        {
            name: 'closed_time_sorting_agent',
            label: 'Merge Done Date',
            options: {
                filter: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },
        {
            name: 'code',
            label: 'Action',
            options: {
                filter: true,
                customBodyRender: (value,tableMeta) => {
                    return (
                        tableMeta.rowData[6] != "Received From Merging" ||   ? (
                            <Button
                              sx={{
                                m: 1,
                              }}
                              variant="contained"
                              style={{ backgroundColor: "green" }}
                              onClick={(e) => {
                                setOpen(true);
                                setTrayId(value);
                              }}
                            >
                              RECEIVED
                            </Button>
                          ) : (
                            <Button
                              sx={{
                                m: 1,
                              }}
                              variant="contained"
                              style={{ backgroundColor: "red" }}
                              onClick={(e) => {
                                handelViewDetailTray(e, value);
                              }}
                            >
                              Close
                            </Button>
                          )
                    )
                },
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
                    RECEIVED
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <h4>
                        {' '}
                        <Checkbox
                            onClick={(e) => {
                                receiveCheck == ''
                                    ? setReceiveCheck(
                                          'I have validated the counts'
                                      )
                                    : receiveCheck('')
                            }}
                            sx={{ ml: 3 }}
                        />
                        I have validated the counts
                    </h4>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{
                            m: 1,
                        }}
                        variant="contained"
                        style={{ backgroundColor: 'green' }}
                        onClick={(e) => {
                            handelTrayReceived(e)
                        }}
                    >
                        RECEIVED
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Merge', path: '/' },
                        { name: 'Return-From-Merge' },
                    ]}
                />
            </div>

            <MUIDataTable
                title={'Tray'}
                data={tray}
                columns={columns}
                options={{
                    filterType: 'textField',
                    responsive: 'simple',
                    selectableRows: 'none', // set checkbox for each row
                    // search: false, // set search option
                    // filter: false, // set data filter option
                    // download: false, // set download option
                    // print: false, // set print option
                    // pagination: true, //set pagination option
                    // viewColumns: false, // set column option
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            />
        </Container>
    )
}

export default SimpleMuiTable
