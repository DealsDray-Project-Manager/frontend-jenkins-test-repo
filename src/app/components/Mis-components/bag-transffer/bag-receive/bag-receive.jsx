import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { Button, Typography, Checkbox, Table } from '@mui/material'
import jwt_decode from 'jwt-decode'
import '../../../../../app.css'
import { axiosMisUser } from '../../../../../axios'
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
    const [isAlive, setIsAlive] = useState(true)
    const [bagList, setBotBag] = useState([])
    const [receiveButLoading, setReceiveButLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        try {
            let user = localStorage.getItem('prexo-authentication')
            if (user) {
                setIsLoading(true)
                let { location } = jwt_decode(user)
                const fetchData = async () => {
                    let obj = {
                        status: 'Bag Transferred to new location',
                        location: location,
                    }
                    let res = await axiosMisUser.post(
                        '/bagTransferAndReceive',
                        obj
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

    const handelReceive = async (e, bags, req_id) => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You want to receive the bags?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Receive!',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    setReceiveButLoading(true)
                    let obj = {
                        bags: bags,
                        req_id: req_id,
                    }
                    const res = await axiosMisUser.post(
                        '/bagTransferReceive',
                        obj
                    )
                    if (res.status == 200) {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: res?.data?.message,
                            confirmButtonText: 'Ok',
                        })
                        setIsAlive((isAlive) => !isAlive)
                        setReceiveButLoading(false)
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: res.data.message,
                        })
                        setReceiveButLoading(false)
                    }
                }
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    }

    const columns = [
        {
            name: 'index',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Record No</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,

                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 4 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'req_id',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Request Id</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'delivery_type',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Delivery Type</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'bag_details',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Bag Id</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => {
                    return value?.join(',')
                },
            },
        },

        {
            name: 'name_of_courier',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Name of Courier</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'hand_name_of_the_person',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Hand Name of the person</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'received_by',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Received By</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },

        {
            name: 'date_of_courier',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Date of courier</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value) =>
                    value !== undefined && value !== ''
                        ? new Date(value).toLocaleString('en-GB', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                          })
                        : null,
            },
        },

        {
            name: 'date_of_delivery',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Date of Delivery</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value) =>
                    value !== undefined && value != ''
                        ? new Date(value).toLocaleString('en-GB', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                          })
                        : null,
            },
        },
        {
            name: 'awbn',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>AWBN</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'tracking_url',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Tracking URL</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'description',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Description</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'createdAt',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Creation Date</>
                </Typography>
            ),
            options: {
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
                filter: true,
            },
        },
        {
            name: 'bag_details',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Action</>
                </Typography>
            ),
            options: {
                customBodyRender: (value, tableMeta) => {
                    return (
                        <Button
                            variant="contained"
                            onClick={(e) =>
                                handelReceive(e, value, tableMeta.rowData[1])
                            }
                            disabled={receiveButLoading}
                            style={{ backgroundColor: 'green' }}
                            component="span"
                        >
                            Receive
                        </Button>
                    )
                },
                filter: true,
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: 'Bag Receive', path: '/' }]}
                />
            </div>

            <Table className="custom-table">
                <MUIDataTable
                    title={'Bag Receive'}
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
