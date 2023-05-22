import { Box, Card, Button, Typography } from '@mui/material'
import { Breadcrumb } from 'app/components'
import { styled } from '@mui/system'
import { useNavigate, useLocation } from 'react-router-dom'

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
    const { state } = useLocation()

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Products', path: '/' },
                        { name: 'Manage Parts', path: '/' },
                        { name: 'MUIC to Part-Association', path: '/' },
                        { name: 'Part Association Reporting' },
                    ]}
                    style={{ marginLeft: '20px' }}
                />
            </div>
            <Box sx={{ p: 1, display: 'flex' }}>
                <Card sx={{ marginRight: '', marginLeft: '', width: '100%' }}>
                    <Box sx={{ p: 2, alignItems: 'center' }}>
                        <Typography sx={{ ml: 2, fontWeight: 'bold' }}>
                            Spare Parts Add Reporting
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
                            Already Added:{' '}
                            {state?.validatedSuccess?.AlreadyAdded}
                        </Typography>
                    </Box>
                    <br />
                    <Box
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                        }}
                    >
                        <Button
                            sx={{ margin: 'auto', mt: 1, mb: 2, ml: 50 }}
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/rm-user/product-list')}
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
    )
}

export default Partsassociation
