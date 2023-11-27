import React, { useState, useEffect } from 'react'
import {
    Dialog,
    Button,
    TextField,
    MenuItem,
    InputAdornment,
    IconButton,
} from '@mui/material'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'
import { axiosSuperAdminPrexo, axiosWarehouseIn } from '../../../../../axios'
import SearchIcon from '@mui/icons-material/Search'
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2'

const TextFieldCustOm = styled(TextField)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const FormHandlerBox = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const MemberEditorDialog = ({
    handleClose,
    open,
    setIsAlive,
    RpBqcUsername,
}) => {
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({})
    const [err, setErr] = useState('')
    const [assignButDIs, setAssignButDis] = useState(true)
    const [trayStatus, setTrayStatus] = useState('')
    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }

    useEffect(() => {
        const user = localStorage.getItem('prexo-authentication')
        if (user) {
            const { location } = jwt_decode(user)
            setState({
                ...state,
                location: location,
            })
        }
    }, [])

    const handelSendRequestConfirm = async () => {
        try {
            setLoading(true)
            let res = await axiosWarehouseIn.post('/issuethe-tray-rpbqc', state)
            if (res.status == 200) {
                setLoading(false)

                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                setIsAlive((isAlive) => !isAlive)
                handleClose()
            } else {
                setLoading(false)

                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Ok',
                text: error,
            })
        }
    }
    const handelTrayId = async () => {
        try {
            let res = await axiosWarehouseIn.post(
                '/check-rpbqc-tray-for-issue',
                state
            )
            if (res.status === 200) {
                setTrayStatus(res.data.trayStatus)
                setErr('')
                setAssignButDis(false)
            } else {
                setTrayStatus(res.data?.trayStatus)
                setErr(res.data.message)
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Ok',
                text: error,
            })
        }
    }
    return (
        <Dialog fullWidth maxWidth="xs" onClose={handleClose} open={open}>
            <Box p={3}>
                <H4 sx={{ mb: '20px' }}>Issue RP-BQC Tray</H4>
                <TextFieldCustOm
                    label="RP-BQC Username"
                    fullWidth
                    select
                    name="username"
                    onChange={handleChange}
                >
                    {RpBqcUsername.map((data) => (
                        <MenuItem key={data.user_name} value={data.user_name}>
                            {data.user_name}
                        </MenuItem>
                    ))}
                </TextFieldCustOm>

                <TextFieldCustOm
                    label="Tray Id"
                    onChange={handleChange}
                    type="text"
                    name="tray_id"
                    error={err !== ''}
                    helperText={err}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton
                                    disabled={
                                        state?.username == '' ||
                                        state?.tray_id == ''
                                    }
                                    onClick={(e) => {
                                        handelTrayId()
                                    }}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextFieldCustOm
                    label="Tray Status"
                    disabled
                    type="text"
                    value={trayStatus}
                    name="tray_status"
                />
                <FormHandlerBox>
                    <Button
                        variant="contained"
                        disabled={loading || assignButDIs}
                        onClick={(e) => {
                            handelSendRequestConfirm()
                        }}
                        color="primary"
                        type="submit"
                    >
                        Issue
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleClose()}
                    >
                        Cancel
                    </Button>
                </FormHandlerBox>
            </Box>
        </Dialog>
    )
}

export default MemberEditorDialog
