import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
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
import Avatar from '@mui/material/Avatar'
import jwt_decode from 'jwt-decode'
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
    width: '190%',
    height: '100%',
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

const ScrollableTableContainer = styled(TableContainer)`
    overflow-x: auto;
`

const SimpleMuiTable = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [userList, setUserList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { user_name } = jwt_decode(admin)
                    setIsLoading(true)
                    const res = await axiosSuperAdminPrexo.post(
                        '/buyerConSalesAgent/' + user_name
                    )
                    if (res.status === 200) {
                        setIsLoading(false)
                        setUserList(res.data.data.buyer)
                    }
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

    const columns = [
        {
            name: 'index',
            label: 'Record No',
            options: {
                filter: false,
                sort: false,
                customHeadLabelRender: () => (
                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{ pl: 1 }}
                    >
                        Record No
                    </Typography>
                ),
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography noWrap sx={{ pl: 2 }}>
                        {dataIndex.rowIndex + 1}
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
                    return <img height="80px" width="80px" src={value} />
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
                    return <img height="80px" width="80px" src={value} />
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
                    return <img height="80px" width="80px" src={value} />
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
            label: 'Name',
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        Name
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
            name: 'billing_address',
            label: 'Address',
            options: {
                filter: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        Address
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
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Buyer', path: '/' }]} />
            </div>
            <ScrollableTableContainer>
                <ProductTable>
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
