import React, { useEffect, useState } from 'react'
import { Card, TextField, Box, Divider, Stack, Button } from '@mui/material'
import SimpleTable from './table'
import Trayjourney from './trayjourney'
import Trayjourneytable from './trayjourneytable'
import { styled } from '@mui/system'
import jwt_decode from 'jwt-decode'
import { axiosReportingAgent } from '../../../../axios'
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

const Trayinformation = () => {
    // STATE
    const [result, setResult] = useState('')
    const [location, setLocation] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [otherDetails, setOtherDetails] = useState({})

    useEffect(() => {
        let user = localStorage.getItem('prexo-authentication')
        if (user) {
            let { location } = jwt_decode(user)
            setLocation(location)
        }
    }, [])

    // SEARCH ACTION API CALLING
    const searchTray = async (e) => {
        e.preventDefault()
        try {
            let obj = {
                location: location,
                trayId: searchInput,
            }
            const res = await axiosReportingAgent.post('/track-tray', obj)
            if (res.status == 200) {
                setOtherDetails(res.data.otherDetails)
                setResult(res.data.data)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.message,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload(true)
                    }
                })
            }
        } catch (error) {
            alert(error)
        }
    }
 
    return (
        <Container>
            <h3>Tray Details</h3>
            <Box>
                <TextField
                    type="search"
                    onChange={(e) => {
                        setSearchInput(e.target.value)
                    }}
                    label="Enter tray id"
                >
                    Enter Tray Id
                </TextField>

                <Button
                    variant="contained"
                    color="primary"
                    disabled={searchInput == ''}
                    onClick={(e) => {
                        searchTray(e)
                    }}
                    sx={{ ml: 2, mt: 1 }}
                >
                    Submit
                </Button>
            </Box>

            <div>
                <Card
                    style={{ marginTop: '40px', border: '0.5px solid #78909c' }}
                >
                    <h3 style={{ marginLeft: '33px' }}>Tray Information</h3>
                    <Divider />
                    <Stack
                        justifyContent="space-between"
                        sx={{ px: 2, py: 1, bgcolor: 'background.white' }}
                    >
                        <Box sx={{ p: 2, display: 'flex' }}>
                            <div style={{ fontSize: '16px' }}>
                                <p>
                                    Tray id: <b>{result?.code}</b>{' '}
                                </p>
                                <p>
                                    Tray Created Date:{' '}
                                    <b>
                                        {new Date(
                                            result?.created_at
                                        ).toLocaleString('en-GB', {
                                            hour12: true,
                                        })}
                                    </b>
                                </p>
                                <p>
                                    Tray Status: <b>{result?.sort_id}</b>
                                </p>
                                <p>
                                    Tray Location: <b>{result?.cpc}</b>
                                </p>
                            </div>
                        </Box>
                    </Stack>
                </Card>
            </div>
            <div>
                <Card
                    style={{ marginTop: '40px', border: '0.5px solid #78909c' }}
                >
                    <h3 style={{ marginLeft: '33px' }}>Unit Details</h3>
                    <Divider />
                    <Stack
                        justifyContent="space-between"
                        sx={{ px: 2, py: 1, bgcolor: 'background.white' }}
                    >
                        <Box sx={{ p: 2, display: 'flex' }}>
                            <div style={{ fontSize: '16px' }}>
                                <p>
                                    Current item count:{' '}
                                    <b>{result?.items?.length}</b>{' '}
                                </p>

                                {Object.keys(otherDetails).length !== 0 ? (
                                    <>
                                        {Object.entries(otherDetails).map(
                                            ([key, value]) => (
                                                <p key={key}>
                                                    {key}: <b>{value}</b>
                                                </p>
                                            )
                                        )}
                                    </>
                                ) : (
                                    ''
                                )}
                            </div>
                        </Box>
                    </Stack>
                </Card>
            </div>

            {/* <SimpleTable
                Items={
                    result?.items?.length == 0
                        ? result?.actual_items
                        : result?.items
                }
            /> */}
            <Trayjourney TrayMovement={result?.actual_items} />
            {/* <Trayjourneytable /> */}
        </Container>
    )
}

export default Trayinformation
