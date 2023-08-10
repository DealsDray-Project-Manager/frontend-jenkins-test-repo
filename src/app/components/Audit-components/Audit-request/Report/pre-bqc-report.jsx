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

const BqcUserReportPage = ({ BqcUserReport }) => {
    return (
        <Card elevation={3}>
            <H4 sx={{ p: 2 }}>Previous BQC User Report</H4>
            <Divider />
            <Table sx={{ mb: 2 }}>
                <TableBody>
                    <TableRow key={BqcUserReport?.report?.bqc_status}>
                        <TableCell sx={{ pl: 2 }}>Status :</TableCell>
                        <TableCell>
                            {BqcUserReport?.report?.bqc_status}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcUserReport?.report?.blancoo_qc_status}>
                        <TableCell sx={{ pl: 2 }}>
                            Blancco QC Status :
                        </TableCell>
                        <TableCell>
                            {BqcUserReport?.report?.blancoo_qc_status}
                        </TableCell>
                    </TableRow>
                    <TableRow
                        key={BqcUserReport?.report?.bqc_incomplete_reason}
                    >
                        <TableCell sx={{ pl: 2 }}>
                            BQC Incomplete Reason :
                        </TableCell>
                        <TableCell>
                            {BqcUserReport?.report?.bqc_incomplete_reason}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcUserReport?.report?.technical_issue}>
                        <TableCell sx={{ pl: 2 }}>Technical Issue :</TableCell>
                        <TableCell>
                            {BqcUserReport?.report?.technical_issue}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcUserReport?.report?.other}>
                        <TableCell sx={{ pl: 2 }}>BQC User Remark :</TableCell>
                        <TableCell>{BqcUserReport?.report?.other}</TableCell>
                    </TableRow>
                    <TableRow key={BqcUserReport?.report?.factory_reset_status}>
                        <TableCell sx={{ pl: 2 }}>
                            Factory reset status :
                        </TableCell>
                        <TableCell>
                            {BqcUserReport?.report?.factory_reset_status}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcUserReport?.user_name_of_action}>
                        <TableCell sx={{ pl: 2 }}>
                            BQC Operator Name :
                        </TableCell>
                        <TableCell>
                            {BqcUserReport?.user_name_of_action}
                        </TableCell>
                    </TableRow>
                    <TableRow key={BqcUserReport?.created_at}>
                        <TableCell sx={{ pl: 2 }}>BQC Done Date :</TableCell>
                        <TableCell>
                            {new Date(BqcUserReport?.created_at).toLocaleString(
                                'en-GB',
                                {
                                    hour12: true,
                                }
                            )}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Card>
    )
}

export default BqcUserReportPage
