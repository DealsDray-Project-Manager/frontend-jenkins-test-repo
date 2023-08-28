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

const CustomerBillings = ({ RdlTwoReport }) => {
    return (
        <Card elevation={3}>
            <H4 sx={{ p: 2 }}>Latest RDL Two User Report</H4>
            <Divider />
            <Table sx={{ mb: 2 }}>
                <TableBody>
                    <TableRow key={RdlTwoReport?.status}>
                        <TableCell sx={{ pl: 2 }}>Rdl Two status :</TableCell>
                        <TableCell>{RdlTwoReport?.status}</TableCell>
                    </TableRow>

                    <TableRow key={RdlTwoReport?.reason}>
                        <TableCell sx={{ pl: 2 }}>
                            Rdl two added reason:
                        </TableCell>
                        <TableCell>{RdlTwoReport?.reason}</TableCell>
                    </TableRow>
                    <TableRow key={RdlTwoReport?.description}>
                        <TableCell sx={{ pl: 2 }}>Rdl two remark:</TableCell>
                        <TableCell>{RdlTwoReport?.description}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Card>
    )
}

export default CustomerBillings
