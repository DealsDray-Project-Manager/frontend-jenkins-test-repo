import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import MemberEditorDialog from './edit-tray'
import React, { useState, useEffect, useMemo } from 'react'
import { styled } from '@mui/system'
import {
    Button,
    Box,
    IconButton,
    Icon,
    Typography,
    Table,
    TableContainer,
    Tooltip,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { axiosSuperAdminPrexo, axiosWarehouseIn } from '../../../../axios'
import EditRoadIcon from '@mui/icons-material/EditRoad'
import AutoDeleteIcon from '@mui/icons-material/AutoDelete'
import '../../../../app.css'
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

const SimpleMuiTable = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [trayList, setTrayList] = useState([])
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [editFetchData, setEditFetchData] = useState({})
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)
    const { user } = useAuth()

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                setIsLoading(true)
                let obj = {
                    master_type: 'tray-master',
                }
                const res = await axiosWarehouseIn.post(
                    `/stxTray/all/${user.location}`
                )
                if (res.status === 200) {
                    setIsLoading(false)
                    setTrayList(res.data.data)
                }
            } catch (error) {
                setIsLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }
        }
        fetchBrand()
        return () => setIsAlive(false)
    }, [isAlive])

    const handleDialogClose = () => {
        setEditFetchData({})
        setShouldOpenEditorDialog(false)
    }

    const handleDialogOpen = () => {
        setShouldOpenEditorDialog(true)
    }

    const handelDelete = async (masterId) => {
        const { value: reason } = await Swal.fire({
            title: 'Are you sure?',
            text: 'You Want to Delete!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete it!',
            input: 'text', // Specify the input type as text
            inputPlaceholder: 'Enter your reason here', // Placeholder text for the textbox
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to enter a reason!'
                }
            },
        })

        if (reason) {
            try {
                let obj = {
                    actionUser: user.username,
                    masterId: masterId,
                    reason: reason, // Include the reason in the request payload
                }

                // Perform API request to get details before deletion (if needed)
                let res = await axiosSuperAdminPrexo.post('/getOneMaster', obj)

                if (res.status === 200) {
                    // Perform the actual deletion
                    let response = await axiosSuperAdminPrexo.post(
                        '/deleteMaster',
                        obj
                    )

                    if (response.status === 200) {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'Your Tray has been Deleted',
                            confirmButtonText: 'Ok',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                setIsAlive((isAlive) => !isAlive)
                            }
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: response?.data?.message,
                        })
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: "You Can't Delete This Tray",
                    })
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }
        }
    }

    const editTray = async (masterId) => {
        try {
            let obj = {
                masterId: masterId,
            }
            let response = await axiosSuperAdminPrexo.post('/getOneMaster', obj)
            if (response.status == 200) {
                setEditFetchData(response.data.data)
                handleDialogOpen()
            } else if (response.status === 202) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "You Can't Edit This Tray",
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
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
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 2 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'code',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Tray ID</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'tray_grade',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Grade</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'rack_id',
            label: (
                <Typography
                    fontWeight="bold"
                    variant="subtitle1"
                    sx={{ mr: 1 }}
                >
                    Rack ID
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'rackDetails',
            label: (
                <Typography fontWeight="bold" variant="subtitle1">
                    Rack Display
                </Typography>
            ),

            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => value?.[0]?.display,
            },
        },
        {
            name: 'limit',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Tray Limit</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'brand',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Brand</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Model</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'actual_items',
            label: 'acutual_items',
            options: {
                filter: true,
                display: false,
            },
        },
        {
            name: 'limit',
            label: 'limit',
            options: {
                filter: true,
                display: false,
            },
        },
        {
            name: 'items_length',
            label: (
                <Typography fontWeight="bold" variant="subtitle1">
                    Quantity
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => {
                    return (
                        (value == 0 ? tableMeta.rowData[8] : value) +
                        '/' +
                        tableMeta.rowData[9]
                    )
                },
            },
        },
        {
            name: 'sort_id',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Status</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },

       
       

        {
            name: 'status',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Actions</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <Box>
                            <Tooltip title="Edit">
                                <IconButton
                                    onClick={(e) => {
                                        editTray(tableMeta.rowData[1])
                                    }}
                                    color="primary"
                                >
                                    <Icon>edit</Icon>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )
                },
            },
        },
    ]

    const trayData = useMemo(() => {
        return (
            <Table className="custom-table">
                <MUIDataTable
                    title={'STX Trays'}
                    data={trayList}
                    columns={columns}
                    options={{
                        filterType: 'textField',
                        responsive: 'simple',
                        download: false,
                        print: false,
                        textLabels: {
                            body: {
                                noMatch: isLoading
                                    ? 'Loading...'
                                    : 'Sorry, there is no matching data to display',
                            },
                        },
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
            </Table>
        )
    }, [trayList, isLoading])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: 'STX Trays', path: '/' }]}
                />
            </div>

            {trayData}
            {shouldOpenEditorDialog && (
                <MemberEditorDialog
                    handleClose={handleDialogClose}
                    open={handleDialogOpen}
                    setIsAlive={setIsAlive}
                    editFetchData={editFetchData}
                    setEditFetchData={setEditFetchData}
                />
            )}
        </Container>
    )
}

export default SimpleMuiTable
