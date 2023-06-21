import React, { useEffect, useState, useMemo } from 'react'
import {
    Box,
    Button,
    TextField,
    Card,
    Grid,
    Typography,
    MenuItem,
} from '@mui/material'
import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import { styled } from '@mui/system'
import ChargingDetails from '../../Audit-components/Audit-request/Report/charging-user-report'
import AuditReport from '../../Rdl_one-components/Tray/Report/Audit-report'
import BqcApiAllReport from '../../Audit-components/Audit-request/Report/bqc-all-api-report'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { axiosWarehouseIn } from 'axios'
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
    const navigate = useNavigate()
    const { state } = useLocation()
    const { reportData, trayId, username, uic, whtTrayId } = state

    /**************************************************************************** */
    const [refresh, setRefresh] = useState(false)

    const [selectedDate, setSelectedDate] = React.useState(null)

    const handleDateChange = (date) => {
        setSelectedDate(date)
    }
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
            name: 'part_id',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Spare Part ID
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'part_name',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Part Name</Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'quantity',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Quantity</Typography>
            ),
            options: {
                filter: true,
            },
        },
    ]

 
    const handleclose = () => {
        Swal.fire({
            title: 'Closed Successfully',
            icon: 'success',
        })
    }
    /************************************************************************** */
    // const tableExpected = useMemo(() => {
    return (
        <>
            <Container>
                <div className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Requests', path: '/' },
                            { name: 'Order' },
                        ]}
                    />
                </div>
                <Box>
                    <Typography sx={{ fontSize: 'large', fontWeight: 'bold' }}>
                        Add Unit Repair Details
                    </Typography>
                </Box>
                <br />
                <>
                    <Card sx={{ width: '100%', height: '50%' }}>
                        <Box sx={{ display: 'flex', mb: 2 }}>
                            <Box sx={{ ml: 2 }}>
                                <Typography sx={{ mt: 2 }}>
                                    UIC : {uic}
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                    MUIC : {reportData?.muic?.muic}
                                </Typography>
                            </Box>
                            <Box sx={{ ml: 5 }}>
                                <Typography sx={{ mt: 2 }}>
                                    BRAND : {reportData?.muic?.brand_name}
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                    MODEL : {reportData?.muic?.model_name}
                                </Typography>
                            </Box>
                            <Box sx={{ ml: 5 }}>
                                <Typography sx={{ mt: 2 }}>
                                    Description:{' '}
                                    {
                                        reportData?.delivery?.rdl_fls_one_report
                                            ?.description
                                    }
                                </Typography>
                            </Box>
                        </Box>
                    </Card>

                    <Card sx={{ mt: 2, width: '100%' }}>
                        <MUIDataTable
                            title={'Tray'}
                            data={reportData?.delivery?.rdl_fls_one_report?.partRequired}
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
                                                : 1) *
                                            (order === 'desc' ? 1 : -1)
                                        )
                                    })
                                },
                                elevation: 0,
                                rowsPerPageOptions: [10, 20, 40, 80, 100],
                            }}
                        />
                    </Card>

                    <Grid container spacing={3} sx={{mt:1}}>
                        <Grid item lg={6} md={12} xs={12}>
                            <ChargingDetails
                                Charging={reportData?.delivery?.charging}
                                ChargeDoneDate={
                                    reportData?.delivery?.charging_done_date
                                }
                            />
                        </Grid>
                        <Grid item lg={6} md={12} xs={12}>
                            <AuditReport
                                AuditData={reportData?.delivery?.audit_report}
                                otherAuditFeedBack={
                                    reportData?.otherAudFeedBack
                                }
                            />
                        </Grid>
                        <Grid sx={{ boxShadow: 1 }} item lg={12} md={12} xs={12}>
                    <BqcApiAllReport
                        BqcSowftwareReport={
                            reportData?.delivery?.bqc_software_report
                        }
                    />
                </Grid>
                    </Grid>

             
                    <Box sx={{ textAlign: 'right' }}>
                        <Button
                            sx={{
                                m: 1,
                            }}
                            variant="contained"
                            onClick={(e) => {
                                navigate(
                                    '/rdl-two/Sp_Rp_trays/scan/unitrepair/repairdone'
                                )
                            }}
                            style={{ backgroundColor: 'green' }}
                            component="span"
                        >
                            Start Repair
                        </Button>
                    </Box>
                </>
            </Container>
        </>
    )
}

export default SimpleMuiTable
