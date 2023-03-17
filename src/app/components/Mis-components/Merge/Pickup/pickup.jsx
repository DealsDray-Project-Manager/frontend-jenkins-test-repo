import React, { useState, useEffect, useMemo } from 'react'
import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { axiosMisUser, axiosSuperAdminPrexo } from '../../../../../axios'
import Tab from '@mui/material/Tab'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import Swal from 'sweetalert2'
import AssignToSorting from './assign-to-user'
import jwt_decode from 'jwt-decode'

import {
    Box,
    Table,
    Card,
    TextField,
    Button,
    MenuItem,
    Checkbox,
} from '@mui/material'
import { includes } from 'lodash'

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
    width: 1500,
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
}))

const ProductTableTwo = styled(Table)(() => ({
    minWidth: 750,
    width: 1500,
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
}))

const ProductTableThere = styled(Table)(() => ({
    minWidth: 750,
    width: 2000,
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
}))

const PickupPage = () => {
    /*-----------------------state----------------------------------*/

    const [displayText, setDisplayText] = useState('')
    const [value, setValue] = React.useState('Charge Done')
    const [item, setItem] = useState([])
    const [brand, setbrand] = useState([])
    const [model, setModel] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [state, setState] = useState({})
    const [isCheck, setIsCheck] = useState([])
    const [sortingUsers, SetSortingUsers] = useState([])
    const [whtTray, setWhtTray] = useState([])
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)

    const navigate = useNavigate()
    /*--------------------------------------------------------------*/

    const handleChange = (event, newValue) => {
        setIsCheck([])
        setItem([])
        setValue(newValue)
    }
    /*---------------------------USEEFFECT-----------------------------------*/
    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    const { location } = jwt_decode(admin)
                    setDisplayText('Loading...')
                    let response = await axiosMisUser.post(
                        '/pickup/items/' + value + '/' + location
                    )
                    if (response.status === 200) {
                        setDisplayText('')
                        setItem(response.data.data)
                    } else {
                        setItem(response.data.data)

                        setDisplayText(response.data.message)
                    }
                } else {
                    navigate('/')
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [value, refresh])

    useEffect(() => {
        const FetchModel = async () => {
            let res = await axiosSuperAdminPrexo.post('/getBrands')
            if (res.status == 200) {
                setbrand(res.data.data)
            }
        }
        FetchModel()
    }, [])

    /*--------------------------------------------------------------*/
    const handleClick = (e) => {
        const { id, checked } = e.target
        setIsCheck([...isCheck, id])
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id))
        }
    }
    /*-----------------FETCH MODEL BASED ON THE BRAND---------------*/

    /* Fetch model */
    const fetchModel = async (brandName) => {
        try {
            let res = await axiosSuperAdminPrexo.post(
                '/get-product-model/' + brandName
            )
            if (res.status == 200) {
                setModel(res.data.data)
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    }

    /*---------------------STATE CHANGE FOR SORT----------------------*/
    const handleChangeSort = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }

    const handleDialogClose = () => {
        setIsCheck([])
        SetSortingUsers([])
        setShouldOpenEditorDialog(false)
    }

    const handleDialogOpen = () => {
        setShouldOpenEditorDialog(true)
    }

    /*---------------------HANDEL SORT-------------------------------*/

    const handelSort = async () => {
        try {
            const admin = localStorage.getItem('prexo-authentication')
            if (admin) {
                const { location } = jwt_decode(admin)

                setIsCheck([])
                setDisplayText('Loading...')
                const res = await axiosMisUser.post(
                    '/pickup/sortItem/' +
                        state?.brand +
                        '/' +
                        state?.model +
                        '/' +
                        value +
                        '/' +
                        location
                )
                if (res.status == 200) {
                    setDisplayText('')
                    setItem(res.data.data)
                } else {
                    setItem(res.data.data)

                    setDisplayText(res.data.message)
                }
            }
        } catch (error) {
            alert(error)
        }
    }
    /*---------------------------SEARCH UIC-----------------------------*/

    // const handelSearchUid = async (e) => {
    //     try {
    //         if (e.target.value == '') {
    //             setRefresh((refresh) => !refresh)
    //         } else {
    //             setItem([])
    //             setIsCheck([])

    //             setDisplayText('Searching....')
    //             const res = await axiosMisUser.post(
    //                 '/pickup/uicSearch/' + e.target.value + '/' + value
    //             )
    //             if (res.status == 200) {
    //                 setDisplayText('')

    //                 setItem(res.data.data)
    //             } else {
    //                 setItem([])
    //                 setDisplayText(res.data.message)
    //             }
    //         }
    //     } catch (error) {
    //         alert(error)
    //     }
    // }

    const handelSortingAgent = async () => {
        try {
            let token = localStorage.getItem('prexo-authentication')
            if (token) {
                const { location } = jwt_decode(token)

                let sortingUsers = await axiosMisUser.post(
                    '/getSortingAgentMergeMmt/' + location
                )

                if (sortingUsers.status == 200) {
                    SetSortingUsers(sortingUsers.data.data)
                }
                let obj = {
                    isCheck: isCheck,
                    type: value,
                }
                let whtTray = await axiosMisUser.post('/pickup/whtTray', obj)
                if (whtTray.status == 200) {
                    setWhtTray(whtTray.data.data)
                    handleDialogOpen()
                } else {
                    alert(whtTray.data.message)
                }
            }
        } catch (error) {
            alert(error)
        }
    }

    const columnsOne = [
        {
            name: 'items',
            label: 'Select',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, dataIndex) => {
                    return (
                        <Checkbox
                            onClick={(e) => {
                                handleClick(e)
                            }}
                            id={value.uic}
                            key={value.uic}
                            checked={isCheck.includes(value.uic)}
                        />
                    )
                },
            },
        },
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
            name: 'items', // field name in the row object
            label: 'UIC', // column title that will be shown in table

            options: {
                filter: true,

                customBodyRender: (value, dataIndex) => value.uic,
            },
        },
        {
            name: 'items',
            label: 'Order Id',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value.order_id,
            },
        },
        {
            name: 'items',
            label: 'IMEI',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value.imei || '',
            },
        },

        {
            name: 'brand',
            label: 'Brand',
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: 'Model',
            options: {
                filter: true,
            },
        },
        {
            name: 'items',
            label: 'MUIC',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value.muic || '',
            },
        },
        {
            name: 'code',
            label: 'Tray Id',
            options: {
                filter: true,
            },
        },
        {
            name: 'items',
            label: 'Battery Status',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.charging?.battery_status || '',
            },
        },
        {
            name: 'items',
            label: 'Charge Percentage',
            options: {
                filter: true,

                customBodyRender: (value, dataIndex) =>
                    value?.charging?.charge_percentage || '',
            },
        },
        {
            name: 'items',
            label: 'Body Condition',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.charging?.body_condition || '',
            },
        },
        {
            name: 'items',
            label: 'Display Condition',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.charging?.display_condition || '',
            },
        },
        {
            name: 'items',
            label: 'Lock Status',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.charging?.lock_status || '',
            },
        },
        {
            name: 'items',
            label: 'Charging Jack',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.charging?.charging_jack_type || '',
            },
        },
        {
            name: 'items',
            label: 'Body Part Missing',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.charging?.boady_part_missing || '',
            },
        },
    ]
    const columnsTwo = [
        {
            name: 'items',
            label: 'Select',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, dataIndex) => {
                    return (
                        <Checkbox
                            onClick={(e) => {
                                handleClick(e)
                            }}
                            id={value.uic}
                            key={value.uic}
                            checked={isCheck.includes(value.uic)}
                        />
                    )
                },
            },
        },
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
            name: 'items', // field name in the row object
            label: 'UIC', // column title that will be shown in table
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value.uic || '',
            },
        },
        {
            name: 'items',
            label: 'Order Id',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value.order_id || '',
            },
        },
        {
            name: 'items',
            label: 'IMEI',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value.imei || '',
            },
        },

        {
            name: 'brand',
            label: 'Brand',
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: 'Model',
            options: {
                filter: true,
            },
        },
        {
            name: 'items',
            label: 'MUIC',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value.muic || '',
            },
        },
        {
            name: 'code',
            label: 'Tray Id',
            options: {
                filter: true,
            },
        },
        {
            name: 'items',
            label: 'Battery Status',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.charging?.battery_status || '',
            },
        },
        {
            name: 'items',
            label: 'Charge Percentage',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.charging?.charge_percentage || '',
            },
        },
        {
            name: 'items',
            label: 'Body Condition',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.charging?.body_condition || '',
            },
        },
        {
            name: 'items',
            label: 'Display Condition',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.charging?.display_condition || '',
            },
        },
        {
            name: 'items',
            label: 'Lock Status',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.charging?.lock_status || '',
            },
        },
        {
            name: 'items',
            label: 'Charging Jack',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.charging?.charging_jack_type || '',
            },
        },
        {
            name: 'items',
            label: 'Body Part Missing',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.charging?.boady_part_missing || '',
            },
        },
        {
            name: 'items',
            label: 'Blancoo QC Status',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.bqc_report?.blancoo_qc_status || '',
            },
        },
        {
            name: 'items',
            label: 'Factory Reset Status',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.bqc_report?.factory_reset_status || '',
            },
        },
        {
            name: 'items',
            label: 'BQC Incomplete Reason',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.bqc_report?.bqc_incomplete_reason || '',
            },
        },
        {
            name: 'items',
            label: 'Technical Issue',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.bqc_report?.technical_issue || '',
            },
        },
        {
            name: 'items',
            label: 'BQC User Remark',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.bqc_report?.other || '',
            },
        },
    ]
    const columnsThree = [
        {
            name: 'items',
            label: 'Select',
            options: {
                filter: false,
                sort: false,
                setCellProps: () => ({ style: { width: '100px' } }),
                customBodyRender: (value, dataIndex) => {
                    return (
                        <Checkbox
                            onClick={(e) => {
                                handleClick(e)
                            }}
                            id={value.uic}
                            key={value.uic}
                            checked={isCheck.includes(value.uic)}
                        />
                    )
                },
            },
        },
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
            name: 'items', // field name in the row object
            label: 'UIC', // column title that will be shown in table
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value.uic || '',
            },
        },
        {
            name: 'items',
            label: 'Order Id',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value.order_id || '',
            },
        },
        {
            name: 'items',
            label: 'IMEI',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value.imei || '',
            },
        },

        {
            name: 'brand',
            label: 'Brand',
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: 'Model',
            options: {
                filter: true,
            },
        },
        {
            name: 'items',
            label: 'MUIC',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value.muic || '',
            },
        },
        {
            name: 'code',
            label: 'Tray Id',
            options: {
                filter: true,
            },
        },
        {
            name: 'items',
            label: 'Battery Status',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.charging?.battery_status || '',
            },
        },
        {
            name: 'items',
            label: 'Charge Percentage',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.charging?.charge_percentage || '',
            },
        },
        {
            name: 'items',
            label: 'Body Condition',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.charging?.body_condition || '',
            },
        },
        {
            name: 'items',
            label: 'Display Condition',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.charging?.display_condition || '',
            },
        },
        {
            name: 'items',
            label: 'Lock Status',
            options: {
                filter: true,
                setCellProps: () => ({ style: { width: '100px' } }),
                customBodyRender: (value, dataIndex) =>
                    value?.charging?.lock_status || '',
            },
        },
        {
            name: 'items',
            label: 'Charging Jack',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.charging?.charging_jack_type || '',
            },
        },
        {
            name: 'items',
            label: 'Body Part Missing',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.charging?.boady_part_missing || '',
            },
        },
        {
            name: 'items',
            label: 'Blancoo QC Status',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.bqc_report?.blancoo_qc_status || '',
            },
        },
        {
            name: 'items',
            label: 'Factory Reset Status',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.bqc_report?.factory_reset_status || '',
            },
        },
        {
            name: 'items',
            label: 'BQC Incomplete Reason',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.bqc_report?.bqc_incomplete_reason || '',
            },
        },
        {
            name: 'items',
            label: 'Technical Issue',
            options: {
                filter: true,

                customBodyRender: (value, dataIndex) =>
                    value?.bqc_report?.technical_issue || '',
            },
        },
        {
            name: 'items',
            label: 'BQC User Remark',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.bqc_report?.other || '',
            },
        },
        {
            name: 'items',
            label: 'Orginal Grade',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.audit_report?.orgGrade || '',
            },
        },
        {
            name: 'items',
            label: 'Audit Recomendad Grade',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.audit_report?.grade || '',
            },
        },
        {
            name: 'items',
            label: 'Stage',
            options: {
                filter: true,

                customBodyRender: (value, dataIndex) =>
                    value?.audit_report?.stage || '',
            },
        },
        {
            name: 'items',
            label: 'Reason',
            options: {
                filter: true,
                FileList: (value) => value?.audit_report?.reason,
                customBodyRender: (value, dataIndex) =>
                    value?.audit_report?.reason || '',
            },
        },
        {
            name: 'items',
            label: 'Description',
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.audit_report?.description || '',
            },
        },
    ]

    /*--------------------------------------------------------------*/

    const tableData = useMemo(() => {
        return (
            <MUIDataTable
                title={'UNITS'}
                data={item}
                columns={columnsOne}
                options={{
                    filterType: 'dropdown',
                    responsive: 'standared',
                    download: false,
                    print: false,
                    showFirstButton: 'true',
                    showLastButton: 'true',
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
                                (a.data[colIndex] < b.data[colIndex] ? -1 : 1) *
                                (order === 'desc' ? 1 : -1)
                            )
                        })
                    },
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            />
        )
    }, [item, columnsOne])

    const tableDataTwo = useMemo(() => {
        return (
            <MUIDataTable
                title={'UNITS'}
                data={item}
                columns={columnsTwo}
                options={{
                    filterType: 'dropdown',
                    responsive: 'standared',
                    download: false,
                    print: false,
                    showFirstButton: 'true',
                    showLastButton: 'true',
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
                                (a.data[colIndex] < b.data[colIndex] ? -1 : 1) *
                                (order === 'desc' ? 1 : -1)
                            )
                        })
                    },
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            />
        )
    }, [item, columnsTwo])

    const tableDataThree = useMemo(() => {
        return (
            <MUIDataTable
                title={'UNITS'}
                data={item}
                columns={columnsThree}
                options={{
                    filterType: 'dropdown',
                    responsive: 'standared',
                    download: false,
                    print: false,

                    showFirstButton: 'true',
                    showLastButton: 'true',
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
                                (a.data[colIndex] < b.data[colIndex] ? -1 : 1) *
                                (order === 'desc' ? 1 : -1)
                            )
                        })
                    },
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            />
        )
    }, [item, columnsThree])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Pickup', path: '/' },
                        { name: 'Units' },
                    ]}
                />
            </div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                        >
                            <Tab
                                label="Charge Done Unit's"
                                value="Charge Done"
                            />
                            <Tab label="BQC Done Unit's" value="BQC Done" />
                            <Tab label="Audit Done Unit's" value="Audit Done" />
                        </TabList>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 2,
                        }}
                    >
                        <Box>
                            {/* <TextField
                                label="Search UIC"
                                variant="outlined"
                                sx={{ ml: 3 }}
                                onChange={(e) => {
                                    handelSearchUid(e)
                                }}
                            /> */}
                            <TextField
                                select
                                label="Select Brand"
                                variant="outlined"
                                sx={{ ml: 3, width: 150 }}
                                name="brand"
                                onChange={(e) => {
                                    handleChangeSort(e)
                                }}
                            >
                                {brand.map((brandData) => (
                                    <MenuItem
                                        value={brandData.brand_name}
                                        onClick={(e) => {
                                            fetchModel(brandData.brand_name)
                                        }}
                                    >
                                        {brandData.brand_name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                label="Select Model"
                                variant="outlined"
                                name="model"
                                onChange={(e) => {
                                    handleChangeSort(e)
                                }}
                                sx={{ ml: 2, width: 150 }}
                            >
                                {model.map((modelData) => (
                                    <MenuItem value={modelData.model_name}>
                                        {modelData.model_name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button
                                sx={{
                                    ml: 2,
                                    mt: 1,
                                }}
                                variant="contained"
                                disabled={
                                    state.brand == undefined ||
                                    state.model == undefined
                                }
                                onClick={() => handelSort()}
                                style={{ backgroundColor: 'green' }}
                                component="span"
                            >
                                Sort
                            </Button>
                        </Box>
                        <Box>
                            <Button
                                sx={{
                                    mr: 3,
                                }}
                                variant="contained"
                                disabled={isCheck.length == 0}
                                onClick={() => handelSortingAgent(value)}
                                style={{ backgroundColor: 'primery' }}
                                component="span"
                            >
                                Assign to Sorting
                            </Button>
                        </Box>
                    </Box>
                    <TabPanel value="Charge Done">
                        <Card
                            sx={{ maxHeight: '100%', overflow: 'auto' }}
                            elevation={6}
                        >
                            <ProductTable>{tableData}</ProductTable>
                        </Card>
                    </TabPanel>
                    <TabPanel value="BQC Done">
                        <Card
                            sx={{ maxHeight: '100%', overflow: 'auto' }}
                            elevation={6}
                        >
                            <ProductTableTwo>{tableDataTwo}</ProductTableTwo>
                        </Card>
                    </TabPanel>
                    <TabPanel value="Audit Done">
                        <Card
                            sx={{ maxHeight: '100%', overflow: 'auto' }}
                            elevation={6}
                        >
                            <ProductTableThere>
                                {tableDataThree}
                            </ProductTableThere>
                        </Card>
                    </TabPanel>
                </TabContext>
            </Box>

            {shouldOpenEditorDialog && (
                <AssignToSorting
                    handleClose={handleDialogClose}
                    open={handleDialogOpen}
                    setRefresh={setRefresh}
                    sortingUsers={sortingUsers}
                    whtTray={whtTray}
                    isCheck={isCheck}
                    value={value}
                />
            )}
        </Container>
    )
}

export default PickupPage
