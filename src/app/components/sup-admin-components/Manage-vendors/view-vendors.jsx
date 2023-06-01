import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import MemberEditorDialog from './add-vendor'
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { styled } from '@mui/system'
import { Button, IconButton, Icon, Box, Radio ,Typography} from '@mui/material'
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
    const [warehouseList, setWarehouseList] = useState([])
    const [editFetchData, setEditFetchData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                setIsLoading(true)
                const res = await axiosSuperAdminPrexo.post('/getWarehouse')
                if (res.status === 200) {
                    setIsLoading(false)
                    setWarehouseList(res.data.data)
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

    const editWarehouse = async (empId,type) => {
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
   
    const handelActive = (id, type) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You Want to ${type}!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, ${type} it!`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // let res = await axiosSuperAdminPrexo.post(
                    //     '/partAndColor/oneData/' + id + '/part-list'
                    // )
                    // if (res.status == 200) {
                    // }
                    let obj = {
                        id: id,
                        type: type,
                        page: 'part-list',
                    }
                    let response = await axiosSuperAdminPrexo.post(
                        '/partAndColor/delete',
                        obj
                    )
                    if (response.status == 200) {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: `Your Part has been ${type}.`,
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
                            text: "This Part You Can't Delete",
                        })
                    }
                    //  else {
                    //     Swal.fire({
                    //         icon: 'error',
                    //         title: 'Oops...',
                    //         text: "This Part You Can't Delete",
                    //     })
                    // }
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
            label: <Typography variant="subtitle1" fontWeight='bold' sx={{marginLeft:'7px'}}><>Vendor ID</></Typography>,
            options: {
                filter: true,
                sort: true,
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) =>
                <Typography sx={{pl:4}}>{dataIndex.rowIndex + 1}</Typography>
            },
        },
        {
            name: 'name', // field name in the row object
            label: <Typography variant="subtitle1" fontWeight='bold'><>Name</></Typography>, // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'address',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Address</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'city',
            label: <Typography variant="subtitle1" fontWeight='bold'><>City</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'state',
            label: <Typography variant="subtitle1" fontWeight='bold'><>State</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'pincode',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Pincode</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'mobile1',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Mobile 1</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'mobile2',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Mobile 2</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'deals',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Deals</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'reference',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Reference</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'location',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Location</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'type_taxanomy',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Type</></Typography>,
            
            options: {
                filter: true,
                display:false
            },
        },
        {
            name: 'code',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Actions</></Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                        <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                        >
                        {tableMeta.rowData[8] == 'Active' ? (
                                <Radio
                                    onClick={(e) => {
                                        handelActive(value, 'Deactive')
                                    }}
                                    checked
                                    style={{ color: 'green' }}
                                />
                            ) : (
                                <Radio
                                    onClick={(e) => {
                                        handelActive(value, 'Active')
                                    }}
                                    checked
                                    style={{ color: 'red' }}
                                />
                            )}
                             <IconButton>
                                <Icon
                                    onClick={(e) => {
                                        editWarehouse(value,tableMeta.rowData[10])
                                    }}
                                    color="primary"
                                >
                                    edit
                                </Icon>
                            </IconButton>
                        </Box>
                           
                           
                        </>
                    )
                },
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb"> 
                <Breadcrumb
                    routeSegments={[{ name: 'Vendors', path: '/' }]}
                />
            </div>
            <Button
                sx={{ mb: 2 }}
                variant="contained"
                color="primary"
                onClick={() => setShouldOpenEditorDialog(true)}
            >
                Add New Vendor
            </Button>
            <MUIDataTable
                title={'All Vendors'}
                data={warehouseList}
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
