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

const CustomerBillings = ({ Charging }) => {
    return (
        <Card elevation={3}>
            <H4 sx={{ p: 2 }}>Previous Charging User Report</H4>
            <Divider />
            <Table sx={{ mb: 2 }}>
                <TableBody>
                    <TableRow key={Charging?.report?.battery_status}>
                        <TableCell sx={{ pl: 2 }}>Battery Status :</TableCell>
                        <TableCell>{Charging?.report?.battery_status}</TableCell>
                    </TableRow>
                    <TableRow key={Charging?.report?.charge_percentage}>
                        <TableCell sx={{ pl: 2 }}>Charge Percentage :</TableCell>
                        <TableCell>{Charging?.report?.charge_percentage}</TableCell>
                    </TableRow>
                    <TableRow key={Charging?.report?.body_condition}>
                        <TableCell sx={{ pl: 2 }}>Body Condition :</TableCell>
                        <TableCell>{Charging?.body_condition}</TableCell>
                    </TableRow>
                    <TableRow key={Charging?.report?.display_condition}>
                        <TableCell sx={{ pl: 2 }}>Display Condition :</TableCell>
                        <TableCell>{Charging?.report?.display_condition}</TableCell>
                    </TableRow>
                    <TableRow key={Charging?.report?.lock_status}>
                        <TableCell sx={{ pl: 2 }}>Lock Status :</TableCell>
                        <TableCell>{Charging?.report?.lock_status}</TableCell>
                    </TableRow>
                    <TableRow key={Charging?.report?.charging_jack_type}>
                        <TableCell sx={{ pl: 2 }}>Charging Jack Type :</TableCell>
                        <TableCell>{Charging?.report?.charging_jack_type}</TableCell>
                    </TableRow>
                    <TableRow key={Charging?.report?.boady_part_missing}>
                        <TableCell sx={{ pl: 2 }}>
                            Any Body Part Missing :
                        </TableCell>
                        <TableCell>{Charging?.report?.boady_part_missing}</TableCell>
                    </TableRow>
                    <TableRow key={Charging?.report?.part_name}>
                        <TableCell sx={{ pl: 2 }}>
                            Missing Body Part Name :
                        </TableCell>
                        <TableCell>{Charging?.report?.part_name}</TableCell>
                    </TableRow>
                    <TableRow key={Charging?.created_at}>
                        <TableCell sx={{ pl: 2 }}>
                           Last Charge Done Date :
                        </TableCell>
                        <TableCell>{  new Date(Charging?.created_at).toLocaleString('en-GB', {
                        hour12: true,
                    })}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Card>
    )
}

export default CustomerBillings
