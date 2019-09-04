
<template>
<div class='explain'>
   <van-nav-bar
    title="玩法说明"
    left-arrow
    fixed
    @click-left="onClickLeft"
    />
  <div class="_explain">
    <div class="title">挖矿介绍</div>
    <div class="desc">ASC钱包为用户提供一款玩法丰富的云矿机挖矿服务，您只需要每日进行收取，就可以获得相应的ASC平台币。</div>
    <div class="title">玩法介绍</div>
    <div class="desc">1.用户首次注册并完成实名认证后，可获得100天的体验矿机运行时间。</div>
    <div class="desc">2.如想要用于拥有更多的矿机，可以租赁ASC矿机。</div>
    <div class="desc">3.产量决定了您挖取币的数量，产量越高挖的也就越多。要想提高产量需要用ASC去租赁矿机。</div>
    <div class="desc">4.矿机只有在运行中才会开始挖矿，同时矿机开采出的收益需要在第二天领取，否则开采出的ASC收益
  将会自动失效。</div>
    <div class="title">矿机类型</div>
    <div class="list">
      <div class="item">
        <div class="title1">体验矿机</div>
        <div class="inner">
           <div class="_item">
             <div class="__item">租用价格:赠送</div>
             <div class="__item">租用时长:100天</div>
           </div>
           <div class="_item">
             <div class="__item">产量/天:0.05枚/天</div>
             <div class="__item">累计产量:5枚asc</div>
           </div>
          
        </div>
      </div>
      <div class="item">
        <div class="title1">微型矿机</div>
        <div class="inner">
           <div class="_item">
             <div class="__item">租用价格:100元等值ASC</div>
             <div class="__item">租用时长:300天</div>
           </div>
           <div class="_item">
             <div class="__item">产量/天:投资额1%</div>
             <div class="__item">累计产量:投资额300%</div>
           </div>
          
        </div>
      </div>
      <div class="item">
        <div class="title1">小型矿机</div>
        <div class="inner">
           <div class="_item">
             <div class="__item">租用价格:1000元等值ASC</div>
             <div class="__item">租用时长:300天</div>
           </div>
           <div class="_item">
             <div class="__item">产量/天:投资额1%</div>
             <div class="__item">累计产量:投资额300%</div>
           </div>
          
        </div>
      </div>
      <div class="item">
        <div class="title1">中型矿机</div>
        <div class="inner">
           <div class="_item">
             <div class="__item">租用价格:5000元等值ASC</div>
             <div class="__item">租用时长:300天</div>
           </div>
           <div class="_item">
             <div class="__item">产量/天:投资额1%</div>
             <div class="__item">累计产量:投资额300%</div>
           </div>
         
        </div>
      </div>
      <div class="item">
        <div class="title1">大型矿机</div>
        <div class="inner">
           <div class="_item">
             <div class="__item">租用价格:10000元等值ASC</div>
             <div class="__item">租用时长:300天</div>
           </div>
           <div class="_item">
             <div class="__item">产量/天:投资额1%</div>
             <div class="__item">累计产量:投资额300%</div>
           </div>
          
        </div>
      </div>
    </div>
    <div class="title">温馨提示</div>
    <div class="desc">用户首次注册后，可获得一台体验矿机 <br> ASC基金会对本次活动拥有最终解释权</div>
  </div>
</div>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'
export default {
  components: {},
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  methods: {
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
  .title{
    font-size: .35rem;
    margin-bottom: .35rem!important;
    font-weight: bold;
  }
  ._explain{
    padding: .2rem;
    padding-top: calc(46px + .2rem);
    height: calc(100vh);
    overflow-x: hidden;
    overflow-y: scroll;
    &>div{
      margin-bottom: .25rem;
    }

  }
  .desc{
    font-size: .25rem;
    line-height: 1.6;
  }
  .list{
    width: 90%;
    .item{
      margin-bottom: .4rem;
      .title1{
        font-size: .3rem;
        margin-bottom: .3rem;
      }
      .inner{
        ._item{
          display: flex;
          justify-content: space-between;
          font-size: .2rem;
          margin-bottom: .2rem;
          letter-spacing: 1px;
        }
      }
    }
  }
</style>
