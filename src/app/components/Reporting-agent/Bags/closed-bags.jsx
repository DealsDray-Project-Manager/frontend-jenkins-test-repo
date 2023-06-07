import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { axiosReportingAgent } from '../../../../axios'
import Swal from 'sweetalert2'
import { Typography } from '@mui/material'

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
    const [bagList, setBotBag] = useState([])
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        try {
            let user = localStorage.getItem('prexo-authentication')
            if (user) {
                setIsLoading(true)
                let { location } = jwt_decode(user)
                const fetchData = async () => {
                    let res = await axiosReportingAgent.post(
                        '/bag/closed/' + location
                    )
                    if (res.status == 200) {
                        setIsLoading(false)
                        setBotBag(res.data.data)
                    }
                }
                fetchData()
            }
        } catch (error) {
            setIsLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
        return () => {
            setIsAlive(false)
            setIsLoading(false)
        }
    }, [isAlive])

    const columns = [
        {
            name: 'index',
            label: <Typography sx={{fontSize:'16px', fontWeight:'bold', ml:2}}>Record No</Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) =>
                    <Typography sx={{pl:4}}>{dataIndex.rowIndex + 1}</Typography>,
            },
        },
        {
            name: 'code',
            label: <Typography sx={{fontSize:'16px', fontWeight:'bold'}}>Bag ID</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'sort_id',
            label: <Typography sx={{fontSize:'16px', fontWeight:'bold'}}>Status</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'status_change_time',
            label: <Typography sx={{fontSize:'16px', fontWeight:'bold'}}>Date of Closure</Typography>,
            options: {
                filter: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },
        {
            name: 'limit',
            label: <Typography sx={{fontSize:'16px', fontWeight:'bold'}}>Max</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'items',
            label: <Typography sx={{fontSize:'16px', fontWeight:'bold'}}>Valid</Typography>,
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value.filter(function (item) {
                        return item.status == 'Valid'
                    }).length,
            },
        },
        {
            name: 'items',
            label: <Typography sx={{fontSize:'16px', fontWeight:'bold'}}>Invalid</Typography>,
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value.filter(function (item) {
                        return item.status == 'Invalid'
                    }).length,
            },
        },
        {
            name: 'items',
            label: <Typography sx={{fontSize:'16px', fontWeight:'bold'}}>Duplicate</Typography>,
            options: {
                filter: true,

                customBodyRender: (value, dataIndex) =>
                    value.filter(function (item) {
                        return item.status == 'Duplicate'
                    }).length,
            },
        },

        {
            name: 'items',
            label: <Typography sx={{fontSize:'16px', fontWeight:'bold'}}>Total</Typography>,
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value.length,
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Closed Bags', path: '/' },
                        { name: 'BOT' },
                    ]}
                />
            </div>

            <MUIDataTable
                title={'Bot Bag'}
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
