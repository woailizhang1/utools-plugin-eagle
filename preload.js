const path = require('path')

const { getApplicationtInfo } = require('./api/application.js')
const { getItemList, getThumbnail } = require('./api/item.js')

const bookmarkPlusIcon = 'assets/bookmarkPlus.png'
const pictureIcon = 'assets/pictureicon.png'
const svgIcon = 'assets/svgIcon.png'
const qtIcon = 'assets/qt.png'

let cacheList = []

const selectItem = ({ ext, url, fullPath, icon }) => {
   if (ext === "url") return utools.shellOpenExternal(url);
   else utools.shellOpenPath(decodeURIComponent(fullPath))
   return qtIcon
}

const searchItemList = async (keyword) => {
   const list = await getItemList({ keyword }).then((data) => {
      return data.map(({ name, url, tags, ext, icon, id }) => {
         return {
            title: name,
            description: `${ext} - ${url}`,
            tags,
            icon: icon,
            id,
            url,
            ext,
            fullPath: '',
         }
      })
   }).catch(() => {
      return []
   })

   for (let item of list) {
      if (item.ext === "url") item.icon = bookmarkPlusIcon;
      else {
         const icon = await getThumbnail(item.id)
         const parsePath = path.parse(icon)
         item.icon = `file://${icon}`
         item.fullPath = parsePath && parsePath.dir
      }
   }
   return list
}

window.exports = {
   "Eagle": { // 注意：键对应的是 plugin.json 中的 features.code
      mode: "list",  // 列表模式
      args: {
         // 进入插件时调用（可选）
         enter: (action, callbackSetList) => {
            // 如果进入插件就要显示列表数据
            callbackSetList(cacheList)
         },
         // 子输入框内容变化时被调用 可选 (未设置则无搜索)
         search: async (action, searchWord, callbackSetList) => {
            const list = await searchItemList(searchWord);
            cacheList = list;
            callbackSetList(list)
         },
         // 用户选择列表中某个条目时被调用
         select: (action, itemData, callbackSetList) => {
            window.utools.hideMainWindow()
            selectItem(itemData)
            window.utools.outPlugin()
         },
         // 子输入框为空时的占位符，默认为字符串"搜索"
         placeholder: "搜索Eagleb内容"
      }
   }
}


