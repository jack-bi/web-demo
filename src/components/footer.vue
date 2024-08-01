<template>
  <footer>
    <div v-if="title" class="title" v-html="title"></div>
    <div class="link">
        <div v-for="(item, index) in links" :key="index" :class="['item', item.img.replace('.png', '')]">
          <a :href="item.href">
            <img :class="['ico']" :src="`${path}${item.img}`" />
            <span class="txt" v-if="item.title">{{item.title}}：</span>
            <span class="txt">{{item.txt}}</span>
          </a>
        </div>
        <div class="enter">
          <img :src="`${base}/back_btn${!btn?'':'_h'}.png`" />
        </div>
        <!-- <a href="https://www.bg77.com" target="_blank" class="enter" @mouseenter="btn=true" @mouseleave="btn=false">
          <img :src="`${base}/back_btn${!btn?'':'_h'}.png`" />
        </a> -->
    </div>
    <p class="copyright">{{ $t('footer.copyright') }}</p>
    <!-- BG大遊 -->
  </footer>
</template>

<script>
import common from '$COM';
export default {
  name: 'xfooter',
  props: [ 'title' ],
  data(){
    return {
      base: common.Util.getUploadHost() + '/image-promo/',
      path: common.Util.getUploadHost() + '/image-promo/cantact/',
      links: [
        { img: 'whatsapp.png', title: 'WhatsApp', txt: '+1234567890', href: 'https://api.whatsapp.com/send?phone=1234567890' },
        { img: 'email.png', title: '', txt: '1234567890@gmail.com', href: 'mailto:1234567890@gmail.com' },
      ],
      btn: false
    }
  }
}
</script>

<style lang="scss">
</style>
