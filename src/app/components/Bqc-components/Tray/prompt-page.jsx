import React, { useEffect, useState, useMemo } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Button, Grid } from '@mui/material'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
// import jwt from "jsonwebtoken"
import Swal from 'sweetalert2'
import { H1, H3, H4 } from 'app/components/Typography'
import { axiosBqc } from '../../../../axios'
import ChargingDetails from '../../Audit-components/Audit-request/Report/charging-user-report'
import RdlOneReport from '../../Audit-components/Audit-request/Report/rdl-1-report'
import RdlTwoReport from '../../Audit-components/Audit-request/Report/rdl-2-report'
import { result } from 'lodash'

export default function DialogBox() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const { trayData, resDataUic, trayId } = state
    const [deviceButDis, setDeviceButDis] = useState(false)

    /*********************************************************** */

    const addActualitem = async (e, type, value) => {
        if (e.keyCode !== 32) {
            if (
                trayData.limit <=
                trayData?.temp_array?.length + trayData?.actual_items?.length
            ) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'All Items Scanned',
                    confirmButtonText: 'Ok',
                })
            } else {
                try {
                    resDataUic.bqc_status = value
                    let objData = {
                        condiation: type,
                        trayId: trayId,
                        item: resDataUic,
                    }
                    setDeviceButDis(true)
                    let res = await axiosBqc.post('/add-wht-item', objData)
                    if (res.status == 200) {
                        navigate('/bqc/tray/item-verify/' + trayId)
                        setDeviceButDis(false)
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
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
        }
    }

    return (
        <Box
            sx={{
                textAlign: 'center', // Add this line for center alignment
                alignItems: 'center',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
            }}
        >
            <H3>UIC: {resDataUic?.uic}</H3>
            <H3>Model: {resDataUic?.model_name}</H3>
            <Grid container spacing={3}>
                <Grid item lg={6} md={12} xs={12}>
                    <ChargingDetails
                        Charging={resDataUic?.charging}
                        state="Bqc"
                    />
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                    <RdlOneReport RdlOneReport={resDataUic?.rdl_fls_report} />
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                    <RdlTwoReport
                        RdlTwoReport={resDataUic?.rdl_repair_report}
                    />
                </Grid>
            </Grid>

            <Box
                sx={{
                    mt: 4,
                }}
            >
                <Button
                    sx={{
                        ml: 2,
                    }}
                    fullwidth
                    variant="contained"
                    disabled={deviceButDis}
                    style={{ backgroundColor: 'red' }}
                    component="span"
                    type="submit"
                    onClick={(e) => {
                        addActualitem(
                            e,
                            'Device Out',
                            'Device not to be checked for BQC'
                        )
                    }}
                >
                    Device not to be checked for BQC
                </Button>
                <Button
                    sx={{
                        ml: 2,
                    }}
                    fullwidth
                    variant="contained"
                    style={{ backgroundColor: 'green' }}
                    component="span"
                    type="submit"
                    disabled={deviceButDis}
                    onClick={(e) => {
                        addActualitem(
                            e,
                            'Device In',
                            'Device in progress for BQC'
                        )
                    }}
                >
                    Device in progress for BQC
                </Button>
            </Box>
        </Box>
    )
}
