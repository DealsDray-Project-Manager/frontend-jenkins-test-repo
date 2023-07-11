import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import MemberEditorDialog from './add-rack'
import React, { useState, useEffect, useMemo } from 'react'
import { styled } from '@mui/system'
import { Button, Box, IconButton, Icon, Typography ,Table, TableContainer } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { axiosSuperAdminPrexo } from '../../../../axios'

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

const ProductTable = styled(Table)(() => ({
    minWidth: 750,
    width: '100%',
    // height:'100%',
    whiteSpace: 'pre',
    '& thead': {
        '& th:first-of-type': {
            paddingLeft: 16,
        },
    },
    '& td': {
        borderBottom: '1px solid #ddd',
    },
    '& td:first-of-type': {
        paddingLeft: '36px !important',
    },
}))

const ScrollableTableContainer = styled(TableContainer)
`overflow-x: auto`;

const SimpleMuiTable = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [trayrackList, setTrayRackList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [trayRackId, settrayRackId] = useState('')
    const [editFetchData, setEditFetchData] = useState({})
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)

    useEffect(() => {
        const fetchRacks = async () => {
            try {
                setIsLoading(true)
                const res = await axiosSuperAdminPrexo.post('/trayracks/view')
                if (res.status === 200) {
                    setIsLoading(false)
                    setTrayRackList(res.data.data)
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
        fetchRacks()
        return () => {
            setIsAlive(false)
            setIsLoading(true)
        }
    }, [isAlive])

    const handleDialogClose = () => {
        setEditFetchData({})
        setShouldOpenEditorDialog(false)
    }

    const handleDialogOpen = async (state) => {
        try {
            if (state == 'ADD') {
                const trayId = await axiosSuperAdminPrexo.post(
                    '/trayracks/idGen'
                )
                if (trayId.status == 200) {
                    settrayRackId(trayId.data.rackID)
                }
            }
        } catch (error) {
            console.log(error)
        }
        setShouldOpenEditorDialog(true)
    }

    const editRack = async (trayRackId) => {
        try {
            let response = await axiosSuperAdminPrexo.post(
                '/trayracks/one/' + trayRackId
            )
            if (response.status == 200) {
                setEditFetchData(response.data.data)
                handleDialogOpen("Edit")
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    }

    const handelDelete = (rack_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to Delete Rack!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                        let response = await axiosSuperAdminPrexo.post(
                            '/deleteTrayRacks/' + rack_id
                        )
                        if (response.status == 200) {
                            Swal.fire({
                                position: 'top-center',
                                icon: 'success',
                                title: 'Your Tray Rack has been Deleted.',
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
                                text: "This rack You Can't Delete",
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

    const columns = [
        {
            name: 'index',
            label: <Typography variant="subtitle1" fontWeight='bold' sx={{marginLeft:'7px'}}><>Record No</></Typography>,
            options: {
                filter: false,
                sort: false,
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) =>
                <Typography sx={{pl:2}}>{dataIndex.rowIndex + 1}</Typography>
            },
        },
        {
            name: 'rack_id',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Rack ID</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'name',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Rack Name</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'display',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Rack Display</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'parent_id',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Location</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'warehouse',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Warehouse</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'status',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Actions</></Typography>,
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
                                        editRack(tableMeta.rowData[1])
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
                        </Box>
                    )
                },
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Categories', path: '/' }]} />
            </div>
            <Button
                sx={{ mb: 2 }}
                variant="contained"
                color="primary"
                onClick={() => handleDialogOpen('ADD')}
            >
                Add New Rack
            </Button>
            <>
                <>
                <MUIDataTable
                title={'Manage Racks'}
                data={trayrackList}
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
                </>
            </>
            
            {shouldOpenEditorDialog && (
                <MemberEditorDialog
                    handleClose={handleDialogClose}
                    open={handleDialogOpen}
                    setIsAlive={setIsAlive}
                    editFetchData={editFetchData}
                    setEditFetchData={setEditFetchData}
                    trayRackId={trayRackId}
                    settrayRackId={settrayRackId}
                /> 
            )}
        </Container>
    )
}

export default SimpleMuiTable
