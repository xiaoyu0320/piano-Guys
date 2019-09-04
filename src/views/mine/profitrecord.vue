<!--  -->
<template>
<div class='profit'>
  <van-nav-bar
    title="收益记录"
    left-arrow
    fixed
    @click-left="onClickLeft"
    />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getProfitList"
    >
    <div class="item" v-for="(item,index) in list" :key="index">
      <div class="l">
         <div class="log">{{item.log}}</div>
         <div class="time">{{item.create_time}}</div>
      </div>
      <div class="r" v-html="returnProfit(item)">
      </div>
    </div>
    </van-list>
</div>
</template>

<script>
import { profit } from 'api'
import store from '@/store'
import { mapGetters } from 'vuex'
import { Toast } from 'vant';
export default {
  components: {},
  data () {
    return {
      page: 1,
      loading: false,
      finished: false,
      list: [],
    }
  },
  computed: {},
  watch: {},
  methods: {
    getProfitList () {
      this.loading = true
      const obj = {
        page: 1
      }
      profit(obj).then(res => {
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
    },
    returnProfit (item) {
      // 1为收益 2为使用
      switch (Number(item.type)) {
        case 1:
          return `<font class="blue">+${item.asc}</font>`
        case 2:
          return `<font class="red">-${item.asc}</font>`
      }
    },
    onClickLeft () {
      this.$router.back()
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
    @extend .scrollListContainer ;
    background: #fff;
    .item{
      &:first-child{
        padding-top: 0;
      }
      padding: 10px 0;
      border-bottom: 1px solid rgba($color: #f0f1f2, $alpha: .8);
      display: flex;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;
      .log{
        font-size: 14px;
        color: #333;
        margin-bottom: 8px;
      }
      .time{
        font-size: 12px;
        color: #999;
      }
      .r{
        /deep/ font{
          font-size: 14px;
        }
      }

    }
  }
</style>
