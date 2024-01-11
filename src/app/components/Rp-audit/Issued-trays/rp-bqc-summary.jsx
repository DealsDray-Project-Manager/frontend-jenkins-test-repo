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
import { H4, H6 } from 'app/components/Typography'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const BqcSowftwareReportPage = ({
    BqcSowftwareReport,
    grade,
    imei,
    cimei_1,
    cimei_2,
}) => {
    return (
        <Card>
            <H4 sx={{ p: 2 }}>RP-BQC Summary</H4>
            <Divider />
            <Table sx={{ mb: 2 }}>
                <TableBody>
                    <TableRow key={BqcSowftwareReport?.mandatory_test}>
                        <TableCell sx={{ pl: 2 }}>
                            IMEI Verification :
                        </TableCell>
                        {imei?.match(/[0-9]/g)?.join('') ==
                            BqcSowftwareReport?.mobile_imei ||
                        imei?.match(/[0-9]/g)?.join('') ==
                            BqcSowftwareReport?.mobile_imei2 ||
                        imei?.match(/[0-9]/g)?.join('') ==
                            BqcSowftwareReport?._ro_ril_miui_imei0 ||
                        imei?.match(/[0-9]/g)?.join('') == cimei_1 ||
                        imei?.match(/[0-9]/g)?.join('') == cimei_2 ? (
                            <TableCell style={{ color: 'green' }}>
                                Verified
                            </TableCell>
                        ) : (
                            <TableCell style={{ color: 'red' }}>
                                Unverified
                            </TableCell>
                        )}
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.mandatory_test}>
                        <TableCell sx={{ pl: 2 }}>Final Grade:</TableCell>
                        <TableCell>{BqcSowftwareReport?.final_grade}</TableCell>
                    </TableRow>

                    <TableRow key={BqcSowftwareReport?.mandatory_test}>
                        <TableCell sx={{ pl: 2 }}>Mandatory Test :</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.mandatory_test}
                        </TableCell>
                    </TableRow>

                    <TableRow key={BqcSowftwareReport?.hardware_test_summary}>
                        <TableCell sx={{ pl: 2 }}>
                            Hardware Test Summary :
                        </TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.hardware_test_summary}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.frp}>
                        <TableCell sx={{ pl: 2 }}>FRP :</TableCell>
                        <TableCell>{BqcSowftwareReport?.frp}</TableCell>
                    </TableRow>
                    {BqcSowftwareReport?.operating_system_name?.toLowerCase() ==
                    'android' ? (
                        <TableRow key={BqcSowftwareReport?.device_color_one}>
                            <TableCell sx={{ pl: 2 }}>Device Color :</TableCell>
                            <TableCell>
                                {BqcSowftwareReport?.device_color_one}
                            </TableCell>
                        </TableRow>
                    ) : (
                        <TableRow key={BqcSowftwareReport?.device_color}>
                            <TableCell sx={{ pl: 2 }}>Device Color :</TableCell>
                            <TableCell>
                                {BqcSowftwareReport?.device_color}
                            </TableCell>
                        </TableRow>
                    )}
                    {grade == 'A' ? (
                        <>
                            <H6 sx={{ p: 2 }}>
                                List of Cosmetic Failed Test :
                            </H6>
                            <Divider />
                            {BqcSowftwareReport?.crackedlens?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.crackedlens}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Cracked Lens :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.crackedlens}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_headphonejack_3_5mm?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.pq_headphonejack_3_5mm
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Headphone Jack 3.5 mm :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.pq_headphonejack_3_5mm
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_screencracked?.toLowerCase() ==
                            'yes' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.pq_screencracked}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Screen Cracked :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.pq_screencracked}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_missingparts?.toLowerCase() ==
                            'yes' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.pq_missingparts}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Missing Parts :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.pq_missingparts}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_scratchchromeside > 2 ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.pq_scratchchromeside
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Scratch Chrome Side :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.pq_scratchchromeside
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            {BqcSowftwareReport?.pq_dentdevicebody > 2 ? (
                                <TableRow
                                    key={BqcSowftwareReport?.pq_dentdevicebody}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Dentdevice Body :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.pq_dentdevicebody}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_scratchesdisplay > 2 ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.pq_scratchesdisplay
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Scratches Display :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.pq_scratchesdisplay
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            {BqcSowftwareReport?.pq_scratchesbackpanel > 2 ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.pq_scratchesbackpanel
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Scratches Back Panel :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.pq_scratchesbackpanel
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_crackdevicebody > 2 ? (
                                <TableRow
                                    key={BqcSowftwareReport?.pq_crackdevicebody}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Crack Device Body :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.pq_crackdevicebody}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_bentondevicebody?.toLowerCase() ==
                            'yes' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.pq_bentondevicebody
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Benton device Body :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.pq_bentondevicebody
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_batterybulging?.toLowerCase() ==
                            'yes' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.pq_batterybulging}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Battery Bulging :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.pq_batterybulging}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_screen_type?.toLowerCase() ==
                            'copy folder' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.pq_screen_type}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Screen Type :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.pq_screen_type}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.powerkey?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.powerkey}>
                                    <TableCell sx={{ pl: 2 }}>
                                        {' '}
                                        Power Key :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.powerkey}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.volumekey?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.volumekey}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Volume Key :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.volumekey}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.silentkey?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.silentkey}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Silent Key :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.silentkey}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.homekey?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.homekey}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Home Key :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.homekey}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.simtray?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.simtray}>
                                    <TableCell sx={{ pl: 2 }}>
                                        SIM Tray :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.simtray}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.chargingjack?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.chargingjack}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Charging Jack :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.chargingjack}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.fingerprint?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.fingerprint}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Finger Print :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.fingerprint}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.flashlight?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.flashlight}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Flash Light :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.flashlight}
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            <H6 sx={{ p: 2 }}>
                                List of Automated Failed Test :
                            </H6>
                            <Divider />

                            {BqcSowftwareReport?.front_camera_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.front_camera_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Front Camera Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.front_camera_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.back_camera_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.back_camera_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Back Camera Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.back_camera_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.carrier_signal_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.carrier_signal_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Carrier Signel Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.carrier_signal_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.carrier_signal_sim_2_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.carrier_signal_sim_2_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Carrier Signel Sim 2 Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.carrier_signal_sim_2_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.speaker_microphone_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.speaker_microphone_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Speaker Microphone Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.speaker_microphone_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.wi_fi_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.wi_fi_test}>
                                    <TableCell sx={{ pl: 2 }}>
                                        WI-Fi Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.wi_fi_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.auto_focus_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.auto_focus_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Auto Focus Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.auto_focus_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.bluetooth_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.bluetooth_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Bluetooth Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.bluetooth_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.video_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.video_test}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Video Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.video_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.agps_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.agps_test}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Agps Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.agps_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            <H6 sx={{ p: 2 }}>List of Manual Failed Test :</H6>
                            <Divider />
                            {BqcSowftwareReport?.touch_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.touch_test}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Touch Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.touch_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.live_call_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.live_call_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Live Call Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.live_call_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.live_call_sim_2_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.live_call_sim_2_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Live Call Sim 2 Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.live_call_sim_2_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.fm_radio_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.fm_radio_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        FM Radio Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.fm_radio_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.screen_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.screen_test}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Screen Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.screen_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.microphone_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.microphone_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Microphone Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.microphone_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.receiver_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.receiver_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Received Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.receiver_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.speaker_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.speaker_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Speaker Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.speaker_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.speaker_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.speaker_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Speaker Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.speaker_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.vibration_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.vibration_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Vibration Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.vibration_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.camera_flash_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.camera_flash_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Camera Flash Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.camera_flash_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            {BqcSowftwareReport?.blancco_data_blancco_hardware_report_hardware_tests_auto_fingerprint?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.blancco_data_blancco_hardware_report_hardware_tests_auto_fingerprint
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Blancco Data Blancco Hardware Report
                                        Hardware Tests Auto Fingerprint :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.blancco_data_blancco_hardware_report_hardware_tests_auto_fingerprint
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.front_camera_flash_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.front_camera_flash_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Front Camera Flash Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.front_camera_flash_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.auto_rotation_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.auto_rotation_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Auto Rotation Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.auto_rotation_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.multi_touch_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.multi_touch_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Multi Touch Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.multi_touch_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.infrared_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.infrared_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Infrared Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.infrared_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.screen_damage_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.screen_damage_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Screen Damage Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.screen_damage_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.headset_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.headset_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Headset Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.headset_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.headset_microphone_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.headset_microphone_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Headset Microphone Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.headset_microphone_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.headset_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.headset_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Headset Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.headset_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.headset_microphone_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.headset_microphone_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Headset Microphone Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.headset_microphone_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            <H6 sx={{ p: 2 }}>
                                List of Assisted Failed Test :
                            </H6>
                            <Divider />

                            {BqcSowftwareReport?.screen_damage_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.screen_damage_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Screen Damage Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.screen_damage_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            {BqcSowftwareReport?.battery_charging_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.battery_charging_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Battery Charging Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.battery_charging_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.home_key_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.home_key_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Home Key Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.home_key_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.screen_lock_key_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.screen_lock_key_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Screen Lock Key Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.screen_lock_key_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.volume_keys_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.volume_keys_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Volume Key Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.volume_keys_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.recent_menu_key_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.recent_menu_key_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Recent Menu Key Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.recent_menu_key_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.assisted_front_camera_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.assisted_front_camera_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Assisted Front Camera Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.assisted_front_camera_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.assisted_camera_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.assisted_camera_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Assisted Camera Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.assisted_camera_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.proximity_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.proximity_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Proximity Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.proximity_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.compass_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.compass_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Compass Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.compass_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.light_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.light_test}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Light Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.light_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.silent_key_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.silent_key_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Silent Key Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.silent_key_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.headset_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.headset_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Touch Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.headset_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            {BqcSowftwareReport?.headset_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.headset_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Touch Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.headset_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            {BqcSowftwareReport?.face_id_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.face_id_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Face ID Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.face_id_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                        </>
                    ) : grade == 'B' ? (
                        <>
                            <H6 sx={{ p: 2 }}>List of Cosmetic Failed Test</H6>
                            <Divider />
                            {BqcSowftwareReport?.crackedlens?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.crackedlens}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Cracked Lens :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.crackedlens}
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            {BqcSowftwareReport?.pq_headphonejack_3_5mm?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.pq_headphonejack_3_5mm
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Headphone Jack 3.5 mm :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.pq_headphonejack_3_5mm
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_screencracked?.toLowerCase() ==
                            'yes' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.pq_screencracked}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Screen Cracked :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.pq_screencracked}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_missingparts?.toLowerCase() ==
                            'yes' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.pq_missingparts}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Missing Parts :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.pq_missingparts}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_scratchchromeside > 2 ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.pq_scratchchromeside
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Scratch Chrome Side :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.pq_scratchchromeside
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_dentdevicebody > 2 ? (
                                <TableRow
                                    key={BqcSowftwareReport?.pq_dentdevicebody}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Dentdevice Body :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.pq_dentdevicebody}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_scratchesdisplay > 2 ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.pq_scratchesdisplay
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Scratches Display :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.pq_scratchesdisplay
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            {BqcSowftwareReport?.pq_scratchesbackpanel > 2 ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.pq_scratchesbackpanel
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Scratches Back Panel :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.pq_scratchesbackpanel
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_crackdevicebody == 4 ||
                            BqcSowftwareReport?.pq_crackdevicebody == 3 ? (
                                <TableRow
                                    key={BqcSowftwareReport?.pq_crackdevicebody}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Crack Device Body :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.pq_crackdevicebody}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_bentondevicebody?.toLowerCase() ==
                            'yes' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.pq_bentondevicebody
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Bent on device Body :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.pq_bentondevicebody
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_batterybulging?.toLowerCase() ==
                            'yes' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.pq_batterybulging}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Battery Bulging :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.pq_batterybulging}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_screen_type?.toLowerCase() ==
                            'copy folder' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.pq_screen_type}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Screen Type :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.pq_screen_type}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.powerkey?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.powerkey}>
                                    <TableCell sx={{ pl: 2 }}>
                                        {' '}
                                        Power Key :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.powerkey}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.volumekey?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.volumekey}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Volume Key :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.volumekey}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.silentkey?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.silentkey}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Silent Key :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.silentkey}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.homekey?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.homekey}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Home Key :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.homekey}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.simtray?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.simtray}>
                                    <TableCell sx={{ pl: 2 }}>
                                        SIM Tray :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.simtray}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.chargingjack?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.chargingjack}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Charging Jack :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.chargingjack}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.fingerprint?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.fingerprint}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Finger Print :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.fingerprint}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.flashlight?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.flashlight}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Flash Light :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.flashlight}
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            <H6 sx={{ p: 2 }}>List of Automated Failed Test</H6>
                            <Divider />
                            {BqcSowftwareReport?.front_camera_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.front_camera_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Front Camera Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.front_camera_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.back_camera_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.back_camera_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Back Camera Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.back_camera_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.carrier_signal_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.carrier_signal_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Carrier Signel Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.carrier_signal_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.carrier_signal_sim_2_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.carrier_signal_sim_2_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Carrier Signel Sim 2 Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.carrier_signal_sim_2_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.speaker_microphone_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.speaker_microphone_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Speaker Microphone Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.speaker_microphone_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.wi_fi_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.wi_fi_test}>
                                    <TableCell sx={{ pl: 2 }}>
                                        WI-Fi Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.wi_fi_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.auto_focus_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.auto_focus_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Auto Focus Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.auto_focus_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.bluetooth_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.bluetooth_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Bluetooth Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.bluetooth_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.video_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.video_test}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Video Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.video_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.agps_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.agps_test}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Agps Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.agps_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            <H6 sx={{ p: 2 }}>List of Manual Failed Test </H6>
                            <Divider />

                            {BqcSowftwareReport?.touch_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.touch_test}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Touch Test
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.touch_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.live_call_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.live_call_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Live Call Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.live_call_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.fm_radio_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.fm_radio_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        FM Radio Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.fm_radio_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.screen_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.screen_test}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Screen Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.screen_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.live_call_sim_2_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.live_call_sim_2_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Live Call Sim 2 Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.live_call_sim_2_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            {BqcSowftwareReport?.microphone_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.microphone_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Microphone Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.microphone_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.receiver_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.receiver_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Received Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.receiver_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.speaker_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.speaker_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Speaker Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.speaker_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.speaker_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.speaker_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Speaker Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.speaker_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.vibration_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.vibration_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Vibration Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.vibration_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.camera_flash_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.camera_flash_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Camera Flash Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.camera_flash_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.blancco_data_blancco_hardware_report_hardware_tests_auto_fingerprint?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.blancco_data_blancco_hardware_report_hardware_tests_auto_fingerprint
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Blancco Data Blancco Hardware Report
                                        Hardware Tests Auto Fingerprint :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.blancco_data_blancco_hardware_report_hardware_tests_auto_fingerprint
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.front_camera_flash_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.front_camera_flash_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Front Camera Flash Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.front_camera_flash_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.auto_rotation_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.auto_rotation_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Auto Rotation Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.auto_rotation_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.multi_touch_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.multi_touch_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Multi Touch Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.multi_touch_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.infrared_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.infrared_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Infrared Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.infrared_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.screen_damage_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.screen_damage_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Screen Damage Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.screen_damage_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.headset_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.headset_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Headset Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.headset_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.headset_microphone_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.headset_microphone_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Headset Microphone Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.headset_microphone_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            <H6 sx={{ p: 2 }}>List of Assisted Failed Test</H6>
                            <Divider />

                            {BqcSowftwareReport?.screen_damage_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.screen_damage_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Screen Damage Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.screen_damage_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.battery_charging_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.battery_charging_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Battery Charging Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.battery_charging_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.home_key_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.home_key_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Home Key Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.home_key_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.screen_lock_key_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.screen_lock_key_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Screen Lock Key Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.screen_lock_key_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.volume_keys_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.volume_keys_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Volume Key Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.volume_keys_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.recent_menu_key_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.recent_menu_key_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Recent Menu Key Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.recent_menu_key_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.assisted_front_camera_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.assisted_front_camera_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Assisted Front Camera Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.assisted_front_camera_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.assisted_camera_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.assisted_camera_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Assisted Camera Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.assisted_camera_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.proximity_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.proximity_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Proximity Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.proximity_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.compass_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.compass_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Compass Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.compass_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.light_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.light_test}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Light Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.light_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.silent_key_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.silent_key_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Silent Key Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.silent_key_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.face_id_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.face_id_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Face ID Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.face_id_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                        </>
                    ) : grade == 'C' ? (
                        <>
                            <H6 sx={{ p: 2 }}>List of Cosmetic Failed Test</H6>
                            <Divider />
                            {BqcSowftwareReport?.crackedlens?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.crackedlens}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Cracked Lens :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.crackedlens}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_headphonejack_3_5mm?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.pq_headphonejack_3_5mm
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Headphone Jack 3.5 mm :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.pq_headphonejack_3_5mm
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_screencracked?.toLowerCase() ==
                            'yes' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.pq_screencracked}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Screen Cracked :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.pq_screencracked}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_missingparts?.toLowerCase() ==
                            'yes' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.pq_missingparts}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Missing Parts :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.pq_missingparts}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_scratchchromeside > 2 ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.pq_scratchchromeside
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Scratch Chrome Side :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.pq_scratchchromeside
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_dentdevicebody > 2 ? (
                                <TableRow
                                    key={BqcSowftwareReport?.pq_dentdevicebody}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Dentdevice Body :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.pq_dentdevicebody}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_scratchesdisplay > 2 ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.pq_scratchesdisplay
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Scratches Display :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.pq_scratchesdisplay
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            {BqcSowftwareReport?.pq_scratchesbackpanel > 2 ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.pq_scratchesbackpanel
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Scratches Back Panel :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.pq_scratchesbackpanel
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_crackdevicebody > 2 ? (
                                <TableRow
                                    key={BqcSowftwareReport?.pq_crackdevicebody}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Crack Device Body :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.pq_crackdevicebody}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_bentondevicebody?.toLowerCase() ==
                            'yes' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.pq_bentondevicebody
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Benton device Body :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.pq_bentondevicebody
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_batterybulging?.toLowerCase() ==
                            'yes' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.pq_batterybulging}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Battery Bulging :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.pq_batterybulging}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_screen_type?.toLowerCase() ==
                            'copy folder' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.pq_screen_type}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Screen Type :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.pq_screen_type}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.powerkey?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.powerkey}>
                                    <TableCell sx={{ pl: 2 }}>
                                        {' '}
                                        Power Key :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.powerkey}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.volumekey?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.volumekey}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Volume Key :
                                    </TableCell>

                                    <TableCell>
                                        {BqcSowftwareReport?.volumekey}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.silentkey?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.silentkey}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Silent Key :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.silentkey}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.homekey?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.homekey}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Home Key :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.homekey}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.simtray?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.simtray}>
                                    <TableCell sx={{ pl: 2 }}>
                                        SIM Tray :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.simtray}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.chargingjack?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.chargingjack}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Charging Jack :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.chargingjack}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.fingerprint?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.fingerprint}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Finger Print :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.fingerprint}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.flashlight?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.flashlight}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Flash Light :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.flashlight}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.video_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.video_test}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Video Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.video_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            <H6 sx={{ p: 2 }}>List of Automated Failed Test</H6>
                            <Divider />
                            {BqcSowftwareReport?.front_camera_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.front_camera_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Front Camera Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.front_camera_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.back_camera_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.back_camera_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Back Camera Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.back_camera_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.carrier_signal_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.carrier_signal_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Carrier Signel Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.carrier_signal_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.carrier_signal_sim_2_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.carrier_signal_sim_2_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Carrier Signel Sim 2 Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.carrier_signal_sim_2_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.speaker_microphone_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.speaker_microphone_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Speaker Microphone Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.speaker_microphone_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.wi_fi_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.wi_fi_test}>
                                    <TableCell sx={{ pl: 2 }}>
                                        WI-Fi Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.wi_fi_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.auto_focus_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.auto_focus_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Auto Focus Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.auto_focus_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.bluetooth_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.bluetooth_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Bluetooth Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.bluetooth_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.agps_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.agps_test}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Agps Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.agps_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            <H6 sx={{ p: 2 }}>List of Manual Failed Test</H6>
                            <Divider />
                            {BqcSowftwareReport?.touch_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.touch_test}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Touch Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.touch_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.fm_radio_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.fm_radio_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        FM Radio Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.fm_radio_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.screen_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.screen_test}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Screen Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.screen_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.live_call_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.live_call_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Live Call Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.live_call_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.live_call_sim_2_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.live_call_sim_2_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Live Call Sim 2 Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.live_call_sim_2_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.microphone_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.microphone_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Microphone Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.microphone_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.receiver_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.receiver_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Received Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.receiver_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.speaker_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.speaker_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Speaker Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.speaker_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.speaker_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.speaker_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Speaker Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.speaker_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.vibration_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.vibration_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Vibration Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.vibration_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.camera_flash_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.camera_flash_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Camera Flash Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.camera_flash_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            {BqcSowftwareReport?.blancco_data_blancco_hardware_report_hardware_tests_auto_fingerprint?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.blancco_data_blancco_hardware_report_hardware_tests_auto_fingerprint
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Blancco Data Blancco Hardware Report
                                        Hardware Tests Auto Fingerprint :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.blancco_data_blancco_hardware_report_hardware_tests_auto_fingerprint
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.front_camera_flash_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.front_camera_flash_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Front Camera Flash Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.front_camera_flash_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.auto_rotation_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.auto_rotation_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Auto Rotation Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.auto_rotation_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.multi_touch_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.multi_touch_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Multi Touch Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.multi_touch_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.infrared_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.infrared_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Infrared Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.infrared_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.screen_damage_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.screen_damage_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Screen Damage Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.screen_damage_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.headset_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.headset_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Headset Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.headset_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.headset_microphone_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.headset_microphone_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Headset Microphone Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.headset_microphone_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            <H6 sx={{ p: 2 }}>List of Assisted Failed Test</H6>
                            <Divider />

                            {BqcSowftwareReport?.screen_damage_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.screen_damage_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Screen Damage Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.screen_damage_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.battery_charging_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.battery_charging_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Battery Charging Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.battery_charging_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.home_key_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.home_key_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Home Key Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.home_key_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.screen_lock_key_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.screen_lock_key_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Screen Lock Key Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.screen_lock_key_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.volume_keys_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.volume_keys_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Volume Key Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.volume_keys_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.recent_menu_key_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.recent_menu_key_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Recent Menu Key Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.recent_menu_key_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.assisted_front_camera_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.assisted_front_camera_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Assisted Front Camera Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.assisted_front_camera_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.assisted_camera_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.assisted_camera_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Assisted Camera Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.assisted_camera_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.proximity_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.proximity_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Proximity Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.proximity_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.compass_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.compass_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Compass Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.compass_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.light_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.light_test}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Light Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.light_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            {BqcSowftwareReport?.silent_key_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.silent_key_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Silent Key Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.silent_key_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.face_id_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.face_id_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Face ID Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.face_id_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                        </>
                    ) : grade == 'D' ? (
                        <>
                            <H6 sx={{ p: 2 }}>List of Cosmetic Failed Test</H6>
                            <Divider />
                            {BqcSowftwareReport?.crackedlens?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.crackedlens}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Cracked Lens :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.crackedlens}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_headphonejack_3_5mm?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.pq_headphonejack_3_5mm
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Headphone Jack 3.5 mm :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.pq_headphonejack_3_5mm
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_screencracked?.toLowerCase() ==
                            'yes' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.pq_screencracked}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Screen Cracked :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.pq_screencracked}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_missingparts?.toLowerCase() ==
                            'yes' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.pq_missingparts}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Missing Parts :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.pq_missingparts}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_scratchchromeside > 2 ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.pq_scratchchromeside
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Scratch Chrome Side :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.pq_scratchchromeside
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_dentdevicebody > 2 ? (
                                <TableRow
                                    key={BqcSowftwareReport?.pq_dentdevicebody}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Dentdevice Body :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.pq_dentdevicebody}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_scratchesdisplay > 2 ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.pq_scratchesdisplay
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Scratches Display :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.pq_scratchesdisplay
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            {BqcSowftwareReport?.pq_scratchesbackpanel > 2 ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.pq_scratchesbackpanel
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Scratches Back Panel :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.pq_scratchesbackpanel
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_crackdevicebody > 2 ? (
                                <TableRow
                                    key={BqcSowftwareReport?.pq_crackdevicebody}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Crack Device Body :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.pq_crackdevicebody}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_bentondevicebody?.toLowerCase() ==
                            'yes' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.pq_bentondevicebody
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Benton device Body :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.pq_bentondevicebody
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_batterybulging?.toLowerCase() ==
                            'yes' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.pq_batterybulging}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Battery Bulging :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.pq_batterybulging}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.pq_screen_type?.toLowerCase() ==
                            'copy folder' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.pq_screen_type}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        PQ Screen Type :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.pq_screen_type}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.powerkey?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.powerkey}>
                                    <TableCell sx={{ pl: 2 }}>
                                        {' '}
                                        Power Key :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.powerkey}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.volumekey?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.volumekey}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Volume Key :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.volumekey}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.silentkey?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.silentkey}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Silent Key :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.silentkey}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.homekey?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.homekey}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Home Key :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.homekey}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.simtray?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.simtray}>
                                    <TableCell sx={{ pl: 2 }}>
                                        SIM Tray :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.simtray}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.chargingjack?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.chargingjack}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Charging Jack :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.chargingjack}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.fingerprint?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.fingerprint}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Finger Print :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.fingerprint}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.flashlight?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.flashlight}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Flash Light :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.flashlight}
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            <H6 sx={{ p: 2 }}>List of Automated Failed Test</H6>
                            <Divider />
                            {BqcSowftwareReport?.front_camera_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.front_camera_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Front Camera Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.front_camera_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.back_camera_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.back_camera_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Back Camera Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.back_camera_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.carrier_signal_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.carrier_signal_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Carrier Signel Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.carrier_signal_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.carrier_signal_sim_2_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.carrier_signal_sim_2_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Carrier Signel Sim 2 Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.carrier_signal_sim_2_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.speaker_microphone_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.speaker_microphone_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Speaker Microphone Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.speaker_microphone_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.wi_fi_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.wi_fi_test}>
                                    <TableCell sx={{ pl: 2 }}>
                                        WI-Fi Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.wi_fi_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.auto_focus_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.auto_focus_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Auto Focus Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.auto_focus_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.bluetooth_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.bluetooth_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Bluetooth Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.bluetooth_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.video_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.video_test}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Video Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.video_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.agps_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.agps_test}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Agps Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.agps_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            <H6 sx={{ p: 2 }}>List of Manual Failed Test</H6>
                            <Divider />
                            {BqcSowftwareReport?.touch_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.touch_test}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Touch Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.touch_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.fm_radio_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.fm_radio_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        FM Radio Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.fm_radio_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.screen_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.screen_test}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Screen Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.screen_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.live_call_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.live_call_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Live Call Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.live_call_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.live_call_sim_2_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.live_call_sim_2_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Live Call Sim 2 Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.live_call_sim_2_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.screen_damage_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.screen_damage_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Screen Damage Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.screen_damage_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.receiver_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.receiver_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Received Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.receiver_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.speaker_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.speaker_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Speaker Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.speaker_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.speaker_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.speaker_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Speaker Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.speaker_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.vibration_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.vibration_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Vibration Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.vibration_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.camera_flash_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.camera_flash_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Camera Flash Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.camera_flash_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.blancco_data_blancco_hardware_report_hardware_tests_auto_fingerprint?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.blancco_data_blancco_hardware_report_hardware_tests_auto_fingerprint
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Blancco Data Blancco Hardware Report
                                        Hardware Tests Auto Fingerprint :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.blancco_data_blancco_hardware_report_hardware_tests_auto_fingerprint
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.front_camera_flash_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.front_camera_flash_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Front Camera Flash Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.front_camera_flash_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.auto_rotation_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.auto_rotation_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Auto Rotation Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.auto_rotation_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            {BqcSowftwareReport?.multi_touch_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.multi_touch_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Multi Touch Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.multi_touch_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.infrared_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.infrared_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Infrared Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.infrared_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.screen_damage_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.screen_damage_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Screen Damage Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.screen_damage_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.headset_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.headset_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Headset Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.headset_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.headset_microphone_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.headset_microphone_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Headset Microphone Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.headset_microphone_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            <H6 sx={{ p: 2 }}>List of Assisted Failed Test </H6>
                            <Divider />

                            {BqcSowftwareReport?.battery_charging_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.battery_charging_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Battery Charging Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.battery_charging_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.microphone_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.microphone_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Microphone Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.microphone_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.home_key_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.home_key_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Home Key Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.home_key_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.screen_lock_key_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.screen_lock_key_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Screen Lock Key Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.screen_lock_key_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.volume_keys_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.volume_keys_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Volume Key Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.volume_keys_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.recent_menu_key_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.recent_menu_key_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Recent Menu Key Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.recent_menu_key_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.assisted_front_camera_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.assisted_front_camera_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Assisted Front Camera Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.assisted_front_camera_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.assisted_camera_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={
                                        BqcSowftwareReport?.assisted_camera_test
                                    }
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Assisted Camera Test :
                                    </TableCell>
                                    <TableCell>
                                        {
                                            BqcSowftwareReport?.assisted_camera_test
                                        }
                                    </TableCell>
                                </TableRow>
                            ) : null}

                            {BqcSowftwareReport?.proximity_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.proximity_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Proximity Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.proximity_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.compass_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.compass_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Compass Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.compass_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.light_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow key={BqcSowftwareReport?.light_test}>
                                    <TableCell sx={{ pl: 2 }}>
                                        Light Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.light_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.silent_key_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.silent_key_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Silent Key Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.silent_key_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {BqcSowftwareReport?.face_id_test?.toLowerCase() ==
                            'failed' ? (
                                <TableRow
                                    key={BqcSowftwareReport?.face_id_test}
                                >
                                    <TableCell sx={{ pl: 2 }}>
                                        Face ID Test :
                                    </TableCell>
                                    <TableCell>
                                        {BqcSowftwareReport?.face_id_test}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                        </>
                    ) : null}
                </TableBody>
            </Table>
        </Card>
    )
}

export default BqcSowftwareReportPage
