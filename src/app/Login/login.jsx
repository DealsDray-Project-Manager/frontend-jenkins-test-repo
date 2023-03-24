import { Card, Grid, Button, CircularProgress, IconButton } from '@mui/material'
import { Box, styled, useTheme } from '@mui/system'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { useNavigate } from 'react-router-dom'
import useAuth from 'app/hooks/useAuth'
import { Paragraph } from 'app/components/Typography'
import { Visibility, VisibilityOff } from '@mui/icons-material'
// import jwt from "jsonwebtoken"
import jwt_decode from 'jwt-decode'
import { H4 } from 'app/components/Typography'
import InputAdornment from '@mui/material/InputAdornment'

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
    '& .card': {
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
    const { LoginPrxo } = useAuth()
    useEffect(() => {
        let userExists = localStorage.getItem('prexo-authentication')
        if (userExists) {
            const { user_type } = jwt_decode(userExists)
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
            } else if (user_type == 'RDL-FLS') {
                navigate('/rdl-fls/dashboard')
            } else if (user_type == 'Sales Agent') {
                navigate('/sales/dashboard')
            } else if (user_type == 'Pricing Agent') {
                navigate('/pricing/dashboard')
            }
        } else {
            navigate('/')
        }
    }, [])
    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }

    const handleFormSubmit = async () => {
        try {
            setLoading(true)
            let response = await LoginPrxo(state.username, state.password)
            if (response.status == 200) {
                localStorage.setItem(
                    'prexo-authentication',
                    response.data.data.jwt
                )
                if (response.data.data?.user_type == 'super-admin') {
                    navigate('/sup-admin/dashboard')
                } else if (response.data.data?.user_type == 'MIS') {
                    navigate('/mis/dashboard')
                } else if (response.data.data?.user_type == 'Warehouse') {
                    navigate('/warehouse/dashboard')
                } else if (response.data.data?.user_type == 'Bag Opening') {
                    navigate('/bot/dashboard')
                } else if (response.data.data?.user_type == 'Charging') {
                    navigate('/charging/dashboard')
                } else if (response.data.data?.user_type == 'BQC') {
                    navigate('/bqc/dashboard')
                } else if (response.data.data?.user_type == 'Sorting Agent') {
                    navigate('/sorting/dashboard')
                } else if (response.data.data?.user_type == 'Audit') {
                    navigate('/audit/dashboard')
                } else if (response.data.data?.user_type == 'RDL-FLS') {
                    navigate('/rdl-fls/dashboard')
                } else if (response.data.data?.user_type == 'Sales Agent') {
                    navigate('/sales/dashboard')
                } else if (response.data.data?.user_type == 'Pricing Agent') {
                    navigate('/pricing/dashboard')
                }
            } else {
                setLoading(false)
                setMessage(response.data.data.message)
            }
        } catch (e) {
            setLoading(false)

            setMessage(e.message)
        }
    }
    let { username, password } = state
    const { palette } = useTheme()
    const textError = palette.error.main
    // PASSWORD SHOW AND HIDE
    const handleClickShowPassword = () => {
        setShowPassword((showPassword) => !showPassword)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }
    return (
        <RegisterRoot>
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
                                    label="Username"
                                    onChange={handleChange}
                                    type="text"
                                    name="username"
                                    value={username || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <TextValidator
                                    sx={{ mb: '16px', width: '100%' }}
                                    label="Password"
                                    variant="outlined"
                                    size="large"
                                    onChange={handleChange}
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
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
                                            Login
                                        </Button>
                                        {loading && (
                                            <CircularProgress
                                                size={24}
                                                className="buttonProgress"
                                            />
                                        )}
                                    </Box>
                                </FlexBox>
                            </ValidatorForm>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </RegisterRoot>
    )
}

export default Login
