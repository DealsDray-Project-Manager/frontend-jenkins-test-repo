import { Card,TextField , Grid, Input, Label, Box, Divider, Stack, Button } from "@mui/material";
import SimpleTable from "./table";
import Trayjourney from "./trayjourney";
import Trayjourneytable from "./trayjourneytable";
import { styled } from '@mui/system';

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

const Trayinformation = () => {
    
    return (
        <Container>
            <h3>Tray Details</h3>
         <Box>

                <TextField  label="enter tray id">Enter Tray Id</TextField>

                <Button
                
                    variant="contained"
                    color="primary"
                     sx={{ml:2,mt:1}}
                    >
                    Submit
                </Button>
                </Box>
            
            <div>
                <Card style={{  marginTop: "40px", border: '0.5px solid #78909c' }}>
                    <h3 style={{ marginLeft: "33px" }}>Tray Information</h3>
                    <Divider />
                    <Stack
                        justifyContent="space-between" sx={{ px: 2, py: 1, bgcolor: 'background.white' }}>
                        <Box sx={{ p: 2, display: "flex" }}>
                            <div style={{ fontSize: "16px" }}>
                                <p>Tray id:   <b>WHT1001</b> </p>
                                <p>Tray Created Date: <b>12/04/2023</b></p>
                                <p>Tray Status: <b>Merge Request Sent To Wharehouse</b></p>
                                <p>Tray Location: <b>Gurgaon_122016</b></p>

                            </div>

                        </Box>
                    </Stack>
                </Card>
            </div>

            <SimpleTable />
            <Trayjourney />
            <Trayjourneytable/>
        </Container>



    );
}

export default Trayinformation;

