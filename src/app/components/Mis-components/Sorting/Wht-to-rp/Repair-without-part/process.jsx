import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect, useMemo } from 'react'
import { styled } from '@mui/system'
import {
    Button,
    Box,
    Checkbox,
    Typography,
    Table,
    TableContainer,
    Card,
} from '@mui/material'
import '../../../../../../app.css'
import { axiosMisUser, axiosWarehouseIn } from '../../../../../../axios'
import jwt_decode from 'jwt-decode'
import useAuth from 'app/hooks/useAuth'
import { useNavigate, useParams } from 'react-router-dom'
import AssignDialogBox from './assign-to-agent'
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

const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
    },
}))

const ProductTable = styled(Table)(() => ({
    minWidth: 750,
    width: '100%',
    height: '100%',
    whiteSpace: 'nowrap',
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
const ProductTable1 = styled(Table)(() => ({
    minWidth: 750,
    width: '100%',
    height: '100%',
    whiteSpace: 'nowrap',
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

const ScrollableTableContainer = styled(TableContainer)`
    overflow-x: scroll;

    /* Hide the scrollbar in webkit-based browsers */
    ::-webkit-scrollbar {
        display: none;
    }
`

const SimpleMuiTable = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [isCheck, setIsCheck] = useState([])
    const navigate = useNavigate()
    const [selectedQtySp, setSelectedQtySp] = useState(0)
    const { brand, model } = useParams()
    const { logout, user } = useAuth()
    const [requrementList, setRequrementList] = useState({
        spTray: [],
        rpTray: [],
        spWUser: [],
        sortingAgent: [],
    })
    const [isLoading, setIsLoading] = useState(false)
    const [selectedUic, setSelectedUic] = useState([])
    const [unitsData, setUnitsData] = useState([])
    const [checkBoxDis, setCheckBoxDis] = useState(false)
    const [location, setLoaction] = useState('')
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)
    const [units, setUnits] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    const { location } = jwt_decode(admin)
                    setLoaction(location)
                    setIsLoading(true)
                    let obj = {
                        brand: brand,
                        model: model,
                        location: location,
                    }
                    const res = await axiosMisUser.post(
                        '/whToRpAssignForRepairWithoutSp',
                        obj
                    )
                    if (res.status == 200) {
                        setIsLoading(false)
                        setUnits(res.data.data)
                    }
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [isAlive])

    const handleClick = (e, id) => {
        const { checked } = e.target

        setIsCheck([...isCheck, id])
        setSelectedUic([...selectedUic, id])
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id))
            setSelectedUic(selectedUic.filter((item) => item !== id))
        }
    }

    const handleDialogClose = () => {
        setIsCheck([])
        setRequrementList({
            spTray: [],
            rpTray: [],
            spWUser: [],
            sortingAgent: [],
        })
        setSelectedUic([])
        setSelectedQtySp(0)
        setShouldOpenEditorDialog(false)
    }

    const handleDialogOpen = async () => {
        try {
            let obj = {
                location: location,
                brand: brand,
                model: model,
                uicLength: selectedUic.length,
                isCheck: isCheck.length,
                selectedQtySp: selectedQtySp,
            }
            const res = await axiosMisUser.post(
                '/assignForRepiar/getTheRequrements',
                obj
            )
            if (res.status == 200) {
                setRequrementList({
                    spTray: res.data.getSpTray,
                    rpTray: res.data.getRpTray,
                    spWUser: res.data.spWhUser,
                    sortingAgent: res.data.getSortingAgent,
                })
                setShouldOpenEditorDialog(true)
            }
        } catch (error) {
            alert('Server not responding please wait...')
        }
    }

    const columns = [
        {
            name: 'items',
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
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <Checkbox
                            onClick={(e) => {
                                handleClick(e, value?.uic)
                            }}
                            id={value?.uic}
                            key={value?.uic}
                            checked={isCheck.includes(value?.uic)}
                        />
                    )
                },
            },
        },
        {
            name: 'index',
            label: (
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    noWrap
                    sx={{ mr: 8 }}
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
            name: 'items',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>UIC</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.uic || '',
            },
        },
        {
            name: 'code',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Tray ID</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'closed_date_agent',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>RDL 1 Done Date</>
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
        {
            name: 'items',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>RDL 1 Username</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.rdl_fls_report?.username || '',
            },
        },
        {
            name: 'items',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>RDL 1 User Selected Status</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.rdl_fls_report?.selected_status || '',
            },
        },
        {
            name: 'items',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>RDL 1 User Remarks</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.rdl_fls_report?.description || '',
            },
        },
    ]

    // TOP TABLE
    const UicListTable = useMemo(() => {
        return (
            <StyledTable
                sx={{
                    borderRadius: '20px',
                    margin: 'auto',
                }}
            >
                <Table className="custom-table">
                    <MUIDataTable
                        // title={'Assign for Repairs'}
                        sx={{ borderTop: '0px' }}
                        data={units}
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
                            //  pagination: false, //set pagination option
                            // viewColumns: false, // set column option
                            customSort: (data, colIndex, order) => {
                                const columnProperties = {
                                    2: 'uic',
                                    5: 'rdl_fls_report.username',
                                    6: 'rdl_fls_report.selected_status',
                                    7: 'rdl_fls_report.description',
                                }

                                const property = columnProperties[colIndex]

                                if (property) {
                                    return data.sort((a, b) => {
                                        const aPropertyValue =
                                            getValueByProperty(
                                                a.data[colIndex],
                                                property
                                            )
                                        const bPropertyValue =
                                            getValueByProperty(
                                                b.data[colIndex],
                                                property
                                            )

                                        if (
                                            typeof aPropertyValue ===
                                                'string' &&
                                            typeof bPropertyValue === 'string'
                                        ) {
                                            return (
                                                (order === 'asc' ? 1 : -1) *
                                                aPropertyValue.localeCompare(
                                                    bPropertyValue
                                                )
                                            )
                                        }

                                        return (
                                            (parseFloat(aPropertyValue) -
                                                parseFloat(bPropertyValue)) *
                                            (order === 'desc' ? -1 : 1)
                                        )
                                    })
                                }

                                return data.sort((a, b) => {
                                    const aValue = a.data[colIndex]
                                    const bValue = b.data[colIndex]

                                    if (aValue === bValue) {
                                        return 0
                                    }

                                    if (
                                        aValue === null ||
                                        aValue === undefined
                                    ) {
                                        return 1
                                    }

                                    if (
                                        bValue === null ||
                                        bValue === undefined
                                    ) {
                                        return -1
                                    }

                                    if (
                                        typeof aValue === 'string' &&
                                        typeof bValue === 'string'
                                    ) {
                                        return (
                                            (order === 'asc' ? 1 : -1) *
                                            aValue.localeCompare(bValue)
                                        )
                                    }

                                    return (
                                        (parseFloat(aValue) -
                                            parseFloat(bValue)) *
                                        (order === 'desc' ? -1 : 1)
                                    )
                                })

                                function getValueByProperty(data, property) {
                                    const properties = property.split('.')
                                    let value = properties.reduce(
                                        (obj, key) => obj?.[key],
                                        data
                                    )

                                    return value !== undefined ? value : ''
                                }
                            },
                            // elevation: 0,
                            // rowsPerPageOptions: [10, 20, 40, 80, 100],
                        }}
                    />
                </Table>
            </StyledTable>
        )
    }, [units, columns])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Sorting', path: '/' },
                        { name: 'Wht to rp' },
                    ]}
                />
            </div>

            <Card>
                <Box>
                    <Box sx={{ pt: 2, pl: 2 }}>
                        <Typography
                            sx={{ fontSize: 'large', fontWeight: 'bold' }}
                        >
                            Units
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box>
                            <Typography sx={{ mt: 2, ml: 2 }}>
                                Brand : {brand}
                            </Typography>
                            <Typography sx={{ ml: 2 }}>
                                Model : {model}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography sx={{ mr: 4 }}>
                                Selected UIC's : {selectedUic?.length}
                            </Typography>
                            <Typography sx={{ mr: 4 }}>
                                Total : {units?.length}
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            border: '',
                            width: '100%',
                            marginLeft: '',
                            marginRight: '',
                            borderRadius: '8px',
                            background: 'white',
                        }}
                        overflow="auto"
                    >
                        {UicListTable}
                    </Box>
                </Box>
            </Card>
            <Box sx={{ textAlign: 'right' }}>
                <Button
                    sx={{
                        mt: 1,
                    }}
                    variant="contained"
                    disabled={isCheck?.length == 0}
                    onClick={() => handleDialogOpen()}
                    style={{ backgroundColor: 'green' }}
                    component="span"
                >
                    Send to Repair
                </Button>
            </Box>
            <br />
            <br />

            {shouldOpenEditorDialog && (
                <AssignDialogBox
                    handleClose={handleDialogClose}
                    open={handleDialogOpen}
                    setIsAlive={setIsAlive}
                    requrementList={requrementList}
                    selectedUic={selectedUic}
                    isCheck={isCheck}
                />
            )}
        </Container>
    )
}

export default SimpleMuiTable
