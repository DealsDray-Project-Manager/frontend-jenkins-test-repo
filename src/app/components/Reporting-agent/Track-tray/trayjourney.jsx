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

                    {TrayMovement?.wh_issue_to_sorting != undefined ? (
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineConnector />
                                <TimelineDot />
                            </TimelineSeparator>
                            <TimelineContent>
                                Warehouse user issued to sorting at -{' '}
                                {new Date(
                                    TrayMovement?.wh_issue_to_sorting
                                ).toLocaleString('en-GB', {
                                    hour12: true,
                                })}{' '}
                            </TimelineContent>
                        </TimelineItem>
                    ) : null}
                     {TrayMovement?.sorting_agent_close_bot_wht != undefined ? (
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineConnector />
                                <TimelineDot />
                            </TimelineSeparator>
                            <TimelineContent>
                                Sorting done item validated and closed by warehouse at -{' '}
                                {new Date(
                                    TrayMovement?.sorting_agent_close_bot_wht
                                ).toLocaleString('en-GB', {
                                    hour12: true,
                                })}{' '}
                            </TimelineContent>
                        </TimelineItem>
                    ) : null}
                     {TrayMovement?.issue_to_merging != undefined ? (
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineConnector />
                                <TimelineDot />
                            </TimelineSeparator>
                            <TimelineContent>
                                Issued to merging at -{' '}
                                {new Date(
                                    TrayMovement?.issue_to_merging
                                ).toLocaleString('en-GB', {
                                    hour12: true,
                                })}{' '}
                            </TimelineContent>
                        </TimelineItem>
                    ) : null}

                    
                </Timeline>
            </Box>
        </div>
    )
}
export default Trayjourney
