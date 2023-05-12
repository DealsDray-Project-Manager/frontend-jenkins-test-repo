<<<<<<< HEAD
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

=======
import { Box, Card, Typography } from '@mui/material'
import Image from 'mui-image'
import { baseURL } from '../../../../../axios'
const Mobiledetails = ({ ProdutDetails }) => {
    return (
        <Card
            sx={{
                width: '920px',
                marginTop: '40px',
                border: '1px solid black',
            }}
        >
            <Box sx={{ p: 1, display: 'flex' }}>
                <Box>
                    <Image
                        src={
                            ProdutDetails?.[0]?.image == undefined
                                ? baseURL +
                                  '/product/image/' +
                                  ProdutDetails?.[0]?.vendor_sku_id +
                                  '.jpg'
                                : ProdutDetails?.[0]?.image
                        }
                        alt="Image not found"
                        width={200}
                        height={200}
                        style={{
                            marginTop: '90px',
                            marginLeft: '45px',
                            marginBottom: '45px',
                        }}
                    />
                </Box>
                <Box sx={{ marginLeft: '100px', marginTop: '30px' }}>
                    <Typography sx={{ fontSize: '16px', marginBottom: '15px' }}>
                        Vendor Name: {ProdutDetails?.[0]?.vendor_name}{' '}
                    </Typography>
                    <Typography sx={{ fontSize: '16px', marginBottom: '15px' }}>
                        Vendor SKU ID: {ProdutDetails?.[0]?.vendor_sku_id}
                    </Typography>
                    <br />
                    <Typography sx={{ fontSize: '16px', marginBottom: '15px' }}>
                        Brand name: {ProdutDetails?.[0]?.brand_name}
                    </Typography>
                    <Typography sx={{ fontSize: '16px', marginBottom: '15px' }}>
                        Model name: {ProdutDetails?.[0]?.model_name}
                    </Typography>
                    <Typography sx={{ fontSize: '16px', marginBottom: '15px' }}>
                        MUIC: {ProdutDetails?.[0]?.muic}
                    </Typography>
                </Box>
            </Box>
        </Card>
    )
}

export default Mobiledetails
>>>>>>> 48a79c73e263980ac2c96f81ff3f7701c58ed89a
