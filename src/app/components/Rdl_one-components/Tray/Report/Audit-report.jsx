import {
    Button,
    Card,
    Divider,
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

const AuditReport = ({ AuditData, otherAuditFeedBack }) => {
    return (
        <Card>
            <H4 sx={{ p: 2 }}>Audit Report</H4>
            <Divider />
            <Table sx={{ mb: 2 }}>
                <TableBody>
                    <TableRow key={AuditData?.stage}>
                        <TableCell sx={{ pl: 2 }}> Audit Status :</TableCell>
                        <TableCell>{AuditData?.stage}</TableCell>
                    </TableRow>
                    <TableRow key={AuditData?.orgGrade}>
                        <TableCell sx={{ pl: 2 }}> original Grade :</TableCell>
                        <TableCell>{AuditData?.orgGrade}</TableCell>
                    </TableRow>
                    <TableRow key={AuditData?.grade}>
                        <TableCell sx={{ pl: 2 }}>
                            {' '}
                            Audit Recommended Grade :
                        </TableCell>
                        <TableCell>{AuditData?.grade}</TableCell>
                    </TableRow>
                    <TableRow key={AuditData?.reason}>
                        <TableCell sx={{ pl: 2 }}> Reason :</TableCell>
                        <TableCell>{AuditData?.reason}</TableCell>
                    </TableRow>
                    <TableRow key={AuditData?.color}>
                        <TableCell sx={{ pl: 2 }}> Color :</TableCell>
                        <TableCell>{AuditData?.color}</TableCell>
                    </TableRow>
                    <TableRow key={AuditData?.storage_verification}>
                        <TableCell sx={{ pl: 2 }}> Storage :</TableCell>
                        <TableCell>{AuditData?.storage_verification}</TableCell>
                    </TableRow>
                    <TableRow key={AuditData?.ram_verification}>
                        <TableCell sx={{ pl: 2 }}> RAM :</TableCell>
                        <TableCell>{AuditData?.ram_verification}</TableCell>
                    </TableRow>
                    <TableRow key={AuditData?.description}>
                        <TableCell sx={{ pl: 2 }}>
                            Auditor Description :
                        </TableCell>
                        <TableCell>{AuditData?.description}</TableCell>
                    </TableRow>
                    {AuditData?.stage == undefined ||
                    AuditData?.stage == 'BQC Not Done / Unverified imei' ? (
                        <TableRow key={otherAuditFeedBack}>
                            <TableCell sx={{ pl: 2 }}>
                                {' '}
                                Other Auditor Feedback and Status :
                            </TableCell>
                            <TableCell>
                                {otherAuditFeedBack?.other_audtior_feedback}
                            </TableCell>
                        </TableRow>
                    ) : null}
                </TableBody>
            </Table>
        </Card>
    )
}

export default AuditReport
