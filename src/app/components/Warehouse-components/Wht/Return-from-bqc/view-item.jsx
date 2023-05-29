import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Typography } from '@mui/material'
import { axiosBot } from '../../../../../axios'

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
    const [trayData, setTrayData] = useState([])
    const { trayId } = useParams()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                let res = await axiosBot.post('/trayItem/' + trayId)
                if (res.status === 200) {
                    setIsLoading(false)
                    setTrayData(res.data.data)
                }
            } catch (error) {
                setIsLoading(false)
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
            label: <Typography sx={{fontWeight:'bold', ml:2}}>Record No</Typography>,
            options: {
                filter: false,
                sort: false,
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) =>
                <Typography sx={{pl:4}}>{dataIndex.rowIndex + 1}</Typography>
            },
        },
        {
            name: 'imei',
            label: <Typography sx={{fontWeight:'bold'}}>IMEI</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'uic',
            label: <Typography sx={{fontWeight:'bold'}}>UIC</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'sort_id',
            label: <Typography sx={{fontWeight:'bold'}}>Brand</Typography>,
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return trayData.brand
                },
            },
        },
        {
            name: 'sort_id',
            label: <Typography sx={{fontWeight:'bold'}}>Model</Typography>,
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return trayData.model
                },
            },
        },
        {
            name: 'bqc_status',
            label: <Typography sx={{fontWeight:'bold'}}>BQC Stage</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'bqc_report',
            label: <Typography sx={{fontWeight:'bold'}}>Blanco QC Status</Typography>,
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return value?.blancoo_qc_status
                },
            },
        },
        {
            name: 'bqc_report',
            label: <Typography sx={{fontWeight:'bold'}}>BQC Incomplete Reason</Typography>,
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return value?.bqc_incomplete_reason
                },
            },
        },
        {
            name: 'bqc_report',
            label: <Typography sx={{fontWeight:'bold'}}>Technical Isuue</Typography>,
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return value?.technical_issue
                },
            },
        },

        {
            name: 'bqc_report',
            label: <Typography sx={{fontWeight:'bold'}}>BQC User Remark</Typography>,
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return value?.other
                },
            },
        },
        {
            name: 'bqc_report',
            label: <Typography sx={{fontWeight:'bold'}}>Factory Reset Status</Typography>,
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return value?.factory_reset_status
                },
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'WHT', path: '/' },
                        { name: 'Return-from-BQC' },
                    ]}
                />
            </div>

            <MUIDataTable
                title={'Tray'}
                data={trayData.actual_items}
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
        </Container>
    )
}

export default SimpleMuiTable
