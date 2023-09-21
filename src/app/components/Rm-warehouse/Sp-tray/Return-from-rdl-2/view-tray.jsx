import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate, useParams } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { axiosRmUserAgent } from '../../../../../axios'
import { Button, Box, Typography } from '@mui/material'
import Swal from 'sweetalert2'
import AddToBox from './dialogbox'

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
    const [tray, setTray] = useState({})
    const { trayId } = useParams()
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()
    const [partDetails, setPartDetails] = useState({})
    const [description, setDescription] = useState([])
    const [objId, setObjId] = useState('')
    const [uniqueid, setUniqueId] = useState('')
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { user_name } = jwt_decode(admin)
                    let obj = {
                        trayId: trayId,
                        username: user_name,
                        status: 'Received from RDL-2',
                    }
                    let res = await axiosRmUserAgent.post(
                        '/spTrayPartIssue',
                        obj
                    )
                    if (res.status == 200) {
                        setTray(res.data.data)
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            confirmButtonText: 'Ok',
                            text: res.data.message,
                        })
                        navigate(-1)
                    }
                } else {
                    navigate('/')
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
        fetchData()
    }, [refresh])

    const handleViewSpIssue = async (e, code) => {
        e.preventDefault()
        try {
            let obj = {
                spTrayId: trayId,
            }
            const res = await axiosRmUserAgent.post('/rdlTwoDoneCloseSP', obj)
            if (res.status == 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                navigate('/sp-user/return-from-rdl-2')
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.message,
                })
            }
        } catch (error) {
            alert(error)
        }
    }

    const handleDialogClose = () => {
        setPartDetails({})
        setShouldOpenEditorDialog(false)
        setObjId('')
        setUniqueId('')
    }

    const handleDialogOpen = (details, selObjId, uniId) => {
        setPartDetails(details)
        setObjId(selObjId)
        setUniqueId(uniId)
        setShouldOpenEditorDialog(true)
    }

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
            name: 'part_id',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Part Number</Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'limit',
            label: 'Tray',
            options: {
                filter: false,
                display: false,
            },
        },
        {
            name: 'unique_id_gen',
            label: 'Tray',
            options: {
                filter: false,
                display: false,
            },
        },
        {
            name: 'part_name',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Spare Part Name
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'rdl_two_description',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    RDL-2 Description
                </Typography>
            ),
            options: {
                filter: true,
            },
        },

        {
            name: 'rdl_two_status',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    RDL-2 Status
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'part_id',
            label: <Typography sx={{ fontWeight: 'bold' }}>Action</Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <Button
                            sx={{
                                m: 1,
                            }}
                            variant="contained"
                            style={{ backgroundColor: '#206CE2' }}
                            onClick={(e) => {
                                handleDialogOpen(
                                    value,
                                    tableMeta.rowData[6],
                                    tableMeta.rowData[3]
                                )
                            }}
                        >
                            Add to Box
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
                        { name: 'Return from RDL-2', path: '/' },
                        { name: 'View tray' },
                    ]}
                />
            </div>
            <MUIDataTable
                title={'Parts'}
                data={tray?.temp_array}
                columns={columns}
                options={{
                    filterType: 'textField',
                    responsive: 'simple',
                    download: false,
                    print: false,
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
                                (a.data[colIndex] < b.data[colIndex] ? -1 : 1) *
                                (order === 'desc' ? 1 : -1)
                            )
                        })
                    },
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            />
            <Box sx={{ float: 'right' }}>
                <textarea
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                    style={{
                        width: '300px',
                        height: '60px',
                        marginTop: '20px',
                    }}
                    placeholder="Remarks"
                ></textarea>
                <Button
                    sx={{
                        m: 1,
                        mr: 5,
                        mb: 5,
                    }}
                    variant="contained"
                    disabled={
                        tray?.temp_array?.length !== 0 || description == ''
                    }
                    style={{ backgroundColor: '#206CE2' }}
                    onClick={(e) => {
                        handleViewSpIssue(e)
                    }}
                >
                    Close
                </Button>
            </Box>
            {shouldOpenEditorDialog && (
                <AddToBox
                    handleClose={handleDialogClose}
                    open={handleDialogOpen}
                    setRefresh={setRefresh}
                    trayId={trayId}
                    partDetails={partDetails}
                    objId={objId}
                    uniqueid={uniqueid}
                />
            )}
        </Container>
    )
}

export default SimpleMuiTable
