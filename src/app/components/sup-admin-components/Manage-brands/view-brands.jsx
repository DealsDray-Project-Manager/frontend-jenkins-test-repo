import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import MemberEditorDialog from './add-brand'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Button, IconButton, Icon } from '@mui/material'
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

const BrandTable = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [editFetchData, setEditFetchData] = useState({})
    const [brandList, setBrandList] = useState([])
    const navigate = useNavigate()
    const [brandCount, setBrandCount] = useState(0)
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const res = await axiosSuperAdminPrexo.post('/getBrands')
                if (res.status === 200) {
                    setBrandList(res.data.data)
                }
                let countBrand = await axiosSuperAdminPrexo.post(
                    '/getBrandIdHighest'
                )
                if (countBrand.status == 200) {
                    setBrandCount(countBrand.data.data)
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

    const handleDialogOpen = (state) => {
        if (state == 'ADD') {
            if (brandCount != 0) {
                setShouldOpenEditorDialog(true)
            }
        } else {
            setShouldOpenEditorDialog(true)
        }
    }

    const editBrand = async (brandId) => {
        try {
            let response = await axiosSuperAdminPrexo.get(
                '/getBrandOne/' + brandId
            )
            if (response.status == 200) {
                setEditFetchData(response.data.data)
                handleDialogOpen()
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.data.message,
                })
            }
        } catch (error) {
            alert(error)
        }
    }

    const handelDelete = (brandId) => {
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
                        '/getBrandOne/' + brandId
                    )
                    if (res.status == 200) {
                        let response = await axiosSuperAdminPrexo.post(
                            '/deleteBrand/' + brandId
                        )
                        if (response.status == 200) {
                            Swal.fire({
                                position: 'top-center',
                                icon: 'success',
                                title: 'Your Brand has been Deleted.',
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
                                text: "This Brand You Can't Delete",
                            })
                        }
                    } else {
                        alert("This Brand You Can't Delete")
                    }
                } catch (error) {
                    alert(error)
                }
            }
        })
    }

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
            name: 'brand_id', // field name in the row object
            label: 'Brand Id', // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'brand_name',
            label: 'Brand Name',
            options: {
                filter: true,
            },
        },

        {
            name: 'brand_id',
            label: 'Actions',
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return (
                        <>
                            <IconButton>
                                <Icon
                                    onClick={(e) => {
                                        editBrand(value)
                                    }}
                                    color="primary"
                                >
                                    edit
                                </Icon>
                            </IconButton>
                            <IconButton>
                                <Icon
                                    onClick={(e) => {
                                        handelDelete(value)
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
                    routeSegments={[{ name: 'Brands', path: '/' }]}
                />
            </div>
            <Button
                sx={{ mb: 2 }}
                variant="contained"
                color="primary"
                onClick={() => handleDialogOpen('ADD')}
            >
                Add New Brand
            </Button>
            <Button
                sx={{ mb: 2, ml: 2 }}
                variant="contained"
                color="secondary"
                onClick={() => navigate('/sup-admin/brands/bulk-brand')}
            >
                Add Bulk Brand
            </Button>

            <MUIDataTable
                title={'All Brands'}
                data={brandList}
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
            {shouldOpenEditorDialog && (
                <MemberEditorDialog
                    handleClose={handleDialogClose}
                    open={handleDialogOpen}
                    setIsAlive={setIsAlive}
                    editFetchData={editFetchData}
                    setEditFetchData={setEditFetchData}
                    brandCount={brandCount}
                />
            )}
        </Container>
    )
}

export default BrandTable
