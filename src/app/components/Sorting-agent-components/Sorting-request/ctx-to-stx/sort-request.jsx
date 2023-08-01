import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { axiosSortingAgent } from '../../../../../axios'
import { Button, Typography } from '@mui/material'
import Swal from 'sweetalert2'

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
    const [tray, setTray] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        try {
            let token = localStorage.getItem('prexo-authentication')
            if (token) {
                const { user_name, location } = jwt_decode(token)
                const fetchData = async () => {
                    let res = await axiosSortingAgent.post(
                        '/sorting/ctx/assignedTray/' + user_name
                    )
                    if (res.status == 200) {
                        setTray(res.data.data)
                    }
                }
                fetchData()
            } else {
                navigate('/')
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    }, [])

    const handelApprove = (e, id) => {
        e.preventDefault()
        navigate('/sorting/ctx/request/start-sort/' + id)
    }

    const columns = [
        {
            name: 'index',
            label: <Typography variant="subtitle1" fontWeight="bold" sx={{ml:2}}>Record No</Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) =>
                   <Typography sx={{pl:4}}>{dataIndex.rowIndex + 1}</Typography>,
            },
        },
        {
            name: 'code',
            label: <Typography variant="subtitle1" fontWeight="bold">Tray ID</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'sort_id',
            label: <Typography variant="subtitle1" fontWeight="bold">Status</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'issued_user_name',
            label: <Typography variant="subtitle1" fontWeight="bold">Agent Name</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'limit',
            label: 'Tray Id',
            options: {
                filter: true,
                display: false,
            },
        },
        {
            name: 'items',
            label: <Typography variant="subtitle1" fontWeight="bold">Quantity</Typography>,
            options: {
                filter: true,

                customBodyRender: (value, tableMeta) =>
                    value.length + '/' + tableMeta.rowData[4],
            },
        },
        {
            name: 'issued_user_name',
            label: 'Sorting Agent',
            options: {
                filter: true,
                display: false,
            },
        },
        {
            name: 'to_merge',
            label: <Typography variant="subtitle1" fontWeight="bold">To Tray</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'assigned_date',
            label: <Typography variant="subtitle1" fontWeight="bold">Assigned Date</Typography>,
            options: {
                filter: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },
        {
            name: 'code',
            label: <Typography variant="subtitle1" fontWeight="bold">Action</Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value) => {
                    return (
                        <Button
                            sx={{
                                m: 1,
                            }}
                            variant="contained"
                            onClick={(e) => handelApprove(e, value)}
                            style={{ backgroundColor: 'green' }}
                            component="span"
                        >
                            Start Merge
                        </Button>
                    )
                },
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: 'Tray-Merge', path: '/' }]}
                />
            </div>

            <MUIDataTable
                title={'Tray'}
                data={tray}
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
                    customSort: (data, colIndex, order) => {
                        return data.sort((a, b) => {
                            if (colIndex === 1) {
                                return (
                                    (a.data[colIndex].price <
                                    b.data[colIndex].price
                                        ? -1
                                        : 1) * (order === 'desc' ? 1 : -1)
                                )
                            }
                            return (
                                (a.data[colIndex] < b.data[colIndex] ? -1 : 1) *
                                (order === 'desc' ? 1 : -1)
                            )
                        })
                    },
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            />
        </Container>
    )
}

export default SimpleMuiTable
