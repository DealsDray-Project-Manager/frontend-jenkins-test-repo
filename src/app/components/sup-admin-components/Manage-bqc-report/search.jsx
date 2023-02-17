import React, { useState, useEffect, useMemo } from 'react'
import { Breadcrumb } from 'app/components'
import { styled } from '@mui/system'
import { Box, Grid, TextField, Button } from '@mui/material'
import ChargingDetails from './ChargingDetails'
import BqcReport from './BqcReport'
import BqcUserReport from './BqcUserReport'
import AmazonDetails from './AmazonDetails'
import BotUserReprt from './Bot-user-report'
import BqcApiSummery from './Bqc-api-data-summery'
import { axiosSuperAdminPrexo } from '../../../../axios'
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

export default function CenteredTabs() {
    const [value, setValue] = React.useState('1')
    const [uicCode, setUicCode] = useState('')
    const [reportData, setReportData] = useState({})
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    useEffect(() => {}, [])

    const fetchData = async () => {
        try {
            setReportData({})
            let res = await axiosSuperAdminPrexo.post('/bqcReport/' + uicCode)
            if (res.status === 200) {
                setReportData(res.data.data)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonText: 'Ok',
                    text: res.data.message,
                })
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

  

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Report', path: '/' },
                        { name: 'BQC' },
                    ]}
                />
            </div>
            <Box>
                <TextField
                    onChange={(e) => setUicCode(e.target.value)}
                    label="Please enter uic"
                    variant="outlined"
                />
                <Button
                    disabled={uicCode == ''}
                    sx={{ ml: 2, mt: 1 }}
                    variant="contained"
                    onClick={(e) => fetchData()}
                    color="primary"
                >
                    Search
                </Button>
            </Box>
            {Object.keys(reportData)?.length !== 0 ? (
                <Grid sx={{ mt: 1 }} container spacing={3}>
                    <Grid item lg={3} md={6} xs={12}>
                        <AmazonDetails Order={reportData?.order} />
                    </Grid>
                    <Grid item lg={3} md={6} xs={12}>
                        <BotUserReprt BOt={reportData?.delivery?.bot_report} />
                    </Grid>
                    <Grid item lg={3} md={6} xs={12}>
                        <ChargingDetails
                            Charging={reportData?.delivery?.charging}
                            ChargeDoneDate={
                                reportData?.delivery?.charging_done_date
                            }
                        />
                    </Grid>
                    <Grid item lg={3} md={6} xs={12}>
                        <BqcUserReport
                            BqcUserReport={reportData?.delivery?.bqc_report}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                        <BqcReport
                            BqcSowftwareReport={
                                reportData?.delivery?.bqc_software_report
                            }
                        />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                        <BqcApiSummery
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
            ) : null}
        </Container>
    )
}
