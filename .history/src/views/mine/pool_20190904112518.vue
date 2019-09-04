<!--  -->
<template>
<div class='pool'>
    <van-nav-bar
    title="矿池资产"
    left-arrow
    fixed
    @click-left="onClickLeft"
    />
    <div class="_pool">
      <div class="top">
         <div class="l">
           <img src="/images/minefield/pool-l.png" alt="">
           <p>矿池资产</p>
         </div>
         <div class="m">
           <img src="/images/minefield/pool-arrow.png" alt="">
         </div>
         <div class="r">
           <img src="/images/minefield/pool-r.png" alt="">
           <p>链上资产</p>
         </div>
      </div>
      <div class="coins" style="margin-bottom:20px;">
        <div class="head">
          币种
        </div>
        <div class="item">
          <img src="/images/minefield/pool-r.png" alt="">
          <p>ASC</p>
        </div>
      </div>
      <div class="coins">
        <div class="head">
          数量
        </div>
        <div class="item">
          <van-field v-model="value"  placeholder="请输入兑换数量" @input="change" />
          <div class="ex">
            <span>算力</span>
            <span class="line">|</span>
            <span class="options blue" @click="checkAll">全部</span>
          </div>
        </div>
      </div>
      <div class="tips">
        可用 <font class="blue">{{all}}</font> 算力
      </div>
      <div class="tips">
        兑换手续费 <font class="red">{{rate}}</font>
      </div>
      <!-- <div class="button" @click="exchange" >立即兑换</div> -->
      <van-button size="large" round>立即兑换</van-button>
    </div>
</div>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'
import { getMineCoin, transferToAsc } from 'api'
import { Dialog, Toast } from 'vant'
export default {
  components: {},
  data () {
    return {
      all: 0,
      value: '',
      rate: '',
      clickFlag:false
    }
  },
  computed: {},
  watch: {},
  methods: {
    change(val){
      if(val < 0) {
        
      }
    },
    checkAll () {
      this.value = this.all
    },
    onClickLeft () {
      this.$router.back()
    },
    toGet () {
      getMineCoin({}).then(res => {

        if(res.status == 200) {
           this.rate = res.data.handling_fee
           this.all = res.data.coin
        }else {
           Toast.fail(res.msg)
        }
       
      })
    },
    exchange () {
      if(!this.value){
        this.$toast.fail('兑换数量错误')
        return
      }
      Dialog.confirm({
        title: '兑换确认',
        message: `是否将${this.value}ASC兑换链上资产`
      }).then(() => {
        transferToAsc({ coin: this.value }).then(res => {
          if( res.status == 200 ){
            this.$toast.success('兑换成功')
            this.toGet()
          }else{
            this.$toast.fail(res.msg)
          }
        })
      }).catch(() => {
        // on cancel
      });
    }
  },
  created () {
    this.toGet()
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
._pool{
  @extend .scrollListContainer ;
  position: relative;
  background: #fff;
  .top{
    background: #f5f6f7;
    display: flex;
    // justify-content: space-around;
    padding:20px;
    border-radius: 5px;
    .l , .r{
      flex:1;
      font-size: 14px;
      text-align: center;
      color: #333;
      p{
        margin-top: 10px;
      }
      img{
        width: 30px;
        height: auto;
        display: block;
        margin: 0 auto;
      }
    }
    .m{
      width: 75px;
      img{
        width: 75px;
        height: auto;
        display: block;
        margin-top: 10px;
      }
    }
  }
  .coins{
    margin-top: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba($color: #f2f4f6, $alpha: .8);
    .head{
      font-size: 14px;
      color: #333;
      margin-bottom: 10px;
    }
    .item{
        display: flex;
        align-items: center;
        img{
          width: 20px;
          height: auto;
          display: block;
          margin-right: 10px;
        }
        p{
          font-size: 14px;
        }
    }
  }
  .van-cell{
    flex:1;
    overflow: hidden;
    padding-left: 0;
    padding-bottom: 0;
    &::after{
      display: none;
    }
  }
  .ex{
    font-size: 14px;
    color: #999;
    .line{
      opacity: .1;
    }
  }
  .tips{
    font-size: 12px;
    margin-top: 10px;
    color: #999;
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
    position: absolute;
    left: 0;
    right: 0;
    bottom: 20px;
    text-align: center;
  }
}
</style>
