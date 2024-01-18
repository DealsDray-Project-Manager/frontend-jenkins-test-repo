import jwt_decode from 'jwt-decode'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect, useMemo } from 'react'
import MUIDataTable from 'mui-datatables'
import '../../../../app.css'
import { styled } from '@mui/system'
import {
    TableCell,
    TableHead,
    Table,
    TableRow,
    TableBody,
    Card,
    TablePagination,
    TextField,
    Box,
    Button,
    Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import { axiosWarehouseIn } from '../../../../axios'
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
    const [isLoading, setIsLoading] = useState(false)
    const [item, setItem] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        let admin = localStorage.getItem('prexo-authentication')
        if (admin) {
            setIsLoading(true)
            const { location } = jwt_decode(admin)
            const fetchData = async () => {
                try {
                    let res = await axiosWarehouseIn.post(
                        '/canBinItem/' + location
                    )
                    if (res.status == 200) {
                        setItem(res.data.data)
                        setIsLoading(false)
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
        } else {
            navigate('/')
        }
    }, [])

    const download = (e) => {
        let arr = []
        for (let x of item) {
            let obj = {
                UIC: x.uic_code.code,
                'Brand and model': x?.old_item_details,
                'RDL-2 status': x?.rdl_two_report?.status,
                'RDL-2 repair not done reason': x?.rdl_two_report?.reason,
                'RDL-2 description': x?.rdl_two_report?.description,
                'Added Date': new Date(x?.add_to_can_bin_date).toLocaleString(
                    'en-GB',
                    {
                        hour12: true,
                    }
                ),
                'Added to Can Bin By': x?.add_to_can_bin_user,
                'Warehouse User Description': x?.add_to_can_bin_description,
                CBT: x?.can_bin_tray,
            }
            arr.push(obj)
        }
        const fileExtension = '.xlsx'
        const fileType =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        const ws = XLSX.utils.json_to_sheet(arr, { header: [] })

        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(data, 'Can-bin' + fileExtension)
    }

    const columns = [
        {
            name: 'index',
            label: (
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ marginLeft: '7px' }}
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
            name: 'uic_code',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>UIC</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => value?.code || '',
            },
        },
        {
            name: 'old_item_details',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Brand and model</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                    value?.replace(/:/g, ' ')?.toUpperCase(),
            },
        },
        {
            name: 'rdl_two_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>RDL-2 status</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => value?.status || '',
            },
        },
        {
            name: 'rdl_two_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>RDL-2 repair not done reason</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => value?.reason || '',
            },
        },
        {
            name: 'rdl_two_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>RDL-2 description</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                    value?.description || '',
            },
        },
        {
            name: 'add_to_can_bin_date',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Added Date</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },
        {
            name: 'add_to_can_bin_user',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Added to Can Bin By</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'add_to_can_bin_description',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Warehouse User Description</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'can_bin_tray',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>CBT</>
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
                        { name: 'Report', path: '/' },
                        { name: 'Units In Can Bin' },
                    ]}
                />
            </div>
            <Box
                sx={{
                    float: 'right',
                }}
            >
                <Button
                    sx={{ mb: 2 }}
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                        download(e)
                    }}
                >
                    Download
                </Button>
            </Box>
            <Table className="custom-table">
                <MUIDataTable
                    title={'Can Bin Report'}
                    data={item}
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
                                3: 'status',
                                4: 'reason',
                                5: 'description',

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
                                let value = properties.reduce(
                                    (obj, key) => obj?.[key],
                                    data
                                )

                                if (
                                    properties[0] === 'rdl_fls_one_report' &&
                                    properties[1] === 'partRequired' &&
                                    properties[2] === 'length'
                                ) {
                                    value = value || 0
                                }

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
