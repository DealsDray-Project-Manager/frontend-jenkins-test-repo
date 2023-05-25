import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import MemberEditorDialog from './part-add'
import Swal from 'sweetalert2'
import { Button, IconButton, Icon, Box, Radio } from '@mui/material'
import { axiosSuperAdminPrexo } from '../../../../axios'
import { useNavigate } from 'react-router-dom'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
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

const PartTable = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [editFetchData, setEditFetchData] = useState({})
    const [partList, setPartList] = useState([])
    const [muicData, setMuicData] = useState([])
    const navigate = useNavigate()
    const [partId, setPartId] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useAuth()
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
                    // let res = await axiosSuperAdminPrexo.post(
                    //     '/partAndColor/oneData/' + id + '/part-list'
                    // )
                    // if (res.status == 200) {
                    // }
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
                available_stock: x.avl_stock,
                update_stock: '',
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
        navigate('/rm-user/view-part-list/muic-association/' + id)
    }

    const columns = [
        {
            name: 'index',
            label: 'Record No',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) =>
                    dataIndex.rowIndex + 1,
            },
        },
        {
            name: 'part_code', // field name in the row object
            label: 'Part No', // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'avl_stock', // field name in the row object
            label: 'Available stock', // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'color', // field name in the row object
            label: 'Color', // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'name', // field name in the row object
            label: 'Part Name', // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'technical_qc', // field name in the row object
            label: 'Technical qc', // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'description',
            label: 'Description',
            options: {
                filter: true,
            },
        },
        {
            name: 'created_at',
            label: 'Creation Date',
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
            name: 'created_by',
            label: 'Created By',
            options: {
                filter: true,
            },
        },
        {
            name: 'status',
            label: 'Status',
            options: {
                filter: true,
                customBodyRender: (value) => {
                    if (value == 'Active') {
                        return (
                            <div style={{ color: 'green', fontWeight: 'bold' }}>
                                {value}
                            </div>
                        )
                    } else {
                        return (
                            <div style={{ color: 'red', fontWeight: 'bold' }}>
                                {value}
                            </div>
                        )
                    }
                },
            },
        },
        {
            name: '_id',
            label: 'Actions',
            options: {
                filter: false,
                sort: false,

                customBodyRender: (value, tableMeta) => {
                    return (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            {tableMeta.rowData[8] == user.name ? (
                                <>
                                    {tableMeta.rowData[9] == 'Active' ? (
                                        <Radio
                                            onClick={(e) => {
                                                handelActive(value, 'Deactive')
                                            }}
                                            checked
                                            style={{ color: 'green' }}
                                        />
                                    ) : (
                                        <Radio
                                            onClick={(e) => {
                                                handelActive(value, 'Active')
                                            }}
                                            checked
                                            style={{ color: 'red' }}
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
                                                handledetails(
                                                    tableMeta.rowData[1]
                                                )
                                            }}
                                            color="default"
                                        >
                                            details
                                        </Icon>
                                    </IconButton>
                                </>
                            ) : null}
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
                onClick={() => navigate('/rm-user/view-list/bulk-add')}
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
                    navigate('/rm-user/view-list/managestock', {
                        state: {
                            partList: partList,
                        },
                    })
                }
            >
                Manage Stock
            </Button>

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
