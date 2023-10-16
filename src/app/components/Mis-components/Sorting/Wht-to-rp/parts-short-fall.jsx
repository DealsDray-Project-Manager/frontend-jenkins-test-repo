import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect, useMemo } from 'react'
import { styled } from '@mui/system'
import {
    Button,
    Box,
    Checkbox,
    Typography,
    Table,
    TableContainer,
    Card,
} from '@mui/material'
import '../../../../../app.css'

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

const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
    },
}))


const SimpleMuiTable = ({ partsNotAvailable }) => {
    const [isLoading, setIsLoading] = useState(false)

    const columns = [
        {
            name: 'index',
            label: (
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    noWrap
                    sx={{ mr: 8 }}
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
            name: 'items',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>UIC</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.uic || '',
            },
        },
        {
            name: 'code',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Tray ID</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'closed_date_agent',
            label: (
                <Typography variant="subtitle1" fontWeight="bold" >
                    <>RDL 1 Done Date</>
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
            name: 'items',
            label: (
                <Typography variant="subtitle1" fontWeight="bold" >
                    <>RDL 1 Username</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.rdl_fls_report?.username || '',
            },
        },
        {
            name: 'items',
            label: (
                <Typography variant="subtitle1" fontWeight="bold" >
                    <>RDL 1 User Remarks</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.rdl_fls_report?.description || '',
            },
        },
        {
            name: 'items',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Repair item</>
                </Typography>
            ),
            options: {
                filter: true,
                filterType: 'textField',
                sort: true, // enable sorting for Brand column
                customBodyRender: (value, tableMeta) => {
                    const dataIndex = tableMeta.rowIndex
                    const partRequired = value?.rdl_fls_report?.partRequired

                    if (partRequired && partRequired.length > 0) {
                        const partsList = partRequired.map((data, index) => {
                            return `${index + 1}. ${data?.part_name} - ${
                                data?.part_id
                            }  (${data?.avl_qty})`
                        })

                        return partsList.join('\n') // Use '\n' to join the parts with newlines
                    }

                    return ''
                },
            },
        },
    ]

    // TOP TABLE
    const UicListTable = useMemo(() => {
        return (
            <StyledTable
                sx={{
                    borderRadius: '20px',
                    margin: 'auto',
                }}
            >
                <Table className="custom-table">
                    <MUIDataTable
                        // title={'Assign for Repairs'}
                        sx={{ borderTop: '0px' }}
                        data={partsNotAvailable}
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
                            //  pagination: false, //set pagination option
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
                                            : 1) * (order === 'desc' ? 1 : -1)
                                    )
                                })
                            },
                            // elevation: 0,
                            // rowsPerPageOptions: [10, 20, 40, 80, 100],
                        }}
                    />
                </Table>
            </StyledTable>
        )
    }, [partsNotAvailable, columns])

    return (
        <Card >
            <Box>
                <Box sx={{ pl: 2 }}>
                    <Typography sx={{ fontSize: 'large', fontWeight: 'bold' }}>
                        Parts Shortfall
                    </Typography>
                </Box>
                <Box
                    sx={{
                        border: '',
                        width: '100%',
                        marginLeft: '',
                        marginRight: '',
                        borderRadius: '8px',
                        background: 'white',
                    }}
                    overflow="auto"
                >
                    {UicListTable}
                </Box>
            </Box>
        </Card>
    )
}

export default SimpleMuiTable
