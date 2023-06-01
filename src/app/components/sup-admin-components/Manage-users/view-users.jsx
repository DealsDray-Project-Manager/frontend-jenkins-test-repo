import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import MemberEditorDialog from './new-users'
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { styled } from '@mui/system'
import { Button, IconButton, Icon, Box, Radio, Typography } from '@mui/material'
import { axiosSuperAdminPrexo } from '../../../../axios'
import Avatar from '@mui/material/Avatar'
import { useNavigate } from 'react-router-dom'


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
    }
  }));
  

const UserTable = () => {
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

    const options = {
        // Other table options...
        setTableProps: () => ({ style: { tableLayout: 'auto', marginLeft:'20px' } }),
      };
    
    const columns = [
        {
            name: 'index',
            label: <Typography className='table-class' variant="subtitle1" fontWeight='bold'  marginLeft='7px' ><>Record No</></Typography>,
            options: {
                // responsive: 'scrollMaxHeight',
                filter: false,
                
                sort: false,
                customBodyRender: (rowIndex, dataIndex) =>
                <Typography sx={{pl:4}}>{dataIndex.rowIndex + 1}</Typography>
            },
           minWidth:200 
        },
        {
            name: 'profile',
            label: <Typography className='table-class'  variant="subtitle1" fontWeight='bold' ><>Profile</></Typography>,
            options: {
                // responsive: 'scrollMaxHeight',
                filter: false,
                sort: false,
                customBodyRender: (value) => {
                    return <Avatar variant="rounded" src={value} />
                },
            },
            minWidth:200 
        },
        {
            name: 'creation_date',
            label: <Typography className='table-class'  variant="subtitle1" fontWeight='bold'><>Creation Date</></Typography>,
            options: {
                filter: true,
                responsive: 'scrollMaxHeight',
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
            minWidth:200 
        },
        {
            name: 'name', // field name in the row object
            label: <Typography variant="subtitle1" fontWeight='bold'><>Name</></Typography>,
            options: {
                filter: true,
            },
            minWidth:200 
        },
        {
            name: 'email',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Email</></Typography>,
            options: {
                filter: true,
            },
            minWidth:200 
        },
        {
            name: 'contact',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Mobile No</></Typography>,
            options: {
                filter: true,
            },
            minWidth:200 
        },
        {
            name: 'user_name',
            label: <Typography variant="subtitle1" fontWeight='bold'><>User Name</></Typography>,
            options: {
                filter: true,
            },
            minWidth:200 
        },
        {
            name: 'user_type',
            label: <Typography variant="subtitle1" fontWeight='bold'><>User Type</></Typography>,
            options: {
                filter: true,
            },
            minWidth:200 
        },
        {
            name: 'cpc',
            label: <Typography variant="subtitle1" fontWeight='bold'><>CPC</></Typography>,
            options: {
                filter: true,
            },
            minWidth:200 
        },
        {
            name: 'cpc_type',
            label: <Typography variant="subtitle1" fontWeight='bold'>CPC Type</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'warehouse',
            label: <Typography variant="subtitle1" fontWeight='bold'>Warehouse</Typography>,
            options: {
                filter: true,
            },
            
        },
        {
            name: 'device_name',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Device Name</></Typography>,
            options: {
                filter: true,
            },
            
        },
        {
            name: 'device_id',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Device ID</></Typography>,
            options: {
                filter: true,
            },
            
        },
        {
            name: 'status',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Status</></Typography>,
            minWidth:200 ,
            options: {
                filter: true,
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
            label: <Typography variant="subtitle1" fontWeight='bold'><>Actions</></Typography>,
            minWidth:200 ,
            options: {
                sort: false,
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            {value == 'Active' ? (
                                <Radio
                                    onClick={(e) => {
                                        handelDeactive(tableMeta.rowData[6])
                                    }}
                                    checked
                                    style={{ color: 'green' }}
                                />
                            ) : (
                                <Radio
                                    onClick={(e) => {
                                        handelActive(tableMeta.rowData[6])
                                    }}
                                    checked
                                    style={{ color: 'red' }}
                                />
                            )}
                            <IconButton>
                                <Icon
                                    onClick={(e) => {
                                        editUser(tableMeta.rowData[6])
                                    }}
                                    color="primary"
                                >
                                    edit
                                </Icon>
                            </IconButton>
                            <IconButton>
                                <Icon
                                    onClick={(e) => {
                                        handelHistory(e, tableMeta.rowData[6])
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
                onClick={() => handleDialogOpen()}
            >
                Add New Member
            </Button>

            <Box  sx={{overflowX:'auto',width:'100%'}}>
            <MUIDataTable
            
                style={{width:'100%', marginLeft:'40px',marginRight:'20px', columnSpacing: 10,}}
                // className="table-class"
                title={'User Report'}
                data={userList}
                columns={columns}
                
                // optionss={options}
                options={{
                    // options,
                    style: { tableLayout: 'auto'},
                    filterType: 'textField',
                    // responsive: 'scrollMaxHeight',
                    // minWidth:'100',
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
            </Box>
            
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

export default UserTable
