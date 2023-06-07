import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { Button , Typography, Table, TableContainer} from '@mui/material'
import { axiosReportingAgent } from '../../../../axios'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
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

const ProductTable = styled(Table)(() => ({
    minWidth: 750,
    width: '130%',
    height:'100%',
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
        paddingLeft: '16px !important',
    },
}))

const ScrollableTableContainer = styled(TableContainer)
`overflow-x: auto`;

const SimpleMuiTable = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [whtTray, setWhtTray] = useState([])
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let response = await axiosReportingAgent.post(
                        '/tray/' + 'Transfer Request sent to Warehouse/' + 'CT/' + location
                    )
                    if (response.status === 200) {
                        setIsLoading(false)
                        setWhtTray(response.data.data)
                    }
                } else {
                    navigate('/')
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
        fetchData()
        return () => {
            setIsAlive(false)
            setIsLoading(false)
        }
    }, [isAlive])

    const handelViewItem = (id) => {
        navigate('/wareshouse/wht/tray/item/' + id)
    }

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
            label: <Typography sx={{fontSize:'16px', fontWeight:'bold'}}>Tray ID</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'brand',
            label: <Typography sx={{fontSize:'16px', fontWeight:'bold'}}>Brand</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: <Typography sx={{fontSize:'16px', fontWeight:'bold'}}>Model</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'name',
            label: <Typography sx={{fontSize:'16px', fontWeight:'bold'}}>Tray Display Name</Typography>,
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
            name: 'closed_time_wharehouse',
            label: <Typography sx={{fontSize:'16px', fontWeight:'bold'}}>Closed By Warehouse</Typography>,
            options: {
                filter: true,
                customBodyRender: (value) => {
                    const date = new Date(value)
                    if (isNaN(date.getTime())) {
                        return ''
                    } else {
                        return date.toLocaleString('en-GB', {
                            hour12: true,
                        })
                    }
                },
            },
        },
        {
            name: 'code',
            label: <Typography sx={{fontSize:'16px', fontWeight:'bold', ml:1}}>Action</Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <Button
                            sx={{
                                m: 1,
                            }}
                            variant="contained"
                            onClick={() => handelViewItem(value)}
                            style={{ backgroundColor: 'green' }}
                            component="span"
                        >
                            View
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
                    routeSegments={[
                        { name: 'Ctx', path: '/' },
                        { name: 'Transfer To Sales In Progress' },
                    ]}
                />
            </div>

            <ScrollableTableContainer>
                <ProductTable>
                <MUIDataTable
                title={'CTX'}
                data={whtTray}
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
                </ProductTable>
            </ScrollableTableContainer>
            
        </Container>
    )
}

export default SimpleMuiTable
