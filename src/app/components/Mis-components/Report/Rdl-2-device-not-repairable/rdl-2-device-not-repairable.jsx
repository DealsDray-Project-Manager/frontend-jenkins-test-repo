import jwt_decode from 'jwt-decode'
import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect, useMemo } from 'react'
import { styled } from '@mui/system'
import moment from 'moment'
import { Table, Card, TextField, Box, Typography, Button } from '@mui/material'
import '../../../../../app.css'
import { useNavigate } from 'react-router-dom'
import { axiosMisUser, axiosWarehouseIn } from '../../../../../axios'
import Swal from 'sweetalert2'

const ProductTable = styled(Table)(() => ({
    minWidth: 750,
    width: '200%',
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
    const [item, setItem] = useState([])
    const navigate = useNavigate()
    const [stateForFilterUn, setFilterUn] = useState(false)
    const [location, setLocation] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [filterData, setFilterData] = useState({
        fromDate: '',
        toDate: '',
    })

    const handleChangeSort = ({ target: { name, value } }) => {
        setFilterData({
            ...filterData,
            [name]: value,
        })
    }

    useEffect(() => {
        let admin = localStorage.getItem('prexo-authentication')
        if (admin) {
            const { location } = jwt_decode(admin)
            setLocation(location)
            setIsLoading(true)
            if (stateForFilterUn == true) {
                dataFilter()
            } else {
                const fetchData = async () => {
                    try {
                        let res = await axiosMisUser.post(
                            '/deviceNotRepairableUnits/' + location
                        )
                        if (res.status == 200) {
                            setIsLoading(false)
                            setItem(res.data.data)
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
            }
        } else {
            navigate('/')
        }
    }, [])

    const dataFilter = async () => {
        try {
            filterData.location = location
            setIsLoading(true)
            setFilterUn(true)
            const res = await axiosWarehouseIn.post(
                '/upgardeUnitsFilter/item/filter',
                filterData
            )
            if (res.status === 200) {
                setIsLoading(false)
                setItem(res.data.data)
            } else {
                setIsLoading(false)
                setItem(res.data.data)
            }
        } catch (error) {
            alert(error)
        }
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
            name: 'products',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Brand</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                    value?.[0]?.brand_name || '',
            },
        },
        {
            name: 'products',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Model</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                    value?.[0]?.model_name || '',
            },
        },
        {
            name: 'products',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Muic</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => value?.[0]?.muic || '',
            },
        },
        {
            name: 'audit_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>SUB-Muic</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => value?.sub_muic || '',
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
                customBodyRender: (value, tableMeta) =>
                    value?.ram_verification || '',
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
                customBodyRender: (value, tableMeta) =>
                    value?.storage_verification || '',
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
                customBodyRender: (value, tableMeta) => value?.color || '',
            },
        },
        {
            name: 'audit_user_name',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Auditor Name</>
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
                    <>Auditor Status</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => value?.stage || '',
            },
        },
        {
            name: 'bqc_software_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <> Original Grade</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                    value?.final_grade || '',
            },
        },
        {
            name: 'audit_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Auditor Recommended Grade</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => value?.grade || '',
            },
        },
        {
            name: 'audit_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Auditor Reason</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => value?.reason || '',
            },
        },
        {
            name: 'audit_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Auditor Remark</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                    value?.description || '',
            },
        },
        {
            name: 'audit_done_date',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Audit Done Date</>
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
            name: 'tray_status',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Current Tray Status</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'wht_tray',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Wht Tray ID</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'rp_tray',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Rpt ID</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },

        {
            name: 'rdl_fls_closed_date',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>RDL 1 Done Date</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                    value !== undefined
                        ? new Date(value).toLocaleString('en-GB', {
                              hour12: true,
                          })
                        : '',
            },
        },
        {
            name: 'rdl_fls_one_user_name',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>RDL 1 Username</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'rdl_fls_one_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>RDL 1 User Remarks</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                    value?.description || '',
            },
        },

        {
            name: 'rdl_fls_one_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>RDL-1 Repair item Summary</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => {
                    const dataIndex = tableMeta.rowIndex
                    const partRequired = value?.rdl_fls_report?.partRequired
                    if (partRequired && partRequired.length > 0) {
                        const partsList = partRequired.map((data, index) => {
                            return `${index + 1}.${data?.part_name} - ${
                                data?.part_id
                            }`
                        })
                        return partsList.join(', ')
                    }
                    return ''
                },
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
                sort: true, // enable sorting for Brand column
                customBodyRender: (value, dataIndex) => value?.status || '',
            },
        },
        {
            name: 'rdl_two_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Rdl-2 repair not done reason</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true, // enable sorting for Brand column

                customBodyRender: (value, dataIndex) => value?.reason || '',
            },
        },
        {
            name: 'rdl_two_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Rdl-2 description</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true, // enable sorting for Brand column

                customBodyRender: (value, dataIndex) =>
                    value?.description || '',
            },
        },

        {
            name: 'rdl_two_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Part required</>
                </Typography>
            ),
            options: {
                filter: true,

                sort: true, // enable sorting for Brand column
                customBodyRender: (value, tableMeta) => {
                    const dataIndex = tableMeta.rowIndex
                    const partRequired = value?.partRequired
                    if (partRequired && partRequired.length > 0) {
                        const partsList = partRequired.map((data, index) => {
                            return `${index + 1}.${data?.part_name} - ${
                                data?.part_id
                            }`
                        })
                        return partsList.join(', ')
                    }
                    return ''
                },
            },
        },
        {
            name: 'rdl_two_report',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Other parts status</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true, // enable sorting for Brand column
                customBodyRender: (value, tableMeta) => {
                    const dataIndex = tableMeta.rowIndex
                    const partRequired = value?.rdl_two_part_status
                    if (partRequired && partRequired.length > 0) {
                        const partsList = partRequired.map((data, index) => {
                            return `${index + 1}.${data?.part_name} - ${
                                data?.part_id
                            } status :- ${data?.rdl_two_status}`
                        })

                        return partsList.join(', ')
                    }

                    return ''
                },
            },
        },
        {
            name: 'rdl_two_closed_date',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>RDL 2 Done Date</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                    value !== undefined
                        ? new Date(value).toLocaleString('en-GB', {
                              hour12: true,
                          })
                        : '',
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Not Repairable Units Report', path: '/' },
                    ]}
                />
            </div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                }}
            >
                {/* <Box>
                    <TextField
                        type="date"
                        label="From Date"
                        variant="outlined"
                        inputProps={{ max: moment().format('YYYY-MM-DD') }}
                        onChange={(e) => {
                            handleChangeSort(e)
                        }}
                        name="fromDate"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        type="date"
                        label="To Date"
                        name="toDate"
                        inputProps={{
                            min: filterData?.fromDate,
                            max: moment().format('YYYY-MM-DD'),
                        }}
                        disabled={filterData.fromDate == ''}
                        variant="outlined"
                        onChange={(e) => {
                            handleChangeSort(e)
                        }}
                        sx={{ ml: 3 }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <Button
                        sx={{ ml: 2, mt: 1 }}
                        variant="contained"
                        disabled={
                            filterData.fromDate == '' || filterData.toDate == ''
                        }
                        style={{ backgroundColor: 'green' }}
                        onClick={(e) => {
                            dataFilter(e)
                        }}
                    >
                        Filter
                    </Button>
                </Box> */}
            </Box>
            <Card sx={{ maxHeight: '100%', overflow: 'auto' }} elevation={6}>
                <ProductTable className="custom-table">
                    <MUIDataTable
                        title={'Not Repairable Units'}
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
                                    1: 'wht_tray',
                                    2: 'code',
                                    5: 'stage',
                                    6: 'final_grade',
                                    7: 'grade',
                                    8: 'reason',
                                    9: 'description',
                                    17: 'description',
                                    18: 'partRequired',
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
                                    let value = properties.reduce(
                                        (obj, key) => obj?.[key],
                                        data
                                    )

                                    if (
                                        properties[0] ===
                                            'rdl_fls_one_report' &&
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
                </ProductTable>
            </Card>
        </Container>
    )
}

export default SimpleMuiTable
