import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { styled } from '@mui/system'
import { axiosSuperAdminPrexo } from '../../../../axios'
import Avatar from '@mui/material/Avatar'
import { Typography, Table } from '@mui/material'
import { useParams } from 'react-router-dom'
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

const UserTable = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [userList, setUserList] = useState([])
    const { buyername } = useParams()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                let res = await axiosSuperAdminPrexo.post(
                    '/getUsersHistoy/' + buyername
                )
                if (res.status === 200) {
                    setUserList(res.data.data)
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }
        }
        fetchUser()
        return () => setIsAlive(false)
    }, [isAlive])

    const columns = [
        {
            name: 'index',
            label: 'Record No',
            options: {
                filter: true,
                sort: true,
                customHeadLabelRender: () => (
                    <Typography variant="subtitle1" fontWeight="bold">
                        Record No
                    </Typography>
                ),
                customBodyRender: (rowIndex, dataIndex) =>
                    dataIndex.rowIndex + 1,
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
            name: 'name',
            label: 'Buyer Name',
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
            name: 'last_update_date',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    Edited Date
                </Typography>
            ),
            options: {
                filter: true,

                customBodyRender: (value) =>
                    value != undefined
                        ? new Date(value).toLocaleString('en-GB', {
                              hour12: true,
                          })
                        : null,
            },
        },
    ]
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Buyer', path: '/' },
                        { name: 'History' },
                    ]}
                />
            </div>
            <Table className="custom-table">
                <MUIDataTable
                    title={'Buyer History'}
                    data={userList}
                    columns={columns}
                    options={{
                        filterType: 'textField',
                        responsive: 'simple',
                        download: false,
                        print: false,
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
        </Container>
    )
}

export default UserTable
