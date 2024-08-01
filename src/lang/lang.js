import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en.json'
import id from './id.json'
import th from './th.json'
import vn from './vn.json'
import zh from './zh.json'

Vue.use(VueI18n)
let messages = {}
messages = { ...messages, en, id, th, vn, zh }
const lang = localStorage.getItem('language') || 'en'
const i18n = new VueI18n({
    locale: lang,
    messages,
})
export default i18n
