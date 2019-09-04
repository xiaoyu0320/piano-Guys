<!--  -->
<template>
<div class='home-wrap' :class="bottomFlag ? 'home-calc' : ''">
  <transition :name="transitionName">
    <router-view class="Router"></router-view>
  </transition>
</div>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'
export default {
  components: {},
  data () {
    return {
      transitionName: '',
    }
  },
  computed: {
    ...mapGetters([
      'bottomFlag'
    ])
  },
  watch: {
    $route (to, from) {
      // 切换动画
      let isBack = this.$router.isBack // 监听路由变化时的状态为前进还是后退
      if (isBack) {
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-right'
      }
      this.$router.isBack = false
    }
  },
  methods: {
  },
  created () {
   store.dispatch('toSetBottom',true)
  },
  mounted () {
    this.$parent.footshow = true
     document.querySelector('html').style.fontSize = '13.333333333333vw'
  },
  destroyed () {
    document.querySelector('html').style.fontSize = '12px'
  }
}
</script>
<style lang='scss' scoped>
.home-wrap{
  width: 100%;
  position: relative;
  height: 100vh;
}
.home-calc{
  height: calc(100vh - 54px)
}
.Router {
  position: absolute;
  height: 100%;
  width: 100%;
  transition: all .377s ease;
  will-change: transform;
  top: 0;
  backface-visibility: hidden;
   perspective: 1000;
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate3d(100%, 0 ,0);
}
</style>
