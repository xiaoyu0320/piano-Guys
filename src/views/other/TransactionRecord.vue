<template>
  <div class="transactionrecord">
    <div class="top">
      <div class="heard">
        <label @click="goback"><img src="/images/login/icon_arrow@2x.png" width="100%"/></label>
        <label>{{tablist[id].name}} {{$t('message.transactionrecord')}}</label>
        <label></label>
      </div>
<!--       <div class="tabs">
        <ul>
          <li v-for="item in tablist" @click="tabclick(item.index)">
            <span>{{item.name}}</span>
            <label v-show="item.index==active"></label>
          </li>
        </ul>
      </div> -->
    </div>
    <div class="list">
      <ul>
        <li v-for="(item,i) in alldata" :key="i">
          <div class="list-left">
            <span>TxHash：<label>{{item.tx.slice(0,8) + '......' + item.tx.slice(56,64)}}</label></span>
            <span>From：<label>{{item.pa.slice(0,8)+'...'+ item.pa.slice(34,42)}}</label></span>
            <span>To：<label>{{item.topa.slice(0,8)+'...'+item.topa.slice(34,42) }}</label></span>
            <span>Value：{{Number(item.power).toFixed(2)}}{{tablist[active].name}}</span>
            <span>Time：{{changeTime(item.createtime)}}</span>
          </div>
          <div class="list-right"><span :style="item.pa==userinfo.pa?'':'color:#f49b0a;border:1px solid #f49b0a;'">{{item.pa==userinfo.pa?'out':'in'}}</span></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getinfobyuid, getlog } from '@/api/wallet'
import { Toast } from 'vant'
import { formatT} from '@/common/time'
export default {
  data () {
    return {
      tablist: [
      {
        name:'ASC',
        index: 0
      },
      {
        name:'ETH',
        index: 1
      },
      {
        name:'BTC',
        index: 2
      }
      ],
      active: 0,
      id:0,
      alldata: {},
      userinfo: {}
    }
  },
  created() {
    this.id = this.$route.params.id
    this._getinfobyuid()
    this._getlog(this.id)
  },
  methods: {
    goback() {
      this.$router.back()
    },
    tabclick(index) {
      this.active = index
      this._getlog(index)
    },
    changeTime(str) {
      return formatT(str)
    },
    _getinfobyuid() {
      let obj = {}
      obj.uid = localStorage['_shop_userId']
      Toast.loading({
        mask: true
      })
      getinfobyuid(obj).then((res)=>{
        if (res.status == 200) {
          this.userinfo = res.data
        } else {
          Toast.fail(res.msg)
        }
      })
    },
    _getlog(index) {
      let obj = {}
      obj.uid = localStorage['_shop_userId']
      obj.token = localStorage['_shop_token']
      obj.type = index
      Toast.loading({
        mask: true
      })
      getlog(obj).then((res)=>{
        if (res.status == 200) {
          this.alldata = res.data
          Toast.clear()
        } else {
          this.alldata = {}
          Toast.fail({
            duration:1000,
            message:res.msg
          })
        }
      })
    }
  },
  components: {}
};
</script>
<style scoped lang="stylus" >
.transactionrecord
  position: absolute
  width: 100%
  min-height: 100%
  background: rgb(245,245,245)
  text-align:center
  .heard
    position: fixed
    width: 100%
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
  .tabs
    background:#fff
    ul
      display:flex
      font-size:17px
      li
        display:flex
        flex-direction: column
        flex:1
        span
          margin-bottom:10px
          padding-top:25px
        label
          width:20%
          margin: 0 auto
          height:2px
          background:rgb(244,155,10)
  .list
    margin-top:44px
    ul
      display:flex
      flex-direction:column
      li
        display:flex
        justify-content:space-between
        padding:0 15px 15px
        background:#fff
        margin-top:10px
        font-size:15px
        span
          margin-top:15px
        label
          color:rgb(62,108,155)
        .list-left
          display:flex
          flex-direction:column
          align-items: flex-start
        .list-right
          display:flex
          align-items: flex-end
          span
            padding:2px 16px
            border-radius: 30px
            color:rgb(153,153,153)
            border:1px solid rgb(153,153,153)
</style>