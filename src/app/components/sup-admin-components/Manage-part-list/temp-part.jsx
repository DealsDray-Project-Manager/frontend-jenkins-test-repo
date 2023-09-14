import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import MemberEditorDialog from './temp-add'
import Swal from 'sweetalert2'
import {
    Button,
    IconButton,
    Icon,
    Box,
    Radio,
    Typography,
    Table,
} from '@mui/material'
import '../../../../app.css'
import { axiosSuperAdminPrexo } from '../../../../axios'
import { useNavigate } from 'react-router-dom'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

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
    const [isAlive, setIsAlive] = useState(true)
    const [editFetchData, setEditFetchData] = useState({})
    const [partList, setPartList] = useState([])
    const [muicData, setMuicData] = useState([])
    const navigate = useNavigate()
    const [partId, setPartId] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                setIsLoading(true)
                const res = await axiosSuperAdminPrexo.post(
                    '/partAndColor/view/' + 'part-list'
                )
                if (res.status === 200) {
                    setPartList(res.data.data)
                    setIsLoading(false)
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
        fetchBrand()
        return () => {
            setIsAlive(false)
            setIsLoading(false)
        }
    }, [isAlive])

    const handleDialogClose = () => {
        setEditFetchData({})
        setShouldOpenEditorDialog(false)
    }

    const handleDialogOpen = async (state) => {
        try {
            if (state == 'ADD') {
                const trayId = await axiosSuperAdminPrexo.post(
                    '/partList/idGen'
                )
                if (trayId.status == 200) {
                    setPartId(trayId.data.data)
                }
            }
        } catch (error) {
            console.log(error)
        }
        setShouldOpenEditorDialog(true)
    }

    const editMaster = async (id) => {
        try {
            let response = await axiosSuperAdminPrexo.post(
                '/partAndColor/oneData/' + id + '/part-list'
            )
            if (response.status == 200) {
                setEditFetchData(response.data.data)
                handleDialogOpen()
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.data.message,
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    }

    const handelActive = (id, type) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You Want to ${type}!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, ${type} it!`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    let res = await axiosSuperAdminPrexo.post(
                        '/partAndColor/oneData/' + id + '/part-list'
                    )
                    if (res.status == 200) {
                    }
                    let obj = {
                        id: id,
                        type: type,
                        page: 'part-list',
                    }
                    let response = await axiosSuperAdminPrexo.post(
                        '/partAndColor/delete',
                        obj
                    )
                    if (response.status == 200) {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: `Your Part has been ${type}.`,
                            confirmButtonText: 'Ok',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                setIsAlive((isAlive) => !isAlive)
                            }
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: "This Part You Can't Delete",
                        })
                    }
                    //  else {
                    //     Swal.fire({
                    //         icon: 'error',
                    //         title: 'Oops...',
                    //         text: "This Part You Can't Delete",
                    //     })
                    // }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error,
                    })
                }
            }
        })
    }

    // DOWNLOAD PART LIST
    const download = (e) => {
        let arr = []
        for (let x of partList) {
            let obj = {
                part_code: x.part_code,
                name: x.name,
                color: x.color,
                technical_qc: x.technical_qc,
                description: x.description,
                sp_category: x.sp_category,
                box_id: x.box_id,
                available_stock: x.avl_stock,
                add_stock: '0',
            }
            arr.push(obj)
        }
        const fileExtension = '.xlsx'
        const fileType =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        const ws = XLSX.utils.json_to_sheet(arr)

        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(data, 'manage-sotck' + fileExtension)
    }

    const handledetails = async (id) => {
        navigate('/sup-admin/view-part-list/muic-association/' + id)
    }

    const columns = [
        {
            name: 'index',
            label: (
                <Typography
                    variant="subtitle1"
                    marginBottom="15px"
                    fontWeight="bold"
                >
                    <> Record No</>{' '}
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
            name: 'part_code', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Part No</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'color', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Color</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'name', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Part Name</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'sp_category',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Category</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'box_id',
            label: (
                <Typography variant="subtitle1" fontWeight="bold" noWrap>
                    <>Box Id</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'technical_qc', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Technical QC</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'description',
            label: (
                <Typography
                    variant="subtitle1"
                    marginBottom="15px"
                    fontWeight="bold"
                >
                    <>Description</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'avl_stock', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Available Stock</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'created_at',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Creation Date</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: true,

                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },

        {
            name: 'status',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Status</>
                </Typography>
            ),
            options: {
                filter: true,
                // customHeadRender: (columnMeta) => (
                //     <th style={{ borderBottom: '1px solid #ddd', width: '17%' }}>{columnMeta.label}</th>
                //   ),
                customBodyRender: (value) => {
                    if (value == 'Active') {
                        return (
                            <div
                                style={{
                                    color: 'green',
                                    fontWeight: 'bold',
                                    marginLeft: '15px',
                                }}
                            >
                                {value}
                            </div>
                        )
                    } else {
                        return (
                            <div
                                style={{
                                    color: 'red',
                                    fontWeight: 'bold',
                                    marginLeft: '15px',
                                }}
                            >
                                {value}
                            </div>
                        )
                    }
                },
            },
        },
        {
            name: '_id',
            label: (
                <Typography
                    variant="subtitle1"
                    marginBottom="15px"
                    fontWeight="bold"
                >
                    <>Actions</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                // customHeadRender: (columnMeta) => (
                //     <th style={{ borderBottom: '1px solid #ddd', width: '26%' }}>{columnMeta.label}</th>
                //   ),
                customBodyRender: (value, tableMeta) => {
                    return (
                        <Box
                            sx={{
                                // display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            {tableMeta.rowData[10] == 'Active' ? (
                                <Radio
                                    onClick={(e) => {
                                        handelActive(value, 'Deactive')
                                    }}
                                    checked
                                    style={{ color: 'red' }}
                                />
                            ) : (
                                <Radio
                                    onClick={(e) => {
                                        handelActive(value, 'Active')
                                    }}
                                    checked
                                    style={{ color: 'green' }}
                                />
                            )}
                            <IconButton>
                                <Icon
                                    onClick={(e) => {
                                        editMaster(value)
                                    }}
                                    color="primary"
                                >
                                    edit
                                </Icon>
                            </IconButton>

                            <IconButton>
                                <Icon
                                    onClick={(e) => {
                                        handledetails(tableMeta.rowData[1])
                                    }}
                                    color="default"
                                >
                                    details
                                </Icon>
                            </IconButton>
                        </Box>
                    )
                },
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: 'Part-list', path: '/' }]}
                />
            </div>
            <Button
                sx={{ mb: 2 }}
                variant="contained"
                color="primary"
                onClick={() => handleDialogOpen('ADD')}
            >
                Add New Part
            </Button>
            <Button
                sx={{ mb: 2, ml: 2 }}
                variant="contained"
                color="secondary"
                onClick={() => navigate('/sup-admin/view-list/bulk-add')}
            >
                Add Bulk
            </Button>
            <Button
                sx={{ mb: 2, ml: 2 }}
                variant="contained"
                color="success"
                onClick={(e) => download(e)}
            >
                Download available stock
            </Button>

            <Button
                sx={{ mb: 2, ml: 2 }}
                variant="contained"
                color="warning"
                onClick={() =>
                    navigate('/sup-admin/view-list/managestock', {
                        state: {
                            partList: partList,
                        },
                    })
                }
            >
                Manage Stock
            </Button>

            <Table className="custom-table">
                <MUIDataTable
                    title={'Spare Part List'}
                    data={partList}
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

            {shouldOpenEditorDialog && (
                <MemberEditorDialog
                    handleClose={handleDialogClose}
                    open={handleDialogOpen}
                    setIsAlive={setIsAlive}
                    partId={partId}
                    setPartId={setPartId}
                    muicData={muicData}
                    editFetchData={editFetchData}
                    setEditFetchData={setEditFetchData}
                />
            )}
        </Container>
    )
}

export default PartTable
