<template>
    <div>
        <div :class="['main', 'layout', `layout-${id}`]">
            <div class="lang-wrapper">
                <div class="lang-select" @click="toggleLangSelect()">
                    <img :src="`${path}/m/${current.path}/icon/img_flag_${language}.png`" class="lang-icon">
                    <span class="select-text">{{ langShort[language] }}</span>
                    <img :src="`${path}/m/${current.path}/icon/down-arrow.png`" class="arrow-icon">
                </div>
                <actionsheet
                    v-model="langSelect"
                    :menus="languageList"
                    @on-click-menu="changeLang"
                    show-cancel
                    :cancel-text="$t('cancel')"
                    class="lang-select-option">
                </actionsheet>
            </div>
            <header v-if="current">
                <div class="title">{{ $t(current.title) }}</div>
            </header>
            <div class="currency-wrapper">
                <div class="currency-select" @click="toggleCurrencySelect()">
                    <img :src="`${path}/m/${current.path}/icon/img_dollar.png`" class="dollar-icon">
                    <span class="select-text">{{ $t(currencyInfo.title) }}</span>
                    <img :src="`${path}/m/${current.path}/icon/down-arrow.png`" class="arrow-icon">
                </div>
                <actionsheet
                    v-model="currencySelect"
                    :menus="currecnyList"
                    show-cancel
                    :cancel-text="$t('cancel')"
                    class="currency-select-option" :class="language">
                </actionsheet>
            </div>
            <div v-if="current" class="box">
                <swiper v-if="id != 'cl' && current.items.length" class="swiper-container" :options="swiperOption" ref="mySwiper">
                    <swiper-slide v-if="item.img_m" v-for="(item ,index) in current.items" :key="index+1">
                        <a class="layout-key-box" :href="goWeb(item)" target="_blank">
                            <p class="layout-key" :class="'model_'+(index + 1)">{{ `${$t('demo')}${index + 1} ${$t('preview')}` }}</p>
                            <img :src="`${path}/m/${current.path}/${language}/${item.img_m}`" :class="['item', item.path]" />
                        </a>
                    </swiper-slide>
                </swiper>
                <div v-else v-for="(item, index) in current.items" :key="index" :class="['item', item.path]">
                    <a class="layout-key-box" :href="goWeb(item)" target="_blank">
                        <img :src="`${path}/m/${current.path}/${language}/${item.img_m}`" />
                    </a>
                </div>
            </div>
            <!-- 分页器 -->
            <div
                class="swiper-pagination"
                slot="pagination"
                :class="[ 'swiper-pagination-bottom' ]"></div>
            <x-footer :title="$t('footer.title')"></x-footer>
        </div>
    </div>
</template>

<script>
import xFooter from '@/components/footer';
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Actionsheet } from 'vux'
import _each from 'lodash/each'
import common from '$COM';

export default {
    props: ['items'],
    components: {
        xFooter,
        swiper,
        swiperSlide,
        Actionsheet
    },
    data () {
        return {
            id: this.$route.params.id,
            current: null,
            modelID: 1,
            path: common.Util.getUploadHost() + '/image-promo',
            swiperOption: {
                loop: true,
                slidesPerView: 2,
                speed: 500,
                centeredSlides: true,
                effect: 'coverflow',
                coverflowEffect: {
                    rotate: 0,
                    stretch: 10,
                    depth: 124,
                    modifier: 3,
                    slideShadows: true
                },
                autoplay: false,
                pagination: {
                    el: '.swiper-pagination'
                },
                on: {
                    //监听滑动切换事件，返回swiper对象
                    slideChange: ()=>{
                        const swiper = this.$refs.mySwiper.swiper;
                        if(swiper){
                            this.modelID = swiper.realIndex + 1;
                            this.setShow('model_'+this.modelID);
                        }
                    },
                }
            },
            language: 'en',
            langDesc: {
                id: 'Indonesian',
                th: 'ภาษาไทย',
                vn: 'Tiếng Việt',
                en: 'English',
                zh: '繁體中文',
            },
            langShort: {
                id: 'ID',
                th: 'TH',
                vn: 'VN',
                en: 'EN',
                zh: 'CN',
            },
            langSelect: false,
            currencySelect: false,
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
    computed: {
        languageList() {
            let result = {};
            _each(this.langDesc, (value, index) => {
                result[index] = `
                <div class="option-list">
                    <img src="${this.path}/m/${this.current.path}/icon/img_flag_${index}.png" class="option-icon">
                    <span class="option-text">${value}</span>
                </div>`
            })
            return result;
        },
        currecnyList() {
            let result = {}
            _each(this.currencyInfo.list, (value, index) => {
                result[index] = `
                <a href="${this.goWeb(this.current.currency[index])}" target="blank" class="option-list">
                    <img src="${this.path}/m/${this.current.path}/icon/img_${index}.png" class="currency-icon">
                    <span class="currency-text">${this.$t(value)}</span>
                </a>`
            })
            return result;
        }
    },
    methods: {
        goBack(){
            this.$router.push( { name: 'home'} );
        },
        goWeb(item){
            return item[item.hasOwnProperty('url_m')?'url_m':'url'];
        },
        setShow(item){ //console.log("setShow: ",item)
            var elements = document.getElementsByClassName('layout-key');
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.opacity = 0;
            }
            var activeitem = document.getElementsByClassName(item);
            for (var i = 0; i < activeitem.length; i++) {
                activeitem[i].style.opacity = 1;
            }
        },
        toggleLangSelect() {
            this.langSelect = !this.langSelect
        },
        changeLang(language) {
            if(language !== 'cancel') {
                localStorage.setItem('language', language)
                location.reload()
            }
        },
        toggleCurrencySelect() {
            this.currencySelect = !this.currencySelect
        },
    },
    created(){
        this.current = this.items[this.$route.params.id] || null;
        if(!this.current){
            this.$router.push( { name: 'home'} );
        }
        this.language = localStorage.getItem('language') || 'en'
    },
    mounted(){
        this.setShow('model_1');
    },
}
</script>
<style lang="scss">

.swiper-container{
    margin-bottom: 60px !important;
}
.swiper-pagination{
    width: 100%;
    margin: -36px auto auto !important;
}
.swiper-pagination-bullet{
    opacity: .4 !important;
    background: #fff !important;
    margin: 0 1% !important;
}
.swiper-slide, .swiper-slide-duplicate-active {
    opacity: 0;
    position: relative;
}
.swiper-slide.swiper-slide-active, .swiper-pagination-bullet-active {
    opacity: 1 !important;
    background: #fff !important;
}
.swiper-slide-prev, .swiper-slide-next, .swiper-slide-duplicate-prev,.swiper-slide-duplicate-next {
    opacity: 0.5;
}
.swiper-slide img{
    box-shadow:0 7px 13px rgba(0,0,0,0.85) !important
}
.layout-key{
    color: #000;
    background: rgba(#fff, .6);
    border-radius: 30px; //25px
    padding: .25rem 1rem;
    position: absolute;
    font-weight: 900;
    font-size: 1.25rem;
    white-space: nowrap;
    &-box{
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
.layout header .title{
  &:before, &:after{
    display: none;
  }
}
</style>
