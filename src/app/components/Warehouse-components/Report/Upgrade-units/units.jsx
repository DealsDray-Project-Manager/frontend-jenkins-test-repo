import jwt_decode from 'jwt-decode'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect, useMemo } from 'react'
import { styled } from '@mui/system'
import moment from 'moment'

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
import {
    axiosMisUser,
    axiosReportingAgent,
    axiosWarehouseIn,
} from '../../../../../axios'
import Swal from 'sweetalert2'

const ProductTable = styled(Table)(() => ({
    minWidth: 750,
    width: '150%',
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
    const [stateForFilterUn, setFilterUn] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [location, setLocation] = useState('')
    const [count, setCount] = useState(0)
    const [searchType, setSearchType] = useState('')
    const [inputSearch, setInputSearch] = useState('')
    const [dataForDownload, setDataForDownload] = useState([])
    const [displayText, setDisplayText] = useState('')
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
            setDisplayText('Loading...')
            setLocation(location)
            if (inputSearch !== '') {
                const pageSearch = async () => {
                    let obj = {
                        location: location,
                        searchData: inputSearch,
                        page: page,
                        rowsPerPage: rowsPerPage,
                    }
                    let res = await axiosWarehouseIn.post(
                        '/search/upgradeReport',
                        obj
                    )
                    if (res.status == 200) {
                        setDisplayText('')
                        setCount(res.data.count)
                        setItem(res.data.data)
                    } else {
                        setItem(res.data.data)
                        setCount(res.data.count)
                        setDisplayText('Sorry no data found')
                    }
                }
                pageSearch()
            } else if (stateForFilterUn == true) {
                dataFilter()
            } else {
                const fetchData = async () => {
                    try {
                        let res = await axiosWarehouseIn.post(
                            '/upgradeUnits/' +
                            location +
                            '/' +
                            page +
                            '/' +
                            rowsPerPage
                        )
                        console.log("res:", res);
                        if (res.status == 200) {
                            setDisplayText('')
                            setCount(res.data.count)
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
    }, [refresh, page, rowsPerPage])

    useEffect(() => {
        console.log(data)
    }, [data])

    useEffect(() => {
        setData((_) =>
            item.map((d, index) => {
                d.id = page * rowsPerPage + index + 1
                return d
            })
        )
    }, [page, item, rowsPerPage])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const searchTrackItem = async (e) => {
        setInputSearch(e.target.value)
        e.preventDefault()
        try {
            let admin = localStorage.getItem('prexo-authentication')
            if (admin) {
                setDisplayText('Searching...')
                let { location } = jwt_decode(admin)
                if (e.target.value == '') {
                    setRefresh((refresh) => !refresh)
                } else {
                    setRowsPerPage(100)
                    setPage(0)
                    let obj = {
                        location: location,
                        searchData: e.target.value,
                        page: page,
                        rowsPerPage: rowsPerPage,
                    }
                    let res = await axiosWarehouseIn.post(
                        '/search/upgradeReport',
                        obj
                    )
                    if (res.status == 200) {
                        setDisplayText('')
                        setCount(res.data.count)
                        setItem(res.data.data)
                    } else {
                        setItem(res.data.data)
                        setCount(res.data.count)
                        setDisplayText('Sorry no data found')
                    }
                }
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

    const dataFilter = async () => {
        try {
            filterData.location = location
            filterData.page = page
            filterData.type = searchType
            filterData.size = rowsPerPage
            setDisplayText('Please wait...')
            setFilterUn(true)
            const res = await axiosWarehouseIn.post(
                '/upgardeUnitsFilter/item/filter',
                filterData
            )
            if (res.status === 200) {
                setDisplayText('')
                setCount(res.data.count)
                setItem(res.data.data)
            } else {
                setItem(res.data.data)
                setDisplayText('Sorry no data found')
            }
        } catch (error) {
            alert(error)
        }
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
                            Record NO
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '110px',
                                cursor: 'pointer',
                            }}
                        >
                            Audit Tray ID
                        </TableCell>

                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '110px',
                                cursor: 'pointer',
                            }}
                        >
                            UIC
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
                            Auditor Name
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '240px',
                            }}
                        >
                            Auditor Status
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                width: '205px',
                            }}
                        >
                            Original Grade
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '209px',
                            }}
                        >
                            Auditor Recommended Grade
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '209px',
                            }}
                        >
                            Auditor Reason
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '209px',
                            }}
                        >
                            Auditor Remark
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '150px',
                            }}
                        >
                            Audit Done Date
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '150px',
                            }}
                        >
                            Current Tray Status
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '250px',
                            }}
                        >
                            Current Tray ID
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
                            RDL 1 Done Date
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '250px',
                            }}
                        >
                            RDL 1 Username
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '250px',
                            }}
                        >
                            RDL 1 User Remarks
                        </TableCell>
                        <TableCell
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',

                                width: '250px',
                            }}
                        >
                            Repair item
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
                            <TableCell>{data?.audit_report?.wht_tray}</TableCell>
                            <TableCell>{data?.uic_code?.code}</TableCell>
                            <TableCell>
                                {data?.old_item_details
                                    ?.replace(/:/g, ' ')
                                    ?.toUpperCase()}
                            </TableCell>
                            <TableCell>{data?.audit_user_name}</TableCell>
                            <TableCell>{data?.audit_report?.stage}</TableCell>
                            <TableCell>
                                {data?.bqc_software_report?.final_grade}
                            </TableCell>
                            <TableCell>{data?.audit_report?.grade}</TableCell>
                            <TableCell>{data?.audit_report?.reason}</TableCell>
                            <TableCell>
                                {data?.audit_report?.description}
                            </TableCell>
                            <TableCell>
                                {' '}
                                {new Date(data?.audit_done_date).toLocaleString(
                                    'en-GB',
                                    {
                                        hour12: true,
                                    }
                                )}
                                
                            </TableCell>
                            <TableCell>{data?.tray_status}</TableCell>
                            <TableCell>{data?.wht_tray}</TableCell>
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
                                {data?.rdl_fls_closed_date ? (
                                    new Date(data.rdl_fls_closed_date).toLocaleString('en-GB', {
                                        hour12: true,
                                    })
                                ) : (
                                    ''
                                )}
                            </TableCell>
                            <TableCell>{data?.rdl_fls_one_user_name}</TableCell>
                            <TableCell>
                                {data?.rdl_fls_one_report?.description}
                            </TableCell>
                            <TableCell>
                                {data?.rdl_fls_one_report?.partRequired?.map(
                                    (part, index) => (
                                        `${index + 1}.${part?.part_name} - ${part?.part_id
                                        }`
                                    )
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </ProductTable>
        )
    }, [item, data, displayText])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Upgrade Units Report', path: '/' },
                    ]}
                />
            </div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Box>
                    <TextField
                        onChange={(e) => {
                            searchTrackItem(e)
                        }}
                        // disabled={search.type == '' ? true : false}
                        label="Search"
                        variant="outlined"
                        sx={{ mb: 1 }}
                    />
                </Box>
                <Box>
                    <TextField
                        type="date"
                        label="From Date"
                        variant="outlined"
                        inputProps={{ max: moment().format('YYYY-MM-DD') }}
                        onChange={(e) => {
                            handleChangeSort(e)
                        }}
                        sx={{ ml: 3 }}
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
                    {/* <Button
                        sx={{ ml: 2, mt: 1 }}
                        variant="contained"
                        color="primary"
                        disabled={
                            inputSearch == '' && stateForFilterUn == false
                        }
                        onClick={(e) => {
                            download(e)
                        }}
                    >
                        Download XLSX
                    </Button> */}
                </Box>
            </Box>
            <Card sx={{ maxHeight: '100%', overflow: 'auto' }} elevation={6}>
                {tableData}
            </Card>
            <TablePagination
                sx={{ px: 2 }}
                rowsPerPageOptions={[100, 150, 200]}
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                showFirstButton="true"
                showLastButton="true"
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={({ target: { value } }) =>
                    setRowsPerPage(value)
                }
            />
        </Container>
    )
}

export default SimpleMuiTable
