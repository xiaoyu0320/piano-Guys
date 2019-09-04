<!--  -->
<template>
<div class='shopwrap'>
  <van-nav-bar
    title="矿机商城"
    left-arrow
    fixed
    @click-left="onClickLeft"
    />
    <van-list v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getList">
      <shopItem :item="item" v-for="(item, index) in list" :key="index"></shopItem>
    </van-list>
</div>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'
import { minelist } from 'api'
import shopItem from '@c/shop/shopitem'
import { Toast } from 'vant';
export default {
  components: {
    shopItem
  },
  data () {
    return {
      loading: false,
      finished: false,
      page: 1,
      list: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    getList () {
      this.loading = true
      minelist({ page: this.page }).then(res => {
        if(res.status == 200) {
            const { data } = res
            this.loading = false
            if (data.count === this.list.length) {
              this.finished = true
              return
            }
            this.list = this.list.concat(res.data.list)
            this.page = this.page + 1
          }else {
            Toast.fail(res.msg)
          }
            
      })
    }
  },
  created () {
    store.dispatch('toSetBottom',false)
  },
  mounted () {
    this.$nextTick( () => {
      document.querySelector('html').style.fontSize = '13.333333333333vw'
    })
  },
  destroyed () {
    document.querySelector('html').style.fontSize = '12px'
  }
}
</script>
<style lang='scss' scoped>
  .van-list{
    @extend .scrollListContainer
  }
</style>
