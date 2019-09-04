<!--  -->
<template>
<div class='poolrecord'>
  <van-nav-bar
    title="矿池记录"
    left-arrow
    fixed
    @click-left="onClickLeft"
    />
    <div class="_poolrecord">
      <div class="top">
        <div class="head">矿池待释放</div>
        <div class="body">
            <p class="asc">{{asc}}</p>
            <p class="cny">≈{{cny}}CNY</p>
        </div>
      </div>
      <div class="title">
        矿池记录
      </div>
      <van-list  
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="toGet"
       class="list">
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="l">
            <p class="name">{{item.log}}</p>
            <p class="time">{{item.create_time}}</p>
          </div>
          <div class="r">+{{item.asc}}</div>
        </div>
      </van-list>
      <div class="button" @click="exchange">立即兑换</div>
    </div>
</div>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'
import { mineLogList } from 'api'
export default {
  components: {},
  data () {
    return {
      page: 1,
      loading: false,
      finished: false,
      list: [],
      asc:'',
      cny:''
    }
  },
  computed: {},
  watch: {},
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    exchange () {
      this.$router.push({
        path: '/mine/pool'
      })
    },
    toGet () {
      this.loading = true
      const obj = {
        page: 1
      }
      mineLogList(obj).then(res => {
        const { data } = res
        this.loading = false
        if (data.count === this.list.length) {
          this.finished = true
          return
        }
        this.list = this.list.concat(res.data.list)
        this.page = this.page + 1
        this.cny = data.cny
        this.asc = data.not_release
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
  ._poolrecord{
    @extend .scrollListContainer ;
    padding-top: 46px;
    padding-left: 0;
    padding-right: 0;
    display: flex;
    flex-direction: column;
    .top{
      background: #4a80ff;
      color: #fff;
      padding: 20px;
      .head{
        font-size: 12px;
        opacity: 0.8;
      }
      .asc{
        font-size: 40px;
        text-align: center;
        margin: 20px auto 10px;
      }
      .cny{
        font-size: 12px;
        color: #fff;
        text-align: center;
        opacity: .8;
      }
    }
  }
  .van-nav-bar{
    background: #4a80ff;
    .van-icon{
      color: #fff!important;
    }
  }
  .van-nav-bar__title{
    color: #fff;
  }
  .van-hairline--bottom::after{
    display: none;
  }
  .title{
    font-size: 19px;
    color: #333;
    margin: 20px auto 10px;
    margin-left: 0;
    padding: 0 15px;
  }
  .list{
    flex:1;
    width: calc( 100vw - 30px);
    margin: 0 auto 10px;
    overflow-y: scroll;
    border-radius: 5px;
    background: #fff;
    padding: 0 15px;
    box-sizing: border-box;
    .item{
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgba($color: #bfbaba1a, $alpha: .1);
      padding:15px 0;
      .name{
        font-size: 15px;
        color: #333;
      }
      .time{
        font-size: 12px;
        color: #999;
      }
      .r{
        font-size: 15px;
        color: #4eb17f;
      }
    }
  }
  .button{
    width: 80%;
    color: #fff;
    background: #70bde9;
    height: 46px;
    line-height: 46px;
    font-size: 18px;
    border-radius: 23px;
    margin: 0 auto;
    text-align: center;
  }
</style>
