import { Box, Card, Typography } from "@mui/material";
import Mobile_1606 from "../search-and-display/images/Mobile_1606.jpg"
import Image from 'mui-image'
const Mobiledetails = () => {
    return ( 
        <Card sx={{width:'920px',marginTop:"40px", border:'1px solid black'}}>
            <Box sx={{p:1, display:'flex'}}>
                <Box>
                <Image src={Mobile_1606} alt="" width={200} height={200} style={{marginTop:"90px", marginLeft:"45px", marginBottom:"45px"}}/>
                </Box>
                <Box sx={{marginLeft:"100px",marginTop:"30px"}}>
                <Typography sx={{fontSize:"16px", marginBottom:"15px"}} >Vendor Name: amazon </Typography>
                <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Vendor SKU ID: Mobile_1160</Typography>
                <br />
                <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Brand name: 10.or</Typography>
                <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Model name: 10.or E</Typography>
                <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>MUIC: OF694</Typography>
                </Box>
            </Box>

     </Card>
     );
}
 
export default Mobiledetails;

