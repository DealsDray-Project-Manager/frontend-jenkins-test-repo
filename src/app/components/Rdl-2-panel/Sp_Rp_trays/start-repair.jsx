import React, { useEffect, useState, useMemo } from 'react'
import {
    Box,
    Button,
    TextField,
    Card,
    Grid,
    Typography,
    MenuItem,
    Table
} from '@mui/material'
import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import { styled } from '@mui/system'
import ChargingDetails from '../../Audit-components/Audit-request/Report/charging-user-report'
import AuditReport from '../../Rdl_one-components/Tray/Report/Audit-report'
import BqcApiReport from '../../Audit-components/Audit-request/Report/bqc-api-data'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../../../../app.css'


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
    const { reportData, trayId, username, uic, spTray } = state

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

    const handelNextpage = (e) => {
        e.preventDefault()
        navigate('/rdl-2/tray/unit-information-display/action', {
            state: {
                reportData: reportData,
                trayId: trayId,
                username: username,
                whtTrayId: trayId,
                uic: uic,
                spTray: spTray,
            },
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
                            { name: 'Unit details', path: '/' },
                            { name: 'Action' },
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
                                    Auditor Description:{' '}
                                    {
                                        reportData?.delivery?.audit_report
                                            ?.description
                                    }
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                    RDL-1 Status:{' '}
                                    {
                                        reportData?.delivery?.rdl_fls_one_report
                                            ?.selected_status
                                    }
                                </Typography>
                            </Box>
                            <Box sx={{ ml: 5 }}>
                                <Typography sx={{ mt: 2 }}>
                                    RDL-1 Description:{' '}
                                    {
                                        reportData?.delivery?.rdl_fls_one_report
                                            ?.description
                                    }
                                </Typography>
                            </Box>
                        </Box>
                    </Card>
                    {reportData?.checkIntray?.sp_tray != null ? (
                        <Card sx={{ mt: 2, width: '100%' }}>
                            <Table className="custom-table">
                                
                            <MUIDataTable
                                title={'Assigned Spare Partsd'}
                                data={
                                    reportData?.delivery?.rdl_fls_one_report
                                        ?.partRequired
                                }
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
                                                (a.data[colIndex] <
                                                b.data[colIndex]
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
                            </Table>
                        </Card>
                    ) : null}

                    <Grid container spacing={3} sx={{ mt: 1 }}>
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
                        <Grid
                            // sx={{ boxShadow: 1 }}
                            item
                            lg={12}
                            md={12}
                            xs={12}
                        >
                            <BqcApiReport
                                BqcSowftwareReport={
                                    reportData?.delivery?.bqc_software_report
                                }
                                grade={
                                    reportData?.delivery?.bqc_software_report
                                        ?.final_grade
                                }
                                imei={reportData?.order?.imei}
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
                                handelNextpage(e)
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
