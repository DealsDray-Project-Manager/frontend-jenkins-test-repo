<<<<<<< HEAD
import { Box, Card, Divider, Stack, Typography } from "@mui/material";
const Bagdetails = () => {
    return ( 
        <Card sx={{width:'920px',marginTop:"40px",marginTop:"40px", border:'1px solid black'}}>
           <br />
            <Typography sx={{margin: "0px 0px 15px 33px", fontSize: "20px", fontWeight:"bold"}}>Bag details</Typography>
            <Divider />
            <Stack
    justifyContent="space-between"
    sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
  >
            <Box sx={{p:2, display:'flex'}}>
            <Box >
            

            <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Bag ID: DDB-GGN-1153</Typography>
            <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Bag close date: 2022-09-29T12:55:24.433Z</Typography>
            <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Agent name: pp.soumya.bot@dealsdray.com</Typography>
            <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Order date: Wed Sep 21 2022 23:59:50 GMT+0530 (India Standard Time)</Typography>
            <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Order ID: 406-9957169-7244359</Typography>
            <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Partner purchase price: 5050</Typography>
            <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Partner shop: Gurgaon_122016</Typography>
            <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>IMEI: '860377045943363</Typography>
            </Box>
            <Box>
         
                <Typography sx={{fontSize:"16px" ,marginBottom:"15px" }}>Item ID: Mobile_1895</Typography>
                <Typography sx={{fontSize:"16px" ,marginBottom:"15px" }}>Stock in date: 2022-09-29T12:24:42.931Z</Typography>
                <Typography sx={{fontSize:"16px" ,marginBottom:"15px" }}>Stock in status:Valid</Typography>
                <Typography sx={{fontSize:"16px" ,marginBottom:"15px" }}>Tracking ID: '513424569225</Typography>
                <Typography sx={{fontSize:"16px" ,marginBottom:"15px" }}>UIC code code: 92090000220</Typography>
                <Typography sx={{fontSize:"16px" ,marginBottom:"15px" }}>UIC code created at: 2022-09-29T08:20:23.154Z</Typography>
                <Typography sx={{fontSize:"16px" ,marginBottom:"15px" }}>UIC status: Printed</Typography>
                </Box>
            </Box>
</Stack>
        </Card>
     );
}
 
export default Bagdetails;
=======
import { Box, Card, Divider, Stack, Typography } from '@mui/material'
const Bagdetails = ({ BagDetails }) => {
    return (
        <Card
            sx={{
                width: '920px',
                marginTop: '40px',
                marginTop: '40px',
                border: '1px solid black',
            }}
        >
            <br />
            <Typography
                sx={{
                    margin: '0px 0px 15px 33px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                }}
            >
                Bag details
            </Typography>
            <Divider />
            <Stack
                justifyContent="space-between"
                sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
            >
                <Box sx={{ p: 2, display: 'flex' }}>
                    <Box>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Bag ID: {BagDetails?.bag_id}
                        </Typography>

                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Stock in status:{BagDetails?.stock_in_status}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Stock in date:{' '}
                            {BagDetails?.bag_close_date != undefined
                                ? new Date(
                                      BagDetails?.bag_close_date
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Bag Issue Date:{' '}
                            {BagDetails?.assign_to_agent != undefined
                                ? new Date(
                                      BagDetails?.assign_to_agent
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Agent Name: {BagDetails?.agent_name}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Bag Close Date Agent:{' '}
                            {BagDetails?.tray_closed_by_bot != undefined
                                ? new Date(
                                      BagDetails?.tray_closed_by_bot
                                  ).toLocaleString('en-GB', {
                                      hour12: true,
                                  })
                                : ''}
                        </Typography>
                    </Box>
                </Box>
            </Stack>
        </Card>
    )
}

export default Bagdetails
>>>>>>> 48a79c73e263980ac2c96f81ff3f7701c58ed89a
