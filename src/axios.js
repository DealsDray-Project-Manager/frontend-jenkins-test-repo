import axios from 'axios'
export const axiosSuperAdminPrexo = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:8000/api/v7/superAdmin",
  headers: { "x-access-token": localStorage.getItem("prexo-authentication") },
});
export const axiosMisUser = axios.create({
  baseURL: "http://localhost:8000/api/v7/mis",
  headers: { "x-access-token": localStorage.getItem("prexo-authentication") },
});
export const axiosWarehouseIn = axios.create({
  baseURL: "http://localhost:8000/api/v7/warehouseIn",
  headers: { "x-access-token": localStorage.getItem("prexo-authentication") },
});
export const axiosBot = axios.create({
  baseURL: "http://localhost:8000/api/v7/bot",
  headers: { "x-access-token": localStorage.getItem("prexo-authentication") },
});
export const axiosCharging = axios.create({
  baseURL: "http://localhost:8000/api/v7/charging",
  headers: { "x-access-token": localStorage.getItem("prexo-authentication") },
});
export const axiosBqc = axios.create({
  baseURL: "http://localhost:8000/api/v7/bqc",
  headers: { "x-access-token": localStorage.getItem("prexo-authentication") },
});
export const axiosSortingAgent = axios.create({
  baseURL: "http://localhost:8000/api/v7/sorting-agnet",
  headers: { "x-access-token": localStorage.getItem("prexo-authentication") },
});
export const axiosAuditAgent = axios.create({
  baseURL: "http://localhost:8000/api/v7/audit-agent",
  headers: { "x-access-token": localStorage.getItem("prexo-authentication") },
});


=======
    baseURL: 'http://prexo-v7-uat-adminapi.dealsdray.com/api/v7/superAdmin',
    headers: { 'x-access-token': localStorage.getItem('prexo-authentication') },
})
export const axiosMisUser = axios.create({
    baseURL: 'http://prexo-v7-uat-adminapi.dealsdray.com/api/v7/mis',
    headers: { 'x-access-token': localStorage.getItem('prexo-authentication') },
})
export const axiosWarehouseIn = axios.create({
    baseURL: 'http://prexo-v7-uat-adminapi.dealsdray.com/api/v7/warehouseIn',
    headers: { 'x-access-token': localStorage.getItem('prexo-authentication') },
})
export const axiosBot = axios.create({
    baseURL: 'http://prexo-v7-uat-adminapi.dealsdray.com/api/v7/bot',
    headers: { 'x-access-token': localStorage.getItem('prexo-authentication') },
})
export const axiosCharging = axios.create({
    baseURL: 'http://prexo-v7-uat-adminapi.dealsdray.com/api/v7/charging',
    headers: { 'x-access-token': localStorage.getItem('prexo-authentication') },
})
export const axiosBqc = axios.create({
    baseURL: 'http://prexo-v7-uat-adminapi.dealsdray.com/api/v7/bqc',
    headers: { 'x-access-token': localStorage.getItem('prexo-authentication') },
})
export const axiosSortingAgent = axios.create({
    baseURL: 'http://prexo-v7-uat-adminapi.dealsdray.com/api/v7/sorting-agnet',
    headers: { 'x-access-token': localStorage.getItem('prexo-authentication') },
})
export const axiosAuditAgent = axios.create({
    baseURL: 'http://prexo-v7-uat-adminapi.dealsdray.com/api/v7/audit-agent',
    headers: { 'x-access-token': localStorage.getItem('prexo-authentication') },
})
>>>>>>> 37610b5a044292ed6ecd67f98565801dea1d6c2f
