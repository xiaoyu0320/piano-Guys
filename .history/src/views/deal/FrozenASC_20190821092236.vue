<template>
  <div class="frozenASC">
    <div class="heard">
      <label @click="goback"><img src="/images/login/icon_arrow@2x.png" width="100%"/></label>
      <label>锁仓ASC</label>
      <label></label>
    </div>
    <div class="top">
      <span>{{sum.toFixed(2)}}</span>
      <label>释放速度(每周)：{{speed}}%</label>
    </div>
      <div class="list-title">锁仓明细</div>
      <ul class="list">
        <!-- <van-list v-model="loading" :finished="finished" finished-text="没有更多了"> -->
        <li v-for="(item,i) in ascinfo" :key="i">
          <span>
            <label>{{item.contract}}</label>
            <label class="data">
              {{changeTime(item.createtime)}}
            </label>
          </span>
          <span>{{item.money}}</span>
        </li>
      <!-- </van-list> -->
      </ul>
  </div>
</template>

<script>
import { getascfroze, getusablelog } from '@/api/wallet'
import { Toast, Dialog, List  } from 'vant'
import { formatT} from '@/common/time'
export default {
  data () {
    return {
      mygold: {
        asc:0,
        ascfroze: 0,
        ascrate: 0,
        btc: 0,
        btcrate: 0,
        eth: 0,
        ethrate: 0,
        ascfrozeeveryday: 0
      },
      usablelist: [],
      loading: false,
      finished: false,
      speed:0,
      sum:0,
      ascinfo:{
        ascfroze:0
      },
      title:''
    }
  },
  created() {
    this._getascfroze()
    this._getusablelog()
   switch(localStorage['type']) {
     case 1:
        this.title = 'ETH'
        break;
     case 2:
       this.title = 'BTC'
        break;
     case 3:
      this.title = 'EOS'
        break;
     case 4:
      this.title = 'USTD'
        break;
} 
    
  },
  methods: {
    goback() {
      this.$router.back()
    },
    changeTime(str) {
      return formatT(str)
    },
    _getascfroze() {
      let obj = {}
      obj.uid = localStorage['_shop_userId']
      obj.token = localStorage['_shop_token']
      obj.id = 4
      Toast.loading({
        mask: true
      })
      getascfroze(obj).then((res)=>{
        if (res.status == 200) {
          this.ascinfo = res.data.list
          this.sum =res.data.totalAmount
          this.speed = (Number(res.data.list[0].speed)*100).toFixed(2)
          console.log(  this.speed)
          Toast.clear()
        } else {
          Toast.fail(res.msg)
        }
      })
    },
    _getusablelog() {
      let obj = {}
      obj.uid = localStorage['_shop_userId']
      obj.token = localStorage['_shop_token']
      getusablelog(obj).then((res)=>{
        if (res.status == 200) {
          this.usablelist = res.data
        } else {
          Toast.fail(res.msg)
        }
      })
    }
  },
  components: {}
};
</script>
<style scoped lang="stylus" >
.frozenASC
  text-align:center
  .heard
    position: fixed
    width: 100%
    z-index:2
    background:#fff
    font-size:17px
    color:rgb(51,51,51)
    display:flex
    align-items: center
    justify-content: space-between
    height:44px
    label:first-child,label:last-child
      width:6.5%
      height: 100%
      padding: 0 3%
      display: flex
      align-items: center
  .top
    position: fixed
    width: 100%
    background:#fff
    padding-top:65px
    padding-bottom:25px
    display:flex
    align-items: center
    flex-direction: column
    border-bottom:10px solid rgb(245,245,245)
    span
      font-size:50px
      font-weight: 400
      color:rgb(51,51,51)
  .list-title
    position: fixed
    width:100%
    text-align: left
    font-weight:400
    padding:25px 15px 15px
    border-bottom:1px solid rgb(229,229,229)
    margin-top: 179px
    background:#fff
  .list
    display:flex
    flex-direction:column
    padding:0 15px
    padding-top: 245px
    li
      display:flex
      align-items: center
      justify-content: space-between
      padding:15px 0
      border-bottom:1px solid rgb(229,229,229)
      font-size:15px
      color:rgb(51,51,51)
      span:first-child
        display:flex
        flex-direction: column
        align-items: flex-start
        font-size:15px
      .data
        font-size:12px
        color:rgb(153,153,153)
        margin-top:7px
      span:last-child
        align-self: flex-end
</style>