import * as React from 'react'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import { Box } from '@mui/material'

const Trayjourney = ({ TrayMovement }) => {
    return (
        <div>
            <h3 style={{ marginTop: '30px' }}>Tray Journey</h3>
            <Box
                marginBottom="50px"
                boxShadow={1}
                sx={{
                    border: '0.5px solid #78909c',
                    borderRadius: '8px',
                    background: 'white',
                }}
                overflow="auto"
            >
                <Timeline position="alternate">
                    {TrayMovement?.bag_tray_issue_to_bot !== undefined ? (
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot
                                    sx={{ color: '#4caf50' }}
                                    variant="outlined"
                                />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                Warehouse user Issued to BOT at-{' '}
                                {new Date(
                                    TrayMovement?.bag_tray_issue_to_bot
                                ).toLocaleString('en-GB', {
                                    hour12: true,
                                })}
                            </TimelineContent>
                        </TimelineItem>
                    ) : null}
                    {TrayMovement?.tray_close_by_bot !== undefined ? (
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                Bot process done at -
                                {new Date(
                                    TrayMovement?.tray_close_by_bot
                                ).toLocaleString('en-GB', {
                                    hour12: true,
                                })}
                            </TimelineContent>
                        </TimelineItem>
                    ) : null}
                    {TrayMovement?.tray_received_from_bot != undefined ? (
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineConnector />
                                <TimelineDot />
                            </TimelineSeparator>
                            <TimelineContent>
                                Bot Done tray received from bot at{' '}
                                {new Date(
                                    TrayMovement?.tray_received_from_bot
                                ).toLocaleString('en-GB', {
                                    hour12: true,
                                })}
                            </TimelineContent>
                        </TimelineItem>
                    ) : null}
                    {TrayMovement?.bot_done_tray_close_wh != undefined ? (
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineConnector />
                                <TimelineDot />
                            </TimelineSeparator>
                            <TimelineContent>
                                Bot done and item verification done and closed
                                by warehouse at-{' '}
                                {new Date(
                                    TrayMovement?.bot_done_tray_close_wh
                                ).toLocaleString('en-GB', {
                                    hour12: true,
                                })}{' '}
                            </TimelineContent>
                        </TimelineItem>
                    ) : null}

                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot />
                        </TimelineSeparator>
                        <TimelineContent>
                            MIS user assigned for sorting agent for bot to wht
                            that request goes to warehouse on 22/04/2023 at 9:00
                            Am
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot />
                        </TimelineSeparator>
                        <TimelineContent>
                            warehouse user issuse bot and wht trays for sorting
                            agent for sorting porpose on 22/04/2023 at 9:00 Am
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot />
                        </TimelineSeparator>
                        <TimelineContent>
                            Sorting agent process the bot to wth on 22/04/2023
                            at 9:00 Am
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot />
                        </TimelineSeparator>
                        <TimelineContent>
                            Sorting gent closes the sorting process on
                            22/04/2023 at 9:00 Am
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot />
                        </TimelineSeparator>
                        <TimelineContent>
                            warehouse user closes the process and stock in on
                            22/04/2023 at 9:00 Am
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot />
                        </TimelineSeparator>
                        <TimelineContent>
                            MIS user assigned the next process for charging
                            agent that request goes to Warehouse on 22/04/2023
                            at 9:00 Am
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot />
                        </TimelineSeparator>
                        <TimelineContent>
                            WareHouse user issuse the wht tray for charging
                            agent on 22/04/2023 at 9:00 Am
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot />
                        </TimelineSeparator>
                        <TimelineContent>
                            WareHouse user issuse the wht tray for charging
                            agent on 22/04/2023 at 9:00 Am
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot />
                        </TimelineSeparator>
                        <TimelineContent>
                            Charging is done that by charging agent on
                            22/04/2023 at 9:00 Am
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot />
                        </TimelineSeparator>
                        <TimelineContent>
                            Warehouse user closes the charging process and stock
                            in on 22/04/2023 at 9:00 Am
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </Box>
        </div>
    )
}
export default Trayjourney
