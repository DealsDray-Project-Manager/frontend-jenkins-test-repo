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

const CustomerBillings = ({ Charging, ChargeDoneDate }) => {
    return (
        <Card elevation={3}>
            <H4 sx={{ p: 2 }}>Latest Charging User Report</H4>
            <Divider />
            <Table sx={{ mb: 2 }}>
                <TableBody>
                    <TableRow key={Charging?.battery_status}>
                        <TableCell sx={{ pl: 2 }}>Battery Status :</TableCell>
                        <TableCell>{Charging?.battery_status}</TableCell>
                    </TableRow>
                    <TableRow key={Charging?.charge_percentage}>
                        <TableCell sx={{ pl: 2 }}>
                            Charge Percentage :
                        </TableCell>
                        <TableCell>{Charging?.charge_percentage}</TableCell>
                    </TableRow>
                    <TableRow key={Charging?.body_condition}>
                        <TableCell sx={{ pl: 2 }}>Body Condition :</TableCell>
                        <TableCell>{Charging?.body_condition}</TableCell>
                    </TableRow>
                    <TableRow key={Charging?.display_condition}>
                        <TableCell sx={{ pl: 2 }}>
                            Display Condition :
                        </TableCell>
                        <TableCell>{Charging?.display_condition}</TableCell>
                    </TableRow>
                    <TableRow key={Charging?.lock_status}>
                        <TableCell sx={{ pl: 2 }}>Lock Status :</TableCell>
                        <TableCell>{Charging?.lock_status}</TableCell>
                    </TableRow>
                    <TableRow key={Charging?.charging_jack_type}>
                        <TableCell sx={{ pl: 2 }}>
                            Charging Jack Type :
                        </TableCell>
                        <TableCell>{Charging?.charging_jack_type}</TableCell>
                    </TableRow>
                    <TableRow key={Charging?.boady_part_missing}>
                        <TableCell sx={{ pl: 2 }}>
                            Any Body Part Missing :
                        </TableCell>
                        <TableCell>{Charging?.boady_part_missing}</TableCell>
                    </TableRow>
                    <TableRow key={Charging?.part_name}>
                        <TableCell sx={{ pl: 2 }}>
                            Missing Body Part Name :
                        </TableCell>
                        <TableCell>{Charging?.part_name}</TableCell>
                    </TableRow>
                    {ChargeDoneDate !== undefined ? (
                        <TableRow key={ChargeDoneDate}>
                            <TableCell sx={{ pl: 2 }}>
                                Last Charge Done Date :
                            </TableCell>
                            <TableCell>
                                {new Date(ChargeDoneDate).toLocaleString(
                                    'en-GB',
                                    {
                                        hour12: true,
                                    }
                                )}
                            </TableCell>
                        </TableRow>
                    ) : null}
                </TableBody>
            </Table>
        </Card>
    )
}

export default CustomerBillings
