import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { Button, Typography } from '@mui/material'
import Swal from 'sweetalert2'
import { axiosRdlTwoAgent } from '../../../../axios'
import { useNavigate } from 'react-router-dom'
import AssignDialogBox from './sp-receive'
import jwt_decode from 'jwt-decode'

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
    const [isLoading, setIsLoading] = useState(false)
    const [tray, setTray] = useState([])
    const [trayId, setTrayId] = useState('')
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchWht = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { user_name } = jwt_decode(admin)
                    setIsLoading(true)
                    const res = await axiosRdlTwoAgent.post(
                        '/assigned-tray/' + user_name
                    )
                    if (res.status === 200) {
                        setTray(res.data.data)
                        setIsLoading(false)
                    }
                }
            } catch (error) {
                setIsLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }
        }
        fetchWht()
        return () => setIsAlive(false)
    }, [isAlive])

    const handleviewrp = (code) => {
        navigate('/rdl-2/tray/rp-tray-receive/' + code)
    }

    const handleDialogClose = () => {
        setTrayId('')
        setShouldOpenEditorDialog(false)
    }

    const handleDialogOpen = (code) => {
        setTrayId(code)
        setShouldOpenEditorDialog(true)
    }

   

    const handelStart = (code) => {
        navigate('/rdl-2/tray/start/' + code)
    }

    const columns = [
        {
            name: 'index',
            label: (
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    marginLeft="7px"
                >
                    <>Record No</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 4 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },

        {
            name: 'assigned_date',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Issued Date</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },
        {
            name: 'code',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>RP Tray ID</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <>
                            <span style={{ marginLeft: '8px' }}>{value}</span>
                            <br />
                            <Button
                                sx={{
                                    m: 1,
                                }}
                                variant="contained"
                                disabled={
                                    tableMeta.rowData[7] !== 'Issued to RDL-2'
                                }
                                onClick={() => handleviewrp(value)}
                                style={{ backgroundColor: 'green' }}
                                component="span"
                            >
                                Recieve
                            </Button>
                        </>
                    )
                },
            },
        },
        {
            name: 'spTray',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>SP Tray ID</>
                </Typography>
            ),
            options: {
                filter: true, 
                sort: true,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <>
                            <span style={{ marginLeft: '8px' }}>
                                {value?.[0]?.code}
                            </span>
                            <br />
                            <Button
                                sx={{
                                    m: 1,
                                }}
                                variant="contained"
                                disabled={
                                    value?.[0]?.sort_id !== 'Issued to RDL-2'
                                }
                                onClick={() =>
                                    handleDialogOpen(value?.[0]?.code)
                                }
                                style={{ backgroundColor: 'green' }}
                                component="span"
                            >
                                Recieve
                            </Button>
                        </>
                    )
                },
            },
        },
        {
            name: 'brand',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Brand</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Model</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'items',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Quantity</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                    value.length + '/' + tableMeta.rowData[8],
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

            options: {
                filter: false,
                display: false,
            },
        },
        {
            name: 'code',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Action</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => {
                    
                    return (
                        <Button
                            sx={{
                                m: 1,
                            }}
                            variant="contained"
                            disabled={
                                tableMeta.rowData[7] !== 'Rdl-2 in-progress' ||
                                tableMeta.rowData[3]?.[0]?.sort_id !==
                                    'Rdl-2 in-progress'
                            }
                            onClick={(e) => {
                                handelStart(value)
                            }}
                            style={{ backgroundColor: 'green' }}
                            component="span"
                        >
                            Start
                        </Button>
                    )
                },
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Rdl-2 requests', path: '/' },
                        { name: 'Tray' },
                    ]}
                />
            </div>
            <>
                <>
                    <MUIDataTable
                        title={'Assign to RDL-2'}
                        data={tray}
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
                            customSort: (data, colIndex, order) => {
                                return data.sort((a, b) => {
                                    if (colIndex === 1) {
                                        return (
                                            (a.data[colIndex].price <
                                            b.data[colIndex].price
                                                ? -1
                                                : 1) *
                                            (order === 'desc' ? 1 : -1)
                                        )
                                    }
                                    return (
                                        (a.data[colIndex] < b.data[colIndex]
                                            ? -1
                                            : 1) * (order === 'desc' ? 1 : -1)
                                    )
                                })
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
                    {shouldOpenEditorDialog && (
                        <AssignDialogBox
                            handleClose={handleDialogClose}
                            open={handleDialogOpen}
                            setIsAlive={setIsAlive}
                            trayId={trayId}
                        />
                    )}
                </>
            </>
        </Container>
    )
}

export default SimpleMuiTable
