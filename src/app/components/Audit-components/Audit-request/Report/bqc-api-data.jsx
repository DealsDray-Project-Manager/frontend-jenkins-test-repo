import {
    Button,
    Card,
    Divider,
    Icon,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from '@mui/material'
import React from 'react'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const ContentBox = styled(FlexBox)(() => ({
    flexDirection: 'column',
    alignItems: 'flex-start',
}))

const StyledButton = styled(Button)(({ theme }) => ({
    fontSize: '13px',
    marginBottom: '16px',
    color: theme.palette.text.primary,
    '& span, svg': {
        fontSize: '1.25rem',
        marginRight: '16px',
    },
}))

const BqcSowftwareReportPage = ({ BqcSowftwareReport, grade }) => {
    return (
        <Card elevation={3}>
            <H4 sx={{ p: 2 }}>BQC API Report</H4>
            <Divider />
            <Table sx={{ mb: 2 }}>
                <TableBody>
                    {grade == 'B' ? (
                        <>
                            <TableRow key={BqcSowftwareReport?.bluetooth_test}>
                                <TableCell sx={{ pl: 2 }}>
                                    Bluetooth Test
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.bluetooth_test}
                                </TableCell>
                            </TableRow>
                            <TableRow
                                key={
                                    BqcSowftwareReport?.assisted_front_camera_test
                                }
                            >
                                <TableCell sx={{ pl: 2 }}>
                                    Assisted Front Camera Test
                                </TableCell>
                                <TableCell>
                                    {
                                        BqcSowftwareReport?.assisted_front_camera_test
                                    }
                                </TableCell>
                            </TableRow>
                            <TableRow
                                key={BqcSowftwareReport?.assisted_camera_test}
                            >
                                <TableCell sx={{ pl: 2 }}>
                                    Assisted Camera Test
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.assisted_camera_test}
                                </TableCell>
                            </TableRow>
                            <TableRow key={BqcSowftwareReport?.video_test}>
                                <TableCell sx={{ pl: 2 }}>Video Test</TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.video_test}
                                </TableCell>
                            </TableRow>
                            <TableRow key={BqcSowftwareReport?.proximity_test}>
                                <TableCell sx={{ pl: 2 }}>
                                    Proximity Test
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.proximity_test}
                                </TableCell>
                            </TableRow>
                            <TableRow key={BqcSowftwareReport?.headset_test}>
                                <TableCell sx={{ pl: 2 }}>
                                    Headset Test
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.headset_test}
                                </TableCell>
                            </TableRow>
                            <TableRow
                                key={
                                    BqcSowftwareReport?.headset_microphone_test
                                }
                            >
                                <TableCell sx={{ pl: 2 }}>
                                    Headset Microphone Test
                                </TableCell>
                                <TableCell>
                                    {
                                        BqcSowftwareReport?.headset_microphone_test
                                    }
                                </TableCell>
                            </TableRow>
                            <TableRow key={BqcSowftwareReport?.compass_test}>
                                <TableCell sx={{ pl: 2 }}>
                                    Compass Test
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.compass_test}
                                </TableCell>
                            </TableRow>
                            <TableRow key={BqcSowftwareReport?.light_test}>
                                <TableCell sx={{ pl: 2 }}>Light Test</TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.light_test}
                                </TableCell>
                            </TableRow>
                            <TableRow key={BqcSowftwareReport?.agps_test}>
                                <TableCell sx={{ pl: 2 }}>Agps Test</TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.agps_test}
                                </TableCell>
                            </TableRow>
                            <TableRow
                                key={BqcSowftwareReport?.multi_touch_test}
                            >
                                <TableCell sx={{ pl: 2 }}>
                                    Multi Touch Test
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.multi_touch_test}
                                </TableCell>
                            </TableRow>
                            <TableRow key={BqcSowftwareReport?.infrared_test}>
                                <TableCell sx={{ pl: 2 }}>
                                    Infrared Test
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.infrared_test}
                                </TableCell>
                            </TableRow>
                            <TableRow key={BqcSowftwareReport?.fm_radio_test}>
                                <TableCell sx={{ pl: 2 }}>
                                    FM Radio Test
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.fm_radio_test}
                                </TableCell>
                            </TableRow>
                        </>
                    ) : grade == 'C' ? (
                        <>
                            <TableRow
                                key={BqcSowftwareReport?.pq_headphonejack_3_5mm}
                            >
                                <TableCell sx={{ pl: 2 }}>
                                    BQ Headphone Jack 3.5 mm
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.pq_headphonejack_3_5mm}
                                </TableCell>
                            </TableRow>
                            <TableRow key={BqcSowftwareReport?.powerkey}>
                                <TableCell sx={{ pl: 2 }}>
                                    BQ Power Key
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.powerkey}
                                </TableCell>
                            </TableRow>
                            <TableRow
                                key={BqcSowftwareReport?.volume_keys_test}
                            >
                                <TableCell sx={{ pl: 2 }}>
                                    Volume Key Test
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.volume_keys_test}
                                </TableCell>
                            </TableRow>
                            <TableRow key={BqcSowftwareReport?.silentkey}>
                                <TableCell sx={{ pl: 2 }}>Silent Key</TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.silentkey}
                                </TableCell>
                            </TableRow>
                            <TableRow key={BqcSowftwareReport?.homekey}>
                                <TableCell sx={{ pl: 2 }}>Home Key</TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.homekey}
                                </TableCell>
                            </TableRow>
                            <TableRow key={BqcSowftwareReport?.simtray}>
                                <TableCell sx={{ pl: 2 }}>SIM Tray</TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.simtray}
                                </TableCell>
                            </TableRow>
                            <TableRow key={BqcSowftwareReport?.chargingjack}>
                                <TableCell sx={{ pl: 2 }}>
                                    Charging Jack
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.chargingjack}
                                </TableCell>
                            </TableRow>
                            <TableRow
                                key={
                                    BqcSowftwareReport?.blancco_data_blancco_hardware_report_hardware_tests_auto_fingerprint
                                }
                            >
                                <TableCell sx={{ pl: 2 }}>
                                    Blancco Data Blancco Hardware Report
                                    Hardware Tests Auto Fingerprint
                                </TableCell>
                                <TableCell>
                                    {
                                        BqcSowftwareReport?.blancco_data_blancco_hardware_report_hardware_tests_auto_fingerprint
                                    }
                                </TableCell>
                            </TableRow>
                            <TableRow
                                key={BqcSowftwareReport?.back_camera_test}
                            >
                                <TableCell sx={{ pl: 2 }}>
                                    Back Camera Test
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.back_camera_test}
                                </TableCell>
                            </TableRow>
                            <TableRow key={BqcSowftwareReport?.flashlight}>
                                <TableCell sx={{ pl: 2 }}>
                                    Flash Light
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.flashlight}
                                </TableCell>
                            </TableRow>
                            <TableRow key={BqcSowftwareReport?.back_key_test}>
                                <TableCell sx={{ pl: 2 }}>
                                    back Key Test
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.back_key_test}
                                </TableCell>
                            </TableRow>
                            <TableRow
                                key={BqcSowftwareReport?.recent_menu_key_test}
                            >
                                <TableCell sx={{ pl: 2 }}>
                                    Recent Menu Key Test
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.recent_menu_key_test}
                                </TableCell>
                            </TableRow>
                            <TableRow key={BqcSowftwareReport?.receiver_test}>
                                <TableCell sx={{ pl: 2 }}>
                                    Received Test
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.receiver_test}
                                </TableCell>
                            </TableRow>
                            <TableRow key={BqcSowftwareReport?.speaker_test}>
                                <TableCell sx={{ pl: 2 }}>
                                    Speaker Test
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.speaker_test}
                                </TableCell>
                            </TableRow>
                            <TableRow key={BqcSowftwareReport?.vibration_test}>
                                <TableCell sx={{ pl: 2 }}>
                                    Vibration Test
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.vibration_test}
                                </TableCell>
                            </TableRow>
                            <TableRow
                                key={BqcSowftwareReport?.camera_flash_test}
                            >
                                <TableCell sx={{ pl: 2 }}>
                                    Camera Flash Test
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.camera_flash_test}
                                </TableCell>
                            </TableRow>
                            <TableRow key={BqcSowftwareReport?.auto_focus_test}>
                                <TableCell sx={{ pl: 2 }}>
                                    Auto Focus Test
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.auto_focus_test}
                                </TableCell>
                            </TableRow>
                            <TableRow
                                key={BqcSowftwareReport?.fingerprint_test}
                            >
                                <TableCell sx={{ pl: 2 }}>
                                    Fingerprint Test
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.fingerprint_test}
                                </TableCell>
                            </TableRow>

                            <TableRow
                                key={
                                    BqcSowftwareReport?.front_camera_flash_test
                                }
                            >
                                <TableCell sx={{ pl: 2 }}>
                                    Front Camera Flash Test
                                </TableCell>
                                <TableCell>
                                    {
                                        BqcSowftwareReport?.front_camera_flash_test
                                    }
                                </TableCell>
                            </TableRow>
                            <TableRow key={BqcSowftwareReport?.crackedlens}>
                                <TableCell sx={{ pl: 2 }}>
                                    Cracked Lens
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.crackedlens}
                                </TableCell>
                            </TableRow>
                            <TableRow
                                key={BqcSowftwareReport?.auto_rotation_test}
                            >
                                <TableCell sx={{ pl: 2 }}>
                                    Auto Rotation Test
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.auto_rotation_test}
                                </TableCell>
                            </TableRow>
                            <TableRow key={BqcSowftwareReport?.face_id_test}>
                                <TableCell sx={{ pl: 2 }}>
                                    Face ID Test
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.face_id_test}
                                </TableCell>
                            </TableRow>
                        </>
                    ) : grade == 'D' ? (
                        <>
                            <TableRow
                                key={BqcSowftwareReport?.front_camera_test}
                            >
                                <TableCell sx={{ pl: 2 }}>
                                    Front Camera Test
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.front_camera_test}
                                </TableCell>
                            </TableRow>
                            <TableRow key={BqcSowftwareReport?.touch_test}>
                                <TableCell sx={{ pl: 2 }}>Touch Test</TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.touch_test}
                                </TableCell>
                            </TableRow>
                            <TableRow key={BqcSowftwareReport?.live_call_test}>
                                <TableCell sx={{ pl: 2 }}>
                                    Live Call Test
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.live_call_test}
                                </TableCell>
                            </TableRow>
                            <TableRow
                                key={BqcSowftwareReport?.live_call_sim_2_test}
                            >
                                <TableCell sx={{ pl: 2 }}>
                                    Live Call Sim 2 Test
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.live_call_sim_2_test}
                                </TableCell>
                            </TableRow>
                            <TableRow
                                key={BqcSowftwareReport?.screen_damage_test}
                            >
                                <TableCell sx={{ pl: 2 }}>
                                    Screen Damage Test
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.screen_damage_test}
                                </TableCell>
                            </TableRow>
                            <TableRow key={BqcSowftwareReport?.screen_test}>
                                <TableCell sx={{ pl: 2 }}>
                                    Screen Test
                                </TableCell>
                                <TableCell>
                                    {BqcSowftwareReport?.screen_test}
                                </TableCell>
                            </TableRow>
                        </>
                    ) : null}
                </TableBody>
            </Table>
        </Card>
    )
}

export default BqcSowftwareReportPage
