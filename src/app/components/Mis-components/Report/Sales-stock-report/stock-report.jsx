import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect, useMemo } from 'react'
import { styled } from '@mui/system'
import {
    Button,
    Box,
    IconButton,
    Icon,
    Typography,
    Table,
    TableContainer,
} from '@mui/material'
import '../../../../../app.css'
import Swal from 'sweetalert2'
import { axiosMisUser, axiosSuperAdminPrexo } from '../../../../../axios'
import { useNavigate } from 'react-router-dom'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import SaveIcon from '@mui/icons-material/Save'
import LoadingButton from '@mui/lab/LoadingButton'

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
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchRacks = async () => {
            try {
                setIsLoading(true)
                const res = await axiosMisUser.post('/sales-stock-report')
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

    const handelViewItem = (id) => {
        navigate(`/mis/report/sales-stock/view-uic/${id}`)
    }

    const download = async (e) => {
        let arr = []
        setLoading(true)
        for (let x of upgradeReport) {
            let obj = {
                'SUB-MUIC': x._id,
                Brand: x?.old_item_details?.split(':')?.[0]?.toUpperCase(),
                Model: x?.old_item_details?.split(':')?.[1]?.toUpperCase(),
                A: x?.A,
                B: x?.B,
                B2: x?.B2,
                C: x?.C,
                RB: x?.RB,
                D: x?.D,
                'Grand Total': x?.total,
            }
            arr.push(obj)
        }

        const fileExtension = '.xlsx'
        const fileType =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        const ws = XLSX.utils.json_to_sheet(arr)

        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, {
            bookType: 'xlsx',
            type: 'array',
        })

        const data = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(data, 'Sales stock report (SUB-MUIC)' + fileExtension)
        setLoading(false)
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
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 4 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: '_id',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>SUB-MUIC</>
                </Typography>
            ),
            options: {
                filter: true,
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
            name: 'A',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>A</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'B',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>B</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'B2',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>B2</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'C',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>C</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'RB',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>RB</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'D',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>D</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'total',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Grand Total</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: '_id',
            label: (
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Action
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <>
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
                        </>
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
                        { name: 'Stock Report (SUB-MUIC)', path: '/' },
                    ]}
                />
            </div>
            <Box sx={{ float: 'right' }}>
                <LoadingButton
                    sx={{ mb: 1 }}
                    variant="contained"
                    color="secondary"
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    onClick={(e) => {
                        download(e)
                    }}
                >
                    <span>Download</span>
                </LoadingButton>
            </Box>

            <Table className="custom-table">
                <MUIDataTable
                    title={'Reports'}
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
                            const columnProperties = {}

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
                                let value = properties.reduce(
                                    (obj, key) => obj?.[key],
                                    data
                                )

                                return value !== undefined ? value : ''
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
