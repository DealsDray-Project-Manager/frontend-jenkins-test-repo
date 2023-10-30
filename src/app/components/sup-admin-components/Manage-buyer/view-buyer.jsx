import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import MemberEditorDialog from './new-buyer'
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
    minWidth: 950,
    width: '180%',
    height: '100%',
    whiteSpace: 'pre',
}))

const ScrollableTableContainer = styled(TableContainer)`
    overflow-x: auto;
`

const SimpleMuiTable = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [userList, setUserList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true)
                const res = await axiosSuperAdminPrexo.post('/getBuyers')
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

    const editUser = async (empId) => {
        try {
            let response = await axiosSuperAdminPrexo.get(
                '/getEditBuyerData/' + empId
            )
            if (response.status == 200) {
                navigate('/sup-admin/buyer/create', {
                    state: {
                        editFetchData: response.data.data,
                    },
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
    // HANDEL CREATE NEW BUYER
    const handelNewBuyerPage = () => {
        navigate('/sup-admin/buyer/create', {
            state: {
                editFetchData: {},
            },
        })
    }

    const handelHistory = (e, username) => {
        e.preventDefault()
        navigate('/sup-admin/buyer-edit-hitsory/' + username)
    }

    const columns = [
        {
            name: 'index',
            label: 'Record No',
            options: {
                filter: false,
                sort: false,
                display: 'true',
                customBodyRender: (value, tableMeta, updateValue) => {
                    const rowIndex = tableMeta.rowIndex
                    return (
                        <Typography sx={{ pl: 2 }}>{rowIndex + 1}</Typography>
                    )
                },
                customHeadLabelRender: () => (
                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{ pl: 1 }}
                    >
                        Record No
                    </Typography>
                ),
            },
        },
        {
            name: 'profile',
            label: 'Profile',
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        Profile
                    </Typography>
                ),
                customBodyRender: (value) => {
                    return <Avatar variant="rounded" src={value} />
                },
            },
        },
        {
            name: 'pan_card_proof',
            label: 'Pan Proof',
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        Pan Proof
                    </Typography>
                ),
                customBodyRender: (value, tableMeta) => {
                    return <img height="80px" width="70px" src={value} />
                },
            },
        },
        {
            name: 'aadhar_proof',
            label: 'Aadhar Proof',
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        Aadhar Proof
                    </Typography>
                ),
                customBodyRender: (value, tableMeta) => {
                    return <img height="80px" width="70px" src={value} />
                },
            },
        },
        {
            name: 'business_address_proof',
            label: 'Business Proof',
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        Business Proof
                    </Typography>
                ),
                customBodyRender: (value, tableMeta) => {
                    return <img height="80px" width="70px" src={value} />
                },
            },
        },

        {
            name: 'creation_date',
            label: 'Creation Date',
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        Creation Date
                    </Typography>
                ),
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },
        {
            name: 'name',
            label: 'Buyer Name',
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        Buyer Name
                    </Typography>
                ),
            },
        },
        {
            name: 'contact_person_name',
            label: 'Contact Person Name',
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        Contact Person Name
                    </Typography>
                ),
            },
        },

        {
            name: 'business_name',
            label: 'Business Name',
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        Business Name
                    </Typography>
                ),
            },
        },
        {
            name: 'email',
            label: 'Email',
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        Email
                    </Typography>
                ),
            },
        },
        {
            name: 'contact',
            label: 'Mobile No',
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        Mobile No
                    </Typography>
                ),
            },
        },
        {
            name: 'user_name',
            label: 'User Name',
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        User Name
                    </Typography>
                ),
            },
        },
        {
            name: 'sales_users',
            label: 'Sales User',
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        Sales User
                    </Typography>
                ),
            },
        },
        {
            name: 'cpc',
            label: 'CPC',
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        CPC
                    </Typography>
                ),
            },
        },
        {
            name: 'warehouse',
            label: 'Warehouse',
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        Warehouse
                    </Typography>
                ),
            },
        },
        {
            name: 'billing_address',
            label: 'Billing Address',
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        Billing Address
                    </Typography>
                ),
            },
        },
        {
            name: 'city',
            label: 'City',
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        City
                    </Typography>
                ),
            },
        },
        {
            name: 'state',
            label: 'State',
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        State
                    </Typography>
                ),
            },
        },

        {
            name: 'pincode',
            label: 'Pincode',
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        Pincode
                    </Typography>
                ),
            },
        },
        {
            name: 'gstin',
            label: 'GSTIN',
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        GSTIN
                    </Typography>
                ),
            },
        },
        {
            name: 'pan_card_number',
            label: 'Pan Number',
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        Pan Number
                    </Typography>
                ),
            },
        },
        {
            name: 'mobile_verification_status',
            label: 'Mobile Status',
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        Mobile Status
                    </Typography>
                ),
            },
        },
        {
            name: 'email_verification_status',
            label: 'Email Status',
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        Email Status
                    </Typography>
                ),
            },
        },
        {
            name: 'status',
            label: 'Status',
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        Status
                    </Typography>
                ),
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
            label: 'Actions',
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        Actions
                    </Typography>
                ),
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
                                        handelDeactive(tableMeta.rowData[11])
                                    }}
                                    checked
                                    style={{ color: 'green' }}
                                />
                            ) : (
                                <Radio
                                    onClick={(e) => {
                                        handelActive(tableMeta.rowData[11])
                                    }}
                                    checked
                                    style={{ color: 'red' }}
                                />
                            )}
                            <IconButton>
                                <Icon
                                    onClick={(e) => {
                                        editUser(tableMeta.rowData[11])
                                    }}
                                    color="primary"
                                >
                                    edit
                                </Icon>
                            </IconButton>
                            <IconButton>
                                <Icon
                                    onClick={(e) => {
                                        handelHistory(e, tableMeta.rowData[11])
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
                <Breadcrumb routeSegments={[{ name: 'Buyer', path: '/' }]} />
            </div>
            <Button
                sx={{ mb: 2 }}
                variant="contained"
                color="primary"
                onClick={() => handelNewBuyerPage()}
            >
                Add New Buyer
            </Button>
            <ScrollableTableContainer>
                <ProductTable className="custom-table">
                    <MUIDataTable
                        title={'All Buyers'}
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
                            selectableRows: 'none',
                            elevation: 0,
                            rowsPerPageOptions: [10, 15, 40, 80, 100],
                            sort: true,
                        }}
                    />
                </ProductTable>
            </ScrollableTableContainer>
        </Container>
    )
}

export default SimpleMuiTable
