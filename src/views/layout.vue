<template>
    <div>
        <img class="bg" :src="`${path}/p/bg_img.jpg`" />
        <div :class="['main', 'layout', `layout-${id}`]">
            <header v-if="current">
                <div class="title">{{ $t(current.title) }}</div>
                <div class="currency-wrapper">
                    <span class="currency-title">{{ $t(currencyInfo.title) }}</span>：
                    <div v-for="(value, index) in currencyInfo.list" class="currency-list" @click="goWeb(current.currency[index].url)">
                        <img :src="`${path}/p/${current.path}/icon/img_${index}.png`">
                        <span class="currency-text">{{ $t(value) }}</span>
                    </div>
                </div>
                <div class="lang-select" @click="toggleLangSelect()">
                    <img :src="`${path}/p/${current.path}/icon/img_flag_${language}.png`">
                    <span class="select-text">{{ langDesc[language] }}</span>
                    <img :src="`${path}/p/${current.path}/icon/down-arrow.png`">
                    <div class="lang-select-option" v-if="langSelect">
                        <div v-for="(value, index) in langDesc" class="option-list" @click="changeLanguage(index)">
                            <img :src="`${path}/p/${current.path}/icon/img_flag_${index}.png`">
                            <span class="option-text">{{ value }}</span>
                        </div>
                    </div>
                </div>
            </header>
            <div v-if="current" :class="['box', { 'box-scroll': current.items.length > 6 }]">
                <div v-for="(item, index) in current.items" :key="index" :class="['item', item.path]" @click="goWeb(item.url)">
                    <div>
                        <p>{{ $t('demo') }} {{(index + 1)}}</p>
                        <span :class="{ forbid : !item.url}">{{item.url ? $t('preview') : $t('coming')}}</span>
                    </div>
                    <img :src="`${path}/p/${current.path}/${language}/${item.img}?${new Date().getTime()}`" />
                </div>
            </div>
            <x-footer :title="$t('footer.title')"></x-footer>
        </div>
    </div>
</template>

<script>
import xFooter from '@/components/footer';
import common from '$COM';
export default {
    props: ['items'],
    components: {
        xFooter
    },
    data () {
        return {
            id: this.$route.params.id,
            current: null,
            path: common.Util.getUploadHost() + '/image-promo',
            language: 'en',
            langDesc: {
                id: 'Indonesian',
                th: 'ภาษาไทย',
                vn: 'Tiếng Việt',
                en: 'English',
                zh: '繁體中文',
            },
            langSelect: false,
            currencyInfo: {
                title: 'currencyInfo.title',
                list: {
                    usd: 'currencyInfo.usd',
                    idr: 'currencyInfo.idr',
                    vnd: 'currencyInfo.vnd',
                    thb: 'currencyInfo.thb',
                    myr: 'currencyInfo.myr',
                    inr: 'currencyInfo.inr',
                }
            }
        }
    },
    methods: {
        goBack(){
            this.$router.push( { name: 'home'} );
        },
        goWeb(val){
            if(val){
                window.open(val);
                return;
            }
        },
        padL(str, lenght){
            if(str.length >= lenght)
            return str;
            else
            return this.padL("0" + str, lenght);
        },
        translate(text) {
            return lang[this.language][text]
        },
        toggleLangSelect() {
            this.langSelect = !this.langSelect
        },
        changeLanguage(language) {
            localStorage.setItem('language', language)
            location.reload()
        }
    },
    created(){
        this.current = this.items[this.$route.params.id] || null;
        if(!this.current){
            this.$router.push( { name: 'home'} );
        }
        this.language = localStorage.getItem('language') || 'en'
    },
    mounted(){},
}
</script>
<style lang="scss">
</style>