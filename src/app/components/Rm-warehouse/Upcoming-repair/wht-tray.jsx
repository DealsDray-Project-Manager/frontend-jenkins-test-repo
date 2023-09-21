import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { Button, Checkbox, Typography, TableContainer, Table } from '@mui/material'
import Swal from 'sweetalert2'
import { axiosMisUser } from '../../../../axios'
import { useNavigate } from 'react-router-dom'
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
    minWidth: 650,
    width: '168%',
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
        paddingLeft: '36px !important',
    },
}))

const ScrollableTableContainer = styled(TableContainer)`
overflow-x: scroll;

/* Hide the scrollbar in webkit-based browsers */
::-webkit-scrollbar {
  display: none;
}
`;

const SimpleMuiTable = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [isCheck, setIsCheck] = useState([])
    const [whtTrayList, setWhtTrayList] = useState([])
    const [RDLUsers, setRDLUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchWht = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    setIsLoading(true)
                    const res = await axiosMisUser.post(
                        '/RDLoneDoneTray/' + location
                    )
                    if (res.status === 200) {
                        setIsLoading(false)
                        setWhtTrayList(res.data.data)
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

    const handleClick = (e) => {
        const { id, checked } = e.target

        setIsCheck([...isCheck, id])
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id))
        }
    }

    const handelReadyForRdl = () => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let res = await axiosMisUser.post(
                        '/assignToAgent/rdl-1/users/' + 'RDL-2/' + location
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

    const handelViewItem = (trayId) => {
        navigate('/sp-user/upcoming-repair-tray/units/' + trayId)
    }

    const columns = [
       
        {
            name: 'index',
            label: <Typography fontSize='16px' fontWeight='bold'>Record No</Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) =>
                    dataIndex.rowIndex + 1,
            },
        },
        {
            name: 'code', // field name in the row object
            label: <Typography fontSize='16px' fontWeight='bold'>Tray ID</Typography>, // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'warehouse',
            label: <Typography fontSize='16px' fontWeight='bold' noWrap>Warehouse</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'type_taxanomy',
            label: <Typography fontSize='16px' fontWeight='bold' noWrap >Tray Category</Typography>,
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: 'brand',
            label: <Typography fontSize='16px' fontWeight='bold'>Brand</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: <Typography fontSize='16px' fontWeight='bold'>Model</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'name',
            label: <Typography fontSize='16px' fontWeight='bold' noWrap>Tray Name</Typography>,
            options: {
                filter: true,
            },
        },
        {
            label: <Typography fontSize='16px' fontWeight='bold'>Name</Typography>,
            hide: true,
            options: {
                filter: true,
            },
        },
        {
            name: 'items',
            label: <Typography fontSize='16px' fontWeight='bold' noWrap>Quantity</Typography>,
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) =>
                    value.length + '/' + tableMeta.rowData[7],
            },
        },
        {
            name: 'display',
            label: <Typography fontSize='16px' fontWeight='bold' noWrap>Tray Display</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'assigned_date',
            label: <Typography fontSize='16px' fontWeight='bold' noWrap sx={{width:'100%'}}>RDL-1 CLosed Date</Typography>,
            options: {
                filter: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },
        {
            name: 'sort_id',
            label: <Typography fontSize='16px' fontWeight='bold' >Status</Typography>,
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: 'code',
            label: <Typography fontSize='16px' fontWeight='bold'>Action</Typography>,
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
                            onClick={() => handelViewItem(value)}
                            style={{ backgroundColor: 'green' }}
                            component="span"
                        >
                            View
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
                    routeSegments={[{ name: 'Upcoming Repairs', path: '/' }]}
                />
            </div>
        <ScrollableTableContainer>
            <ProductTable>
            <MUIDataTable
                title={'WHT Tray'}
                data={whtTrayList}
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
            </ProductTable>
            </ScrollableTableContainer>
        </Container>
    )
}

export default SimpleMuiTable
