import { Box, Card, Divider, Stack, Typography, Grid } from '@mui/material'
import Image from 'mui-image'

const Botdetails = ({
    BotTrayDetails,
    imageOne,
    imageTwo,
    imageThree,
    imageFour,
    imageFive,
    imageSix,
}) => {
    return (
        <Card
            sx={{
                // width: '920px',
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
                BOT details
            </Typography>
            <Divider />
            <Stack
                justifyContent="space-between"
                sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
            >
                <Box
                    sx={{
                        p: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Grid item xs={12} md={6}>
                        <Box>
                            <Typography
                                sx={{ fontSize: '16px', marginBottom: '15px' }}
                            >
                                Tray ID: {BotTrayDetails?.tray_id}
                            </Typography>

                            <Typography
                                sx={{ fontSize: '16px', marginBottom: '15px' }}
                            >
                                Tray Issued to Agent:{' '}
                                {BotTrayDetails?.assign_to_agent != undefined
                                    ? new Date(
                                          BotTrayDetails?.assign_to_agent
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </Typography>
                            <Typography
                                sx={{ fontSize: '16px', marginBottom: '15px' }}
                            >
                              BOT Agent name: {BotTrayDetails?.agent_name}
                            </Typography>
                            <Typography
                                sx={{ fontSize: '16px', marginBottom: '15px' }}
                            >
                                Tray Closed Date BOT:{' '}
                                {BotTrayDetails?.tray_closed_by_bot != undefined
                                    ? new Date(
                                          BotTrayDetails?.tray_closed_by_bot
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </Typography>
                            <Typography
                                sx={{ fontSize: '16px', marginBottom: '15px' }}
                            >
                                Tray Received From BOT:{' '}
                                {BotTrayDetails?.bot_done_received != undefined
                                    ? new Date(
                                          BotTrayDetails?.bot_done_received
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box sx={{ marginLeft: '50px', fontSize: '16px' }}>
                            <Typography
                                sx={{ fontSize: '16px', marginBottom: '15px' }}
                            >
                                Tray Closed By WH:{' '}
                                {BotTrayDetails?.tray_close_wh_date != undefined
                                    ? new Date(
                                          BotTrayDetails?.tray_close_wh_date
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </Typography>
                            <Typography
                                sx={{ fontSize: '16px', marginBottom: '15px' }}
                            >
                                Tray Issued To Sorting:{' '}
                                {BotTrayDetails?.handover_sorting_date !=
                                undefined
                                    ? new Date(
                                          BotTrayDetails?.handover_sorting_date
                                      ).toLocaleString('en-GB', {
                                          hour12: true,
                                      })
                                    : ''}
                            </Typography>
                            <Typography
                                sx={{ fontSize: '16px', marginBottom: '15px' }}
                            >
                                Sorting Agnet Name:{' '}
                                {BotTrayDetails?.sorting_agent_name}
                            </Typography>
                        </Box>
                    </Grid>
                   
                </Box>
              
            </Stack>
        </Card>
    )
}

export default Botdetails
