import React, { useState } from 'react'
import { Dialog, Button, TextField, MenuItem } from '@mui/material'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'
import { axiosMisUser } from '../../../../../axios'

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
    auditUsers,
    isCheck,
}) => {
    const [auditUserName, setAuditUsername] = useState('')
    const [loading, setLoading] = useState(false)

    const handelSendRequestConfirm = async () => {
        try {
            setLoading(true)
            let obj = {
                tray: isCheck,
                user_name: auditUserName,
                sort_id: 'Send for Audit',
            }
            let res = await axiosMisUser.post('/wht-sendTo-wharehouse', obj)
            if (res.status == 200) {
                handleClose()
                setLoading(false)
                alert(res.data.message)
                setIsAlive((isAlive) => !isAlive)
            } else {
                setLoading(false)
                alert(res.data.message)
            }
        } catch (error) {
            alert(error)
        }
    }
    return (
        <Dialog fullWidth maxWidth="xs" onClose={handleClose} open={open}>
            <Box p={3}>
                <H4 sx={{ mb: '20px' }}>Select Audit User</H4>
                <TextFieldCustOm
                    label="Username"
                    fullWidth
                    select
                    name="username"
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
                <FormHandlerBox>
                    <Button
                        variant="contained"
                        disabled={loading || auditUserName == ''}
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
