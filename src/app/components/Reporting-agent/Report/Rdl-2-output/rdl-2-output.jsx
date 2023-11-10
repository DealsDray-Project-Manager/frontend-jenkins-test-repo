import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import Swal from 'sweetalert2'
import moment from 'moment'
import useAuth from 'app/hooks/useAuth'
import '../../../../../app.css'
import {
    Button,
    IconButton,
    Icon,
    Typography,
    Table,
    TableContainer,
    TextField,
    Box,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { axiosReportingAgent, axiosSuperAdminPrexo } from '../../../../../axios'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote'
import SaveIcon from '@mui/icons-material/Save'

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

const PartTable = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [rdl2OutputRequests, setRdl2OutputRequests] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const [filterData, setFilterData] = useState({
        fromDate: '',
        toDate: '',
    })

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                setIsLoading(true)
                const res = await axiosReportingAgent.post(
                    '/rdl-2-output-requests'
                )
                if (res.status === 200) {
                    setRdl2OutputRequests(res.data.data)
                    setIsLoading(false)
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
        fetchBrand()
        return () => {
            setIsAlive(false)
            setIsLoading(false)
        }
    }, [isAlive])

    // HANDEL DATE CHANGE
    const handleChangeSort = ({ target: { name, value } }) => {
        setFilterData({
            ...filterData,
            [name]: value,
        })
    }
    //  HANDEL GETREPORT
    const handelGetReport = async () => {
        try {
            setLoading(true)
            let obj = {
                from_date: filterData.fromDate,
                to_date: filterData.toDate,
                created_user: user.username,
            }
            const res = await axiosReportingAgent.post(
                '/get-report-for-rdl-two-output',
                obj
            )
            if (res.status === 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res.data.message,
                    confirmButtonText: 'Ok',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        setLoading(false)
                        setIsAlive((isAlive) => !isAlive)
                    }
                })
            } else {
                setLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.message,
                })
            }
        } catch (error) {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
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
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 2 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'request_id', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Request Id</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'created_user',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Requested By</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'from_date',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>From Date</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    }),
            },
        },
        {
            name: 'to_date',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>To Date</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    }),
            },
        },
        {
            name: 'status',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Status</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'createdAt',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Created Date</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },
        {
            name: 'request_id',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    Actions
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <LoadingButton
                            color="secondary"
                            onClick={handelGetReport}
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                            sx={{ m: 1 }}
                            disabled={tableMeta.rowData[5] == 'Pending'}
                        >
                            <span>Download</span>
                        </LoadingButton>
                    )
                },
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: 'RDL-2 Output', path: '/' }]}
                />
            </div>
            <Box>
                <TextField
                    type="date"
                    label="From Date"
                    variant="outlined"
                    inputProps={{ max: moment().format('YYYY-MM-DD') }}
                    onChange={(e) => {
                        handleChangeSort(e)
                    }}
                    sx={{ mB: 1 }}
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
                    sx={{ mb: 1, ml: 1 }}
                    InputLabelProps={{ shrink: true }}
                />
                <LoadingButton
                    color="secondary"
                    onClick={handelGetReport}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<RequestQuoteIcon />}
                    variant="contained"
                    sx={{ m: 1 }}
                    disabled={
                        filterData.fromDate == '' || filterData.toDate == ''
                    }
                >
                    <span>Get Report</span>
                </LoadingButton>
            </Box>

            <Table className="custom-table">
                <MUIDataTable
                    title={'RDL-2 Output'}
                    data={rdl2OutputRequests}
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
                        elevation: 0,
                        rowsPerPageOptions: [10, 20, 40, 80, 100],
                    }}
                />
            </Table>
        </Container>
    )
}

export default PartTable
