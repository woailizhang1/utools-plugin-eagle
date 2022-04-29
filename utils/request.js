const { baseURL } = require('../config.js')

const { create: createAxions } = require('axios')


const $eagleApi = createAxions({
    baseURL: baseURL,
    headers: { 'Content-Type': 'application/json;charset=UTF-8', }
});

$eagleApi.interceptors.request.use((config) => {
    return config;
})

$eagleApi.interceptors.response.use((response) => {
    if (response.data.status === 'success') return response.data.data;
    else return Promise.reject(response);
}, (error) => {
    return Promise.reject(error)
})

module.exports = {
    $eagleApi: $eagleApi
}