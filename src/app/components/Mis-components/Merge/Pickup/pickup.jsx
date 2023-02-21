import React, { useState, useEffect,useMemo } from 'react'
import { Breadcrumb } from 'app/components'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { axiosWarehouseIn } from '../../../../../axios'
import Tab from '@mui/material/Tab'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box } from '@mui/material'

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
    const [whtTray, setWhtTray] = useState([])
    const [value, setValue] = React.useState('1')

    const navigate = useNavigate()

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                let admin = localStorage.getItem('prexo-authentication')
                if (admin) {
                    let { location } = jwt_decode(admin)
                    let response = await axiosWarehouseIn.post(
                        '/whtTray/' + location + '/' + 'all-wht-tray'
                    )
                    if (response.status === 200) {
                        setWhtTray(response.data.data)
                    }
                } else {
                    navigate('/')
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [])

    // const tableForAllTab=useMemo(()=>{
    //     return (
            
    //     )
    // },[])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Pickup', path: '/' },
                        { name: 'Items' },
                    ]}
                />
            </div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                        >
                            <Tab label="Charge Done Item's" value="1" />
                            <Tab label="BQC Done Item's" value="2" />
                            <Tab label="Audit Done Item's" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">Item One</TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                </TabContext>
            </Box>
        </Container>
    )
}

export default SimpleMuiTable
