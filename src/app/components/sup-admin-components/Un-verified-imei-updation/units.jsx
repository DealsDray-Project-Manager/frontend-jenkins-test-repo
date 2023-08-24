import jwt_decode from 'jwt-decode'
import { Breadcrumb } from 'app/components'
import MUIDataTable from 'mui-datatables'
import React, { useState, useEffect, useMemo } from 'react'
import { styled } from '@mui/system'
import moment from 'moment'
import AssignDialogBox from './dailog'
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
    Typography,
    Button,
    MenuItem,
} from '@mui/material'

import { useNavigate } from 'react-router-dom'
import { axiosReportingAgent, axiosSuperAdminPrexo } from '../../../../axios'
import Swal from 'sweetalert2'

const ProductTable = styled(Table)(() => ({
    minWidth: 750,
    width: '170%',
    whiteSpace: 'pre',
    '& thead': {
        '& th:first-of-type': {
            paddingLeft: 16,
        },
    },
    '& td': {
        borderBottom: 'none',
    },
    '& td:first-of-type': {
        paddingLeft: '16px !important',
    },
    borderCollapse: 'separate',
    borderSpacing: '0',
    '& th, & td': {
        borderBottom: '1px solid rgba(0, 0, 0, 0.2)', // Lighter border color
        borderRight: '1px solid rgba(0, 0, 0, 0.2)',
        padding: '8px',
        textAlign: 'left',
    },
    '& th:last-child, & td:last-child': {
        borderRight: 'none',
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
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(100)
    const [item, setItem] = useState([])
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const [uicData, setUicData] = useState({})
    const [stateForFilterUn, setFilterUn] = useState(false)
    const [isAlive, setIsAlive] = useState(true)
    const [location, setLocation] = useState('')
    const [count, setCount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [searchType, setSearchType] = useState('')
    const [inputSearch, setInputSearch] = useState('')
    const [displayText, setDisplayText] = useState('')
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)
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
            setIsLoading(true)
            setLocation(location)
            if (stateForFilterUn == true) {
                dataFilter()
            } else {
                const fetchData = async () => {
                    try {
                        let res = await axiosSuperAdminPrexo.post(
                            '/unverifiedImeiReport/' + page + '/' + rowsPerPage
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
    }, [isAlive, page, rowsPerPage])

    useEffect(() => {
        setData((_) =>
            item.map((d, index) => {
                d.id = page * rowsPerPage + index + 1
                return d
            })
        )
    }, [page, item, rowsPerPage])

   

  

    const dataFilter = async () => {
        try {
            filterData.location = location
            filterData.page = page
            filterData.type = searchType
            filterData.size = rowsPerPage
            setDisplayText('Please wait...')
            setFilterUn(true)
            const res = await axiosSuperAdminPrexo.post(
                '/unverifiedImei/item/filter',
                filterData
            )
            if (res.status === 200) {
               
                setItem(res.data.data)
            } else {
                setItem(res.data.data)
              
            }
        } catch (error) {
            alert(error)
        }
    }

    const handleDialogClose = () => {
        setShouldOpenEditorDialog(false)
    }

    const handleDialogOpen = () => {
        setShouldOpenEditorDialog(true)
    }

    //UPDATE IMEI
    const handelUpdateImei = (
        uic,
        delivery_imei,
        bqc_ro_ril_imei,
        bqc_ro_mob_one_imei,
        bqc_ro_mob_two_imei
    ) => {
        setUicData({
            uic: uic,
            delivery_imei: delivery_imei,
            bqc_ro_ril_imei: bqc_ro_ril_imei,
            bqc_ro_mob_one_imei: bqc_ro_mob_one_imei,
            bqc_ro_mob_two_imei: bqc_ro_mob_two_imei,
        })
        handleDialogOpen()
    }

    const tableData = useMemo(() => {
        return (
            <ProductTable elevation={6}>
                <TableHead>
                    <TableRow>
                        <TableCell
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '150px',
                            }}
                        >
                            Record.NO
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '110px',
                                cursor: 'pointer',
                            }}
                        >
                            Uic
                        </TableCell>

                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                width: '150px',
                            }}
                        >
                            Brand and model
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '145px',
                            }}
                        >
                            Delivery IMEI{' '}
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '240px',
                            }}
                        >
                            Bqc software report RO Ril Miui IMEI 0
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '205px',
                            }}
                        >
                            Bqc software report Mobile IMEI
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '209px',
                            }}
                        >
                            Bqc software report Mobile IMEI 2
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '209px',
                            }}
                        >
                            Charging user added CIMEI 1
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '209px',
                            }}
                        >
                            Charging user added CIMEI 2
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '150px',
                            }}
                        >
                            Tray status
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '250px',
                            }}
                        >
                            Wht tray id
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '250px',
                            }}
                        >
                            Ctx tray id
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '250px',
                            }}
                        >
                            Stx tray id
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '250px',
                            }}
                        >
                            Sales Bin Status
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '250px',
                            }}
                        >
                            Billed Bin Status
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '250px',
                            }}
                        >
                            Action
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {displayText !== '' ? (
                        <TableCell
                            colSpan={8}
                            align="center"
                            sx={{ verticalAlign: 'top' }}
                        >
                            <Typography variant="p" gutterBottom>
                                {displayText}
                            </Typography>
                        </TableCell>
                    ) : null}
                    {data.map((data, index) => (
                        <TableRow tabIndex={-1}>
                            <TableCell>{data.id}</TableCell>
                            <TableCell>{data?.uic_code?.code}</TableCell>
                            <TableCell>
                                {data?.old_item_details
                                    ?.replace(/:/g, ' ')
                                    ?.toUpperCase()}
                            </TableCell>
                            <TableCell>{data?.imei}</TableCell>
                            <TableCell>
                                {data?.bqc_software_report?._ro_ril_miui_imei0}
                            </TableCell>
                            <TableCell>
                                {data?.bqc_software_report?.mobile_imei}
                            </TableCell>
                            <TableCell>
                                {data?.bqc_software_report?.mobile_imei2}
                            </TableCell>
                            <TableCell>{data?.charging?.cimei_1}</TableCell>
                            <TableCell>{data?.charging?.cimei_2}</TableCell>
                            <TableCell>{data?.tray_status}</TableCell>
                            <TableCell>{data?.wht_tray}</TableCell>
                            <TableCell>{data?.ctx_tray_id}</TableCell>
                            <TableCell>{data?.stx_tray_id}</TableCell>
                            <TableCell
                                style={{ color: 'green', fontWeight: 'bold' }}
                            >
                                {data?.sales_bin_status}
                            </TableCell>
                            <TableCell
                                style={{ color: 'green', fontWeight: 'bold' }}
                            >
                                {data?.item_moved_to_billed_bin}
                            </TableCell>
                            <TableCell>
                                <Button
                                    sx={{
                                        width: '113px',
                                    }}
                                    variant="contained"
                                    style={{ backgroundColor: 'green' }}
                                    onClick={(e) => {
                                        handelUpdateImei(
                                            data?.uic_code?.code,
                                            data?.imei,
                                            data?.bqc_software_report
                                                ?._ro_ril_miui_imei0,
                                            data?.bqc_software_report
                                                ?.mobile_imei,
                                            data?.bqc_software_report
                                                ?.mobile_imei2
                                        )
                                    }}
                                >
                                    Update Imei
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </ProductTable>
        )
    }, [item, data, displayText])

    const columns = [
        {
            name: 'index',
            label: 'Record No',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) =>
                    dataIndex.rowIndex + 1,
            },
        },
        {
            name: 'uic_code', // field name in the row object
            label: 'Uic', // column title that will be shown in table
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                value?.code || '',
            },
        },

        {
            name: 'old_item_details',
            label: 'Brand and model',
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                    value?.replace(/:/g, ' ')?.toUpperCase(),
            },
        },
        {
            name: 'imei',
            label: 'Delivery IMEI',
            options: {
                filter: true,
                
            },
        },
        {
            name: 'bqc_software_report',
            label: 'Bqc software report RO Ril Miui IMEI 0',
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                value?._ro_ril_miui_imei0 || '',
            },
        },

        {
            name: 'bqc_software_report',
            label: 'Bqc software report Mobile IMEI',
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                value?.mobile_imei || '',
            },
        },
        {
            name: 'bqc_software_report',
            label: 'Bqc software report Mobile IMEI 2',
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                value?.mobile_imei2 || '',
            },
        },
        {
            name: 'charging',
            label: 'Charging user added CIMEI 1',
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                value?.cimei_1 || '',
            },
        },
        {
            name: 'charging',
            label: 'Charging user added CIMEI 2',
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                value?.cimei_2 || '',
            },
        },
        {
            name: 'tray_status',
            label: 'Tray status',
            options: {
                filter: true,
            },
        },
        {
            name: 'wht_tray',
            label: 'Wht tray id',
            options: {
                filter: true,
            },
        },
        {
            name: 'stx_tray_id',
            label: 'Stx tray id',
            options: {
                filter: true,
            },
        },
        {
            name: 'sales_bin_status',
            label: 'Sales Bin Status',
            options: {
                filter: true,
            },
        },
        {
            name: 'item_moved_to_billed_bin',
            label: 'Billed Bin Status',
            options: {
                filter: true,
            },
        },
        {
            name: 'code',
            label: 'Action',
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
                                onClick={(e) => {
                                    handelUpdateImei(
                                        tableMeta.rowData[1]?.code,
                                        tableMeta.rowData[3],
                                        tableMeta.rowData[4]?._ro_ril_miui_imei0,
                                        tableMeta.rowData[5]?.mobile_imei,
                                        tableMeta.rowData[6]?.mobile_imei2
                                    )
                                }}
                                style={{ backgroundColor: 'green' }}
                            >
                                Update Imei
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
                    routeSegments={[{ name: 'Unverified Imei', path: '/' }]}
                />
            </div>
         
            
            <Card sx={{ maxHeight: '100%', overflow: 'auto' }} elevation={6}>
                <ProductTable>
                    <MUIDataTable
                        title={'Unverified Units'}
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
                            elevation: 0,
                            rowsPerPageOptions: [10, 20, 40, 80, 100],
                        }}
                    />
                </ProductTable>
            </Card>
            {shouldOpenEditorDialog && (
                <AssignDialogBox
                    handleClose={handleDialogClose}
                    open={handleDialogOpen}
                    uicData={uicData}
                    setIsAlive={setIsAlive}
                />
            )}
        </Container>
    )
}

export default SimpleMuiTable
