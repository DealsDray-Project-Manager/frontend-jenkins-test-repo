import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import MemberEditorDialog from './add-box'
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
} from '@mui/material'
import '../../../../app.css'
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
    const [boxList, setBoxList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [boxId, setboxId] = useState('')
    const [editFetchData, setEditFetchData] = useState({})
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)

    useEffect(() => {
        const fetchBoxes = async () => {
            try {
                setIsLoading(true)
                const res = await axiosSuperAdminPrexo.post('/boxes/view')
                if (res.status === 200) {
                    setIsLoading(false)
                    setBoxList(res.data.data)
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
        fetchBoxes()
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
                const boxId = await axiosSuperAdminPrexo.post('/boxes/idGen')
                if (boxId.status == 200) {
                    setboxId(boxId.data.boxID)
                }
            }
        } catch (error) {
            console.log(error)
        }
        setShouldOpenEditorDialog(true)
    }

    const editBox = async (boxId) => {
        try {
            let response = await axiosSuperAdminPrexo.post(
                '/boxes/one/' + boxId
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

    const handelDelete = (box_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to Delete Box!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    let response = await axiosSuperAdminPrexo.post(
                        '/deleteBoxes/' + box_id
                    )
                    if (response.status == 200) {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'Your Box has been Deleted.',
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
                            text: "This box You Can't Delete",
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
        {
            name: 'box_id',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Box ID</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'name',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Box Name</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'display',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Box Display</>
                </Typography>
            ),
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
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            <IconButton>
                                <Icon
                                    onClick={(e) => {
                                        editBox(tableMeta.rowData[1])
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
                <Breadcrumb routeSegments={[{ name: 'Boxes', path: '/' }]} />
            </div>
            <Button
                sx={{ mb: 2 }}
                variant="contained"
                color="primary"
                onClick={() => handleDialogOpen('ADD')}
            >
                Add New Box
            </Button>

            <Table className="custom-table">
                <MUIDataTable
                    title={'Manage Boxes'}
                    data={boxList}
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
                    boxId={boxId}
                    setboxId={setboxId}
                />
            )}
        </Container>
    )
}

export default SimpleMuiTable
