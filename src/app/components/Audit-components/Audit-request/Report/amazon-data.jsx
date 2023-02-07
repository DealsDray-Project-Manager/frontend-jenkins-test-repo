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

const CustomerBillings = ({ Order }) => {
    return (
        <Card elevation={3}>
            <H4 sx={{ p: 2 }}>Purchase Data</H4>
            <Divider />
            <Table sx={{ mb: 2 }}>
                <TableBody>
                    {/* <TableRow key={Order?.vc_eligible}>
                        <TableCell sx={{ pl: 2 }}>VC Eligible</TableCell>
                        <TableCell>{Order?.vc_eligible}</TableCell>
                    </TableRow>
                    <TableRow
                        key={
                            Order?.customer_declaration_physical_defect_present
                        }
                    >
                        <TableCell sx={{ pl: 2 }}>
                            {' '}
                            Customer Declaration Physical Defect Present
                        </TableCell>
                        <TableCell>
                            {
                                Order?.customer_declaration_physical_defect_present
                            }
                        </TableCell>
                    </TableRow> */}
                    <TableRow
                        key={Order?.customer_declaration_physical_defect_type}
                    >
                        <TableCell sx={{ pl: 2 }}>
                            {' '}
                            Customer Declaration Physical Defect Type
                        </TableCell>
                        <TableCell>
                            {Order?.customer_declaration_physical_defect_type == undefined ? "N/A" : Order?.customer_declaration_physical_defect_type}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Card>
    )
}

export default CustomerBillings
