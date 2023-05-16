import { Card, Typography, Box,Button,TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import { styled } from '@mui/system'
import { Breadcrumb } from 'app/components'
const Uploadspare = () => {
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
        <>
           <Container>
           <div className="breadcrumb">
                <Breadcrumb
                
                    routeSegments={[{ name: 'Upload New Spare Parts', path: '/' }]} 
                    style={{marginLeft:"20px"}}
                />
            </div>
           <Box sx={{p:1, display:'flex',width:"100%"}}>
           <Card sx={{width:"100%"}}>
           <Box sx={{p:2,alignItems:"center"}}>
           <Typography sx={{p:3,fontWeight:"bold", fontSize:"16px"}}> Upload New Spare Parts</Typography>
           </Box>
            <Box sx={{p:3, display:"inline-",alignItems:"center", justifyContent:"space-between"}}>
                <Box>
                    <Typography sx={{ml:10}}>Download Spare </Typography>
                    <Button
                            sx={{ ml: 10 }}
                            variant="contained"
                            color="primary"
                            href={
                                process.env.PUBLIC_URL +
                                '/spare -part-sheet-sample.xlsx'
                            }
                            download
                        >
                            Download
                        </Button>
                </Box>
                <Box sx={{ml:60, mr:20}}>
                    <Typography>Upload Parts File</Typography>
                    <TextField
                        size="small"
                        inputProps={{ accept: '.csv,.xlsx,.xls' }}
                        onChange={(e) => {
                            setExfile(e.target.files[0])
                        }}
                        variant="outlined"
                        type="file"
                    />
                    
                </Box>
            </Box>
            <Box>
            <Button
                            variant="contained"
                            sx={{ ml:50 , mb:5}}
                            onClick={() => {
                                navigate('/sup-admin/view-list/validatespare')
                            }}
                        >
                            Validate MUIC
                        </Button>
            </Box>
           </Card>
           </Box>
           </Container>
        </>
     );
}
 
export default Uploadspare;