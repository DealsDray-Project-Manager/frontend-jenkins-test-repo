import { Box, Card, Divider, Stack, Typography } from '@mui/material'
const PMTdetails = ({ PmtTrayDetails }) => {
    return (
        <Card
            sx={{
                width: '920px',
                marginTop: '40px',
                marginTop: '40px',
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
                PMT details
            </Typography>
            <Divider />
            <Stack
                justifyContent="space-between"
                sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
            >
                <Box sx={{ p: 2, display: 'flex',justifyContent:"space-between"  }}>
                    <Box>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Tray id: {PmtTrayDetails?.tray_id}
                        </Typography>

                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Tray Issued to Agent:{' '}
                            {PmtTrayDetails?.assign_to_agent != undefined
                                ? new Date(
                                      PmtTrayDetails?.assign_to_agent
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Bot Agent name: {PmtTrayDetails?.agent_name}
                        </Typography>
                    </Box>
                    <Box sx={{ marginLeft: '50px', fontSize: '16px' }}>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Tray Closed Date Bot:{' '}
                            {PmtTrayDetails?.tray_closed_by_bot != undefined
                                ? new Date(
                                      PmtTrayDetails?.tray_closed_by_bot
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Tray Received From Bot:{' '}
                            {PmtTrayDetails?.bot_done_received != undefined
                                ? new Date(
                                      PmtTrayDetails?.bot_done_received
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Tray Closed By WH :{' '}
                            {PmtTrayDetails?.tray_close_wh_date != undefined
                                ? new Date(
                                      PmtTrayDetails?.tray_close_wh_date
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
                            {PmtTrayDetails?.tray_status 
                              }
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            {' '}
                            Tray Location:
                            {PmtTrayDetails?.tray_location 
                              }
                        </Typography>
                    </Box>
                </Box>
            </Stack>
        </Card>
    )
}

export default PMTdetails
