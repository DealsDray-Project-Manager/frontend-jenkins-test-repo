import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import MemberEditorDialog from './add-bag'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import {
    Button,
    Box,
    IconButton,
    Icon,
    Typography,
    Table,
    TableContainer,
    TableCell,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../../../../app.css'
import { axiosSuperAdminPrexo } from '../../../../axios'
import useAuth from 'app/hooks/useAuth'

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
    const [bagList, setBagList] = useState([])
    const navigate = useNavigate()
    const { user } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [editFetchData, setEditFetchData] = useState({})
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                setIsLoading(true)
                let obj = {
                    master_type: 'bag-master',
                }
                const res = await axiosSuperAdminPrexo.post('/getMasters', obj)
                if (res.status === 200) {
                    setIsLoading(false)
                    setBagList(res.data.data)
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
            confirmButtonText: 'Yes, Deleted it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    let obj = {
                        masterId: masterId,
                    }
                    let res = await axiosSuperAdminPrexo.post(
                        '/getOneMaster',
                        obj
                    )
                    if (res.status == 200) {
                        let obj={
                            actionUser:user.username,
                            masterId:masterId,
                            reason:""
                        }
                        let response = await axiosSuperAdminPrexo.post(
                            '/deleteMaster',obj 
                        )
                        if (response.status == 200) {
                            Swal.fire({
                                position: 'top-center',
                                icon: 'success',
                                title: 'Your Bag has been Deleted',
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
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: "You Can't Delete This Bag",
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

    const editbag = async (masterId) => {
        try {
            let obj = {
                masterId: masterId,
            }
            let response = await axiosSuperAdminPrexo.post('/getOneMaster', obj)
            if (response.status == 200) {
                setEditFetchData(response.data.data)
                handleDialogOpen()
            } else if (response.status === 202) {
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

    const handelAudit = (bagId) => {
        navigate('/sup-admin/bag/audit/' + bagId)
    }

    const columns = [
        {
            name: 'index',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Record No</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,

                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 2 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'code',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Bag ID</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'cpc',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Location</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'warehouse',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Warehouse</>
                </Typography>
            ),
            options: {
                filter: true,
                customHeadRender: (columnMeta) => (
                    <TableCell
                        key={columnMeta.index}
                        style={{
                            maxWidth: '80px',
                            overflow: 'hidden',
                            whiteSpace: 'normal',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        <Typography variant="subtitle1" fontWeight="bold">
                            Warehouse
                        </Typography>
                    </TableCell>
                ),
            },
        },
        {
            name: 'name',
            label: 'Bag Display Name',
            options: {
                filter: true,
                customHeadRender: (columnMeta) => (
                    <TableCell key={columnMeta.index}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Bag Display Name
                        </Typography>
                    </TableCell>
                ),
            },
        },
        {
            name: 'limit',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Bag Limit</>
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
                    <>Bag Display</>
                </Typography>
            ),
            options: {
                filter: true,
                customHeadRender: (columnMeta) => (
                    <TableCell key={columnMeta.index}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Bag Display
                        </Typography>
                    </TableCell>
                ),
            },
        },
        {
            name: 'type_taxanomy',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Bag Type</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'sort_id',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Status</>
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
                filter: true,
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
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <Box>
                            <IconButton>
                                <Icon
                                    onClick={(e) => {
                                        editbag(tableMeta.rowData[1])
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
                        </Box>
                    )
                },
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Bag', path: '/' }]} />
            </div>
            <Button
                sx={{ mb: 2 }}
                variant="contained"
                color="primary"
                onClick={() => setShouldOpenEditorDialog(true)}
            >
                Add New Bag
            </Button>
            <Button
                sx={{ mb: 2, ml: 2 }}
                variant="contained"
                color="secondary"
                onClick={() => navigate('/sup-admin/bag/add-bulk-bag')}
            >
                Add Bulk Bag
            </Button>

            <Table className="custom-table">
                <MUIDataTable
                    title={'All Bags'}
                    data={bagList}
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
                />
            )}
        </Container>
    )
}

export default SimpleMuiTable
