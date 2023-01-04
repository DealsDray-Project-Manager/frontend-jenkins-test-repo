import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { styled } from '@mui/system'
import { axiosSuperAdminPrexo } from '../../../../axios'
import Avatar from '@mui/material/Avatar'
import { useParams } from 'react-router-dom'

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
    const { username } = useParams()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                let res = await axiosSuperAdminPrexo.post(
                    '/getUsersHistoy/' + username
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
                customBodyRender: (rowIndex, dataIndex) =>
                    dataIndex.rowIndex + 1,
            },
        },
        {
            name: 'image',
            label: 'Profile',
            options: {
                filter: false,
                sort: false,
                customBodyRender: () => {
                    return <Avatar variant="rounded" src="profile"></Avatar>
                },
            },
        },
        {
            name: 'name', // field name in the row object
            label: 'Name', // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'email',
            label: 'Email',
            options: {
                filter: true,
            },
        },
        {
            name: 'contact',
            label: 'Mobile No',
            options: {
                filter: true,
            },
        },
        {
            name: 'user_name',
            label: 'User name',
            options: {
                filter: true,
            },
        },
        {
            name: 'user_type',
            label: 'User Type',
            options: {
                filter: true,
            },
        },
        {
            name: 'cpc',
            label: 'CPC',
            options: {
                filter: true,
            },
        },
        {
            name: 'device_name',
            label: 'Device Name',
            options: {
                filter: true,
            },
        },
        {
            name: 'device_id',
            label: 'Device Id',
            options: {
                filter: true,
            },
        },
        {
            name: 'status',
            label: 'Status',
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
            name: 'last_update_date',
            label: 'Edited Date',
            options: {
                filter: true,
                customBodyRender: (value) => {
                    if (value !== undefined) {
                        new Date(value).toLocaleString('en-GB', {
                            hour12: true,
                        })
                    }
                },
            },
        },
    ]
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Users', path: '/pages' },
                        { name: 'History' },
                    ]}
                />
            </div>
            <MUIDataTable
                title={'User History'}
                data={userList}
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
        </Container>
    )
}

export default UserTable
