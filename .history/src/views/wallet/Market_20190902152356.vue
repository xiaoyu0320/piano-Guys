<template>
  <div class="transactionrecord">
    <div class="top">
      <div class="heard fixed">
        <label @click="goback"><img src="/images/login/icon_arrow@2x.png"  style="width:100%"/></label>
        <label> <div class="heard-top"><span  @click="gotab">{{$t("message.business")}}</span><span  class="active">{{$t("message.market")}} </span></div></label>
        <label> <van-icon name="bars" size="24px"  @click.native="show=true"/></label>
      </div>
      
    </div>
    
    <div class="list ">
      <div class="list-search" >
        <van-search :placeholder="$t('message.searchingkeywords')"  @search="search" v-model="searchContent"  />
        
      </div>
      <ul class="list-content">
        <li v-for="(item,index) in marketlist" :key="index" @click="openLink(item)" >
          <div  class="item-box" v-if="item.showFlag">
              <div >
              <span style="width:4.8vw;align-self: flex-start;margin-right:5px">
                <img :src="item.logo" width="100%"/>
              </span>
              <span>
                <label>{{item.name}}</label>
                <label>{{$t('message.amount')}}{{item.vol}}</label>
              </span>
            </div>
            <div>
              <span style="text-align: right;">
                <label :style="item.current_price_usd>=0?'color:rgb(242,72,29)':'color:green'">{{Number(item.current_price_usd).toFixed(4)}}</label>
                <label>￥{{Number(item.current_price).toFixed(4)}}</label>
              </span>
              <span class="btn" :style="item.change_percent>=0?'':'background:#00cc66'">{{Number(item.change_percent).toFixed(2)+'%'}}</span>
            </div>
          </div> 
        </li>
      </ul>
    </div> 
    <!-- popup -->
      <van-popup
      v-model="show"
      position="right"
      :style="{ height: '100%' }"
    >
      <div class="list-choice-box">
          <div class="list-choice" v-for="(item,i) in marketlist" :key="i" >
            <van-row >
              <van-col :span="12" style="text-align:left">
                  <span>{{item.name}}</span>
              </van-col>
              <van-col :span="12" style="text-align:right">
                  <van-switch
                    v-model="item.showFlag"
                    size="20px"
                    @change="onshow(marketlist,i)"
                  />
              </van-col>
            </van-row>
          </div>
      </div>
   
    </van-popup>
    <!-- //popup -->
  </div>
</template>

<script>
import { getmarket } from '@/api/wallet'
import axios from 'axios' 
import { Toast, Dialog } from 'vant'
export default {
  data () {
    return {
      pictop:'/images/market/arrow_top@2x.png',
      picdown:'/images/market/arrow_down@2x.png',
      picdefault:'/images/market/arrow_default@2x.png',
      marketlist: [],
      searchList:[],
      flagList:[],
      order: -1,
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
      ws:null,
      usdt:null,
      show:false,
      searchContent:''
    }
  },
  created() {
    this._getmarket()
  
  },
  mounted () {
    this.$parent.footshow = true
  },
  beforeDestroy() {
    this.$parent.footshow = false
  },
  methods: {
     search(){
        
        if(this.searchContent) {
          this.marketlist = this.searchList.filter((item)=>{
            return item.name.indexOf(this.searchContent) !=-1
          })
        }else{
           this.marketlist=this.searchList
        }
    },
    openLink(item){
    
       this.$router.push({
       path:'/marketDetail',
       query:{
          code:item.code
       }
     })
    },
    onshow(arr,index){

      localStorage['_makeList'] = JSON.stringify(this.marketlist)
      
      this._getmarket()
    },
    goback() {
      this.$router.back()
    },
    tabclick(index) {
      this.active = index
      this._getmarket()
    },
    sortClick(order){
      this._getmarket()
    },
    gotab(){
      this.$router.push({
       path:'/exchangeETH'
     })
    },
    _getmarket() {
    
      let obj = {}
      obj.order = this.order
      obj.uid = localStorage['_shop_userId']
      Toast.loading({
        duration:2000,
        forbidClick: true,
        message:'加载中...'
      })
      
    //  let url = 'https://www.ttex.com/public/stock/findByName?name=USDT'
    //     axios.get(url).then((res) => {
    //       console.log(res)
    //    })     
      getmarket(obj).then((res)=>{
        if (res.status == 200) {
          res.data.data.map(data=>{
            data.showFlag= true
          })
          if(localStorage['_makeList']) {
            
            this.marketlist = JSON.parse(localStorage['_makeList'])
      
          }else {
             this.searchList = res.data.data
             this.marketlist = res.data.data
          }
          this.usdt = res.data.usdt
           Toast.clear()
      
         
        } else {
          Toast.fail(res.msg)
        }
      })
    },
  },
  components: {
  }
};
</script>
<style scoped lang="stylus" >
.transactionrecord
  position: absolute
  width: 100%
  height: 100%
  background: rgb(245,245,245)
  text-align:center
  .heard
    position: fixed
    width: 100%
    z-index: 2
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
    display:flex
    align-items:flex-end
    justify-content:space-between
    background:#fff
    ul
      display:flex
      font-size:17px
      li
        width:18vw
        display:flex
        flex-direction: column
        span
          margin-bottom:10px
          padding-top:25px
        label
          width:30%
          margin: 0 auto
          height:2px
          background:rgb(244,155,10)
  .list
    color:#333
    background-color:#fff
    text-align:left
    position: absolute
    width: 100%
    min-height: 100%
    .list-tabs
      display:flex
      justify-content: space-between
      padding:0 15px
      border-bottom:1px solid rgb(229,229,229)
      li
        padding: 15px 0
        display:flex
        justify-content: center
        align-items: center
        font-size:15px
        span
          margin-right:5px
        img
          width:15px
    .list-content
      display:flex
      flex-direction:column
     
      .item-box     
        display:flex
        justify-content:space-between
        align-items: flex-end
        padding:15px 0
        margin:0 15px
        border-bottom:1px solid rgb(229,229,229)
        div
          display:flex
          align-items: center
          span
            display:flex
            flex-direction:column
            label:first-child
              font-size:15px
              color:rgb(51,51,51)
              margin-bottom:5px
            label:last-child
              font-size:12px
              color:rgb(153,153,153)
          .btn
            color:#fff
            background:rgb(242,72,29)
            border-radius: 30px
            padding:3px 11px
            margin-left:15px
</style>
<style scoped>
 .heard-top {
  border: 1px solid #eee;
  border-radius: 30px;
  display: flex;
}
.heard-top span {
  display:flex;
  flex: 1;
  font-size: 14px;
  padding: 5px 15px;
  border-radius: 30px;
}
.heard-top .active {
  background-image: linear-gradient(-30deg, #376bff 0%, #409afe 100%), linear-gradient( #ff52a7, #ff52a7);
  color: #fff
}
.list {
  
   margin-bottom: 60px
}
.filter .van-icon {
  float: right;
  padding-right: 20px
}
.list-choice-box {
  padding: 20px
}
.transactionrecord .van-popup--right {
  width: 70%
}
.list-choice {
    margin: 15px 0px;
    font-size: 14px;
}
</style>
