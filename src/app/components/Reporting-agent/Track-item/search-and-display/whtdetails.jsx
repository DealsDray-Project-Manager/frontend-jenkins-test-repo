import { Box, Card, Divider, Stack, Typography, Table } from '@mui/material'
import React, { useState } from 'react'
import MUIDataTable from 'mui-datatables'
import '../../../../../app.css'

const WHTdetails = ({ WhtTrayDetails }) => {
    const [isLoading, setIsLoading] = useState(false)

    const columns = [
        {
            name: 'index',
            label: (
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    marginLeft="7px"
                >
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
            name: 'user_type',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Department</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'created_at',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Date / Time</>
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
            name: 'bag_id',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Bag</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'tray_id',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Tray</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'action_type',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Action</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
    ]
    return (
        <Card
            sx={{
                marginTop: '40px',
                marginBottom: '40px',
                border: '1px solid black',
            }}
        >
            <br />
            <Typography
                sx={{
                    margin: '0px 0px 15px 33px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                }}
            >
                UIC History
            </Typography>
            <Divider />
            <Stack
                justifyContent="space-between"
                sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
            >
                <Box
                    sx={{
                        p: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Table className="custom-table">
                        <MUIDataTable
                            data={WhtTrayDetails}
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
                                                    : 1) *
                                                (order === 'desc' ? 1 : -1)
                                            )
                                        }
                                        return (
                                            (a.data[colIndex] < b.data[colIndex]
                                                ? -1
                                                : 1) *
                                            (order === 'desc' ? 1 : -1)
                                        )
                                    })
                                },
                                elevation: 0,
                                rowsPerPageOptions: [10, 20, 40, 80, 100],
                            }}
                        />
                    </Table>
                </Box>
            </Stack>
        </Card>
    )
}

export default WHTdetails
