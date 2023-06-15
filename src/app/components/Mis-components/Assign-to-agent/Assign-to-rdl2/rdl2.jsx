import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { Button, Checkbox , Typography, Table, Box, TableContainer} from '@mui/material'
import Swal from 'sweetalert2'
import { axiosMisUser } from '../../../../../axios'
import { useNavigate } from 'react-router-dom'
import AssignDialogBox from './assignrdldialog'
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

const ProductTable = styled(Table)(() => ({
    minWidth: 750,
    width: '130%',
    height:'100%',
    whiteSpace: 'pre',
    '& thead': {
        '& th:first-of-type': {
            paddingLeft: 16,
        },
    },
    '& td': {
        borderBottom: '1px solid #ddd',
    },
    '& td:first-of-type': {
        paddingLeft: '16px !important',
    },
}))

const ScrollableTableContainer = styled(TableContainer)
`overflow-x: auto`;

const SimpleMuiTable = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [isCheck, setIsCheck] = useState([])
    const [whtTrayList, setWhtTrayList] = useState([])
    const [chargingUsers, setChargingUsers] = useState([])
    const [RDLUsers, setRDLUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchWht = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if(admin){
                    let { location } = jwt_decode(admin)
                    setIsLoading(true)
                    const res = await axiosMisUser.post('/RDLoneDoneTray/' + location)
                    if (res.status === 200) {
                        setWhtTrayList(res.data.data)
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

    const handleassign = () => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let res = await axiosMisUser.post(
                        '/get-charging-users/' + 'BQC/' + location
                    )
                    if (res.status == 200) {
                        setChargingUsers(res.data.data)
                        handleDialogOpen()
                    }
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text:error,
                })
            }
        }
        fetchData()
    }

    const handleClick = (e) => {
        const { id, checked } = e.target

        setIsCheck([...isCheck, id])
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id))
        }
    }

    const handleviewrp = () => {
        navigate('/mis/assign-to-agent/viewrp')
    }

    const handleviewsp = () => {
        navigate('/mis/assign-to-agent/viewsp')
    }

    const handelReadyForRdl = () => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let res = await axiosMisUser.post(
                        '/assignToAgent/rdl-fls/users/' + 'RDL-2/' + location
                    )
                    if (res.status == 200) {
                        setRDLUsers(res.data.data)
                        handleDialogOpen()
                    }
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }
        }
        fetchData()
    }

    const handleDialogClose = () => {
        setIsCheck([])
        setRDLUsers([])
        setShouldOpenEditorDialog(false)
    }

    const handleDialogOpen = () => {
        setShouldOpenEditorDialog(true)
    }

    // const handelViewItem = (trayId) => {
    //     navigate('/mis/assign-to-agent/Rdl-repair/view-item/' + trayId)
    // }

    const columns = [
        {
            name: 'code',
            label: <Typography variant="subtitle1" fontWeight='bold' sx={{marginLeft:'7px'}}><>Select</></Typography>,
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
            label: <Typography variant="subtitle1" fontWeight='bold'><>Record No</></Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) =>
                <Typography sx={{pl:4}}>{dataIndex.rowIndex + 1}</Typography>
            },
        },
        {
            name: 'brand',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Brand</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Model</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'items',
            label: <Typography variant="subtitle1" fontWeight='bold'><>SP Quantity</></Typography>,
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: 'items1',
            label: <Typography variant="subtitle1" fontWeight='bold'><>RP Quantity</></Typography>,
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: 'sptray', // field name in the row object
            label: <Typography variant="subtitle1" fontWeight='bold'><>SP Tray ID</></Typography>, // column title that will be shown in table
            options: {
                filter: true,
                sort:true,
                customBodyRender: (value, tableMeta) => {
                    return (
                       <>
                       <span>SP18001</span>,<br />
                        <span>Pending</span>,<br />
                        <span>Ready for RDL 2</span>,
                        <Button
                            sx={{
                                m: 1,
                            }}
                            variant="contained"
                            onClick={() => handleviewsp()}
                            style={{ backgroundColor: 'green' }}
                            component="span"
                        >
                            View SP
                        </Button>
                        </>
                    )
                },
            },
        },
        {
            name: 'rptray', // field name in the row object
            label: <Typography variant="subtitle1" fontWeight='bold'><>RP Tray ID</></Typography>, // column title that will be shown in table
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <>
                        <span>RP18098</span>,<br />
                        <span>Pending</span>,<br />
                        <span>Ready for RDL 2</span>,
                        <Button
                            sx={{
                                m: 1,
                            }}
                            variant="contained"
                            onClick={() => handleviewrp()}
                            style={{ backgroundColor: 'green' }}
                            component="span"
                        >
                            View RP
                        </Button>
                        </>
                    )
                },
            },
        },
        {
            name: 'sort_id',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Status</></Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <>
                        <span>Pending</span>,<br />
                        <span>Ready for RDL 2</span>,<br />
                        </>
                    )
                },
            },
        }
    ]

    const columns1 = [
        {
            index:1,
            brand:'Xiomi',
            model:'S5',
            items:3,
            items1:2
        }
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Assign to RDL Two', path: '/' },
                        { name: 'RDL Two' },
                    ]}
                />
            </div>
            <>
                <>
                <MUIDataTable
                title={'Assign to RDL 2'}
                data={columns1}
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
                                        : 1) * (order === 'desc' ? 1 : -1)
                                )
                            }
                            return (
                                (a.data[colIndex] < b.data[colIndex] ? -1 : 1) *
                                (order === 'desc' ? 1 : -1)
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
            <Box sx={{textAlign:'right'}}>
            <Button
                            sx={{
                                m: 1,
                            }}
                            variant="contained"
                            onClick={() => handleassign()}
                            style={{ backgroundColor: 'primary' }}
                            component="span"
                        >
                            Assign for RDL 2
                        </Button>
            </Box>
              {shouldOpenEditorDialog && (
                <AssignDialogBox
                    handleClose={handleDialogClose}
                    open={handleDialogOpen}
                    setIsAlive={setIsAlive}
                    RDLUsers={RDLUsers}
                    isCheckk={isCheck}
                />
            )}
            
                </>
            </>
        </Container>
    )
}

export default SimpleMuiTable
