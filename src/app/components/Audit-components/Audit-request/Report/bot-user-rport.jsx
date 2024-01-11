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

const BqcUserReportPage = ({ BOt, botUsername, BotDoneDate }) => {
    return (
        <Card elevation={3} sx={{ mt: 2 }}>
            <H4 sx={{ p: 2 }}>BOT User Report</H4>
            <Divider />
            <Table sx={{ mb: 2 }}>
                <TableBody>
                    <TableRow key={BOt?.body_damage}>
                        <TableCell sx={{ pl: 2 }}>Any body Damage :</TableCell>
                        <TableCell>{BOt?.body_damage}</TableCell>
                    </TableRow>
                    <TableRow key={BOt?.body_damage_des}>
                        <TableCell sx={{ pl: 2 }}>
                            Details of Damage parts :
                        </TableCell>
                        <TableCell>{BOt?.body_damage_des}</TableCell>
                    </TableRow>
                    <TableRow key={botUsername}>
                        <TableCell sx={{ pl: 2 }}>BOT Username :</TableCell>
                        <TableCell>{botUsername}</TableCell>
                    </TableRow>
                    <TableRow key={BotDoneDate}>
                        <TableCell sx={{ pl: 2 }}>BOT Done Date :</TableCell>
                        <TableCell>
                            {new Date(BotDoneDate).toLocaleString('en-GB', {
                                hour12: true,
                            })}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Card>
    )
}

export default BqcUserReportPage
