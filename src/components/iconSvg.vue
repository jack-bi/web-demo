<template>
  <i :class="'lott-icon ' + iconClass">
    <svg focusable="false" class="svg-icon" aria-hidden="true" :class="{rotate: rotate}">
      <use :xlink:href="iconName"></use>
    </svg>
  </i>
</template>

<script>
  export default {
    name: 'icon-svg',
    props: {
      iconClass: {
        type: String,
        required: true
      },
      rotate: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      iconName () {
        return `#icon-${this.iconClass}`
      }
    }
  }
</script>

<style scoped lang="scss">
.lott-icon {
  width: 1.5rem;
  height: 1.5rem;
  display: inline-block;
  &.X-CLEAR, &.X-CLEAR-PASS {
    display: none;
  }
  .svg-icon {
    width: 100%;
    height: 100%;
    fill: currentColor;
    overflow: hidden;
  }
  .rotate {
    animation: rotate .8s linear infinite;
  }
}

// .iconfont {
//   font-family:"iconfont" !important;
//   font-size:16px;
//   font-style:normal;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
// }

// .icon-lock:before { content: "\e6c0"; }

// .icon-eye:before { content: "\e609"; }

// .icon-eye_close:before { content: "\e627"; }

// .icon-phone:before { content: "\e615"; }

// .icon-user:before { content: "\e608"; }

// .icon-xingxing:before { content: "\e646"; }

</style>
