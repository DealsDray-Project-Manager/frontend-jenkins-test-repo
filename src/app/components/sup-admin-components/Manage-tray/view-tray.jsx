import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import MemberEditorDialog from './add-tray'
import React, { useState, useEffect,useMemo } from 'react'
import { styled } from '@mui/system'
import { Button, Box, IconButton, Icon } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { axiosSuperAdminPrexo } from '../../../../axios'
import EditRoadIcon from '@mui/icons-material/EditRoad'

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
    const [isLoading,setIsLoading]=useState("")
    const [editFetchData, setEditFetchData] = useState({})
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                setIsLoading(true)
                let obj = {
                    master_type: 'tray-master',
                }
                const res = await axiosSuperAdminPrexo.post('/getMasters', obj)
                if (res.status === 200) {
                    setTrayList(res.data.data)
                    setIsLoading(false)
                }
            } catch (error) {
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

    const handelDelete = (masterId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You Want to Delete!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    let res = await axiosSuperAdminPrexo.get(
                        '/getOneMaster/' + masterId
                    )
                    if (res.status == 200) {
                        let response = await axiosSuperAdminPrexo.post(
                            '/deleteMaster/' + masterId
                        )
                        if (response.status == 200) {
                            Swal.fire({
                                position: 'top-center',
                                icon: 'success',
                                title: 'Your Tray has been Deleted',
                                confirmButtonText: 'Ok',
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
                            text:"You Can't Delete This Tray",
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
        })
    }

    const editTray = async (masterId) => {
        try {
            let response = await axiosSuperAdminPrexo.get(
                '/getOneMaster/' + masterId
            )
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

    const handelAudit = (trayId) => {
        navigate('/sup-admin/tray/audit/' + trayId)
    }

    const handelEditHistory = (trayId) => {
        navigate('/sup-admin/tray/edit-history/' + trayId)
    }

    const columns = [
        {
            name: 'index',
            label: 'Record No',
            options: {
                filter: false,
                sort: false,
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
            name: 'cpc',
            label: 'Location',
            options: {
                filter: true,
            },
        },
        {
            name: 'warehouse',
            label: 'Warehouse',
            options: {
                filter: true,
            },
        },
        {
            name: 'name',
            label: 'Tray Display Name',
            options: {
                filter: true,
            },
        },
        {
            name: 'limit',
            label: 'Tray Limit',
            options: {
                filter: true,
            },
        },
        {
            name: 'brand',
            label: 'Brand',
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: 'Model',
            options: {
                filter: true,
            },
        },
        {
            name: 'display',
            label: 'Tray Display',
            options: {
                filter: true,
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
            name: 'sort_id',
            label: 'Status',
            options: {
                filter: true,
            },
        },
        {
            name: 'created_at',
            label: 'Creation Date',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },
        {
            name: 'status',
            label: 'Actions',
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            <IconButton>
                                <Icon
                                    onClick={(e) => {
                                        editTray(tableMeta.rowData[1])
                                    }}
                                    color="primary"
                                >
                                    edit
                                </Icon>
                            </IconButton>
                            <IconButton>
                                <Icon
                                    onClick={() => {
                                        handelDelete(tableMeta.rowData[1])
                                    }}
                                    color="error"
                                >
                                    delete
                                </Icon>
                            </IconButton>
                            <IconButton>
                                <Icon
                                    onClick={() => {
                                        handelAudit(tableMeta.rowData[1])
                                    }}
                                    color="primary"
                                >
                                    history
                                </Icon>
                            </IconButton>
                            <IconButton>
                                <EditRoadIcon
                                    onClick={() => {
                                        handelEditHistory(tableMeta.rowData[1])
                                    }}
                                    color="green"
                                >
                                    button
                                </EditRoadIcon>
                            </IconButton>
                        </Box>
                    )
                },
            },
        },
    ]

    const trayData=useMemo(()=>{
        return (
            <MUIDataTable
            title={'All Tray'}
            data={trayList}
            columns={columns}
            isLoading={true}
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
                elevation: 0,
                rowsPerPageOptions: [10, 20, 40, 80, 100],
            }}
        />
        )
    },[trayList,isLoading])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Tray', path: '/' }]} />
            </div>
            <Button
                sx={{ mb: 2 }}
                variant="contained"
                color="primary"
                onClick={() => setShouldOpenEditorDialog(true)}
            >
                Add New Tray
            </Button>
            <Button
                sx={{ mb: 2, ml: 2 }}
                variant="contained"
                color="secondary"
                onClick={() => navigate('/sup-admin/tray/add-bulk-tray')}
            >
                Add Bulk Tray
            </Button>
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
