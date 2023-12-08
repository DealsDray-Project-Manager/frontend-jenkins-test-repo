import { axiosRmUserAgent } from '../../../../axios'
import React, { useEffect, useState } from 'react'
import { Typography, Table, Box, Button } from '@mui/material'
import { styled } from '@mui/system'
import { Breadcrumb } from 'app/components'
import MUIDataTable from 'mui-datatables'
import { useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import useAuth from 'app/hooks/useAuth'

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

const RequestApprove = () => {
    const { requestId } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [toolsAndConsumables, setToolsAndConsumables] = useState({})
    const { user } = useAuth()
    const [description, setDescription] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const res = await axiosRmUserAgent.post(
                `/getOneRequestOfToolsAndConsumables/${requestId}/${'Assigned'}`
            )
            if (res.status === 200) {
                setToolsAndConsumables(res.data.data)
                setIsLoading(false)
            } else {
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                navigate(-1)
            }
        }
        fetchData()
    }, [])

    // HANDEL ISSUE
    const handelIssue = async () => {
        try {
            setLoading(true)
            let obj = {
                requestId: toolsAndConsumables?.request_id,
                actionUser: user.username,
                description: description,
            }
            const res = await axiosRmUserAgent.post(
                '/requestApproveForToolsAndConsumables',
                obj
            )
            if (res.status === 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res.data.message,
                })
                navigate('/sp-user/requests-for-tools-and-consumables')
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonText: 'Ok',
                    text: res.data.message,
                })
                navigate('/sp-user/requests-for-tools-and-consumables')
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Ok',
                text: error,
            })
        }
    }

    // COLUMNS
    const columns = [
        {
            name: 'index',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 2 }}>
                    Record No
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 4 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'part_code',
            label: <Typography sx={{ fontWeight: 'bold' }}>SPN Id</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'name',
            label: <Typography sx={{ fontWeight: 'bold' }}>Name</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'selected_quantity',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Quantity</Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'sp_category',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Category</Typography>
            ),
            options: {
                filter: true,
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Approve Page' }]} />
            </div>
            <div className="header-section">
                <Typography variant="h6">
                    Request ID: {toolsAndConsumables?.request_id}
                </Typography>
                <Typography variant="subtitle1">
                    Assigned Date:{' '}
                    {new Date(
                        toolsAndConsumables?.assigned_date
                    ).toLocaleString('en-GB', {
                        hour12: true,
                    })}
                </Typography>
                <Typography variant="subtitle1">
                    Agent Name: {toolsAndConsumables?.issued_user_name}
                </Typography>
            </div>
            <Table className="custom-table">
                <MUIDataTable
                    title={'Tools And Consumables'}
                    data={toolsAndConsumables?.tools_and_consumables_list}
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
                        customSort: (data, colIndex, order) => {
                            return data.sort((a, b) => {
                                if (colIndex === 1) {
                                    return (
                                        (a.data[colIndex].price <
                                        b.data[colIndex].price
                                            ? -1
                                            : 1) * (order === 'desc' ? 1 : -1)
                                    )
                                }
                                return (
                                    (a.data[colIndex] < b.data[colIndex]
                                        ? -1
                                        : 1) * (order === 'desc' ? 1 : -1)
                                )
                            })
                        },
                        elevation: 0,
                        rowsPerPageOptions: [10, 20, 40, 80, 100],
                    }}
                />
            </Table>
            <Box
                sx={{
                    float: 'right',
                    mt: 1,
                }}
            >
                <textarea
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                    style={{ width: '300px', height: '60px' }}
                    placeholder="Description"
                ></textarea>
                <Button
                    sx={{
                        ml: 1,
                        mb: 4,
                    }}
                    variant="contained"
                    onClick={(e) => {
                        if (window.confirm('You want to Issue?')) {
                            handelIssue(e)
                        }
                    }}
                    disabled={
                        loading == true || description == '' ? true : false
                    }
                    style={{ backgroundColor: 'green' }}
                >
                    Issue To Agent
                </Button>
            </Box>
        </Container>
    )
}

export default RequestApprove
