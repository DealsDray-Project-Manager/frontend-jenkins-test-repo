import { Box, Card, Divider, Stack, Typography } from '@mui/material'
const Bagdetails = ({ BagDetails }) => {
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
                Bag details
            </Typography>
            <Divider />
            <Stack
                justifyContent="space-between"
                sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
            >
                <Box sx={{ p: 2, display: 'flex' }}>
                    <Box>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Bag ID: {BagDetails?.bag_id}
                        </Typography>

                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Stock in status:{BagDetails?.stock_in_status}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Stock in date:{' '}
                            {BagDetails?.bag_close_date != undefined
                                ? new Date(
                                      BagDetails?.bag_close_date
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Bag Issue Date:{' '}
                            {BagDetails?.assign_to_agent != undefined
                                ? new Date(
                                      BagDetails?.assign_to_agent
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Agent Name: {BagDetails?.agent_name}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Bag Close Date Agent:{' '}
                            {BagDetails?.tray_closed_by_bot != undefined
                                ? new Date(
                                      BagDetails?.tray_closed_by_bot
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                    </Box>
                </Box>
            </Stack>
        </Card>
    )
}

export default Bagdetails
