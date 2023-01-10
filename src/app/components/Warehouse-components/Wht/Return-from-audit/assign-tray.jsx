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
import { axiosMisUser, axiosWarehouseIn } from '../../../../../axios'
import SearchIcon from '@mui/icons-material/Search'
import jwt_decode from 'jwt-decode'

const TextFieldCustOm = styled(TextField)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const FormHandlerBox = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const MemberEditorDialog = ({ handleClose, open, setIsAlive, auditUsers }) => {
    const [auditUserName, setAuditUsername] = useState('')
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
            let res = await axiosMisUser.post('/oneTrayAssigToAudit', state)
            if (res.status == 200) {
                setLoading(false)
                alert(res.data.message)
                setIsAlive((isAlive) => !isAlive)
                handleClose()
            } else {
                setLoading(false)
                alert(res.data.message)
            }
        } catch (error) {
            alert(error)
        }
    }
    const handelTrayId = async () => {
        try {
            let res = await axiosWarehouseIn.post(
                '/auditUserTrayForAssign',
                state
            )
            if (res.status === 200) {
                setTrayStatus(res.data.tray_status)
                setErr('')
                setAssignButDis(false)
            } else {
                console.log(res)
                setTrayStatus(res.data.tray_status)
                setErr(res.data.message)
            }
        } catch (error) {
            alert(error)
        }
    }
    return (
        <Dialog fullWidth maxWidth="xs" onClose={handleClose} open={open}>
            <Box p={3}>
                <H4 sx={{ mb: '20px' }}>Assign Tray</H4>
                <TextFieldCustOm
                    label="Username"
                    fullWidth
                    select
                    name="username"
                    onChange={handleChange}
                >
                    {auditUsers.map((data) => (
                        <MenuItem
                            key={data.user_name}
                            value={data.user_name}
                            onClick={(e) => {
                                setAuditUsername(data.user_name)
                            }}
                        >
                            {data.user_name}
                        </MenuItem>
                    ))}
                </TextFieldCustOm>
                <TextFieldCustOm
                    label="Tray Type"
                    fullWidth
                    select
                    name="tray_type"
                    onChange={handleChange}
                >
                    <MenuItem value={'LUT'}>LUT</MenuItem>
                    <MenuItem value={'DUT'}>DUT</MenuItem>
                    <MenuItem value={'RBQ'}>RBQ</MenuItem>
                    <MenuItem value={'CFT'}>CFT</MenuItem>
                    <MenuItem value={'STA'}>STA</MenuItem>
                    <MenuItem value={'STB'}>STB</MenuItem>
                    <MenuItem value={'STC'}>STC</MenuItem>
                    <MenuItem value={'STD'}>STD</MenuItem>
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
                                        state?.tray_type == '' ||
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
                        Assign
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
