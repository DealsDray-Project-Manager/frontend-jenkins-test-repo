import axios from 'axios'

export const baseURL = 'http://localhost:8000'
// export const baseURL = 'https://prexo-v9-2-uat-api.dealsdray.com'


export const axiosSuperAdminPrexo = axios.create({
    baseURL: `${baseURL}/api/v7/superAdmin`,
    headers: { 'x-access-token': localStorage.getItem('prexo-authentication') },
})
export const axiosMisUser = axios.create({
    baseURL: `${baseURL}/api/v7/mis`,
    headers: { 'x-access-token': localStorage.getItem('prexo-authentication') },
})
export const axiosWarehouseIn = axios.create({
    baseURL: `${baseURL}/api/v7/warehouseIn`,
    headers: { 'x-access-token': localStorage.getItem('prexo-authentication') },
})
export const axiosBot = axios.create({
    baseURL: `${baseURL}/api/v7/bot`,
    headers: { 'x-access-token': localStorage.getItem('prexo-authentication') },
})
export const axiosCharging = axios.create({
    baseURL: `${baseURL}/api/v7/charging`,
    headers: { 'x-access-token': localStorage.getItem('prexo-authentication') },
})
export const axiosBqc = axios.create({
    baseURL: `${baseURL}/api/v7/bqc`,
    headers: { 'x-access-token': localStorage.getItem('prexo-authentication') },
})
export const axiosSortingAgent = axios.create({
    baseURL: `${baseURL}/api/v7/sorting-agnet`,
    headers: { 'x-access-token': localStorage.getItem('prexo-authentication') },
})
export const axiosAuditAgent = axios.create({
    baseURL: `${baseURL}/api/v7/audit-agent`,
    headers: { 'x-access-token': localStorage.getItem('prexo-authentication') },
})

export const axiosRDL_oneAgent = axios.create({
    baseURL: `${baseURL}/api/v7/RDL_onePanel`,
    headers: { 'x-access-token': localStorage.getItem('prexo-authentication') },
})

export const axiosSalsAgent = axios.create({
    baseURL: `${baseURL}/api/v7/sales-agent`,
    headers: { 'x-access-token': localStorage.getItem('prexo-authentication') },
})

export const axiospricingAgent = axios.create({
    baseURL: `${baseURL}/api/v7/pricing-agent`,
    headers: { 'x-access-token': localStorage.getItem('prexo-authentication') },
})

export const axiosReportingAgent = axios.create({
    baseURL: `${baseURL}/api/v7/reporting-agent`,
    headers: { 'x-access-token': localStorage.getItem('prexo-authentication') },
})
export const axiosRdlTwoAgent = axios.create({
    baseURL: `${baseURL}/api/v7/rdl-2`,
    headers: { 'x-access-token': localStorage.getItem('prexo-authentication') },
})
export const axiosRmUserAgent = axios.create({
    baseURL: `${baseURL}/api/v7/rm-user`,
    headers: { 'x-access-token': localStorage.getItem('prexo-authentication') },
})
export const axiosSpMisAgent = axios.create({
    baseURL: `${baseURL}/api/v7/sp-mis`,
    headers: { 'x-access-token': localStorage.getItem('prexo-authentication') },
})
export const axiosPurchaseAgent = axios.create({
    baseURL: `${baseURL}/api/v7/purchase-user`,
    headers: { 'x-access-token': localStorage.getItem('prexo-authentication') },
})
export const axiosRpBqcAgent = axios.create({
    baseURL: `${baseURL}/api/v7/rp-bqc-user`,
    headers: { 'x-access-token': localStorage.getItem('prexo-authentication') },
})
export const axiosRpAuditAgent = axios.create({
    baseURL: `${baseURL}/api/v7/rp-audit-user`,
    headers: { 'x-access-token': localStorage.getItem('prexo-authentication') },
})
