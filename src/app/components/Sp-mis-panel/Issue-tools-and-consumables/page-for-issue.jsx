import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import {
    Card,
    Autocomplete,
    TextField,
    Grid,
    Box,
    Avatar,
    Typography,
    CardContent,
} from '@mui/material'
import { Breadcrumb } from 'app/components'
import MuiDataTable from './mui-dataTable'
import { axiosMisUser, axiosSuperAdminPrexo } from '../../../../axios'
import useAuth from 'app/hooks/useAuth'

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '20px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '10px',
        },
    },
    '& .cardContainer': {
        marginTop: '20px',
    },
    // Set the height of the Grid items to 100%
    '& .gridItem': {
        height: '100%',
    },
}))

function PageForIssue() {
    // STATE SECTION
    const [userType, setUserType] = useState([
        'Audit',
        'BQC',
        'RP-Audit',
        'RP-BQC',
        'RDL-1',
        'RDL-2',
    ])
    const [users, setUsers] = useState([])
    const [userPreview, setUserPreview] = useState({})
    const [tools, setTools] = useState([])
    const [consumables, setConsumables] = useState([])
    const [selectedToolsAndConsumables, setselectedToolsAndConsumables] =
        useState([])
    const { user } = useAuth()

    // USEeFFECT
    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosSuperAdminPrexo.post(
                '/sparePart-view-basedOnCategory'
            )
            if (res.status === 200) {
                setTools(res.data.tools)
                setConsumables(res.data.consumables)
            }
        }
        fetchData()
    }, [])

    const handelGetUsers = async (type) => {
        try {
            const res = await axiosMisUser.post(
                `/get-charging-users/${type}/${user.location}`
            )
            if (res.status === 200) {
                setUsers(res.data.data)
            }
        } catch (error) {
            alert(error)
        }
    }

    const handelTheData = (data, isSelection) => {
        if (isSelection && data) {
            let obj = {
                name: data.name,
                avl_stock: data.avl_stock,
                part_code: data.part_code,
                sp_category: data.sp_category,
                selected_quantity: 1,
                box_id: data.box_id,
            }
            // Check for duplicates before adding to the state
            if (
                !selectedToolsAndConsumables.some(
                    (item) => item.part_code === data.part_code
                )
            ) {
                setselectedToolsAndConsumables((prevData) => [...prevData, obj])
            }
        }
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Issue Tools And Consumables', path: '/' },
                    ]}
                />
            </div>
            <Grid container spacing={3} className="cardContainer">
                <Grid item lg={6} md={6} xs={12} className="gridItem">
                    <Box>
                        <Autocomplete
                            disablePortal
                            id="user-type"
                            options={userType}
                            sx={{ width: '100%', marginBottom: 2 }}
                            onChange={(_, selectedValue) => {
                                handelGetUsers(selectedValue)
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="User Type"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />

                        <Autocomplete
                            disablePortal
                            id="Select-Username"
                            options={users}
                            onChange={(_, selectedValue) => {
                                setUserPreview(selectedValue)
                            }}
                            getOptionLabel={(option) => option.user_name}
                            sx={{ width: '100%', marginBottom: 2 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select User"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />

                        {/* Add two more Autocomplete inputs */}

                        <Autocomplete
                            disablePortal
                            id="Another-Input-1"
                            options={tools}
                            getOptionLabel={(option) => option.name}
                            sx={{ width: '100%', marginBottom: 2 }}
                            onChange={(_, selectedValue) => {
                                handelTheData(selectedValue, true)
                            }}
                            clearIcon={null}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Tools"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                        <Autocomplete
                            disablePortal
                            id="Another-Input-2"
                            options={consumables}
                            onChange={(_, selectedValue) => {
                                handelTheData(selectedValue, true)
                            }}
                            clearIcon={null}
                            getOptionLabel={(option) => option.name}
                            sx={{ width: '100%' }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Consumables"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} xs={12} className="gridItem">
                    <Card>
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Box sx={{ mb: 2 }}>
                                    <Avatar
                                        src={userPreview?.profile}
                                        sx={{ width: 56, height: 56 }}
                                    />
                                </Box>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h6">
                                        Name: {userPreview?.name}
                                    </Typography>
                                    <Typography variant="body1">
                                        Email:{userPreview?.email}
                                    </Typography>
                                    <Typography variant="body1">
                                        Mobile Number: {userPreview?.contact}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <MuiDataTable
                selectedToolsAndConsumables={selectedToolsAndConsumables}
                setselectedToolsAndConsumables={setselectedToolsAndConsumables}
                userPreview={userPreview}
            />
        </Container>
    )
}

export default PageForIssue
