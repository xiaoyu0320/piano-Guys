<template>
  <div class="usableASC">
    <div class="heard">
      <label @click="goback"><img src="/images/login/icon_arrow@2x.png" width="100%"/></label>
      <label>可用ASC</label>
      <label></label>
    </div>
    <div class="top">
      <span>{{Number(mygold.asc).toFixed(2)}}</span>
      <label>≈{{Number(mygold.asc*mygold.ascrate*10).toFixed(2)}}CYN</label>
    </div>
      <ul class="list">
        <div>可用明细</div>
        <li v-for="(item,i) in usablelist" :key="i">
          <span>
            <label>{{item.remarks}}</label>
            <label class="data">{{changeTime(item.createtime)}}</label>
          </span>
          <span>{{item.money}}</span>
        </li>
      </ul>
  </div>
</template>

<script>
import { getmygold, getusablelog } from '@/api/wallet'
import { Toast, Dialog } from 'vant'
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
        ethrate: 0
      },
      usablelist: []
    }
  },
  created() {
    this._getmygold()
    this._getusablelog()
  },
  methods: {
    goback() {
      this.$router.back()
    },
    changeTime(str) {
      return formatT(str)
    },
    _getmygold() {
      let obj = {}
      obj.uid = localStorage['_shop_userId']
      obj.token = localStorage['_shop_token']
      Toast.loading({
        mask: true
      })
      getmygold(obj).then((res)=>{
        if (res.status == 200) {
          this.mygold = res.data
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
      Toast.loading({
        mask: true
      })
      getusablelog(obj).then((res)=>{
        if (res.status == 200) {
          this.usablelist = res.data
          Toast.clear()
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
.usableASC
  text-align:center
  .heard
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
    margin-top:25px
    padding-bottom:25px
    display:flex
    align-items: center
    flex-direction: column
    border-bottom:10px solid rgb(245,245,245)
    span
      font-size:50px
      font-weight: 400
      color:rgb(51,51,51)
  .list
    display:flex
    flex-direction:column
    padding:0 15px
    div
      width:100%
      text-align: left
      font-weight:400
      padding:25px 0 15px
      border-bottom:1px solid rgb(229,229,229)
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