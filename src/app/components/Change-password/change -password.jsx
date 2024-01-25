import {
    Card,
    Grid,
    Button,
    CircularProgress,
    IconButton,
    Typography,
} from '@mui/material'
import { Box, styled, useTheme } from '@mui/system'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { useNavigate } from 'react-router-dom'
import useAuth from 'app/hooks/useAuth'
import { Paragraph } from 'app/components/Typography'
import { Visibility, VisibilityOff } from '@mui/icons-material'
// import jwt from "jsonwebtoken"
import jwt_decode from 'jwt-decode'
import InputAdornment from '@mui/material/InputAdornment'
import { axiosSuperAdminPrexo } from '../../../axios'
import Swal from 'sweetalert2'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))

const ContentBox = styled(JustifyBox)(() => ({
    height: '100%',
    padding: '32px',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const IMG = styled('img')(() => ({
    width: '100%',
}))

const RegisterRoot = styled(JustifyBox)(({ theme }) => ({
    background: '#1A2038',
    minHeight: '100vh !important',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > .card': {
        maxWidth: 650,
        borderRadius: 12,
        margin: '1rem',
    },
    '& .buttonProgress': {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    '& .socialButton': {
        width: '100%',
        '& img': {
            margin: '0 8px',
        },
    },
    '& .labelLink': {
        color: theme.palette.primary.main,
        textDecoration: 'underline',
    },
}))

const Login = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({})
    const [message, setMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const { logout, user } = useAuth()

    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
        return value === new_password
    })

    let { old_password, new_password, confirm_password } = state
    const { palette } = useTheme()
    const textError = palette.error.main
    // PASSWORD SHOW AND HIDE
    const handleClickShowPassword = () => {
        setShowPassword((showPassword) => !showPassword)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const handleFormSubmit = async (data) => {
        try {
            let token = localStorage.getItem('prexo-authentication')
            if (token) {
                const { adminId, user_type } = jwt_decode(token)
                state._id = adminId
                state.user_type = user_type
                let response = await axiosSuperAdminPrexo.post(
                    '/changePassword',
                    state
                )
                if (response.status == 200) {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: response?.data?.message,
                        confirmButtonText: 'Ok',
                    })
                    if (user_type == undefined) {
                        navigate('/')
                    } else if (user_type == 'super-admin') {
                        navigate('/sup-admin/dashboard')
                    } else if (user_type == 'MIS') {
                        navigate('/mis/dashboard')
                    } else if (user_type == 'Warehouse') {
                        navigate('/warehouse/dashboard')
                    } else if (user_type == 'Bag Opening') {
                        navigate('/bot/dashboard')
                    } else if (user_type == 'Charging') {
                        navigate('/charging/dashboard')
                    } else if (user_type == 'BQC') {
                        navigate('/bqc/dashboard')
                    } else if (user_type == 'Sorting Agent') {
                        navigate('/sorting/dashboard')
                    } else if (user_type == 'Audit') {
                        navigate('/audit/dashboard')
                    } else if (user_type == 'RDL-1') {
                        navigate('/rdl-1/dashboard')
                    } else if (user_type == 'Sales Agent') {
                        navigate('/sales/dashboard')
                    } else if (user_type == 'Pricing Agent') {
                        navigate('/pricing/dashboard')
                    } else if (user_type == 'Reporting') {
                        navigate('/reporting/dashboard')
                    } else if (user_type == 'RDL-2') {
                        navigate('/rdl-2/dashboard')
                    } else if (user_type == 'SP User') {
                        navigate('/sp-user/dashboard')
                    } else if (user_type == 'Sp mis') {
                        navigate('/sp-mis/dashboard')
                    } else if (user_type == 'Purchase RM') {
                        navigate('/purchase-user/dashboard')
                    } else if (user_type == 'Buyer') {
                        navigate('/buyer/dashboard')
                    } else if (user_type == 'Bagging') {
                        navigate('/bagging/dashboard')
                    }
                    else if (user_type == 'RP-BQC') {
                        navigate('/rp-bqc/dashboard')
                    } else if (user_type == 'RP-Audit') {
                        navigate('/rp-audit/dashboard')
                    }
                } else if (response.status == 202) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: response?.data?.message,
                    })
                }
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    }

    return (
        <RegisterRoot>
            <Box variant="h5" sx={{ textAlign: 'center' }} gutterBottom>
                <Typography
                    variant="h5"
                    sx={{ textAlign: 'center', color: 'white' }}
                    gutterBottom
                >
                    Create New Password
                </Typography>
            </Box>
            <Card className="card">
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <ContentBox>
                            <IMG
                                src="/assets/images/illustrations/posting_photo.svg"
                                alt=""
                            />
                        </ContentBox>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <Box p={4} height="100%">
                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <TextValidator
                                    sx={{ mb: 3, width: '100%' }}
                                    variant="outlined"
                                    size="large"
                                    label="Old Password"
                                    onChange={handleChange}
                                    type="password"
                                    name="old_password"
                                    value={old_password || ''}
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                />
                                <TextValidator
                                    sx={{ mb: '16px', width: '100%' }}
                                    label="New Password"
                                    variant="outlined"
                                    size="large"
                                    onChange={handleChange}
                                    name="new_password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={new_password || ''}
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                />

                                <TextValidator
                                    sx={{ mb: '16px', width: '100%' }}
                                    label="Confirm Password"
                                    variant="outlined"
                                    size="large"
                                    onChange={handleChange}
                                    name="confirm_password"
                                    onPaste={(e) => e.preventDefault()}
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirm_password || ''}
                                    validators={['isPasswordMatch', 'required']}
                                    errorMessages={[
                                        'password mismatch',
                                        'This field is required',
                                    ]}
                                />

                                {message && (
                                    <Paragraph sx={{ color: textError }}>
                                        {message}
                                    </Paragraph>
                                )}

                                <FlexBox display="flex" alignItems="center">
                                    <Box position="relative">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={loading}
                                            type="submit"
                                        >
                                            Submit
                                        </Button>
                                        {loading && (
                                            <CircularProgress
                                                size={24}
                                                className="buttonProgress"
                                            />
                                        )}
                                    </Box>
                                    <Button
                                        sx={{ ml: 1 }}
                                        variant="outlined"
                                        color="inherit"
                                        onClick={logout}
                                    >
                                        Logout
                                    </Button>
                                </FlexBox>
                                {/* <Grid item xs={12}>
                                    <FlexBox justifyContent="flex-end" mt={2}>
                                       
                                    </FlexBox>
                                </Grid> */}
                            </ValidatorForm>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </RegisterRoot>
    )
}

export default Login
