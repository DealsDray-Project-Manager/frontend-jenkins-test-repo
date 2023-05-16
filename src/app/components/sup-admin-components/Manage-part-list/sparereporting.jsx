import { Box, Card, Button, Typography } from "@mui/material";
import { Breadcrumb } from 'app/components'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
const Sparereporting = () => {
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
     
    const navigate = useNavigate()

    return ( 
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                
                    routeSegments={[{ name: 'Spare Parts Add Reporting', path: '/' }]} 
                    style={{marginLeft:"20px"}}
                />
            </div>
            <Box sx={{p:1, display:'flex'}}>
           <Card sx={{marginRight:"", marginLeft:"", width:"100%"}}>
            <Box sx={{p:2,alignItems:"center"}}>
           <Typography sx={{p:2, fontWeight:"bold"}}>Spare Parts Add Reporting</Typography>
           </Box>
           <Box>
                
            
           </Box>
             <Box sx={{ml:4}}>
                    <Typography sx={{fontSize:"16px"}}>Spare part Uploaded: 108 </Typography>
                    <Typography sx={{fontSize:"16px"}}>Upload successful: 98 </Typography>
                    <Typography sx={{fontSize:"16px"}}>Bad Spare parts: 10 - View List </Typography>
             </Box>
            <br />
           <Box sx={{alignItems:"center",justifyContent:"center", display:"flex"}}>
             <Button
                            sx={{margin:"auto",mt:1, mb:2, ml:50 }}
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/sup-admin/view-part-list')}
                        >
                            Back to spare part list 
                        </Button>
                        {/* <Button
                            variant="contained"
                            color="primary"
                             sx={{margin:"auto",mt:1, mb:2,mr:60}} 
                             onClick={() => navigate('/sup-admin/view-list/validatespare')}
                        >
                            Previous
                        </Button> */}
           </Box>
           </Card>
           </Box>
        </Container>
     );
}
 
export default Sparereporting;