import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect, useMemo } from 'react'
import { styled } from '@mui/system'
import { Typography, Table } from '@mui/material'
import '../../../../../app.css'
import Swal from 'sweetalert2'
import { axiosMisUser } from '../../../../../axios'
import { useParams } from 'react-router-dom'

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
    const [upgradeReport, setUpgradeReport] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { subMuic } = useParams()

    useEffect(() => {
        const fetchRacks = async () => {
            try {
                setIsLoading(true)
                const res = await axiosMisUser.post(
                    `/salesStockReportViewUic/${subMuic}`
                )
                if (res.status === 200) {
                    setIsLoading(false)
                    setUpgradeReport(res.data.data)
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
        fetchRacks()
        return () => {
            setIsAlive(false)
            setIsLoading(true)
        }
    }, [isAlive])

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
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 2 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'uic_code',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>UIC</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value) => value?.code,
            },
        },
        {
            name: 'muic',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>MUIC</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'audit_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>SUB-MUIC</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value) => value?.sub_muic,
            },
        },

        {
            name: 'old_item_details',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Brand</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value) =>
                    value?.split(':')?.[0]?.toUpperCase(),
            },
        },
        {
            name: 'old_item_details',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Model</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value) =>
                    value?.split(':')?.[1]?.toUpperCase(),
            },
        },
        {
            name: 'audit_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>RAM</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value) => value?.ram_verification,
            },
        },
        {
            name: 'audit_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Storage</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value) => value?.storage_verification,
            },
        },
        {
            name: 'audit_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Color</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value) => value?.color,
            },
        },
        {
            name: 'final_grade',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Final Grade</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },

        {
            name: 'current_tray_id',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Tray Id</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'current_tray_name',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Tray Name</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'current_tray_rack_id',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Rack Id</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'current_tray_rack_display',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Rack Display</>
                </Typography>
            ),
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
                        { name: 'Sales Report (SUB-MUIC)', path: '/' },
                        { name: 'View Units' },
                    ]}
                />
            </div>

            <Table className="custom-table">
                <MUIDataTable
                    title={'Units'}
                    data={upgradeReport}
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
                            const columnProperties = {
                                1: 'code',
                                3:'sub_muic',
                                6:'ram_verification',
                                8:'color',
                                7:'storage_verification',
                               
                              

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
