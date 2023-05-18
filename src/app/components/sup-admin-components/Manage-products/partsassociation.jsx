import { Box, Card, Button, Typography } from "@mui/material";
import { Breadcrumb } from 'app/components'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'

const Partsassociation = () => {
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

                    routeSegments={[
                        { name: 'Products', path: '/' },
                        { name: 'Manage Parts', path: '/' },
                        { name: 'MUIC to Part-Association',path: '/'},
                        { name: 'Part Association Reporting'}
                    ]}
                    style={{ marginLeft: "20px" }}
                />
            </div>
            <Box sx={{ p: 1, display: 'flex' }}>
                <Card sx={{ marginRight: "", marginLeft: "", width: "100%" }}>

                    <Box sx={{ p: 2, alignItems: "center" }}>
                        <Typography sx={{ ml:2, fontWeight: "bold" }}>Spare Parts Add Reporting</Typography>
                    </Box>
                    

                    <Box sx={{ ml: 4 }}>
                        <Typography sx={{ fontSize: "16px" }}>Parts Uploaded: 25 </Typography>
                        <Typography sx={{ fontSize: "16px" }}>Valid: 20 </Typography>
                        <Typography sx={{ fontSize: "16px" }}>Duplicate: 3 </Typography>
                        <Typography sx={{ fontSize: "16px" }}>Invalid: 2 </Typography>
                    </Box>
                    <br />
                    <Box sx={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
                        <Button
                            sx={{ margin: "auto", mt: 1, mb: 2, ml: 50 }}
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/sup-admin/products')}
                        >
                            Back to MUIC list
                        </Button>
                        {/* <Button
                            variant="contained"
                            color="primary"
                             sx={{margin:"auto",mt:1, mb:2,mr:60}} 
                             onClick={() => navigate('/sup-admin/view-list/just')}
                        >
                            Previous
                        </Button> */}
                    </Box>
                </Card>
            </Box>
        </Container>
    );
}

export default Partsassociation;