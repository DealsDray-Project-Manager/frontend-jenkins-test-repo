import React, { useEffect, useState } from 'react'
import MUIDataTable from 'mui-datatables'
import { axiosRmUserAgent } from '../../../../axios'
import { styled } from '@mui/system'
import { Typography, Button, Table } from '@mui/material'
import { Breadcrumb } from 'app/components'
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
    },
}))

function IssueToolsAndConsumables() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [requests, setRequests] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const res = await axiosRmUserAgent.post(
                `/getRequestOfToolsAndConsumables/${'All'}`
            )
            if (res.status === 200) {
                setRequests(res.data.data)
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    const handelNavigate = (id) => {
        navigate(`/sp-mis/report/tools-and-consumable/view/${id}`)
    }

    // COLUMNS
    const columns = [
        {
            name: 'index',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 2 }}>
                    Record No
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 4 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'request_id',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Request Id</Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'issued_user_name',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Agent Name</Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'assigned_date',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
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
            name: 'status',
            label: <Typography sx={{ fontWeight: 'bold' }}>Status</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'issued_date',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Issued Date</Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value) =>
                    value !== undefined
                        ? new Date(value).toLocaleString('en-GB', {
                              hour12: true,
                          })
                        : null,
            },
        },
        {
            name: 'code',
            label: <Typography sx={{ fontWeight: 'bold' }}>Action</Typography>,
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
                            style={{ backgroundColor: 'green' }}
                            component="span"
                            onClick={(e) => {
                                handelNavigate(tableMeta.rowData[1])
                            }}
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
                    routeSegments={[{ name: 'Tools And Consumables' }]}
                />
            </div>
            <Table className="custom-table">
                <MUIDataTable
                    title={'Issue Requests'}
                    data={requests}
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

export default IssueToolsAndConsumables
