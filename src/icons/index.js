import Vue from 'vue'
// import IconSvg from '@/components/iconSvg'// svg组件
const IconSvg = () => import(/* webpackChunkName: "components/iconSvg" */'../components/iconSvg')
import './iconfont.js' // 阿里云icon
// register globally
Vue.component('icon-svg', IconSvg)

// const requireAll = requireContext => requireContext.keys().map(requireContext)
// const req = require.context('./svg', false, /\.svg$/)
// requireAll(req)
