import React, { useState } from 'react'
// import { getUserById, updateUser, addNewUser } from './TableService'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Dialog, Button, Grid } from '@mui/material'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'
import Avatar from '@mui/material/Avatar'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const FormHandlerBox = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const MemberEditorDialog = ({ uid, open, handleClose }) => {
    const [state, setState] = useState({
        name: '',
        email: '',
        phone: '',
        balance: '',
        age: '',
        company: '',
        address: '',
        isActive: false,
    })

    const handleChange = (event, source) => {
        event.persist()
        if (source === 'switch') {
            setState({
                ...state,
                isActive: event.target.checked,
            })
            return
        }

        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    // const handleFormSubmit = () => {
    //     let { id } = state
    //     if (id) {
    //         updateUser({
    //             ...state,
    //         }).then(() => {
    //             handleClose()
    //         })
    //     } else {
    //         addNewUser({
    //             id: generateRandomId(),
    //             ...state,
    //         }).then(() => {
    //             handleClose()
    //         })
    //     }
    // }

    // useEffect(() => {
    //     getUserById(uid).then((data) => setState({ ...data.data }))
    // }, [uid])

    return (
        <Dialog onClose={handleClose} open={open}>
            <Box p={3}>
                <H4 sx={{ mb: '20px' }}>ADD Member</H4>

                <Avatar
                    src=""
                    style={{
                        borderRadius: '50%',
                        margin: 'auto',
                        marginBottom: '15px',
                        height: '57px',
                        width: '57px',
                    }}
                />

                <ValidatorForm>
                    <Grid sx={{ mb: '16px' }} container spacing={4}>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                label="Profile"
                                type="file"
                                InputLabelProps={{ shrink: true }}
                                name="name"
                                value={state?.name}
                                onChange={handleChange}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                label="Name"
                                type="text"
                                name="name"
                                value={state?.name}
                                onChange={handleChange}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                label="User Name"
                                type="text"
                                name="user_name"
                                value={state?.email}
                                onChange={handleChange}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                label="User Type"
                                type="text"
                                name="user_type"
                                value={state?.phone}
                                onChange={handleChange}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                label="Device Name"
                                onChange={handleChange}
                                type="text"
                                name="device_name"
                                value={state?.balance}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                label="Confirm Password"
                                onChange={handleChange}
                                type="text"
                                name="address"
                                value={state?.address}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                        </Grid>

                        <Grid item sm={6} xs={12}>
                            <TextField
                                label="Email"
                                onChange={handleChange}
                                type="email"
                                name="email"
                                value={state?.age}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                label="Mobile No"
                                onChange={handleChange}
                                type="number"
                                name="contact"
                                value={state?.company}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                label="CPC"
                                onChange={handleChange}
                                type="text"
                                name="cpc"
                                value={state?.address}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                label="Device Id"
                                onChange={handleChange}
                                type="text"
                                name="address"
                                value={state?.address}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                label="Password"
                                onChange={handleChange}
                                type="text"
                                name="address"
                                value={state?.address}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                        </Grid>
                    </Grid>

                    <FormHandlerBox>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleClose()}
                        >
                            Cancel
                        </Button>
                    </FormHandlerBox>
                </ValidatorForm>
            </Box>
        </Dialog>
    )
}

export default MemberEditorDialog
