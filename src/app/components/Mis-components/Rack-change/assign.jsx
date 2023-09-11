import React, { useState } from 'react'
import { Dialog, Button, TextField, MenuItem } from '@mui/material'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'
import { axiosMisUser } from '../../../../axios'
import Swal from 'sweetalert2'
import useAuth from 'app/hooks/useAuth'

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
    warehouseUser,
    isCheck,
}) => {
    const [scanOutWh, setScanOutWh] = useState('')
    const [scanInWh, setScanInWh] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
   
    const handelSendRequestConfirm = async () => {
        try {
            setLoading(true)
            let obj = {
                tray: isCheck,
                scanOutWh: scanOutWh,
                scanInWh: scanInWh,
                actUser: user.username,
            }
            let res = await axiosMisUser.post('/assignToAgent/rackChange', obj)
            if (res.status == 200) {
                handleClose()
                setLoading(false)
                Swal.fire({
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                setScanOutWh('')
                setScanInWh('')
                setIsAlive((isAlive) => !isAlive)
            } else {
                // setLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res?.data?.message,
                })
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
        <Dialog fullWidth maxWidth="xs" onClose={handleClose} open={open}>
            <Box p={3}>
                <H4 sx={{ mb: '20px' }}>Select Warehouse User</H4>
                <TextFieldCustOm
                    label="Scan out Wh Username"
                    fullWidth
                    select
                    name="username"
                >
                    {warehouseUser.map((data) => (
                        <MenuItem
                            key={data.user_name}
                            value={data.user_name}
                            onClick={(e) => {
                                setScanOutWh(data.user_name)
                            }}
                        >
                            {data.user_name}
                        </MenuItem>
                    ))}
                </TextFieldCustOm>
                <TextFieldCustOm
                    label="Scan in Wh Username"
                    fullWidth
                    select
                    name="scanOut"
                    disabled={scanOutWh === ''}
                >
                    {warehouseUser
                        .filter((data) => data.user_name !== scanOutWh) // Filter out the selected value
                        .map((data) => (
                            <MenuItem
                                key={data.user_name}
                                value={data.user_name}
                                onClick={(e) => {
                                    setScanInWh(data.user_name)
                                }}
                            >
                                {data.user_name}
                            </MenuItem>
                        ))}
                </TextFieldCustOm>

                <FormHandlerBox>
                    <Button
                        variant="contained"
                        disabled={loading || scanInWh == '' || scanOutWh == ''}
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
