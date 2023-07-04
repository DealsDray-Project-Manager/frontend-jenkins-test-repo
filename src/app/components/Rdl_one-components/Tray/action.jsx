import React, { useEffect, useState, useMemo } from 'react'
import MUIDataTable from 'mui-datatables'
import { Typography, Box, TextField, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { H3 } from 'app/components/Typography'
import { Button, Checkbox, Card } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { axiosRDL_oneAgent, axiosSuperAdminPrexo } from '../../../../axios'
import * as Yup from 'yup'
import useAuth from 'app/hooks/useAuth'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

const NumberInput = ({ digit, onChange }) => {
    const increaseNumber = () => {
        onChange(digit + 1)
    }

    const decreaseNumber = () => {
        if (digit > 1) {
            onChange(digit - 1)
        }
    }

    return (
        <Box display="flex" alignItems="left" justifyContent="left">
            <Box
                component="span"
                sx={{
                    border: '1px solid #ccc',
                    borderRight: 0,
                    padding: '15px',
                    margin: '0 px',
                    minWidth: '46px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {digit}
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                border="1px solid #ccc"
            >
                <ArrowDropUpIcon
                    onClick={increaseNumber}
                    style={{ cursor: 'pointer' }}
                />
                <ArrowDropDownIcon
                    onClick={decreaseNumber}
                    style={{ cursor: 'pointer' }}
                />
            </Box>
        </Box>
    )
}

const Actionfunction = () => {
    const [isCheck, setIsCheck] = useState([])
    const { state } = useLocation()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [partData, setPartData] = useState([])
    const [colorList, setColorList] = useState([])
    const [addButDis, setAddButDis] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState('')
    const { muic, allData, whtTrayId } = state

    useEffect(() => {
        const fetchPartList = async () => {
            try {
                let colorList = await axiosSuperAdminPrexo.post(
                    '/partAndColor/view/' + 'color-list'
                )
                if (colorList.status == 200) {
                    setColorList(colorList.data.data)
                }
                const fetch = await axiosRDL_oneAgent.post(
                    '/rdl-fls/fetchPart/' + muic
                )
                if (fetch.status == 200) {
                    for (let x of fetch.data.data) {
                        x.quantity = 1
                        setPartData((partData) => [...partData, x])
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchPartList()
    }, [])

    const schema = Yup.object().shape({
        selected_status: Yup.string().required('Required*').nullable(),
        description: Yup.string().required('Required*').nullable(),
        model_reg: Yup.string()
            .when('selected_status', (selected_status, schema) => {
                if (selected_status == 'Battery Damage') {
                    return schema.required('Required')
                }
            })
            .nullable(),
        color: Yup.string()
            .when('selected_status', (selected_status, schema) => {
                if (selected_status == 'Battery Damage') {
                    return schema.required('Required')
                }
            })
            .nullable(),
    })

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    })

    const handleChange = (newValue, rowIndex) => {
        setPartData((prevValues) => {
            const updatedValues = [...prevValues]
            updatedValues[rowIndex].quantity = newValue
            return updatedValues
        })
    }

    const handleClick = (e, rowIndex, quantity) => {
        const { id, checked } = e.target
        setIsCheck([...isCheck, id])
        // handleChange(quantity + 1, rowIndex)
        if (!checked) {
            // handleChange(0, rowIndex)
            setIsCheck(isCheck.filter((item) => item !== id))
        }
    }

    // HANDEL SUBMIT
    const onSubmit = async (values) => {
        try {
            setAddButDis(true)
            if (values.selected_status !== 'Battery Damage') {
                values.model_reg = ''
                values.color = ''
            }

            if (values.selected_status == 'Repair Required') {
                let arr = []
                for (let x of partData) {
                    if (isCheck.includes(x.part_code)) {
                        let obj = {
                            part_id: x.part_code,
                            part_name: x.name,
                            quantity: x.quantity,
                        }
                        arr.push(obj)
                    }
                }
                values.partRequired = arr
            }
            values.username = user.name
            let objData = {
                trayId: whtTrayId,
                rdl_fls_report: values,
                uic: allData.uic,
            }
            let res = await axiosRDL_oneAgent.post(
                '/wht-add-actual-item',
                objData
            )
            if (res.status == 200) {
                setAddButDis(false)
                navigate('/rdL-fls/tray/approve/' + whtTrayId)
            } else {
                setAddButDis(false)
                alert(res.data.data)
            }
        } catch (error) {
            alert(error)
        }
    }

    const columns = [
        {
            name: 'part_code',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Select</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <Checkbox
                            onClick={(e) => {
                                handleClick(
                                    e,
                                    tableMeta.rowIndex,
                                    tableMeta.rowData[5]
                                )
                            }}
                            id={value}
                            key={value}
                            checked={isCheck.includes(value)}
                        />
                    )
                },
            },
        },
        {
            name: 'index',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Record No</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: true,
                customBodyRender: (rowIndex, dataIndex) =>
                    dataIndex.rowIndex + 1,
            },
        },
        {
            name: 'part_code',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Part No</>
                </Typography>
            ),
            options: {
                filter: true,
                sort: false,
                setCellProps: () => ({ marginLeft: '10px' }),
            },
        },
        {
            name: 'name',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Part Name</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'color',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Color</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'quantity',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Quantity</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    const rowIndex = tableMeta.rowIndex
                    if (isCheck.includes(tableMeta.rowData[0])) {
                        // return (
                        return value
                        //     <NumberInput
                        //         digit={digit}
                        //         // onChange={(newValue) =>
                        //         //     handleChange(newValue, rowIndex)
                        //         // }
                        //     />
                        // )
                    }
                },
            },
        },
    ]

    const tableData = useMemo(() => {
        return (
            <MUIDataTable
                title={'Repair Required Parts'}
                columns={columns}
                data={partData}
                options={{
                    filterType: 'textField',
                    responsive: 'simple',
                    download: false,
                    print: false,
                    textLabels: {
                        body: {
                            noMatch:
                                'Sorry, there is no matching data to display',
                        },
                    },
                    selectableRows: 'none',
                    elevation: 0,
                    lastrow,
                    rowsPerPageOptions: [5, 10, 25, 50, 100], // Customize the rows per page options
                }}
            />
        )
    }, [partData, columns])

    const lastrow = {
        customToolbar: () => {
            return (
                <>
                    <Typography>
                        Total Parts for Repair = {isCheck.length}
                    </Typography>
                </>
            )
        },
    }
    return (
        <Box sx={{ p: 2 }}>
            <H3>MUIC Detail:{muic}</H3>
            <H3>UIC Detail:{allData?.uic}</H3>
            <br />
            <TextField
                select
                {...register('selected_status')}
                error={errors.selected_status ? true : false}
                helperText={errors.selected_status?.message}
                sx={{ width: '180px' }}
                label="Select an Option"
            >
                <MenuItem
                    value="Battery Boosted"
                    onClick={() => setSelectedStatus('Battery Boosted')}
                >
                    Battery Boosted
                </MenuItem>
                <MenuItem
                    value="Charge jack Replaced & Boosted"
                    onClick={() =>
                        setSelectedStatus('Charge jack Replaced & Boosted')
                    }
                >
                    Charge jack Replaced & Boosted
                </MenuItem>
                <MenuItem
                    value="Battery Damage"
                    onClick={() => setSelectedStatus('Battery Damage')}
                >
                    Battery Damage
                </MenuItem>
                <MenuItem
                    value="Repair Required"
                    onClick={() => setSelectedStatus('Repair Required')}
                >
                    Repair Required
                </MenuItem>
                <MenuItem
                    value="Accept Auditor Feedback"
                    onClick={() => setSelectedStatus('Accept Auditor Feedback')}
                >
                    Accept Auditor Feedback
                </MenuItem>
                <MenuItem
                    value="Unlocked"
                    onClick={() => setSelectedStatus('Unlocked')}
                >
                    Unlocked
                </MenuItem>
                <MenuItem
                    value="Issue Resolved Through Software"
                    onClick={() =>
                        setSelectedStatus('Issue Resolved Through Software')
                    }
                >
                    Issue Resolved Through Software
                </MenuItem>
                <MenuItem
                    value="Dead"
                    onClick={() => setSelectedStatus('Dead')}
                >
                    Dead
                </MenuItem>
            </TextField>
            <br />

            {selectedStatus == 'Battery Damage' ? (
                <>
                    <TextField
                        defaultValue={getValues('model_reg')}
                        label="Model"
                        variant="outlined"
                        type="text"
                        {...register('model_reg')}
                        sx={{ width: '180px', mt: 2 }}
                        error={errors.model_reg ? true : false}
                        helperText={errors.model_reg?.message}
                    />
                    <br />
                    <TextField
                        defaultValue={getValues('color')}
                        label="Color"
                        variant="outlined"
                        select
                        type="text"
                        {...register('color')}
                        error={errors?.color ? true : false}
                        helperText={errors?.color?.message}
                        sx={{ width: '180px', mt: 2 }}
                    >
                        {colorList.map((data) => (
                            <MenuItem value={data.name}>{data.name}</MenuItem>
                        ))}
                    </TextField>
                </>
            ) : (
                ''
            )}
            <br />
            <TextField
                defaultValue={getValues('description')}
                sx={{ width: '180px', mt: 2 }}
                label="Description"
                type="text"
                {...register('description')}
                error={errors.description ? true : false}
                helperText={errors.description?.message}
            ></TextField>

            <br />
            <Box sx={{ textAlign: 'right' }}>
                <Button
                    type="submit"
                    disabled={
                        addButDis ||
                        (selectedStatus == 'Repair Required' &&
                            isCheck.length == 0)
                    }
                    onClick={handleSubmit(onSubmit)}
                    variant="contained"
                    color="primary"
                >
                    Submit
                </Button>

                <br />
            </Box>
            <br />
            {selectedStatus == 'Repair Required' ? (
                <>
                    {tableData}
                    <br />
                    <Card sx={{ p: 2 }}>
                        <Typography>
                            Total Parts for repair: {isCheck.length}{' '}
                        </Typography>
                    </Card>
                </>
            ) : (
                ''
            )}
            <br />
        </Box>
    )
}

export default Actionfunction
