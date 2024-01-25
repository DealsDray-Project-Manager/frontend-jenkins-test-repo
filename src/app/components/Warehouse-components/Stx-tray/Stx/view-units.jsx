import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useParams } from 'react-router-dom'
import { axiosAuditAgent } from '../../../../../axios'
import Swal from 'sweetalert2'
import { Typography, Table, TableContainer } from '@mui/material'
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

const ProductTable = styled(Table)(() => ({
    minWidth: 750,
    width: '140%',
    height: '100%',
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

const SimpleMuiTable = () => {
    const [trayItem, setTrayItem] = useState([])
    const { trayId } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axiosAuditAgent.post(
                    '/view-items/' + trayId
                )
                if (response.status === 200) {
                    setTrayItem(response.data.data)
                }
            } catch (error) {
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
            name: 'uic',
            label: <Typography sx={{ fontWeight: 'bold' }}>UIC</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'muic',
            label: <Typography sx={{ fontWeight: 'bold' }}>MUIC</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'audit_report',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>SUB-MUIC</Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.sub_muic,
            },
        },
        {
            name: 'audit_report',
            label: <Typography sx={{ fontWeight: 'bold' }}>RAM</Typography>,
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.ram_verification,
            },
        },
        {
            name: 'audit_report',
            label: <Typography sx={{ fontWeight: 'bold' }}>Storage</Typography>,
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.storage_verification,
            },
        },
        {
            name: 'audit_report',
            label: <Typography sx={{ fontWeight: 'bold' }}>Color</Typography>,
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.color,
            },
        },

        {
            name: 'brand_name',
            label: <Typography sx={{ fontWeight: 'bold' }}>Brand</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'model_name',
            label: <Typography sx={{ fontWeight: 'bold' }}>Model</Typography>,
            options: {
                filter: true,
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Tray', path: '/' },
                        { name: 'View-units' },
                    ]}
                />
            </div>
            <Typography>Tray ID:-{trayItem?.code}</Typography>
            <Typography>Tray Grade:-{trayItem?.tray_grade}</Typography>
            <Table className="custom-table">
                <MUIDataTable
                    title={'Units'}
                    data={trayItem.items}
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
                            const columnProperties = {
                                3: 'sub_muic',
                                4: 'ram_verification',
                                5: 'storage_verification',
                                6: 'color',

                                // add more columns and properties here
                            }
                            const property = columnProperties[colIndex]

                            if (property) {
                                return data.sort((a, b) => {
                                    const aPropertyValue = getValueByProperty(
                                        a.data[colIndex],
                                        property
                                    )
                                    const bPropertyValue = getValueByProperty(
                                        b.data[colIndex],
                                        property
                                    )
                                    if (
                                        typeof aPropertyValue === 'string' &&
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
                                if (aValue === null || aValue === undefined) {
                                    return 1
                                }
                                if (bValue === null || bValue === undefined) {
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
                                    (parseFloat(aValue) - parseFloat(bValue)) *
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
                        elevation: 0,
                        rowsPerPageOptions: [10, 20, 40, 80, 100],
                    }}
                />
            </Table>
        </Container>
    )
}

export default SimpleMuiTable
