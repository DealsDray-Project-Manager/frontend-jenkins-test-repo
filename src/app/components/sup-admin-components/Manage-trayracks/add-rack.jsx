import React, { useEffect, useState, Controller } from 'react'
import {
    Dialog,
    Button,
    Grid,
    TextField,MenuItem
} from '@mui/material'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import { useTheme } from '@mui/material/styles'
import { axiosSuperAdminPrexo } from '../../../../axios'

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
    open,
    handleClose,
    setIsAlive,
    editFetchData,
    setEditFetchData,
    trayRackId,
    settrayRackId,
}) => {
    const [location, setLocation] = useState('')
    const [warehouse, setWarehouse] = useState([])
    const [locationDrop, setLocationDrop] = useState([])
    const [loading, setLoading] = useState(false)
    const [allModel, setAllModel] = useState([])
    const [categorys, setCategorys] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            if (Object.keys(editFetchData).length !== 0) {
                reset({ ...editFetchData })
                // setPersonName(editFetchData.location)
                settrayRackId(editFetchData.trayRackId)
                open()
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axiosSuperAdminPrexo.post('/getLocation')
                if (res.status == 200) {
                    setLocationDrop(res.data.data)
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (Object.keys(editFetchData).length !== 0) {
            reset({ ...editFetchData })
            fetchModel(editFetchData.brand)
            let arr = []
            let obj = {
                name: editFetchData.warehouse,
            }
            let objOne = {
                code: editFetchData.tray_grade,
            }
            let arrOne = []
            arrOne.push(objOne)
            setCategorys(arrOne)
            arr.push(obj)
            setWarehouse(arr)
            open()
        }
    }, [])

     /* Fetch model */
     const fetchModel = async (brandName) => {
        try {
            let res = await axiosSuperAdminPrexo.post(
                '/get-product-model/' + brandName
            )
            if (res.status == 200) {
                setAllModel(res.data.data)
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    }

    async function getCpcData(name, code) {
        try {
            let obj = {
                name: name,
                code: code,
            }
            let response = await axiosSuperAdminPrexo.post(
                '/getWarehouseByLocation',
                obj
            )
            if (response.status == 200) {
                setWarehouse(response.data.data.warehouse)
            }
        } catch (error) {}
    }

    const schema = Yup.object().shape({
        rack_id: Yup.string().required('Required*').nullable(),
        name: Yup.string()
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid name')
            .max(40)
            .required('Required*')
            .nullable(),
        display: Yup.string()
            .required('Required*')
            .matches(
                /^.*((?=.*[aA-zZ\s]){1}).*$/,
                'Please enter valid display name'
            )
            .max(100)
            .nullable(),
        parent_id: Yup.string().required('Required*').nullable(),
        warehouse: Yup.string().required('Required*').nullable(),
    })

    // console.log(errors)

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
        // setValue,
    } = useForm({
        resolver: yupResolver(schema),
        // defaultValues: {
        //     location: [], // Set initial values here
        // },
    })

    const onSubmit = async (data) => {
        data.created_at = Date.now()
        try {
            setLoading(true)
            let response = await axiosSuperAdminPrexo.post(
                '/trayracks/create',
                data
            )
            if (response.status == 200) {
                setLoading(false)
                handleClose()
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Successfully Added',
                    confirmButtonText: 'Ok',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        setIsAlive((isAlive) => !isAlive)
                    }
                })
            } else {
                setLoading(false)
                handleClose()
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: response.data.message,
                    showConfirmButton: false,
                })
            }
        } catch (error) {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Ok',
                text: error,
            })
        }
    }
    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        }
    }
    const handelEdit = async (data) => {
        try {
            let response = await axiosSuperAdminPrexo.post(
                '/trayracks/edit',
                data
            )
            if (response.status == 200) {
                setEditFetchData({})
                handleClose()
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Update Successfully',
                    confirmButtonText: 'Ok',
                    // allowOutsideClick: false,
                    // allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        setIsAlive((isAlive) => !isAlive)
                    }
                })
            } else {
                setEditFetchData({})
                handleClose()
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: 'Please check',
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

return (
    <Dialog open={open}>
    <Box p={3}>
        <H4 sx={{ mb: '20px' }}>Rack</H4>

        <Grid sx={{ mb: '16px' }} container spacing={4}>
            <Grid item sm={6} xs={12}>
            <TextFieldCustOm
                label="Rack ID"
                type="text"
                name="rack_id"
                value={trayRackId}
                {...register('rack_id')}
                disabled={Object.keys(editFetchData).length !== 0}
                error={errors.trayRackId ? true : false}
                helperText={
                    errors.trayRackId
                        ? errors.trayRackId?.message
                        : ''
                }
            />

                <TextFieldCustOm
                    label="Rack Name"
                    type="text"
                    name="name"
                    {...register('name')}
                    error={errors.name ? true : false}
                    helperText={errors.name ? errors.name.message : ''}
                />

                <TextFieldCustOm
                    label="Rack Display"
                    type="text"
                    name="display"
                    {...register('display')}
                    error={errors.display ? true : false}
                    helperText={
                        errors.display ? errors.display.message : ''
                    }
                />
            </Grid>

            <Grid item sm={6} xs={12}>
            <TextFieldCustOm
                label="Location"
                select
                name="parent_id"
                {...register('parent_id')}
                error={errors.parent_id ? true : false}
                helperText={errors.parent_id?.message}
                defaultValue={getValues('parent_id')}
            >
                {locationDrop.map((data) => (
                    <MenuItem
                        onClick={() => {
                            getCpcData(
                                data.code,
                                data.location_type
                            )
                        }}
                        value={data.code}
                    >
                        {data.code}
                    </MenuItem>
                ))}
            </TextFieldCustOm>
            <TextFieldCustOm
                label="Warehouse"
                select
                type="text"
                name="warehouse"
                defaultValue={getValues('warehouse')}
                {...register('warehouse')}
                // disabled={
                //     getValues('type_taxanomy') == 'WHT' &&
                //     Object.keys(editFetchData).length !== 0
                // }
                error={errors.warehouse ? true : false}
                helperText={errors.warehouse?.message}
            >
                {warehouse.map((data) => (
                    <MenuItem key={data.name} value={data.name}>
                        {data.name}
                    </MenuItem>
                ))}
            </TextFieldCustOm>
            </Grid>
        </Grid>

        <FormHandlerBox>
            <Button
                variant="contained"
                disabled={loading}
                onClick={
                    Object.keys(editFetchData).length !== 0
                        ? handleSubmit(handelEdit)
                        : handleSubmit(onSubmit)
                }
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
    </Box>
    </Dialog>
    )
}

export default MemberEditorDialog




