const { $eagleApi } = require('../utils/request.js')

const getApplicationtInfo = () => $eagleApi.get('application/info')

module.exports = {
    getApplicationtInfo
}