// import { Box, Card, Divider, Stack } from "@mui/material";
<<<<<<< HEAD

import { Button, Card, TextField, styled } from '@mui/material';
import Bagdetails from "./bagdetails";
import Botdetails from "./botdetails";
import Deliverydetails from "./deliverydetails";
import MMTdetails from "./mmtdetails";
import Orderdetails from "./orderdetails";
import PMTdetails from "./pmtdetails";
import WHTdetails from "./whtdetails";
import Mobiledetails from './mobiledetails';
import Chargingdetails from './charging';

const Container = styled('div')(({ theme }) => ({
  margin: '40px',
  [theme.breakpoints.down('sm')]: {
      margin: '16px',
  },
  '& .breadcrumb': { 
      marginBottom: '30px',
      [theme.breakpoints.down('sm')]: {
          marginBottom: '16px',
      },
  },
}))
const Search = () => {
    return ( 
       
         <Container >
          
            <h3><b>Track Item</b></h3>
           
           {/* <input type="text" placeholder="Search by UIC/IMEI" style={{width:'340px', padding:'8px 5px', borderRadius:'5px'}} /> */}
           {/* <button style={{padding:'8px 29px', marginLeft:'20px', backgroundColor:'lightpink', borderRadius:'5px'}}>SEARCH</button> */}
         
           
           <TextField 
                type="search" 
                label="Search by UIC/IMEI"
                errorMessages={["this field is required"]}
                inputProps={{
                    style:{
                        width: "280px"
                    }
                }}
           />
           <Button
                
                variant="contained"
                color="primary"
                 sx={{ml:2,mt:1}}
                >
                Search
            </Button>

       
           
        
           <Mobiledetails/>
           <Orderdetails/>
           <Deliverydetails/>
           <Bagdetails />
           <Botdetails/>
           <PMTdetails/>
           <MMTdetails/>
           <WHTdetails/>
           {/* <Chargingdetails/> */}
          

          
           </Container>
           
         

    
     );
}
 
export default Search;


=======
import React, { useState, useEffect } from 'react'
import { Button, Card, TextField, styled } from '@mui/material'
import Bagdetails from './bagdetails'
import Botdetails from './botdetails'
import Deliverydetails from './deliverydetails'
import MMTdetails from './mmtdetails'
import Orderdetails from './orderdetails'
import PMTdetails from './pmtdetails'
import WHTdetails from './whtdetails'
import Mobiledetails from './mobiledetails'
import jwt_decode from 'jwt-decode'
import { axiosReportingAgent } from '../../../../../axios'
import Swal from 'sweetalert2'

const Container = styled('div')(({ theme }) => ({
    margin: '40px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))
const Search = () => {
    const [result, setResult] = useState([])
    const [textDisplay, setTextDisplay] = useState('')
    const [location, setLocation] = useState('')
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        let user = localStorage.getItem('prexo-authentication')
        if (user) {
            let { location } = jwt_decode(user)
            setLocation(location)
        }
    }, [])

    // SEARCH ITEM API CALLING

    const searchItem = async () => {
        try {
            let obj = {
                inputData: searchInput,
                location: location,
            }
            const res = await axiosReportingAgent.post('/track-item', obj)
            if (res.status == 200) {
                setResult(res.data.data)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.message,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload(true)
                    }
                })
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <Container>
            <h3>
                <b>Track Item</b>
            </h3>

            {/* <input type="text" placeholder="Search by UIC/IMEI" style={{width:'340px', padding:'8px 5px', borderRadius:'5px'}} /> */}
            {/* <button style={{padding:'8px 29px', marginLeft:'20px', backgroundColor:'lightpink', borderRadius:'5px'}}>SEARCH</button> */}

            <TextField
                type="search"
                label="Search by UIC/IMEI"
                onChange={(e) => {
                    setSearchInput(e.target.value)
                }}
                errorMessages={['this field is required']}
                inputProps={{
                    style: {
                        width: '280px',
                    },
                }}
            />
            <Button
                variant="contained"
                onClick={(e) => {
                    searchItem(e)
                }}
                disabled={searchInput == ''}
                color="primary"
                sx={{ ml: 2, mt: 1 }}
            >
                Search
            </Button>

            <Mobiledetails ProdutDetails={result?.[0]?.products} />
            <Orderdetails OrderDetails={result?.[0]?.order} />
            <Deliverydetails
                Deliverydetails={{
                    imei: result?.[0]?.imei,
                    item_id: result?.[0]?.item_id,
                    uic: result?.[0]?.uic_code?.code,
                    uic_created: result?.[0]?.uic_code?.created_at,
                    uic_created_user: result?.[0]?.uic_code?.user,
                    uic_status: result?.[0]?.uic_status,
                    tracking_id: result?.[0]?.tracking_id,
                    order_date: result?.[0]?.order_date,
                    order_id: result?.[0]?.order_id,
                    delivery_date: result?.[0]?.delivery_date,
                    partner_purchase_price: result?.[0]?.partner_purchase_price,
                    base_discount: result?.[0]?.base_discount,
                    partner_shop: result?.[0]?.partner_shop,
                    diagnostics_discount: result?.[0]?.diagnostics_discount,
                    storage_disscount: result?.[0]?.storage_disscount,
                    buyback_category: result?.[0]?.buyback_category,
                    doorsteps_diagnostics: result?.[0]?.doorsteps_diagnostics,
                }}
            />

            <Bagdetails
                BagDetails={{
                    bag_id: result?.[0]?.bag_id,
                    bag_close_date: result?.[0]?.bag_close_date,
                    stock_in_status: result?.[0]?.stock_in_status,
                    assign_to_agent: result?.[0]?.assign_to_agent,
                    agent_name: result?.[0]?.agent_name,
                    tray_closed_by_bot: result?.[0]?.tray_closed_by_bot,
                }}
            />
            {result?.[0]?.tray_type == 'BOT' ||
            result?.[0]?.tray_type == 'WHT' ? (
                <Botdetails
                    BotTrayDetails={{
                        tray_id: result?.[0]?.tray_id,
                        assign_to_agent: result?.[0]?.assign_to_agent,
                        agent_name: result?.[0]?.agent_name,
                        tray_closed_by_bot: result?.[0]?.tray_closed_by_bot,
                        bot_done_received: result?.[0]?.bot_done_received,
                        tray_close_wh_date: result?.[0]?.tray_close_wh_date,
                        sorting_agent_name: result?.[0]?.sorting_agent_name,
                        handover_sorting_date:
                            result?.[0]?.handover_sorting_date,
                            tray_status:result?.[0]?.tray_status,
                    tray_location:result?.[0]?.tray_location
                    }}
                />
            ) : result?.[0]?.tray_type == 'PMT' ? (
                <PMTdetails
                    PmtTrayDetails={{
                        tray_id: result?.[0]?.tray_id,
                        assign_to_agent: result?.[0]?.assign_to_agent,
                        agent_name: result?.[0]?.agent_name,
                        tray_closed_by_bot: result?.[0]?.tray_closed_by_bot,
                        bot_done_received: result?.[0]?.bot_done_received,
                        tray_close_wh_date: result?.[0]?.tray_close_wh_date,
                        tray_status:result?.[0]?.tray_status,
                    tray_location:result?.[0]?.tray_location
                    }}
                />
            ) : (
                <MMTdetails
                    MmtTrayDetails={{
                        tray_id: result?.[0]?.tray_id,
                        assign_to_agent: result?.[0]?.assign_to_agent,
                        agent_name: result?.[0]?.agent_name,
                        tray_closed_by_bot: result?.[0]?.tray_closed_by_bot,
                        bot_done_received: result?.[0]?.bot_done_received,
                        tray_close_wh_date: result?.[0]?.tray_close_wh_date,
                        tray_status:result?.[0]?.tray_status,
                    tray_location:result?.[0]?.tray_location
                    }}
                />
            )}
            <WHTdetails
                WhtTrayDetails={{
                    wht_tray: result?.[0]?.wht_tray,
                    wht_tray_assigned_date: result?.[0]?.wht_tray_assigned_date,
                    received_from_sorting: result?.[0]?.received_from_sorting,
                    closed_from_sorting: result?.[0]?.closed_from_sorting,
                    agent_name_charging: result?.[0]?.agent_name_charging,
                    assign_to_agent_charging:
                        result?.[0]?.assign_to_agent_charging,
                    charging_in_date: result?.[0]?.charging_in_date,
                    charging_done_date: result?.[0]?.charging_done_date,
                    charging_done_received: result?.[0]?.charging_done_received,
                    charging_done_close: result?.[0]?.charging_done_close,
                    agent_name_bqc: result?.[0]?.agent_name_bqc,
                    assign_to_agent_bqc: result?.[0]?.assign_to_agent_bqc,
                    bqc_out_date: result?.[0]?.bqc_out_date,
                    bqc_done_received: result?.[0]?.bqc_done_received,
                    bqc_done_close: result?.[0]?.bqc_done_close,
                    issued_to_audit: result?.[0]?.issued_to_audit,
                    audit_user_name: result?.[0]?.audit_user_name,
                    audit_done_date: result?.[0]?.audit_done_date,
                    audit_done_recieved: result?.[0]?.audit_done_recieved,
                    audit_done_close: result?.[0]?.audit_done_close,
                    rdl_fls_one_user_name: result?.[0]?.rdl_fls_one_user_name,
                    rdl_fls_issued_date: result?.[0]?.rdl_fls_issued_date,
                    rdl_fls_closed_date: result?.[0]?.rdl_fls_closed_date,
                    rdl_fls_done_recieved_date:
                        result?.[0]?.rdl_fls_done_recieved_date,
                    rdl_fls_done_closed_wh: result?.[0]?.rdl_fls_done_closed_wh,
                    tray_status:result?.[0]?.tray_status,
                    tray_location:result?.[0]?.tray_location
                }}
            />
        </Container>
    )
}

export default Search
>>>>>>> 48a79c73e263980ac2c96f81ff3f7701c58ed89a
