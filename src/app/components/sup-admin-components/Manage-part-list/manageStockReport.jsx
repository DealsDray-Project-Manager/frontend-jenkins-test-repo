import { Box, Card, Button, Typography } from "@mui/material";
import { Breadcrumb } from 'app/components'
import { styled } from '@mui/system'
import { useNavigate,useLocation } from 'react-router-dom'
// import CheckCircle from '@mui/icons-material/CheckCircle';

const Spare1 = () => {
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
    const { state } = useLocation()

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb

                    routeSegments={[{ name: 'Spare Parts Add Reporting', path: '/' }]}
                    style={{ marginLeft: "20px" }}
                />
            </div>
            <Box sx={{ p: 1, display: 'flex' }}>
                <Card sx={{ marginRight: "", marginLeft: "", width: "100%" }}> 

                    
                    <Box sx={{ p: 2, alignItems: "center" }}>
                        <Typography sx={{ ml:2, fontWeight: "bold" }}>Manage Stock Update Reporting</Typography>
                    </Box>
                    
                    

                    <Box sx={{ ml: 4 }}>
                        <Typography sx={{ fontSize: "16px" }}>Total Record: {state.validatedSuccess} </Typography>
                        <Typography sx={{ fontSize: "16px" }}>successfull Updated:  {state.validatedSuccess} </Typography>
                        {/* <Typography sx={{ fontSize: "16px" }}>Bad Spare parts: 10 - View List </Typography> */}
                    </Box>
                    <br />
                    <Box sx={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
                        <Button
                            sx={{ margin: "auto", mt: 1, mb: 2, ml: 50 }}
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

export default Spare1;