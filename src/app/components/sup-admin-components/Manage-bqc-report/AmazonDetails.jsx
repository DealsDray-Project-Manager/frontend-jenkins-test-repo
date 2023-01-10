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
            <H4 sx={{ p: 2 }}>Amazon Data</H4>
            <Divider />
            <Table sx={{ mb: 2 }}>
                <TableBody>
                    <TableRow key={Order?.order_id}>
                        <TableCell sx={{ pl: 2 }}>Order ID</TableCell>
                        <TableCell>{Order?.order_id}</TableCell>
                    </TableRow>
                    <TableRow key={Order?.order_status}>
                        <TableCell sx={{ pl: 2 }}>Order Status</TableCell>
                        <TableCell>{Order?.order_status}</TableCell>
                    </TableRow>
                    <TableRow key={Order?.item_id}>
                        <TableCell sx={{ pl: 2 }}>Item ID</TableCell>
                        <TableCell>{Order?.item_id}</TableCell>
                    </TableRow>

                    {/* <TableRow key={Order?.imei}>
                        <TableCell sx={{ pl: 2 }}>IMEI</TableCell>
                        <TableCell>{Order?.imei}</TableCell>
                    </TableRow> */}
                    <TableRow key={Order?.base_discount}>
                        <TableCell sx={{ pl: 2 }}>Base Disscount</TableCell>
                        <TableCell>{Order?.base_discount}</TableCell>
                    </TableRow>

                    <TableRow key={Order?.partner_purchase_price}>
                        <TableCell sx={{ pl: 2 }}>
                            Partner Purchase Price
                        </TableCell>
                        <TableCell>{Order?.partner_purchase_price}</TableCell>
                    </TableRow>
                    <TableRow key={Order?.diagnstic_status}>
                        <TableCell sx={{ pl: 2 }}>Diagonstic Status</TableCell>
                        <TableCell>{Order?.diagnstic_status}</TableCell>
                    </TableRow>
                    <TableRow key={Order?.vc_eligible}>
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
                    </TableRow>
                    <TableRow
                        key={Order?.customer_declaration_physical_defect_type}
                    >
                        <TableCell sx={{ pl: 2 }}>
                            {' '}
                            Customer Declaration Physical Defect Type
                        </TableCell>
                        <TableCell>
                            {Order?.customer_declaration_physical_defect_type}
                        </TableCell>
                    </TableRow>
                    <TableRow key={Order?.partner_price_no_defect}>
                        <TableCell sx={{ pl: 2 }}>
                            Partner Price No Defect
                        </TableCell>
                        <TableCell>{Order?.partner_price_no_defect}</TableCell>
                    </TableRow>
                    <TableRow key={Order?.revised_partner_price}>
                        <TableCell sx={{ pl: 2 }}>
                            Revised Partner Price
                        </TableCell>
                        <TableCell>{Order?.revised_partner_price}</TableCell>
                    </TableRow>
                    <TableRow key={Order?.delivery_fee}>
                        <TableCell sx={{ pl: 2 }}>Delivery Fee</TableCell>
                        <TableCell>{Order?.delivery_fee}</TableCell>
                    </TableRow>
                    <TableRow key={Order?.exchange_facilitation_fee}>
                        <TableCell sx={{ pl: 2 }}>
                            Exchange Facilitation Fee
                        </TableCell>
                        <TableCell>
                            {Order?.exchange_facilitation_fee}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Card>
    )
}

export default CustomerBillings
