import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import MemberEditorDialog from './create-category'
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { styled } from '@mui/system'
import { Button, IconButton, Icon, Box, Radio, Typography,Table, TableContainer  } from '@mui/material'
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
    height:'100%',
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
    const [warehouseList, setWarehouseList] = useState([])
    const [editFetchData, setEditFetchData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [vendorId, setVendorId] = useState('')
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                setIsLoading(true)
                const res = await axiosSuperAdminPrexo.post(
                    '/vendorMaster/view'
                )
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

    const handleDialogOpen = async (state) => {
        try {
            if (state == 'ADD') {
                const trayId = await axiosSuperAdminPrexo.post(
                    '/partList/idGen'
                )
                if (trayId.status == 200) {
                    setVendorId(trayId.data.venId)
                }
            }
        } catch (error) {
            console.log(error)
        }
        setShouldOpenEditorDialog(true)
    }

    const editWarehouse = async (empId) => {
        try {

            let response = await axiosSuperAdminPrexo.post(
                '/vendorMaster/one/' + empId
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


    const handelDelete = (id,type) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to Delete Category!',
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
                            text: response?.data?.message,
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
            label: <Typography variant="subtitle1" sx={{ fontWeight:'bold'}} ><>Record No</></Typography>,
            options: {
                filter: true,
                sort: true,
                customBodyRender: (rowIndex, dataIndex) =>
                <Typography sx={{pl:2}}>{dataIndex.rowIndex + 1}</Typography>
            },
        },
        {
            name: 'category_id', // field name in the row object
            label: <Typography variant="subtitle1" fontWeight='bold' ><>Category ID</></Typography>, // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'category', // field name in the row object
            label: <Typography variant="subtitle1" fontWeight='bold' ><>Category</></Typography>, // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'desc',
            label: <Typography variant="subtitle1" fontWeight='bold' ><>Description</></Typography>,             
            options: {
                filter: true,
            },
        },
        {
            name: 'created_at',
            label: <Typography variant="subtitle1" fontWeight='bold' ><>Creation Date</></Typography>, 
            options: {
                filter: false,
                sort: false,
                // customBodyRender: (value) =>
                //     new Date(value).toLocaleString('en-GB', {
                //         hour12: true,
                //     }),
                },
        },
        {
            name: 'action',
            label: <Typography variant="subtitle1" fontWeight='bold' ><>Action</></Typography>, 
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
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
                        <IconButton>
                            <Icon
                                onClick={(e) => {
                                    handelDelete(value,tableMeta.rowData[10])
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

    const columns1 = [
        {
            index:1,
            category_id:'CT000001',
            category:'Display',
            desc:'Display',
            created_at:'13/06/2023',
        },
        {
            index:2,
            category_id:'CT000002',
            category:'Charge jack',
            desc:'Charge jack',
            created_at:'13/06/2023',
        },
        {
            index:3,
            category_id:'CT000003',
            category:'Home button',
            desc:'Home button',
            created_at:'13/06/2023',
        },
        {
            index:4,
            category_id:'CT000004',
            category:'Back panel',
            desc:'Back panel',
            created_at:'13/06/2023',
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
                Add New Category
            </Button>
            <>
                <>
                <MUIDataTable
                title={'Manage Categories'}
                data={columns1}
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
                    vendorId={vendorId}
                    setVendorId={setVendorId}
                />
            )}
        </Container>
    )
}

export default SimpleMuiTable