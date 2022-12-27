import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    Button,
    TextField,
} from '@mui/material'
import React from 'react'
import { Box, styled } from '@mui/system'
import { SimpleCard,Breadcrumb } from 'app/components'
import { useNavigate } from 'react-router-dom'

const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': {
            '& th': {
                paddingLeft: 0,
                paddingRight: 0,
            },
        },
    },
    '& tbody': {
        '& tr': {
            '& td': {
                paddingLeft: 0,
                textTransform: 'capitalize',
            },
        },
    },
}))
const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const subscribarList = [
    {
        name: 'john doe',
        date: '18 january, 2019',
        amount: 1000,
        status: 'close',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'kessy bryan',
        date: '10 january, 2019',
        amount: 9000,
        status: 'open',
        company: 'My Fintech LTD.',
    },
    {
        name: 'kessy bryan',
        date: '10 january, 2019',
        amount: 9000,
        status: 'open',
        company: 'My Fintech LTD.',
    },
    {
        name: 'james cassegne',
        date: '8 january, 2019',
        amount: 5000,
        status: 'close',
        company: 'Collboy Tech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
]
const PaginationTable = () => {
    const navigate = useNavigate()
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
        <Container>
             <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: 'Order', path: '/pages' },
                    { name: 'Bulk Order', path: '/pages' }
                ]}
                />
            </div>
            <SimpleCard title="Bulk Order">
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <h4>Upload file</h4>

                    <Box>
                        <Button
                            sx={{ mb: 2 }}
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/mis/orders')}
                        >
                            Back to list
                        </Button>
                        <Button
                            sx={{ mb: 2, ml: 2 }}
                            variant="contained"
                            color="primary"
                            // onClick={() => setShouldOpenEditorDialog(true)}
                        >
                            Download Sample Sheet
                        </Button>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        mb: 5,
                    }}
                >
                    <TextField size="small" variant="outlined" type="file" />
                    <Button
                        sx={{ mt: 2 }}
                        variant="contained"
                        color="primary"
                        // onClick={() => setShouldOpenEditorDialog(true)}
                    >
                        Submit
                    </Button>
                </Box>
                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {subscribarList
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((subscriber, index) => (
                                <TableRow key={index}>
                                    <TableCell align="left">
                                        {subscriber.name}
                                    </TableCell>
                                    <TableCell align="left">
                                        {subscriber.company}
                                    </TableCell>
                                    <TableCell align="left">
                                        {subscriber.date}
                                    </TableCell>
                                    <TableCell>{subscriber.status}</TableCell>
                                    <TableCell>${subscriber.amount}</TableCell>
                                    <TableCell>
                                        <IconButton>
                                            <Icon color="error">close</Icon>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </StyledTable>

                <TablePagination
                    sx={{ px: 2 }}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={subscribarList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </SimpleCard>
        </Container>
    )
}

export default PaginationTable
