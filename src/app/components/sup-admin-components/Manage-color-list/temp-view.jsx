import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import MemberEditorDialog from './temp-add'
import Swal from 'sweetalert2'
import '../../../../app.css'
import { Button, IconButton, Icon, Typography, Table } from '@mui/material'
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

const PartTable = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [editFetchData, setEditFetchData] = useState({})
    const [partList, setPartList] = useState([])
    const [muicData, setMuicData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                setIsLoading(true)
                const res = await axiosSuperAdminPrexo.post(
                    '/partAndColor/view/' + 'color-list'
                )
                if (res.status === 200) {
                    setPartList(res.data.data)
                    setIsLoading(false)
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
        return () => {
            setIsAlive(false)
            setIsLoading(false)
        }
    }, [isAlive])

    const handleDialogClose = () => {
        setEditFetchData({})
        setShouldOpenEditorDialog(false)
    }

    const handleDialogOpen = async () => {
        setShouldOpenEditorDialog(true)
    }

    const editMaster = async (id) => {
        try {
            let obj={
                id:id,
                type:"color-list",
                actionType:"Edit"
            }
            let response = await axiosSuperAdminPrexo.post(
                '/partAndColor/oneData',obj
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
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    }

    const handelDelete = (id) => {
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
                    let obj={
                        id:id,
                        type:"color-list",
                        actionType:"Delete"
                    }
                    let res = await axiosSuperAdminPrexo.post(
                        '/partAndColor/oneData',obj
                    )
                    if (res.status == 200) {
                        let obj = {
                            id: id,

                            page: 'color-list',
                        }
                        let response = await axiosSuperAdminPrexo.post(
                            '/partAndColor/delete',
                            obj
                        )
                        if (response.status == 200) {
                            Swal.fire({
                                position: 'top-center',
                                icon: 'success',
                                title: 'Your Color has been Deleted.',
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
                                text: "This Color You Can't Delete",
                            })
                        }
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: "This Color You Can't Delete",
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
        // {
        //     name: 'muic', // field name in the row object
        //     label: 'MUIC', // column title that will be shown in table
        //     options: {
        //         filter: true,
        //     },
        // },
        {
            name: 'name', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Color Name</>
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
            name: 'created_at',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Creation Date</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },
        {
            name: '_id',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Actions</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value) => {
                    return (
                        <>
                            <IconButton>
                                <Icon
                                    onClick={(e) => {
                                        editMaster(value)
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
                    routeSegments={[{ name: 'Color-list', path: '/' }]}
                />
            </div>
            <Button
                sx={{ mb: 2 }}
                variant="contained"
                color="primary"
                onClick={() => handleDialogOpen('ADD')}
            >
                Add New Color
            </Button>

            <Table className="custom-table">
                <MUIDataTable
                    title={'All Colors'}
                    data={partList}
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
                    muicData={muicData}
                    setIsAlive={setIsAlive}
                    editFetchData={editFetchData}
                    setEditFetchData={setEditFetchData}
                />
            )}
        </Container>
    )
}

export default PartTable
