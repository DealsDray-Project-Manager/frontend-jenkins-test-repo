import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import MemberEditorDialog from './new-users'
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { styled } from '@mui/system'
import {
    Button,
    IconButton,
    Icon,
    Typography,
    TableContainer,
    Radio,
    Box,
    Table,
} from '@mui/material'
import { axiosSuperAdminPrexo } from '../../../../axios'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import '../../../../app.css'
import './customDataTableStyles.css'

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
    const [userList, setUserList] = useState([])
    const [editFetchData, setEditFetchData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true)
                const res = await axiosSuperAdminPrexo.post('/getUsers')
                if (res.status === 200) {
                    setIsLoading(false)
                    setUserList(res.data.data.user)
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
        fetchUser()
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

    const editUser = async (empId) => {
        try {
            let response = await axiosSuperAdminPrexo.get(
                '/getEditData/' + empId
            )
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

    const handelHistory = (e, username) => {
        e.preventDefault()
        navigate('/sup-admin/user-history/' + username)
    }

    const handelDeactive = (userId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be Deactive this user!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Deactivate it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    let response = await axiosSuperAdminPrexo.post(
                        '/userDeactivate/' + userId
                    )
                    if (response.status == 200) {
                        setIsAlive((isAlive) => !isAlive)
                        Swal.fire(
                            'Deactivated!',
                            'Your user has been Deactivated.',
                            'success'
                        )
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

    const handelActive = (userId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be Active this user!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Activate it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    let response = await axiosSuperAdminPrexo.post(
                        '/userActivate/' + userId
                    )
                    if (response.status == 200) {
                        setIsAlive((isAlive) => !isAlive)
                        Swal.fire(
                            'Activated!',
                            'Your user has been Activated.',
                            'success'
                        )
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        confirmButtonText: 'Ok',
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
                    marginBottom="15px"
                    className="table-class"
                    variant="subtitle1"
                    fontWeight="bold"
                >
                    <>Record No</>
                </Typography>
            ),
            options: {
                filter: false,

                sort: false,
                // customHeadRender: (columnMeta) => (
                //     <th style={{ width: '38%', borderBottom: '1px solid #ddd' }}>{columnMeta.label}</th>
                //   ),
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 3 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'profile',
            label: (
                <Typography
                    className="table-class"
                    variant="subtitle1"
                    fontWeight="bold"
                >
                    <>Profile</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                // customHeadRender: (columnMeta) => (
                //     <th style={{ width: '30%', borderBottom: '1px solid #ddd' }}>{columnMeta.label}</th>
                //   ),
                customBodyRender: (value) => {
                    return <Avatar variant="rounded" src={value} />
                },
            },
        },
        {
            name: 'creation_date',
            label: (
                <Typography
                    marginBottom="15px"
                    className="table-class"
                    variant="subtitle1"
                    fontWeight="bold"
                >
                    <>Creation Date</>
                </Typography>
            ),
            options: {
                filter: true,
                // customHeadRender: (columnMeta) => (
                //     <th style={{ width: '45%', borderBottom: '1px solid #ddd' }}>{columnMeta.label}</th>
                //   ),
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },
        {
            name: 'last_password_changed',
            label: (
                <Typography
                    marginBottom="15px"
                    className="table-class"
                    variant="subtitle1"
                    fontWeight="bold"
                >
                    <>Last Password Change Date</>
                </Typography>
            ),
            options: {
                filter: true,
                // customHeadRender: (columnMeta) => (
                //     <th style={{ width: '45%', borderBottom: '1px solid #ddd' }}>{columnMeta.label}</th>
                //   ),
                customBodyRender: (value) =>
                    value !== undefined
                        ? new Date(value).toLocaleString('en-GB', {
                              hour12: true,
                          })
                        : null,
            },
        },
        {
            name: 'name', // field name in the row object
            label: (
                <Typography
                    marginBottom="15px"
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ mr: 2 }}
                >
                    <>Name</>
                </Typography>
            ),
            options: {
                // customHeadRender: (columnMeta) => (
                //     <th style={{ width: '30%', borderBottom: '1px solid #ddd' }}>{columnMeta.label}</th>
                //   ),
                filter: true,
            },
        },
        {
            name: 'email',
            label: (
                <Typography
                    marginBottom="15px"
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ mr: 2 }}
                >
                    <>Email</>
                </Typography>
            ),
            options: {
                // customHeadRender: (columnMeta) => (
                //     <th style={{ width: '30%', borderBottom: '1px solid #ddd' }}>{columnMeta.label}</th>
                //   ),
                filter: true,
            },
        },
        {
            name: 'contact',
            label: (
                <Typography
                    marginBottom="15px"
                    variant="subtitle1"
                    fontWeight="bold"
                >
                    <>Mobile No</>
                </Typography>
            ),
            options: {
                // customHeadRender: (columnMeta) => (
                //     <th style={{ width: '33%', borderBottom: '1px solid #ddd' }}>{columnMeta.label}</th>
                //   ),
                filter: true,
            },
        },
        {
            name: 'user_name',
            label: (
                <Typography
                    marginBottom="15px"
                    variant="subtitle1"
                    fontWeight="bold"
                >
                    <>User Name</>
                </Typography>
            ),
            options: {
                // customHeadRender: (columnMeta) => (
                //     <th style={{ width: '36%', borderBottom: '1px solid #ddd' }}>{columnMeta.label}</th>
                //   ),
                filter: true,
            },
        },
        {
            name: 'user_type',
            label: (
                <Typography
                    marginBottom="15px"
                    variant="subtitle1"
                    fontWeight="bold"
                >
                    <>User Type</>
                </Typography>
            ),
            options: {
                // customHeadRender: (columnMeta) => (
                //     <th style={{ width: '40%', borderBottom: '1px solid #ddd' }}>{columnMeta.label}</th>
                //   ),
                filter: true,
            },
        },
        {
            name: 'cpc',
            label: (
                <Typography
                    marginBottom="15px"
                    variant="subtitle1"
                    fontWeight="bold"
                >
                    <>CPC</>
                </Typography>
            ),
            options: {
                // customHeadRender: (columnMeta) => (
                //     <th style={{ width: '25%', borderBottom: '1px solid #ddd' }}>{columnMeta.label}</th>
                //   ),
                filter: true,
            },
        },
        {
            name: 'cpc_type',
            label: (
                <Typography
                    marginBottom="15px"
                    variant="subtitle1"
                    fontWeight="bold"
                >
                    CPC Type
                </Typography>
            ),
            options: {
                // customHeadRender: (columnMeta) => (
                //     <th style={{ width: '36%', borderBottom: '1px solid #ddd' }}>{columnMeta.label}</th>
                //   ),
                filter: true,
            },
        },
        {
            name: 'warehouse',
            label: (
                <Typography
                    marginBottom="15px"
                    variant="subtitle1"
                    fontWeight="bold"
                >
                    Warehouse
                </Typography>
            ),
            options: {
                // customHeadRender: (columnMeta) => (
                //     <th style={{ width: '40%', borderBottom: '1px solid #ddd' }}>{columnMeta.label}</th>
                //   ),
                filter: true,
            },
        },
        {
            name: 'device_name',
            label: (
                <Typography
                    marginBottom="15px"
                    variant="subtitle1"
                    fontWeight="bold"
                >
                    <>Device Name</>
                </Typography>
            ),
            options: {
                // customHeadRender: (columnMeta) => (
                //     <th style={{ width: '45%', borderBottom: '1px solid #ddd' }}>{columnMeta.label}</th>
                //   ),
                filter: true,
            },
        },
        {
            name: 'device_id',
            label: (
                <Typography
                    marginBottom="15px"
                    variant="subtitle1"
                    fontWeight="bold"
                >
                    <>Device ID</>
                </Typography>
            ),
            options: {
                // customHeadRender: (columnMeta) => (
                //     <th style={{ width: '30%', borderBottom: '1px solid #ddd' }}>{columnMeta.label}</th>
                //   ),
                filter: true,
            },
        },
        {
            name: 'status',
            label: (
                <Typography
                    marginBottom="15px"
                    variant="subtitle1"
                    fontWeight="bold"
                >
                    <>Status</>
                </Typography>
            ),

            options: {
                filter: true,
                // customHeadRender: (columnMeta) => (
                //     <th style={{ width: '26%', borderBottom: '1px solid #ddd' }}>{columnMeta.label}</th>
                //   ),
                customBodyRender: (value) => {
                    if (value == 'Active') {
                        return (
                            <div style={{ color: 'green', fontWeight: 'bold' }}>
                                {value}
                            </div>
                        )
                    } else {
                        return (
                            <div style={{ color: 'red', fontWeight: 'bold' }}>
                                {value}
                            </div>
                        )
                    }
                },
            },
        },
        {
            name: 'status',
            label: (
                <Typography
                    marginBottom="15px"
                    noWrap
                    variant="subtitle1"
                    fontWeight="bold"
                >
                    <>Actions</>
                </Typography>
            ),

            options: {
                sort: false,
                filter: false,
                // customHeadRender: (columnMeta) => (
                //     <th style={{ width: '25%', borderBottom: '1px solid #ddd' }}>{columnMeta.label}</th>
                //   ),
                customBodyRender: (value, tableMeta) => {
                    return (
                        <Box
                            sx={{
                                // display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            {value == 'Active' ? (
                                <Radio
                                    onClick={(e) => {
                                        handelDeactive(tableMeta.rowData[7])
                                    }}
                                    checked
                                    style={{ color: 'green' }}
                                />
                            ) : (
                                <Radio
                                    onClick={(e) => {
                                        handelActive(tableMeta.rowData[7])
                                    }}
                                    checked
                                    style={{ color: 'red' }}
                                />
                            )}
                            <IconButton>
                                <Icon
                                    onClick={(e) => {
                                        editUser(tableMeta.rowData[7])
                                    }}
                                    color="primary"
                                >
                                    edit
                                </Icon>
                            </IconButton>
                            <IconButton>
                                <Icon
                                    onClick={(e) => {
                                        handelHistory(e, tableMeta.rowData[7])
                                    }}
                                    color="secondary"
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
                <Breadcrumb routeSegments={[{ name: 'Users', path: '/' }]} />
            </div>
            <Button
                sx={{ mb: 2 }}
                variant="contained"
                color="primary"
                onClick={() => setShouldOpenEditorDialog(true)}
            >
                Add New User
            </Button>

            <Table className="custom-table">
                <MUIDataTable
                    title={'All Users'}
                    data={userList}
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
                        rowsPerPageOptions: [10, 15, 40, 80, 100],
                        sort: true,
                    }}
                />
                {/* </div> */}
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
