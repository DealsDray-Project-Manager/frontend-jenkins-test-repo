import { Box, Card, Divider, Stack, Typography, Grid } from '@mui/material'
const Orderdetails = ({ OrderDetails }) => {
    return (
        <Card
            sx={{
                // width: '920px',
                marginTop: '40px',
                marginTop: '40px',
                border: '1px solid black',
            }}
        >
            <br />
            <Typography
                sx={{
                    margin: '0px 0px 15px 33px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                }}
            >
                Order details
            </Typography>
            <Divider />
            <Stack
                
                sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
            >
                <Box sx={{ p: 2, display: 'flex' }}>
                    <Grid item xs={12} md={6}>
                    <Box>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            IMEI: {OrderDetails?.[0]?.imei}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Item id: {OrderDetails?.[0]?.item_id}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Order id: {OrderDetails?.[0]?.order_id}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Order date:{' '}
                            {OrderDetails?.[0]?.order_date == null
                                ? ''
                                : new Date(
                                      OrderDetails?.[0]?.order_date
                                  ).toLocaleString('en-GB', {
                                      year: 'numeric',
                                      month: '2-digit',
                                      day: '2-digit',
                                  })}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Old item details:{' '}
                            {OrderDetails?.[0]?.old_item_details}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Buyback category:{' '}
                            {OrderDetails?.[0]?.buyback_category}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            GEP order: {OrderDetails?.[0]?.gep_order}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Base discount: {OrderDetails?.[0]?.base_discount}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Order time stamp:{' '}
                            {OrderDetails?.[0]?.order_timestamp == null
                                ? ''
                                : new Date(
                                      OrderDetails?.[0]?.order_timestamp
                                  ).toLocaleString('en-GB', {
                                      year: 'numeric',
                                      month: '2-digit',
                                      day: '2-digit',
                                  })}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Order status: {OrderDetails?.[0]?.order_status}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Customer declaration_physical_defect_present:{' '}
                            {
                                OrderDetails?.[0]
                                    ?.customer_declaration_physical_defect_present
                            }
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            VC eligible: {OrderDetails?.[0]?.vc_eligible}
                        </Typography>
                    </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <Box sx={{ marginLeft: '50px' }}>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Partner shop: {OrderDetails?.[0]?.partner_shop}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Partner email: {OrderDetails?.[0]?.partner_email}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Partner id: {OrderDetails?.[0]?.partner_id}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Revised partner price:{' '}
                            {OrderDetails?.[0]?.revised_partner_price}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Partner purchase price:{' '}
                            {OrderDetails?.[0]?.partner_purchase_price}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Delivery date:{' '}
                            {OrderDetails?.[0]?.delivery_date == null
                                ? ''
                                : new Date(
                                      OrderDetails?.[0]?.delivery_date
                                  ).toLocaleString('en-GB', {
                                      year: 'numeric',
                                      month: '2-digit',
                                      day: '2-digit',
                                  })}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Delivery fee: {OrderDetails?.[0]?.delivery_fee}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Delivery status:{' '}
                            {OrderDetails?.[0]?.delivery_status}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            Exchange facilitation_fee:
                            {OrderDetails?.[0]?.exchange_facilitation_fee}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            GC amount redeemed:{' '}
                            {OrderDetails?.[0]?.gc_amount_redeemed}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '16px', marginBottom: '15px' }}
                        >
                            GC redeem time:{' '}
                            {OrderDetails?.[0]?.gc_redeem_time == null
                                ? ''
                                : new Date(
                                      OrderDetails?.[0]?.gc_redeem_time
                                  ).toLocaleString('en-GB', {
                                      year: 'numeric',
                                      month: '2-digit',
                                      day: '2-digit',
                                  })}
                        </Typography>
                    </Box>
                    </Grid>
                </Box>
            </Stack>
        </Card>
    )
}

export default Orderdetails
