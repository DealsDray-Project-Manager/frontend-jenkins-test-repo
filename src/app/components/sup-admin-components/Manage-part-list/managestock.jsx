import { Card, Typography, Box,Button,TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import { styled } from '@mui/system'
import { Breadcrumb } from 'app/components'
const Managestock = () => {
    const setExfile = useState(null)
    const navigate = useNavigate()
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
    return ( 
        <Container>
           <div className="breadcrumb">
                <Breadcrumb
                
                    routeSegments={[{ name: 'Manage Stock of Spare Part', path: '/' }]} 
                    style={{marginLeft:"20px"}}
                />
            </div>
           <Box sx={{p:1, display:'flex',width:"100%"}}>
           <Card sx={{width:"100%"}}>
           <Box sx={{p:2,alignItems:"center"}}>
           <Typography sx={{p:3,fontWeight:"bold", fontSize:"16px"}}> Manage Stock of Spare Part</Typography>
           </Box>
            <Box sx={{ display:"flex", mb:5}}>
                <Box>
                    <Typography sx={{ml:10}}>Download Stock File </Typography>
                    <Button
                            sx={{ ml: 10 }}
                            variant="contained"
                            color="primary"
                            href={
                                process.env.PUBLIC_URL +
                                '/download-avl stock.xlsx'
                            }
                            download
                        >
                            Download Available Stock
                        </Button>
                </Box>
                <Box sx={{ml:27}}>
                <Typography sx={{ml:10}}>Upload New Stock File </Typography>
                <Button
                sx={{ ml: 10 }}
                variant="contained"
                color="error"
                onClick={() => navigate('/sup-admin/view-list/uploadspare')}
            >
                Upload Spare 
            </Button>
                </Box>
            </Box>
           
           </Card>
           </Box>
           </Container>
     );
}
 
export default Managestock;