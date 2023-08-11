import { Box, Card, Divider, Stack, Typography ,Grid} from '@mui/material'
const WHTdetails = ({ WhtTrayDetails }) => {
    return (
        <Card
            sx={{
                // width: '920px',
                marginTop: '40px',
                marginBottom: '40px',
                border: '1px solid black',
            }}
        >
            <br />
            <Typography
                sx={{
                    margin: '0px 0px 15px 33px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                }}
            >
                WHT details
            </Typography>
            <Divider />
            <Stack
                justifyContent="space-between"
                sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
            >
                <Box sx={{ p: 2, display: 'flex',justifyContent:"space-between"  }}>
                    <Grid item xs={12} md={6}>
                    <Box>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Tray Id: {WhtTrayDetails?.wht_tray}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Tray Issue to Sorting:{' '}
                            {WhtTrayDetails?.handover_sorting_date != undefined
                                ? new Date(
                                      WhtTrayDetails?.handover_sorting_date
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Item Added :{' '}
                            {WhtTrayDetails?.wht_tray_assigned_date != undefined
                                ? new Date(
                                      WhtTrayDetails?.wht_tray_assigned_date
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Tray Received from Sorting :
                            {WhtTrayDetails?.received_from_sorting != undefined
                                ? new Date(
                                      WhtTrayDetails?.received_from_sorting
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Tray Closed By WH :{' '}
                            {WhtTrayDetails?.closed_from_sorting != undefined
                                ? new Date(
                                      WhtTrayDetails?.closed_from_sorting
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            {' '}
                            Charging Agent Name:
                            {WhtTrayDetails?.agent_name_charging}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Tray Issued to Charging :{' '}
                            {WhtTrayDetails?.assign_to_agent_charging !=
                            undefined
                                ? new Date(
                                      WhtTrayDetails?.assign_to_agent_charging
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Charging Done Date:{' '}
                            {WhtTrayDetails?.charging_done_date != undefined
                                ? new Date(
                                      WhtTrayDetails?.charging_done_date
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Tray Received From Charging :
                            {WhtTrayDetails?.charging_done_received != undefined
                                ? new Date(
                                      WhtTrayDetails?.charging_done_received
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>

                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            {' '}
                            Charging Done Tray Closed :
                            {WhtTrayDetails?.charging_done_close != undefined
                                ? new Date(
                                      WhtTrayDetails?.charging_done_close
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            {' '}
                            BQC Agent Name:{WhtTrayDetails?.agent_name_bqc}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            {' '}
                            Issued to BQC:{' '}
                            {WhtTrayDetails?.assign_to_agent_bqc != undefined
                                ? new Date(
                                      WhtTrayDetails?.assign_to_agent_bqc
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            {' '}
                            BQC Done Date:{' '}
                            {WhtTrayDetails?.bqc_out_date != undefined
                                ? new Date(
                                      WhtTrayDetails?.bqc_out_date
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            {' '}
                            Tray Location:
                            {WhtTrayDetails?.tray_location 
                              }
                        </Typography>
                    </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                    <Box sx={{ marginLeft: '50px', fontSize: '16px' }}>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            {' '}
                            Tray Received From BQC :
                            {WhtTrayDetails?.bqc_done_received != undefined
                                ? new Date(
                                      WhtTrayDetails?.bqc_done_received
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            {' '}
                            Bqc Done Tray Closed :
                            {WhtTrayDetails?.bqc_done_close != undefined
                                ? new Date(
                                      WhtTrayDetails?.bqc_done_close
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>

                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            {' '}
                            Issued to Audit Date:{' '}
                            {WhtTrayDetails?.issued_to_audit != undefined
                                ? new Date(
                                      WhtTrayDetails?.issued_to_audit
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            {' '}
                            Audit Agnet Name: {WhtTrayDetails?.audit_user_name}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            {' '}
                            Audit Done Date:{' '}
                            {WhtTrayDetails?.audit_done_date != undefined
                                ? new Date(
                                      WhtTrayDetails?.audit_done_date
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            {' '}
                            Audit Done Tray Recieved Date :
                            {WhtTrayDetails?.audit_done_recieved != undefined
                                ? new Date(
                                      WhtTrayDetails?.audit_done_recieved
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            {' '}
                            Audit Done Tray Closed By Warehouse Date:
                            {WhtTrayDetails?.audit_done_close != undefined
                                ? new Date(
                                      WhtTrayDetails?.audit_done_close
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            {' '}
                            Rdl One username:
                            {WhtTrayDetails?.rdl_fls_one_user_name}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            {' '}
                            Issued to Rdl One:
                            {WhtTrayDetails?.rdl_fls_issued_date != undefined
                                ? new Date(
                                      WhtTrayDetails?.rdl_fls_issued_date
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            {' '}
                            Rdl One Done:
                            {WhtTrayDetails?.rdl_fls_closed_date != undefined
                                ? new Date(
                                      WhtTrayDetails?.rdl_fls_closed_date
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            {' '}
                            Received from Rdl One
                            {WhtTrayDetails?.rdl_fls_done_recieved_date !=
                            undefined
                                ? new Date(
                                      WhtTrayDetails?.rdl_fls_done_recieved_date
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            {' '}
                            Rdl One Done Closed by WH:
                            {WhtTrayDetails?.rdl_fls_done_closed_wh != undefined
                                ? new Date(
                                      WhtTrayDetails?.rdl_fls_done_closed_wh
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            {' '}
                            Tray Status:
                            {WhtTrayDetails?.tray_status 
                              }
                        </Typography>
                       
                    </Box>
                    </Grid>
                    
                </Box>
            </Stack>
        </Card>
    )
}

export default WHTdetails
