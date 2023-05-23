import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import MemberEditorDialog from './add-location'
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { styled } from '@mui/system'
import { Button, IconButton, Icon, Typography } from '@mui/material'
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

const SimpleMuiTable = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [locationList, setLocatiolList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [editFetchData, setEditFetchData] = useState({})
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                setIsLoading(true)
                const res = await axiosSuperAdminPrexo.post('/getLocation')
                if (res.status === 200) {
                    setIsLoading(false)
                    setLocatiolList(res.data.data)
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
        fetchLocation()
        return () => {
            setIsAlive(false)
            setIsLoading(true)
        }
    }, [isAlive])

    const handleDialogClose = () => {
        setEditFetchData({})
        setShouldOpenEditorDialog(false)
    }

    const handleDialogOpen = () => {
        setShouldOpenEditorDialog(true)
    }

    const editLocation = async (empId,type) => {
        try {
            let obj={
                empId:empId,
                type:type
            }
            let response = await axiosSuperAdminPrexo.post('/getInfra',obj)
            if (response.status == 200) {
                setEditFetchData(response.data.data)
                handleDialogOpen()
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    }
    const handelDelete = (id,type) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to Delete Location!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    let obj={
                        empId:id,
                        type:type
                    }
                    let response = await axiosSuperAdminPrexo.post(
                        '/deleteInfra',obj 
                    )
                    if (response.status == 200) {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'Location has been Deleted',
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
                            text: response.data.message,
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
            label: <Typography variant="subtitle1" sx={{marginLeft:'7px',  width: '150px'}}><strong>Record No</strong></Typography>,
            options: {
                filter: false,
                sort: false,
                setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) =>
                    dataIndex.rowIndex + 1,
            },
        },
        {
            name: 'name', // field name in the row object
            label: <Typography variant="subtitle1"><strong>Name</strong></Typography>, // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'code',
            label: <Typography variant="subtitle1"><strong>Code</strong></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'location_type',
            label: <Typography variant="subtitle1"><strong>Location Type</strong></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'address',
            label: <Typography variant="subtitle1"><strong>Address</strong></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'city',
            label: <Typography variant="subtitle1"><strong>City</strong></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'state',
            label: <Typography variant="subtitle1"><strong>State</strong></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'country',
            label: <Typography variant="subtitle1"><strong>Country</strong></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'pincode',
            label: <Typography variant="subtitle1"><strong>Pincode</strong></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'type_taxanomy',
            label: <Typography variant="subtitle1"><strong>Type</strong></Typography>,
            
            options: {
                filter: true,
                display:false
            },
        },
        {
            name: 'code',
            label: <Typography variant="subtitle1"><strong>Actions</strong></Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            <IconButton>
                                <Icon
                                    onClick={(e) => {
                                        editLocation(value,tableMeta.rowData[9])
                                    }}
                                    color="primary"
                                >
                                    edit
                                </Icon>
                            </IconButton>
                            <IconButton>
                                <Icon
                                    onClick={(e) => {
                                        handelDelete(value,tableMeta.rowData[9])
                                    }}
                                    color="error"
                                >
                                    delete
                                </Icon>
                            </IconButton>
                        </>
                    )
                },
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Location', path: '/' }]} />
            </div>
            <Button
                sx={{ mb: 2 }}
                variant="contained"
                color="primary"
                onClick={() => setShouldOpenEditorDialog(true)}
            >
                Add New Location
            </Button>
            <MUIDataTable
                title={'All Locations'} 
                data={locationList}
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
