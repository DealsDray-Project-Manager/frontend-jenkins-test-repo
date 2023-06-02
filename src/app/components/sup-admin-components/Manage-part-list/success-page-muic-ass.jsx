import { Box, Card, Button, Typography } from '@mui/material'
import { Breadcrumb } from 'app/components'
import { styled } from '@mui/system'
import { useNavigate, useLocation } from 'react-router-dom'
// import CheckCircle from '@mui/icons-material/CheckCircle';
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

const Spare1 = () => {
    const navigate = useNavigate()
    const { state } = useLocation()

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'MUIC Association Reporting', path: '/' },
                    ]}
                    style={{ marginLeft: '20px' }}
                />
            </div>
            <Box sx={{ p: 1, display: 'flex' }}>
                <Card sx={{ marginRight: '', marginLeft: '', width:"100%" }}>
                    <Box sx={{ p: 2, alignItems: 'center' }}>
                        <Typography sx={{ p: 2, fontWeight: 'bold' }}>
                            MUIC Association Reporting
                        </Typography>
                    </Box>
                    <Box sx={{ ml: 4 }}>
                        <Typography sx={{ fontSize: '16px' }}>
                            MUIC Uploaded: {state?.validatedSuccess?.success}
                        </Typography>
                        <Typography sx={{ fontSize: '16px' }}>
                            Validate: {state?.validatedSuccess?.success}
                        </Typography>
                        <Typography sx={{ fontSize: '16px' }}>
                            Duplicate: {state?.validatedSuccess?.duplicate}
                        </Typography>
                        <Typography sx={{ fontSize: '16px' }}>
                            Invalid: {state?.validatedSuccess?.inValid}
                        </Typography>
                        <Typography sx={{ fontSize: '16px' }}>
                            Already Added: {state?.validatedSuccess?.AlreadyAdded}
                        </Typography>
                    </Box>
                    <br />
                    <Button
                        sx={{ mb: 2, ml: 55 }}
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/sup-admin/view-part-list')}
                    >
                        Back to Spare Part list
                    </Button>
                </Card>
            </Box>
        </Container>
    )
}

export default Spare1
