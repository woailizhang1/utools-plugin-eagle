const { $eagleApi } = require('../utils/request.js')

const addBookmark = (bookmark) => $eagleApi.post('item/addBookmark', bookmark)
const getItemList = (condition) => $eagleApi.get('item/list', { params: condition })

const getThumbnail = (id) => $eagleApi.get('item/thumbnail', { params: { id } })
module.exports = {
    addBookmark,
    getItemList,
    getThumbnail
}