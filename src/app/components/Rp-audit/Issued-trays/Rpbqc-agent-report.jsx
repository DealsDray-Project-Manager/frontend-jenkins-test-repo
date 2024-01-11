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

const CustomerBillings = ({ Rpbqc }) => {
    return (
        <Card elevation={3}>
            <H4 sx={{ p: 2 }}>RP-BQC Report</H4>
            <Divider />
            <Table sx={{ mb: 2 }}>
                <TableBody>
                    <TableRow key={Rpbqc?.status}>
                        <TableCell sx={{ pl: 2 }}>RP-BQC status :</TableCell>
                        <TableCell>{Rpbqc?.status}</TableCell>
                    </TableRow>

                    <TableRow key={Rpbqc?.description}>
                        <TableCell sx={{ pl: 2 }}>RP-BQC remark:</TableCell>
                        <TableCell>{Rpbqc?.description}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Card>
    )
}

export default CustomerBillings
