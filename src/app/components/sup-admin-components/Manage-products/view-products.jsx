import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import EditProdutDilog from './edit-product'
import AddEditorDialog from './add-products'
import { useNavigate } from 'react-router-dom'
import { Button, Box, IconButton, Icon, Typography } from '@mui/material'
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

const SimpleMuiTable = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [productList, setProductList] = useState([])
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [editFetchData, setEditFetchData] = useState({})
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)
    const [shouldOpenProductEditDialog, setShouldOpenProductEditDialog] =
        useState(false)

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                setIsLoading(true)
                const res = await axiosSuperAdminPrexo.post('/getAllProducts')
                if (res.status === 200) {
                    setIsLoading(false)
                    setProductList(res.data.data)
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
        return () => {
            setIsAlive(false)
            setIsLoading(false)
        }
    }, [isAlive])

    const editProductData = async (prdodutId) => {
        try {
            let response = await axiosSuperAdminPrexo.get(
                '/getEditProduct/' + prdodutId
            )
            if (response.status === 200) {
                setEditFetchData(response.data.data)
                handleDialogOpen()
            } else if (response.status == 202) {
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

    const editImage = async (productId) => {
        try {
            let res = await axiosSuperAdminPrexo.post(
                '/getImageEditProdt/' + productId
            )
            if (res.status == 200) {
                setEditFetchData(res.data.data)
                handleDialogOpenForProductEdit()
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.message,
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

    const handleDialogClose = () => {
        setEditFetchData({})
        setShouldOpenEditorDialog(false)
    }

    const handleDialogOpen = () => {
        setShouldOpenEditorDialog(true)
    }
    const handleDialogCloseForProductEdit = () => {
        setShouldOpenProductEditDialog(false)
    }

    const handleDialogOpenForProductEdit = () => {
        setShouldOpenProductEditDialog(true)
    }

    const handelDelete = (prdodutId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to Delete Product!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    let res = await axiosSuperAdminPrexo.get(
                        '/getEditProduct/' + prdodutId
                    )
                    if (res.status === 200) {
                        let response = await axiosSuperAdminPrexo.post(
                            '/deleteProduct/' + prdodutId
                        )
                        if (response.status === 200) {
                            Swal.fire({
                                position: 'top-center',
                                icon: 'success',
                                title: 'Your Product has been Deleted',
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
                                text: "You Can't Delete This Product",
                            })
                        }
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: "You Can't Delete This Product",
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
                <Typography sx={{pl:4}}>{dataIndex.rowIndex + 1}</Typography>
            },
        },
        {
            name: 'image', // field name in the row object
            label: <Typography variant="subtitle1" fontWeight='bold'><>Image</></Typography>, // column title that will be shown in table
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <img
                            height="80px"
                            width="80px"
                            src={
                                value == undefined
                                    ? 'https://prexo-v8-3-adminapi.dealsdray.com/product/image/' +
                                      tableMeta.rowData[2] +
                                      '.jpg'
                                    : value
                            }
                        />
                    )
                },
            },
        },

        {
            name: 'vendor_sku_id',
            label: <Typography variant="subtitle1" fontWeight='bold'><>SKU ID</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'brand_name',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Brand</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'model_name',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Model</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'vendor_name',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Vendor Name</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'muic',
            label: <Typography variant="subtitle1" fontWeight='bold'><>MUIC</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'created_at',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Creation Date</></Typography>,
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },
        // {
        //     name: 'created_by',
        //     label: 'Created By',
        //     options: {
        //         filter: true,
        //     },
        // },
        {
            name: 'status',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Actions</></Typography>,
            options: {
                filter: false,
                sort: false,
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
                                        editProductData(tableMeta.rowData[6])
                                    }}
                                    color="primary"
                                >
                                    edit
                                </Icon>
                            </IconButton>
                            <IconButton>
                                <Icon
                                    onClick={() => {
                                        handelDelete(tableMeta.rowData[6])
                                    }}
                                    color="error"
                                >
                                    delete
                                </Icon>
                            </IconButton>
                            <IconButton>
                                <Icon
                                    onClick={() => {
                                        editImage(tableMeta.rowData[6])
                                    }}
                                    color="primary"
                                >
                                    image
                                </Icon>
                            </IconButton>
                            <IconButton>
                                <Icon
                                    onClick={() =>
                                        navigate(
                                            '/sup-admin/products/muiclist/' +
                                                tableMeta.rowData[6]
                                        )
                                    }
                                    color="default"
                                >
                                    details
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
                <Breadcrumb
                    routeSegments={[{ name: 'Products', path: '/pages' }]}
                />
            </div>
            <Button
                sx={{ mb: 2 }}
                variant="contained"
                color="primary"
                onClick={() => handleDialogOpen()}
            >
                Add New Product
            </Button>
            <Button
                sx={{ mb: 2, ml: 2 }}
                variant="contained"
                color="secondary"
                onClick={() => navigate('/sup-admin/products/bulk-product')}
            >
                Add Bulk Products
            </Button>
            <MUIDataTable
                title={'All Products'}
                data={productList}
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
                <AddEditorDialog
                    handleClose={handleDialogClose}
                    open={handleDialogOpen}
                    setIsAlive={setIsAlive}
                    editFetchData={editFetchData}
                    setEditFetchData={setEditFetchData}
                />
            )}
            {shouldOpenProductEditDialog && (
                <EditProdutDilog
                    handleClose={handleDialogCloseForProductEdit}
                    open={handleDialogOpenForProductEdit}
                    setIsAlive={setIsAlive}
                    editFetchData={editFetchData}
                    setEditFetchData={setEditFetchData}
                />
            )}
        </Container>
    )
}

export default SimpleMuiTable
