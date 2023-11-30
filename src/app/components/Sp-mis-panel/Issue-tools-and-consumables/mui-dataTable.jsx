import React, { useState } from 'react'
import MUIDataTable from 'mui-datatables'
import {
    Typography,
    Table,
    Box,
    TextField,
    Button,
    CircularProgress,
    IconButton,
    Icon,
} from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import '../../../../app.css'
import { axiosSpMisAgent } from '../../../../axios'
import Swal from 'sweetalert2'
import useAuth from 'app/hooks/useAuth'

const MuiDataTable = ({
    selectedToolsAndConsumables,
    setselectedToolsAndConsumables,
    userPreview,
}) => {
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const [description, setDescription] = useState('')

    const handleDecreaseQuantity = (rowIndex) => {
        const updatedData = [...selectedToolsAndConsumables]
        updatedData[rowIndex].selected_quantity -= 1
        setselectedToolsAndConsumables(updatedData)
    }

    const handleIncreaseQuantity = (rowIndex) => {
        const updatedData = [...selectedToolsAndConsumables]
        updatedData[rowIndex].selected_quantity += 1
        setselectedToolsAndConsumables(updatedData)
    }
    const handleDeleteItem = (rowIndex) => {
        const updatedData = [...selectedToolsAndConsumables]
        updatedData.splice(rowIndex, 1)
        setselectedToolsAndConsumables(updatedData)
    }

    // HANDEL SENT THE REQUESTS
    const handelSubmit = async () => {
        try {
            setLoading(true)
            let obj = {
                selectedToolsAndConsumables: selectedToolsAndConsumables,
                actionUser: user.username,
                issued_user_name: userPreview.user_name,
                description: description,
            }
            const res = await axiosSpMisAgent.post(
                '/assignToAgentToolsAndConsumables',
                obj
            )
            if (res.status === 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res.data.message,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload(false)
                    }
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops..',
                    text: res.data.message,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload(false)
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
            name: 'part_code',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>SPN Id</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'name', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Name</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'selected_quantity',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Quantity</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value, tableMeta) => {
                    const rowIndex = tableMeta.rowIndex

                    return (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton
                                size="small"
                                style={{ color: 'red' }}
                                disabled={value <= 1}
                                onClick={() => handleDecreaseQuantity(rowIndex)}
                            >
                                <RemoveIcon />
                            </IconButton>
                            <Typography
                                variant="body1"
                                style={{ margin: '0 8px' }}
                            >
                                {value}
                            </Typography>
                            <IconButton
                                size="small"
                                style={{ color: 'green' }}
                                onClick={() => handleIncreaseQuantity(rowIndex)}
                            >
                                <AddIcon />
                            </IconButton>
                        </div>
                    )
                },
            },
        },
        {
            name: '_id',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Actions</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <IconButton>
                            <Icon
                                onClick={(e) => {
                                    handleDeleteItem(tableMeta.rowIndex)
                                }}
                                color="error"
                            >
                                delete
                            </Icon>
                        </IconButton>
                    )
                },
            },
        },
    ]

    return (
        <Box>
            <Table sx={{ mt: 1 }} className="custom-table">
                <MUIDataTable
                    title={'Manage Tools & Consumable'}
                    data={selectedToolsAndConsumables}
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
                        elevation: 0,
                        rowsPerPageOptions: [10, 20, 40, 80, 100],
                    }}
                />
            </Table>
            <div style={{ marginTop: '20px' }}>
                <TextField
                    label="Description"
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                    variant="outlined"
                    fullWidth
                />
            </div>

            <div
                style={{
                    marginTop: '10px',
                    marginBottom: '10px',
                    float: 'right',
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    disabled={
                        selectedToolsAndConsumables.length == 0 ||
                        Object.keys(userPreview)?.length == 0 ||
                        description == ''
                    }
                    onClick={handelSubmit}
                >
                    {loading ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        'Submit'
                    )}
                </Button>
            </div>
        </Box>
    )
}

export default MuiDataTable
