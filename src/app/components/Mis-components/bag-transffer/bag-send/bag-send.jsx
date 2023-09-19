import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import AssignDialogBox from './pop-for-send'
import { styled } from '@mui/system'
import { Button, Typography, Checkbox, Table } from '@mui/material'
import jwt_decode from 'jwt-decode'
import '../../../../../app.css'
import { axiosMisUser } from '../../../../../axios'
import Swal from 'sweetalert2'

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

const SimpleMuiTable = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [bagList, setBotBag] = useState([])
    const [botUsers, setBotUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)
    const [bagId, setBagId] = useState('')
    const [isCheck, setIsCheck] = useState([])

    useEffect(() => {
        try {
            let user = localStorage.getItem('prexo-authentication')
            if (user) {
                setIsLoading(true)
                let { location } = jwt_decode(user)
                const fetchData = async () => {
                    let obj = {
                        status: 'Closed',
                        location: location,
                    }
                    let res = await axiosMisUser.post(
                        '/bagTransferAndReceive',
                        obj
                    )
                    if (res.status == 200) {
                        setIsLoading(false)
                        setBotBag(res.data.data)
                    }
                }
                fetchData()
            }
        } catch (error) {
            setIsLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
        return () => {
            setIsAlive(false)
            setIsLoading(false)
        }
    }, [isAlive])

    const handleClick = (e) => {
        const { id, checked } = e.target
        setIsCheck([...isCheck, id])
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id))
        }
    }

    const handleDialogClose = () => {
        setBagId('')
        setBotUsers([])
        setShouldOpenEditorDialog(false)
    }

    const handleDialogOpen = () => {
        setShouldOpenEditorDialog(true)
    }
    // BAG TRANSFER SELECT COURIER
    const handelBagTransfer = () => {
        handleDialogOpen()
    }

    const columns = [
        {
            name: 'code',
            label: (
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ marginLeft: '7px' }}
                >
                    <>Select</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, dataIndex) => {
                    return (
                        <Checkbox
                            onClick={(e) => {
                                handleClick(e)
                            }}
                            id={value}
                            key={value}
                            checked={isCheck.includes(value)}
                        />
                    )
                },
            },
        },
        {
            name: 'index',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Record No</>
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
            name: 'code',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Bag ID</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'sort_id',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Status</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },

        {
            name: 'limit',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Max</>
                </Typography>
            ),
            options: {
                // setCellProps: () => ({ align: 'center' }),
                filter: true,
            },
        },

        {
            name: 'items',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Total</>
                </Typography>
            ),
            options: {
                filter: true,

                customBodyRender: (value, dataIndex) => value.length,
            },
        },
        {
            name: 'status_change_time',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Date of Closure</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: 'Bag Transfer', path: '/' }]}
                />
            </div>
            <Button
                sx={{ mb: 2 }}
                variant="contained"
                color="primary"
                disabled={isCheck.length == 0}
                onClick={() => handelBagTransfer()}
            >
                Bag Transfer
            </Button>

            <Table className="custom-table">
                <MUIDataTable
                    title={'Bag Transfer'}
                    data={bagList}
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

            {shouldOpenEditorDialog && (
                <AssignDialogBox
                    handleClose={handleDialogClose}
                    open={handleDialogOpen}
                    setIsAlive={setIsAlive}
                    isCheck={isCheck}
                />
            )}
        </Container>
    )
}

export default SimpleMuiTable
