import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import MemberEditorDialog from './create-category'
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { styled } from '@mui/system'
import '../../../../app.css'
import {
    Button,
    IconButton,
    Icon,
    Box,
    Radio,
    Typography,
    Table,
} from '@mui/material'
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
    const [categoriesList, setCategoriesList] = useState([])
    const [editFetchData, setEditFetchData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [categoriesId, setCategoriesId] = useState('')
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setIsLoading(true)
                const res = await axiosSuperAdminPrexo.post(
                    '/spcategories/view'
                )
                if (res.status === 200) {
                    setIsLoading(false)
                    setCategoriesList(res.data.data)
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
        fetchCategories()
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
                    '/spcategories/idGen'
                )
                if (trayId.status == 200) {
                    setCategoriesId(trayId.data.spctID)
                }
            }
        } catch (error) {
            console.log(error)
        }
        setShouldOpenEditorDialog(true)
    }

    const editCategories = async (categoriesId) => {
        try {
            let response = await axiosSuperAdminPrexo.post(
                '/spcategories/one/' + categoriesId
            )
            if (response.status == 200) {
                setEditFetchData(response.data.data)
                handleDialogOpen('Edit')
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    }

    const handelDelete = (spcategory_id) => {
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
                    let response = await axiosSuperAdminPrexo.post(
                        '/deleteSPcategory/' + spcategory_id
                    )
                    if (response.status == 200) {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'Your SP category has been Deleted.',
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
                            text: "This category You Can't Delete",
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
            label: (
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    <>Record No</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true,
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 2 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'spcategory_id', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Category ID</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'category_name', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Category</>
                </Typography>
            ), // column title that will be shown in table
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
        {
            name: 'creation_date',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Creation Date</>
                </Typography>
            ),
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
            name: 'action',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Action</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            <IconButton>
                                <Icon
                                    onClick={(e) => {
                                        editCategories(tableMeta.rowData[1])
                                    }}
                                    color="primary"
                                >
                                    edit
                                </Icon>
                            </IconButton>
                            <IconButton>
                                <Icon
                                    onClick={(e) => {
                                        handelDelete(tableMeta.rowData[1])
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
                <Breadcrumb
                    routeSegments={[{ name: 'Sp Categories', path: '/' }]}
                />
            </div>
            <Button
                sx={{ mb: 2 }}
                variant="contained"
                color="primary"
                onClick={() => handleDialogOpen('ADD')}
            >
                Add New Category
            </Button>

            <Table className="custom-table">
                <MUIDataTable
                    title={'Manage sp Categories'}
                    data={categoriesList}
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

            {shouldOpenEditorDialog && (
                <MemberEditorDialog
                    handleClose={handleDialogClose}
                    open={handleDialogOpen}
                    setIsAlive={setIsAlive}
                    editFetchData={editFetchData}
                    setEditFetchData={setEditFetchData}
                    categoriesId={categoriesId}
                    setCategoriesId={setCategoriesId}
                />
            )}
        </Container>
    )
}

export default SimpleMuiTable
