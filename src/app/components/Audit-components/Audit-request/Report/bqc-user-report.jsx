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

const BqcUserReportPage = ({ BqcUserReport, BqcAgentName, BqcDoneDate }) => {
    return (
        <Card elevation={3}>
            <H4 sx={{ p: 2 }}>Latest BQC User Report</H4>
            <Divider />
            <Table sx={{ mb: 2 }}>
                <TableBody>
                    <TableRow key={BqcUserReport?.bqc_status}>
                        <TableCell sx={{ pl: 2 }}>Status :</TableCell>
                        <TableCell>{BqcUserReport?.bqc_status}</TableCell>
                    </TableRow>
                    <TableRow key={BqcUserReport?.blancoo_qc_status}>
                        <TableCell sx={{ pl: 2 }}>
                            Blancco QC Status :
                        </TableCell>
                        <TableCell>
                            {BqcUserReport?.blancoo_qc_status}
                        </TableCell>
                    </TableRow>
                    {BqcUserReport?.bqc_incomplete_reason != undefined ? (
                        <TableRow key={BqcUserReport?.bqc_incomplete_reason}>
                            <TableCell sx={{ pl: 2 }}>
                                BQC Incomplete Reason :
                            </TableCell>
                            <TableCell>
                                {BqcUserReport?.bqc_incomplete_reason}
                            </TableCell>
                        </TableRow>
                    ) : null}
                    {BqcUserReport?.technical_issue != undefined ? (
                        <TableRow key={BqcUserReport?.technical_issue}>
                            <TableCell sx={{ pl: 2 }}>
                                Technical Issue :
                            </TableCell>
                            <TableCell>
                                {BqcUserReport?.technical_issue}
                            </TableCell>
                        </TableRow>
                    ) : null}
                    {BqcUserReport?.other != undefined ? (
                        <TableRow key={BqcUserReport?.other}>
                            <TableCell sx={{ pl: 2 }}>
                                BQC User Remark :
                            </TableCell>
                            <TableCell>{BqcUserReport?.other}</TableCell>
                        </TableRow>
                    ) : null}

                    <TableRow key={BqcAgentName}>
                        <TableCell sx={{ pl: 2 }}>BQC User Name :</TableCell>
                        <TableCell>{BqcAgentName}</TableCell>
                    </TableRow>
                    <TableRow key={BqcDoneDate}>
                        <TableCell sx={{ pl: 2 }}>BQC Done Date :</TableCell>
                        <TableCell>
                            {new Date(BqcDoneDate).toLocaleString('en-GB', {
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
