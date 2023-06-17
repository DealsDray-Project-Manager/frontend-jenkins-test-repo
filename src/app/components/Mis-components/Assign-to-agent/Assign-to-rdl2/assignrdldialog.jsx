import React, { useState } from 'react'
import { Dialog, Button, TextField, MenuItem, Typography } from '@mui/material'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'
import { axiosMisUser } from '../../../../../axios'
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
    chargingUsers,
    isCheck,
}) => {
    const [bqcuserName, setBqcUserName] = useState('')
    const [loading, setLoading] = useState(false)

    const handelSendRequestConfirm = async () => {
        try {
            setLoading(true)
            let obj = {
                tray: isCheck,
                user_name: bqcuserName,
                sort_id: 'Send for BQC',
            }
            let res = await axiosMisUser.post('/wht-sendTo-wharehouse', obj)
            if (res.status == 200) {
                setLoading(false)
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })

                setBqcUserName('')
                setIsAlive((isAlive) => !isAlive)
                handleClose()
            } else {
                setLoading(false)

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

    
const handlerecieve = () => {
    handleClose()
    Swal.fire({
        title: 'Assigned Successfully',
        icon: 'success'
    })
}
    return (
        <Dialog fullWidth maxWidth="xs" onClose={handleClose} open={open}>
            <Box p={3}>
                <H4 sx={{ mb: '20px' }}>Select RDL 2 User</H4>
                <Box sx={{display:'flex', justifyContent:'space-between'}}>
                    <Typography>SP18001</Typography>
                    <Typography>RP18098</Typography>
                </Box>
                <br />
                <TextFieldCustOm
                    label="Enter the Count"
                    fullWidth
                    name="username"
                    required
                />
              
                <FormHandlerBox>
                <Button
                    
                    variant="contained"
                    // disabled={loading || bqcuserName == ''}
                    onClick={(e) => {
                        handlerecieve()
                    }}
                    color="success"
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
