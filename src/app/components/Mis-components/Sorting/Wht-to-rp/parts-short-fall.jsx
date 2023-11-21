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
            name: 'rackData', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Rack Id</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value.rack_id,
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
                customBodyRender: (value) => value.display,
            },
        },
        {
            name: 'deliveryData',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>RDL 1 Done Date</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value) =>
                    new Date(value?.rdl_fls_closed_date).toLocaleString(
                        'en-GB',
                        {
                            hour12: true,
                        }
                    ),
            },
        },
        {
            name: 'items',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
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
                <Typography variant="subtitle1" fontWeight="bold">
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
                                const columnProperties = {
                                    1: 'uic',
                                    3: 'rack_id',
                                    4: 'display',
                                    8: 'audit_report.description',
                                    5: 'rdl_fls_closed_date',
                                    6: 'rdl_fls_report.username',
                                    7: 'rdl_fls_report.description',
                                    8: 'rdl_fls_report.partRequired',

                                    // add more columns and properties here
                                }
                                const property = columnProperties[colIndex]

                                if (property) {
                                    return data.sort((a, b) => {
                                        const aPropertyValue =
                                            getValueByProperty(
                                                a.data[colIndex],
                                                property
                                            )
                                        const bPropertyValue =
                                            getValueByProperty(
                                                b.data[colIndex],
                                                property
                                            )
                                        if (
                                            typeof aPropertyValue ===
                                                'string' &&
                                            typeof bPropertyValue === 'string'
                                        ) {
                                            return (
                                                (order === 'asc' ? 1 : -1) *
                                                aPropertyValue.localeCompare(
                                                    bPropertyValue
                                                )
                                            )
                                        }
                                        return (
                                            (parseFloat(aPropertyValue) -
                                                parseFloat(bPropertyValue)) *
                                            (order === 'desc' ? -1 : 1)
                                        )
                                    })
                                }

                                return data.sort((a, b) => {
                                    const aValue = a.data[colIndex]
                                    const bValue = b.data[colIndex]
                                    if (aValue === bValue) {
                                        return 0
                                    }
                                    if (
                                        aValue === null ||
                                        aValue === undefined
                                    ) {
                                        return 1
                                    }
                                    if (
                                        bValue === null ||
                                        bValue === undefined
                                    ) {
                                        return -1
                                    }
                                    if (
                                        typeof aValue === 'string' &&
                                        typeof bValue === 'string'
                                    ) {
                                        return (
                                            (order === 'asc' ? 1 : -1) *
                                            aValue.localeCompare(bValue)
                                        )
                                    }
                                    return (
                                        (parseFloat(aValue) -
                                            parseFloat(bValue)) *
                                        (order === 'desc' ? -1 : 1)
                                    )
                                })

                                function getValueByProperty(data, property) {
                                    const properties = property.split('.')
                                    return (
                                        properties.reduce(
                                            (obj, key) => obj[key],
                                            data
                                        ) || ''
                                    )
                                }
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
        <Card>
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
