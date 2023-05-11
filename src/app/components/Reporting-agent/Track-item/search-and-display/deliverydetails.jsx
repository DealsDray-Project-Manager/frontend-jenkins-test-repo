import { Box, Card, Divider, Stack, Typography } from "@mui/material";
const Deliverydetails = () => {
    return ( 
        <Card sx={{width:'920px',marginTop:"40px",marginTop:"40px", border:'1px solid black'}}>
        <br />
         <Typography sx={{margin: "0px 0px 15px 33px", fontSize: "20px", fontWeight:"bold"}}>Delivery details</Typography>
         <Divider />
         <Stack
 
 justifyContent="space-between"
 sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
>
        <Box sx={{p:2, display:'flex'}}>
         <Box>
    
         <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>IMEI: '862162041523254</Typography>
         <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Item ID: Mobile_1515</Typography>
         <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>UIC code: 92090000007</Typography>
         <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>UIC code created at: 2022-09-17T05:43:35.833Z</Typography>
         <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>UIC code user: shivanshu@dealsdray.com</Typography>
         <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>UIC status: Printed</Typography>
         
         </Box>
            <Box>
         
         <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Tracking ID: '513380137520</Typography>
         <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Order date: Wed Aug 10 2022 23:59:50 GMT+0530 (India Standard Time)</Typography>
         <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Order id: 406-4603909-5600331</Typography>
         <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Delivery date: 2022-08-25T00:00:00.000Z</Typography>
         <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Partner purchase price: 4250</Typography>
         <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Partner shop: Gurgaon_122016</Typography>
            
         </Box>
         </Box>
</Stack>
     </Card>
     );
}
 
export default Deliverydetails;