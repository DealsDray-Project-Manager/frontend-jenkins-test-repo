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

const BqcSowftwareReportPage = ({ BqcSowftwareReport }) => {
    return (
        <Card elevation={3}>
            <H4 sx={{ p: 2 }}>BQC Report</H4>
            <Divider />
            <Table sx={{ mb: 2 }}>
                <TableBody>
                    <TableRow key={BqcSowftwareReport?.uic}>
                        <TableCell sx={{ pl: 2 }}>UIC</TableCell>
                        <TableCell>{BqcSowftwareReport?.uic}</TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.tray_id}>
                        <TableCell sx={{ pl: 2 }}>Tray ID</TableCell>
                        <TableCell>{BqcSowftwareReport?.tray_id}</TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.date}>
                        <TableCell sx={{ pl: 2 }}>Date</TableCell>
                        <TableCell>{BqcSowftwareReport?.date}</TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.testing_duration}>
                        <TableCell sx={{ pl: 2 }}>Testing Duration</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.testing_duration}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.erasure_technician}>
                        <TableCell sx={{ pl: 2 }}>Technician</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.erasure_technician}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.final_grade}>
                        <TableCell sx={{ pl: 2 }}>Final Grade</TableCell>
                        <TableCell>{BqcSowftwareReport?.final_grade}</TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.hardware_test_summary}>
                        <TableCell sx={{ pl: 2 }}>
                            Hardware Test Summary
                        </TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.hardware_test_summary}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.mandatory_test}>
                        <TableCell sx={{ pl: 2 }}>Mandatory Test</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.mandatory_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.mobile_name}>
                        <TableCell sx={{ pl: 2 }}>Mobile Name</TableCell>
                        <TableCell>{BqcSowftwareReport?.mobile_name}</TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.market_name}>
                        <TableCell sx={{ pl: 2 }}>Market Name</TableCell>
                        <TableCell>{BqcSowftwareReport?.market_name}</TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.device_color_one}>
                        <TableCell sx={{ pl: 2 }}>Device Color</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.device_color_one}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.bq_batterychargerange}>
                        <TableCell sx={{ pl: 2 }}>
                            Bq Battery Charge Range
                        </TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.bq_batterychargerange}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.mobile_imei}>
                        <TableCell sx={{ pl: 2 }}>Mobile IMEI</TableCell>
                        <TableCell>{BqcSowftwareReport?.mobile_imei}</TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.mobile_imei2}>
                        <TableCell sx={{ pl: 2 }}>Mobile IMEI 2</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.mobile_imei2}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?._ro_imei_check}>
                        <TableCell sx={{ pl: 2 }}>Ro IMEI Check</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?._ro_imei_check}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.chargingjack}>
                        <TableCell sx={{ pl: 2 }}>Charging Jack</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.chargingjack}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.crackedlens}>
                        <TableCell sx={{ pl: 2 }}>Cracked Lens</TableCell>
                        <TableCell>{BqcSowftwareReport?.crackedlens}</TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.fingerprint}>
                        <TableCell sx={{ pl: 2 }}>Finger Print</TableCell>
                        <TableCell>{BqcSowftwareReport?.fingerprint}</TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.flashlight}>
                        <TableCell sx={{ pl: 2 }}>Flash Light</TableCell>
                        <TableCell>{BqcSowftwareReport?.flashlight}</TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.homekey}>
                        <TableCell sx={{ pl: 2 }}>Home Key</TableCell>
                        <TableCell>{BqcSowftwareReport?.homekey}</TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.pq_batterybulging}>
                        <TableCell sx={{ pl: 2 }}>PQ Battery Bulging</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.pq_batterybulging}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.pq_bentondevicebody}>
                        <TableCell sx={{ pl: 2 }}>
                            PQ Benton device Body
                        </TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.pq_bentondevicebody}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.pq_crackdevicebody}>
                        <TableCell sx={{ pl: 2 }}>
                            PQ Crack Device Body
                        </TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.pq_crackdevicebody}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.pq_dentdevicebody}>
                        <TableCell sx={{ pl: 2 }}>PQ Dentdevice Body</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.pq_dentdevicebody}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.pq_headphonejack_3_5mm}>
                        <TableCell sx={{ pl: 2 }}>
                            PQ Headphone Jack 3.5 mm
                        </TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.pq_headphonejack_3_5mm}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.pq_missingparts}>
                        <TableCell sx={{ pl: 2 }}>PQ Missing Parts</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.pq_missingparts}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.pq_scratchchromeside}>
                        <TableCell sx={{ pl: 2 }}>
                            PQ Scratch Chrome Side
                        </TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.pq_scratchchromeside}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.pq_scratchesbackpanel}>
                        <TableCell sx={{ pl: 2 }}>
                            PQ Scratches Back Panel
                        </TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.pq_scratchesbackpanel}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.pq_scratchesdisplay}>
                        <TableCell sx={{ pl: 2 }}>
                            PQ Scratches Display
                        </TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.pq_scratchesdisplay}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.pq_screencracked}>
                        <TableCell sx={{ pl: 2 }}>PQ Screen Cracked</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.pq_screencracked}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.pq_screen_type}>
                        <TableCell sx={{ pl: 2 }}>PQ Screen Type</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.pq_screen_type}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.powerkey}>
                        <TableCell sx={{ pl: 2 }}> Power Key</TableCell>
                        <TableCell>{BqcSowftwareReport?.powerkey}</TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.simtray}>
                        <TableCell sx={{ pl: 2 }}>SIM Tray</TableCell>
                        <TableCell>{BqcSowftwareReport?.simtray}</TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.silentkey}>
                        <TableCell sx={{ pl: 2 }}>Silent Key</TableCell>
                        <TableCell>{BqcSowftwareReport?.silentkey}</TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.volumekey}>
                        <TableCell sx={{ pl: 2 }}>Volume Key</TableCell>
                        <TableCell>{BqcSowftwareReport?.volumekey}</TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.carrier_signal_test}>
                        <TableCell sx={{ pl: 2 }}>
                            Carrier Signel Test
                        </TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.carrier_signal_test}
                        </TableCell>
                    </TableRow>
                    <TableRow
                        key={BqcSowftwareReport?.carrier_signal_sim_2_test}
                    >
                        <TableCell sx={{ pl: 2 }}>
                            Carrier Signel Sim 2 Test
                        </TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.carrier_signal_sim_2_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.wi_fi_test}>
                        <TableCell sx={{ pl: 2 }}>WI-Fi Test</TableCell>
                        <TableCell>{BqcSowftwareReport?.wi_fi_test}</TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.bluetooth_test}>
                        <TableCell sx={{ pl: 2 }}>Bluetooth Test</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.bluetooth_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.microphone_test}>
                        <TableCell sx={{ pl: 2 }}>Microphone Test</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.microphone_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.speaker_microphone_test}>
                        <TableCell sx={{ pl: 2 }}>
                            Speaker Microphone Test
                        </TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.speaker_microphone_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.front_microphone_test}>
                        <TableCell sx={{ pl: 2 }}>
                            Front Microphone Test
                        </TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.front_microphone_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.headset_microphone_test}>
                        <TableCell sx={{ pl: 2 }}>
                            Headset Microphone Test
                        </TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.headset_microphone_test}
                        </TableCell>
                    </TableRow>
                    <TableRow
                        key={BqcSowftwareReport?.speaker_microphone_front_test}
                    >
                        <TableCell sx={{ pl: 2 }}>
                            Speaker Microphone Front Test
                        </TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.speaker_microphone_front_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.receiver_test}>
                        <TableCell sx={{ pl: 2 }}>Received Test</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.receiver_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.headset_test}>
                        <TableCell sx={{ pl: 2 }}>Headset Test</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.headset_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.front_camera_test}>
                        <TableCell sx={{ pl: 2 }}>Front Camera Test</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.front_camera_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.video_test}>
                        <TableCell sx={{ pl: 2 }}>Video Test</TableCell>
                        <TableCell>{BqcSowftwareReport?.video_test}</TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.auto_focus_test}>
                        <TableCell sx={{ pl: 2 }}>Auto Focus Test</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.auto_focus_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.camera_flash_test}>
                        <TableCell sx={{ pl: 2 }}>Camera Flash Test</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.camera_flash_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.front_camera_flash_test}>
                        <TableCell sx={{ pl: 2 }}>
                            Front Camera Flash Test
                        </TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.front_camera_flash_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.device_color}>
                        <TableCell sx={{ pl: 2 }}>Device Color</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.device_color}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.battery_charging_test}>
                        <TableCell sx={{ pl: 2 }}>
                            Battery Charging Test
                        </TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.battery_charging_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.touch_test}>
                        <TableCell sx={{ pl: 2 }}>Touch Test</TableCell>
                        <TableCell>{BqcSowftwareReport?.touch_test}</TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.proximity_test}>
                        <TableCell sx={{ pl: 2 }}>Proximity Test</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.proximity_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.compass_test}>
                        <TableCell sx={{ pl: 2 }}>Compass Test</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.compass_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.light_test}>
                        <TableCell sx={{ pl: 2 }}>Light Test</TableCell>
                        <TableCell>{BqcSowftwareReport?.light_test}</TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.vibration_test}>
                        <TableCell sx={{ pl: 2 }}>Vibration Test</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.vibration_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.home_key_test}>
                        <TableCell sx={{ pl: 2 }}>Home Key Test</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.home_key_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.volume_keys_test}>
                        <TableCell sx={{ pl: 2 }}>Volume Key Test</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.volume_keys_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.screen_lock_key_test}>
                        <TableCell sx={{ pl: 2 }}>
                            Screen Lock Key Test
                        </TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.screen_lock_key_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.back_key_test}>
                        <TableCell sx={{ pl: 2 }}>back Key Test</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.back_key_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.recent_menu_key_test}>
                        <TableCell sx={{ pl: 2 }}>
                            Recent Menu Key Test
                        </TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.recent_menu_key_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.screen_test}>
                        <TableCell sx={{ pl: 2 }}>Screen Test</TableCell>
                        <TableCell>{BqcSowftwareReport?.screen_test}</TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.live_call_test}>
                        <TableCell sx={{ pl: 2 }}>Live Call Test</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.live_call_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.live_call_sim_2_test}>
                        <TableCell sx={{ pl: 2 }}>
                            Live Call Sim 2 Test
                        </TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.live_call_sim_2_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.screen_damage_test}>
                        <TableCell sx={{ pl: 2 }}>Screen Damage Test</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.screen_damage_test}
                        </TableCell>
                    </TableRow>
                    <TableRow
                        key={BqcSowftwareReport?.assisted_front_camera_test}
                    >
                        <TableCell sx={{ pl: 2 }}>
                            Assisted Front Camera Test
                        </TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.assisted_front_camera_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.fingerprint_test}>
                        <TableCell sx={{ pl: 2 }}>Fingerprint Test</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.fingerprint_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.multi_touch_test}>
                        <TableCell sx={{ pl: 2 }}>Multi Touch Test</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.multi_touch_test}
                        </TableCell>
                    </TableRow>

                    <TableRow key={BqcSowftwareReport?.face_id_test}>
                        <TableCell sx={{ pl: 2 }}>Face ID Test</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.face_id_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.auto_rotation_test}>
                        <TableCell sx={{ pl: 2 }}>Auto Rotation Test</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.auto_rotation_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.infrared_test}>
                        <TableCell sx={{ pl: 2 }}>Infrared Test</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.infrared_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.fm_radio_test}>
                        <TableCell sx={{ pl: 2 }}>FM Radio Test</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.fm_radio_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.product_version}>
                        <TableCell sx={{ pl: 2 }}>Product Version</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.product_version}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.product_name}>
                        <TableCell sx={{ pl: 2 }}>Product Name</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.product_name}
                        </TableCell>
                    </TableRow>
                    <TableRow
                        key={BqcSowftwareReport?.operating_system_version}
                    >
                        <TableCell sx={{ pl: 2 }}>
                            Operating System Version
                        </TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.operating_system_version}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.system_manufacturer}>
                        <TableCell sx={{ pl: 2 }}>System Manufacture</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.system_manufacturer}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.system_model}>
                        <TableCell sx={{ pl: 2 }}>System Model</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.system_model}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.mobile_internal_model}>
                        <TableCell sx={{ pl: 2 }}>
                            Mobile Internal Model
                        </TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.mobile_internal_model}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.system_serial}>
                        <TableCell sx={{ pl: 2 }}>System Serial</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.system_serial}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.operating_system_name}>
                        <TableCell sx={{ pl: 2 }}>
                            Operating System Name
                        </TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.operating_system_name}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.total_memory}>
                        <TableCell sx={{ pl: 2 }}>Total Memory</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.total_memory}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.business_name}>
                        <TableCell sx={{ pl: 2 }}>Business Name</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.business_name}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.business_location}>
                        <TableCell sx={{ pl: 2 }}>Business Location</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.business_location}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.report_id}>
                        <TableCell sx={{ pl: 2 }}>Report Id</TableCell>
                        <TableCell>{BqcSowftwareReport?.report_id}</TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.rooted}>
                        <TableCell sx={{ pl: 2 }}>Rooted</TableCell>
                        <TableCell>{BqcSowftwareReport?.rooted}</TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.frp}>
                        <TableCell sx={{ pl: 2 }}>FRP</TableCell>
                        <TableCell>{BqcSowftwareReport?.frp}</TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.frp_status}>
                        <TableCell sx={{ pl: 2 }}>FRP Status</TableCell>
                        <TableCell>{BqcSowftwareReport?.frp_status}</TableCell>
                    </TableRow>
                    <TableRow
                        key={
                            BqcSowftwareReport?.blancco_data_blancco_hardware_report_system_mdm_status
                        }
                    >
                        <TableCell sx={{ pl: 2 }}>
                            Blancco Data Blancco Hardware Report System MDM
                            Status
                        </TableCell>
                        <TableCell>
                            {
                                BqcSowftwareReport?.blancco_data_blancco_hardware_report_system_mdm_status
                            }
                        </TableCell>
                    </TableRow>
                    <TableRow
                        key={
                            BqcSowftwareReport?.blancco_data_blancco_hardware_report_hardware_tests_auto_fingerprint
                        }
                    >
                        <TableCell sx={{ pl: 2 }}>
                            Blancco Data Blancco Hardware Report Hardware Tests
                            Auto Fingerprint
                        </TableCell>
                        <TableCell>
                            {
                                BqcSowftwareReport?.blancco_data_blancco_hardware_report_hardware_tests_auto_fingerprint
                            }
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.disk_capacity}>
                        <TableCell sx={{ pl: 2 }}>Disk Capacity</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.disk_capacity}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.agps_test}>
                        <TableCell sx={{ pl: 2 }}>Agps Test</TableCell>
                        <TableCell>{BqcSowftwareReport?.agps_test}</TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.assisted_camera_test}>
                        <TableCell sx={{ pl: 2 }}>
                            Assisted Camera Test
                        </TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.assisted_camera_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.silent_key_test}>
                        <TableCell sx={{ pl: 2 }}>Silent Key Test</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.silent_key_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.speaker_test}>
                        <TableCell sx={{ pl: 2 }}>Speaker Test</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.speaker_test}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?._ro_ril_miui_imei0}>
                        <TableCell sx={{ pl: 2 }}>RO Ril Miui IMEI 0</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?._ro_ril_miui_imei0}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcSowftwareReport?.back_camera_test}>
                        <TableCell sx={{ pl: 2 }}>Back Camera Test</TableCell>
                        <TableCell>
                            {BqcSowftwareReport?.back_camera_test}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Card>
    )
}

export default BqcSowftwareReportPage
