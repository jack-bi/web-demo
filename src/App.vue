<template>
  <div id="app" :class="layout">
    <router-view ref="page" :items="items" :show="show" :class="layout+'-box'" />
  </div>
</template>

<script>
import common from '$COM';
export default {
  name: 'App',
  data () {
    return {
      items: {
        il: {
          title: 'il.title',
          path: 'il',
          items: [
            { img: 'BG_I001.png', url: '#', img_m: 'BG_I201.png', url_m: '#' },
            { img: 'BG_I002.png', url: '#', img_m: 'BG_I202.png', url_m: '#' },
            { img: 'BG_I003.png', url: '#', img_m: 'BG_I203.png', url_m: '#' },
            { img: 'BG_I004.png', url: '#', img_m: 'BG_I204.png', url_m: '#' },
            { img: 'BG_I005.png', url: '#', img_m: 'BG_I205.png', url_m: '#' },
            { img: 'BG_I006.png', url: '#' },
            { img: 'BG_I007.png', url: '#' },
            { img: 'BG_I008.png', url: '#' },
            { img: 'BG_I009.png', url: '#' },
          ],
          currency: {
            usd: { url: '#' },
            inr: { url: '#' },
            vnd: { url: '#' },
            thb: { url: '#' },
            myr: { url: '#' },
            idr: { url: '#' },
          }
        },
      },
      show: true,
      layout: common.Util.isMobile() ? 'm' : 'pc'
    }
  },
  mounted(){
    // BG大遊产品演示
    document.title = '国际包网演示站';
    let ico = document.createElement('link');
		ico.href = common.Util.getUploadHost() +'/image-promo/favicon.ico';
    ico.rel = 'shortcut icon';
    ico.type = 'image/x-icon';
    document.head.appendChild(ico);

    if(common.Util.isMobile()) this.$router.push( { name: 'layout-m', params: { id: 'il' } } );
    else this.$router.push( { name: 'layout', params: { id: 'il' } } );
  },
}
</script>
<style lang='scss'>
@import '~@/style/base';
</style>
