import { Box, Card, Divider, Stack, Typography } from "@mui/material";
const WHTdetails = () => {
    return ( 
        <Card sx={{marginTop:"40px",marginBottom:"40px", border:'1px solid black'}}>
           <br />
            <Typography sx={{margin: "0px 0px 15px 33px", fontSize: "20px", fontWeight:"bold"}}>WHT details</Typography>
            <Divider />
            <Stack
            
    justifyContent="space-between"
    sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
  >
            <Box sx={{p:2, display:'flex'}}>
            <Box>
           
            <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Audit report WHT tray: WHT1196</Typography>
            <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>WHT tray: WHT1196</Typography>
            <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>WHT tray assigned date: 2022-11-22T10:24:25.683Z</Typography>
        
            </Box>
            </Box>
</Stack>
        </Card>
     );
}
 
export default WHTdetails;