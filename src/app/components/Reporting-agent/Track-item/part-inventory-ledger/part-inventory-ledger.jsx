import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import Swal from 'sweetalert2'
import moment from 'moment'
import useAuth from 'app/hooks/useAuth'
import '../../../../../app.css'
import {
    Button,
    IconButton,
    Icon,
    Typography,
    Table,
    TableContainer,
    TextField,
    Box,
    Divider,
    Stack,
    Card,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { axiosReportingAgent, axiosSuperAdminPrexo } from '../../../../../axios'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote'
import SaveIcon from '@mui/icons-material/Save'

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

const PartTable = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const [searchInput, setSearchInput] = useState('')
    const [details, setDetails] = useState([])
    const [result, setResult] = useState({})

    // HANDELSUBMIT
    const handelSubmit = async () => {
        try {
            const res = await axiosReportingAgent.post(
                `/get-partinventory-ledger/${searchInput}`
            )
            if (res.status === 200) {
                setDetails(res.data.data)
                setResult(res.data.partData)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.message,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload(true)
                    }
                })
            }
        } catch (error) {
            alert(error)
        }
    }

    const columns = [
        {
            name: 'index',
            label: (
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ marginLeft: '7px' }}
                >
                    <>Record No</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 2 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'description', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Description</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'department',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Department</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'createdAt',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Date/Time</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    }),
            },
        },

        {
            name: 'in_stock',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>In stock</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'out_stock',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Out Stock</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: true,
               
            },
        },
        {
            name: 'box_id',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Box Id</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: true,
            },
        },
        {
            name: 'action',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Action</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: true,
               
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Part Inventory Ledger', path: '/' },
                    ]}
                />
            </div>
            <h3>Part Details</h3>
            <Box>
                <TextField
                    type="search"
                    onChange={(e) => {
                        setSearchInput(e.target.value)
                    }}
                    label="Enter Part Id"
                />

                <Button
                    variant="contained"
                    color="primary"
                    disabled={searchInput == ''}
                    onClick={(e) => {
                        handelSubmit(e)
                    }}
                    sx={{ ml: 2, mt: 1 }}
                >
                    Submit
                </Button>
            </Box>
            <div>
                <Card
                    style={{ marginTop: '40px', border: '0.5px solid #78909c' }}
                >
                    <h3 style={{ marginLeft: '33px' }}>Part Information</h3>
                    <Divider />
                    <Stack
                        justifyContent="space-between"
                        sx={{ px: 2, py: 1, bgcolor: 'background.white' }}
                    >
                        <Box sx={{ p: 2, display: 'flex' }}>
                            <div style={{ fontSize: '16px' }}>
                                <p>
                                    Part No: <b>{result?.part_code}</b>{' '}
                                </p>
                                <p>
                                    Part Name: <b>{result?.name}</b>{' '}
                                </p>
                                <p>
                                    Color: <b>{result?.color}</b>{' '}
                                </p>
                                <p>
                                    Available Stock: <b>{result?.avl_stock}</b>
                                </p>
                                <p>
                                    Part Created Date:{' '}
                                    <b>
                                        {new Date(
                                            result?.created_at
                                        ).toLocaleString('en-GB', {
                                            hour12: true,
                                        })}
                                    </b>
                                </p>
                            </div>
                        </Box>
                    </Stack>
                </Card>
            </div>
            <Card
                sx={{
                    marginTop: '40px',
                    marginBottom: '40px',
                    border: '1px solid black',
                }}
            >
                <br />
                <Typography
                    sx={{
                        margin: '0px 0px 15px 33px',
                        fontSize: '20px',
                        fontWeight: 'bold',
                    }}
                >
                    Part Inventory Ledger
                </Typography>
                <Divider />
                <Stack
                    justifyContent="space-between"
                    sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
                >
                    <Table className="custom-table">
                        <MUIDataTable
                            data={details}
                            columns={columns}
                            options={{
                                filterType: 'textField',
                                responsive: 'simple',
                                download: false,
                                print: false,
                                textLabels: {
                                    body: {
                                        noMatch: isLoading
                                            ? 'Loading...'
                                            : 'Sorry, there is no matching data to display',
                                    },
                                },
                                selectableRows: 'none', // set checkbox for each row
                                // search: false, // set search option
                                // filter: false, // set data filter option
                                // download: false, // set download option
                                // print: false, // set print option
                                // pagination: true, //set pagination option
                                // viewColumns: false, // set column option
                                elevation: 0,
                                rowsPerPageOptions: [10, 20, 40, 80, 100],
                            }}
                        />
                    </Table>
                </Stack>
            </Card>
        </Container>
    )
}

export default PartTable
