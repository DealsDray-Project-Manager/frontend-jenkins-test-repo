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

const CustomerBillings = ({ RdlOneReport }) => {
    return (
        <Card elevation={3}>
            <H4 sx={{ p: 2 }}>Latest RDL-1 User Report</H4>
            <Divider />
            <Table sx={{ mb: 2 }}>
                <TableBody>
                    {RdlOneReport?.selected_status !== undefined && RdlOneReport?.selected_status !== "" && RdlOneReport?.selected_status !== null ? (
                        <TableRow key={RdlOneReport?.selected_status}>
                            <TableCell sx={{ pl: 2 }}>Rdl-1 status :</TableCell>
                            <TableCell>
                                {RdlOneReport?.selected_status}
                            </TableCell>
                        </TableRow>
                    ) : null}
                    {RdlOneReport?.color !== undefined && RdlOneReport?.color !== "" && RdlOneReport?.color !== null ? (
                        <TableRow key={RdlOneReport?.color}>
                            <TableCell sx={{ pl: 2 }}>
                                Rdl-1 selected color :
                            </TableCell>
                            <TableCell>{RdlOneReport?.color}</TableCell>
                        </TableRow>
                    ) : null}
                    {RdlOneReport?.model_reg !== undefined && RdlOneReport?.model_reg !== "" && RdlOneReport?.model_reg !== null ? (
                        <TableRow key={RdlOneReport?.model_reg}>
                            <TableCell sx={{ pl: 2 }}>
                                Rdl-1 added model:
                            </TableCell>
                            <TableCell>{RdlOneReport?.model_reg}</TableCell>
                        </TableRow>
                    ) : null}
                    {RdlOneReport?.description !== undefined && RdlOneReport?.description !== "" && RdlOneReport?.description !== null ? (
                        <TableRow key={RdlOneReport?.description}>
                            <TableCell sx={{ pl: 2 }}>Rdl-1 remark:</TableCell>
                            <TableCell>{RdlOneReport?.description}</TableCell>
                        </TableRow>
                    ) : null}
                    {RdlOneReport?.username !== undefined  && RdlOneReport?.username !== "" && RdlOneReport?.username !== null ? (
                        <TableRow key={RdlOneReport?.username}>
                            <TableCell sx={{ pl: 2 }}>
                                Rdl-1 username :
                            </TableCell>
                            <TableCell>{RdlOneReport?.username}</TableCell>
                        </TableRow>
                    ) : null}
                </TableBody>
            </Table>
        </Card>
    )
}

export default CustomerBillings
