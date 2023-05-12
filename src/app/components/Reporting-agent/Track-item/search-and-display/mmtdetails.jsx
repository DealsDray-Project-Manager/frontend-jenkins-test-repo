import { Box, Card, Divider, Stack, Typography, Grid } from '@mui/material'
const MMTdetails = ({ MmtTrayDetails }) => {
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
                MMT details
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
                            Tray id: {MmtTrayDetails?.tray_id}
                        </Typography>

                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Tray Issued to Agent:{' '}
                            {MmtTrayDetails?.assign_to_agent != undefined
                                ? new Date(
                                      MmtTrayDetails?.assign_to_agent
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Bot Agent name: {MmtTrayDetails?.agent_name}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            {' '}
                            Tray Location:
                            {MmtTrayDetails?.tray_location 
                              }
                        </Typography>
                    </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <Box sx={{ marginLeft: '50px', fontSize: '16px' }}>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Tray Closed Date Bot:{' '}
                            {MmtTrayDetails?.tray_closed_by_bot != undefined
                                ? new Date(
                                      MmtTrayDetails?.tray_closed_by_bot
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Tray Received From Bot:{' '}
                            {MmtTrayDetails?.bot_done_received != undefined
                                ? new Date(
                                      MmtTrayDetails?.bot_done_received
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Tray Closed By WH :{' '}
                            {MmtTrayDetails?.tray_close_wh_date != undefined
                                ? new Date(
                                      MmtTrayDetails?.tray_close_wh_date
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
                            {MmtTrayDetails?.tray_status 
                              }
                        </Typography>
                        
                    </Box>
                    </Grid>
                   
                </Box>
            </Stack>
        </Card>
    )
}

export default MMTdetails
