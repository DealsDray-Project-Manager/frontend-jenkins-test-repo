import { Box, Card, Divider, Stack, Typography} from "@mui/material";

const Botdetails = () => {
    return  (
    
        <Card sx={{width:'920px',marginTop:"40px",marginTop:"40px", border:'1px solid black'}}>
           <br />
            <Typography sx={{margin: "0px 0px 15px 33px", fontSize: "20px", fontWeight:"bold"}}>BOT details</Typography>
            <Divider />
            <Stack
    justifyContent="space-between"
    sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
  >
            <Box sx={{p:2, display:'flex'}}>
            <Box>
           
            <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Tray ID: BOT2016</Typography>
            <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Tray Location: Warehouse</Typography>
            <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Tray type: BOT</Typography>
            <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Tray status: Closed By Warehouse</Typography>
            <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Tracking ID: '513416651174</Typography>
            <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Item ID: Mobile_1205</Typography>
            <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Order ID: 408-2721243-7503502</Typography>
            <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Order date: Tue Sep 13 2022 23:59:50 GMT+0530 (India Standard Time)</Typography>
            <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>IMEI: '868622033321789</Typography>
            <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>UIC status: Printed</Typography>
            </Box>
            <Box>
         
                <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Tray close WH date: 2022-11-16T17:20:49.442Z</Typography>
                <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Agent name: pp.soumya.bot@dealsdray.com</Typography>
                <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Partner purchase price: 3100</Typography>
                <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Partner shop: Gurgaon_122016</Typography>
                <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Old item details: Xiaomi:Redmi Note 5 Pro</Typography>
                <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>UIC code: 92090000137</Typography>
                <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>UIC code created at: 2022-09-26T12:44:41.742Z</Typography>
                <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>UIC code user: shivanshu@dealsdray.com</Typography>
                
                </Box>
            </Box>
</Stack>    
        </Card>
    );
}
 
export default Botdetails;