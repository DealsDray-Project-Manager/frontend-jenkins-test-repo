import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { axiosWarehouseIn } from '../../../../../axios'
import { Button, Typography, Table } from '@mui/material'
import Swal from 'sweetalert2'
import '../../../../../app.css'
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
    const [tray, setTray] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { user } = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let token = localStorage.getItem('prexo-authentication')
                if (token) {
                    const { location } = jwt_decode(token)
                    setIsLoading(true)
                    let res = await axiosWarehouseIn.post(
                        `/getTrayForRpaToStxWh/${'RPA'}/${location}/${'Assigned to Warehouse for Stx Sorting'}/${
                            user.username
                        }`
                    )
                    if (res.status == 200) {
                        setIsLoading(false)
                        setTray(res.data.data)
                    }
                } else {
                    navigate('/')
                }
            } catch (error) {
                setIsLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonText: 'Ok',
                    text: error,
                })
            }
        }
        fetchData()
    }, [])

    const handelApprove = (e, id) => {
        e.preventDefault()
        navigate('/warehouse/rpa-to-stx/assigned-trays/start/' + id)
    }

    const columns = [
        {
            name: 'index',
            label: (
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ ml: 2 }}
                >
                    Record No
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ ml: 4 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'code',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    Tray ID
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'limit',
            label: 'Tray Id',
            options: {
                filter: false,
                sort: false,
                display: false,
            },
        },
        {
            name: 'items',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    Quantity
                </Typography>
            ),
            options: {
                filter: true,

                customBodyRender: (value, tableMeta) =>
                    value.length + '/' + tableMeta.rowData[2],
            },
        },

        {
            name: 'brand',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    Brand
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    Model
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'rack_id', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Rack Id</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'rackData', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Rack Display</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value?.[0]?.display,
            },
        },
        {
            name: 'sort_id',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    Status
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'requested_date',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    Assigned Date
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
            name: 'code',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    Action
                </Typography>
            ),
            options: {
                filter: true,
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
                            Start
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
                    routeSegments={[{ name: 'Assigned Trays', path: '/' }]}
                />
            </div>
            <Table className="custom-table">
                <MUIDataTable
                    title={'Tray'}
                    data={tray}
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
                                    (a.data[colIndex] < b.data[colIndex]
                                        ? -1
                                        : 1) * (order === 'desc' ? 1 : -1)
                                )
                            })
                        },
                        elevation: 0,
                        rowsPerPageOptions: [10, 20, 40, 80, 100],
                    }}
                />
            </Table>
        </Container>
    )
}
export default SimpleMuiTable
