<template>
  <div class="assetsmanage">
    <div class="topbg">
      <div class="heard">
        <label @click="goback"><img src="/images/login/icon_arrow2@2x.png" width="100%"/></label>
        <label>{{name}}</label>
        <label></label>
      </div>
      <div class="top">
        <span>{{goldValue}}</span>
        <label>{{Number(goldReal).toFixed(4) !=0 ? '￥'+ Number(goldReal).toFixed(4) :'≈'}}</label>
        <div class="copy"><label>{{address.slice(0,12)+'...'+address.slice(38,42)}}</label><label class="copybutton" @click="getCopy" :data-clipboard-text="address">{{$t('message.copy')}}</label></div>
      </div>
      <div class="top-btn">
        <span @click="goReceivables">{{$t('message.receivables')}}</span>
        <span @click="goTransferASC(-1)">{{$t('message.transfer')}}</span>
      </div>
    </div>
    <div v-if="type==1">
      <ul class="list" style="border-top:10px solid rgb(245,245,245)">
        <!-- <li @click="goUsableASC"><span>{{$t('message.availablebalance')}} ASC</span><span><span><label>{{mygold.gold_value}}</label><img src="/images/other/arrow@2x.png" width="100%"/></span></span></li> -->
     <!--    <li @click="goFrozenASC"><span>冻结ASC</span><span><label>{{Number(mygold.ascfroze).toFixed(2)}}</label><img src="/images/other/arrow@2x.png" width="100%"/></span></li> -->
      </ul>
      <ul class="list">
        <li @click="goLock"><span>{{$t('message.lockposition')}} ASC</span><span><label>总剩余:{{left.toFixed(4)}}</label><img src="/images/other/arrow@2x.png" width="100%"/></span></li>
        <!-- <li @click="goExchangeASC"><span>{{$t('message.convertible')}} ASC</span><span><label>{{Number(ascinfo.ascpower).toFixed(4)}}</label><img src="/images/other/arrow@2x.png" width="100%"/></span></li> -->
    <!--     <li @click="goExchangeETH"><span>兑换ETH</span><span><img src="/images/other/arrow@2x.png" width="100%"/></span></li> -->
      </ul>
    </div>
    <div class="list2" >
      <!-- <div>{{tablist[id].name}}明细</div> -->
      <div class="filter ">
        <van-tabs v-model="tabActive"  @click="onClick">
         <van-tab  v-for="(parent,index) in title" :title="parent.name" :key ="index">
           <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            ref="text"
          
          >
             
             <ul v-if="VariantArray.length>0 && tabShow">
              <van-cell  v-for="(item,i) in VariantArray" :key="i"> 
                <li>
                  <div class="list-left" v-if="type == 3">
                    <span >TxHash：<label>{{item.action_trace.trx_id.slice(0,8) + '......' + item.action_trace.trx_id.slice(56,64)}}</label></span>
                    <span>From：<label>{{item.action_trace.act.data.from}}</label></span>
                    <span>To：<label>{{item.action_trace.act.data.to}}</label></span>
                    <span>Value：{{item.action_trace.act.data.quantity}}  </span>
                    <span>memo：{{item.action_trace.act.data.memo}} </span>
                    <span>Time：{{item.action_trace.block_time}} </span>
                  </div>
                  <div class="list-left" v-else-if="type == 1">
                      
                    <span>From：<label>{{item.from}}</label></span>
                    <span>To：<label>{{item.to}}</label></span>
                    <span>Value：{{Number(item.value/1000000000000000000).toFixed(8)}}</span>
                    <span>Time：<label> {{ changeTime(item.timestamp) }}</label></span>
                  </div>
                  <div class="list-left" v-else-if="type == 2">
                  
                    <span>confirmations：<label>{{item.confirmations}}</label></span>
                    <span>income：<label>{{item.income }}</label></span>
                  
                    <span>time：<label> {{ changeTime(item.time) }}</label></span>
                  </div>
                  <div class="list-right"  v-if="type == 3">
                    <span :style="item.action_trace.act.data.from==address?'':'color:#3b6cff;border:1px solid #3b6cff;'">
                      {{item.action_trace.act.data.from == address ? 'out':'in'}}
                    </span>
                  </div>
                  <div class="list-right"  v-else-if=" type == 1 ">
                    <span :style="item.from==address?'':'color:#3b6cff;border:1px solid #3b6cff;'">{{item.from ==address?'out':'in'}}</span>
                  </div>
                </li>
              </van-cell>
            </ul>
            <!-- <div v-if="showVariantArray" class="empty" style="background: #fff; padding: 60px;color: #999;">
              暂无数据
            </div> -->
          </van-list>
           
          </van-tab>
        
        
        </van-tabs>

        <div style="float:right;display:none">
         <van-button plain size="mini" type="primary" @click="revenueSort(0)">{{$t('all')}}</van-button>
         <van-button plain size="mini" type="primary" @click="revenueSort(1)">{{$t('in')}}</van-button>
         <van-button plain size="mini" type="primary" @click="revenueSort(2)">{{$t('out')}}</van-button>
          <van-button plain size="mini" type="primary" @click="revenueSort(3)">{{$t('lose')}}</van-button>
        </div> 
      </div>
     
    </div>
  </div>
  <!--   <div class="list2" >
      <div>{{tablist[id].name}}明细</div>
      <ul>
        <li v-for="item in alldata">
          <div class="list-left">
            <span>TxHash：<label>{{item.hash.slice(0,8) + '......' + item.hash.slice(56,64)}}</label></span>
            <span>From：<label>{{item.from.slice(0,8)+'...'+ item.from.slice(34,42)}}</label></span>
            <span>To：<label>{{item.contractAddress?item.contractAddress.slice(0,8)+'...'+item.contractAddress.slice(34,42) :item.to.slice(0,8)+'...'+item.to.slice(34,42) }}</label></span>
            <span>Value：{{Number(item.value/1000000000000000000).toFixed(8)}}{{tablist[id].name}}</span>
            <span>Time：{{changeTime(item.timeStamp)}}</span>
          </div>
          <div class="list-right"><span :style="item.from==pa?'':'color:#f49b0a;border:1px solid #f49b0a;'">{{item.from==pa?'out':'in'}}</span></div>
        </li>
      </ul>
    </div> </div> -->
 
</template>

<script>

import { getascfroze, getlog,getgolddetail,getHistory,getEthHistory } from '@/api/wallet'
import {ascUniqueArr} from '@/utils/utils'
import { Toast,Tab, Tabs } from 'vant'
import Clipboard from "clipboard"
import { formatT} from '@/common/time'
import axios from 'axios'
export default {
  data () {
    return {
      tabActive:0,
      pa: '',
      title:[{
        name:'ALL'
      },{
        name:'In'
      },{
        name:'Out'
      },{
        name:'Lost'
      }],
      history:'',
      allHistory:[],
      inArr:[],
      outArr:[],
      allArr:[],
      lostArr:[],
      VariantArray:[],
      indexNumber:0,
      showVariantArray:false,
      loading: false,
      finished: false,
      page:1,
      contract:this.$route.query.contract,
      name:this.$route.query.name,
      listdata: {
        ascfroze: 0,
        ascpower: 0
      },
      ascinfo:{
        ascfroze:0,
        money:0 
      },
      mygold: {
        gold_name: 'ASC',
        logo: '',
        gold_address:'',
        gold_value: 0,
        gold_real: 0
      },
      id: 0,
      goldType:3,
      userinfo: {},
      alldata: {},
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
      },
      ],
      type:null,
      ttype:3,
      address:this.$route.query.address,
      goldValue:this.$route.query.gold_value,
      goldReal:this.$route.query.gold_real,
      sum:0,
      tabShow:true,
      left:0//总剩余
    }
  },

  created() {
     
    if(!this.goldReal){
      this.goldReal = 0
    }
  
    this.address = this.address.toLowerCase()
    this.id = this.$route.params.id
    this.type= localStorage['type'] 
  
    if(this.type == '2') {
      this.title= [ {name:'交易明细'}]
    }
    this._getascfroze()

  },
  methods: {
    incoming(){
       if(this.incoming == 1){
          return 'in'
       }else {
          return 'out'
       }
    },
    _getascfroze(){
      let obj = {}
      obj.uid = localStorage['_shop_userId']
      getascfroze(obj).then(res=>{
 
        this.ascinfo = res.data
        let sum = 0
        let left= 0
        res.data.list.forEach((item)=>{
          sum += Number(item.money)
          left += Number(item.totalLeft)
        })
        this.left = left
     
     
      })
    },
    commonJustin(){  
      this.page = 1
      this.VariantArray= []
      this.gethistory()
    },
    onLoad(){
     
      // if(this.VariantArray.length == 0) {
      //   this.loading = false
      //   return
      // }
      this.gethistory()
     
    
    },
    onClick(index) {
su
      if(index== 0) {  
         this.tabShow = true
         if( this.type == 1 || this.type == 2){
            this.VariantArray = this.allArr
         }else{
             this.ttype = 3 
         this.commonJustin()
         }
      }else if(index== 1) {   
       
         this.ttype = 1  
          this.tabShow = true
         if( this.type == 3) {
             this.commonJustin()
          }else if( this.type == 1 || this.type == 2) {
          
            this.VariantArray = this.allArr.filter((item,index)=>{
              

                return  item.to == this.address
            })
            console.log( this.VariantArray)
           
          }
      
      
      }else if(index== 2) {
         this.ttype = 2
          this.tabShow = true
         if( this.type == 3) {
             this.commonJustin()
          }else if( this.type == 1 || this.type == 2) {
              
             this.VariantArray = this.allArr.filter((item,index)=>{
              return  item.from == this.address
            })
            console.log( this.VariantArray)
          }
      }else if(index== 3) {
         this.tabShow = false
      }
       this.loading = false
      this.finished= true  
    },
    //收入排序
    revenueSort(type){
       
       if (type  == 0 ) {
           this.history = this.allHistory.filter((item) => {
           return item.revenue2 === type
         }) 
       } else {
           this.history = this.allHistory.filter((item) => {
           return item.revenue == type
         }) 
       }
       
       this.history = ascUniqueArr( this.history.reverse() )
       
    },
    //时间转换成时间戳
    dateToTime(str){
      return (new Date(str.replace(/-/g,'/'))).getTime(); //用/替换日期中的-是为了解决Safari的兼容
    },

    gethistory(){
        
        /**
         * obj type 1 转入 2 转出 3 全部
         */

          let obj = {}
          switch(localStorage['type']){
            case '3':
            
              obj.account =  localStorage['asc_address']
              obj.page = this.page
              obj.size = 20
              obj.ttype = this.ttype
              obj.type = 3
              obj.contract = this.$route.query.contract
              this.showVariantArray = true
               getHistory(obj).then(res=>{

                    this.showVariantArray = false
                    if(res.data.length == 0){
                        this.finished = true
                        this.loading = false 
                        return
                    }else{
                      res.data.map((arr,index)=>{
                          arr.block_time = this.dateToTime(arr.block_time)
                        })
                      res.data.sort(function(a, b) {
                        return b.block_time> a.block_time ? 1 : -1;
                      });
                  
                      this.VariantArray = this.VariantArray.concat(res.data);
                      this.loading = false;
                      this.page = this.page + 1       
                    }   
                    
                })
              break
          case '2':
           
              obj.account = localStorage['asc_address']
              obj.page = this.page
              obj.size = 20
              obj.ttype = this.ttype
              obj.type = 2
              obj.contract = this.$route.query.contract

               getHistory(obj).then(res=>{
                  
                     
                        if(res.data.data.data.length == 0){
                            this.finished = true
                            this.loading = false 
                            return
                        }   
                        this.VariantArray = this.VariantArray.concat(res.data.data.data);

                        this.loading = false;
                        this.page = this.page + 1                                                             
                })
              break  
            case '1':
              obj.contract =  this.$route.query.contract
              obj.page = this.page
              obj.account=  localStorage['asc_address']
              obj.symbol = this.$route.query.name
              obj.type =1,
              obj.size = 20
             
             
              getHistory(obj).then(res=>{
                
                  if(res.status == 200) {
                    let paramsData = ''
                  
                      if(this.contract=='ETH') {
                         
                       this.allArr = this.allArr.concat(res.data.data.item)
                      
                       
                      }else {
                        res.data.data.result.map(item=>{
                            this.allArr = this.allArr.concat(res.data.data.result)
                            this.finished = true
                             this.loading = false 
                        })
                        
                      }
                       
                      this.VariantArray = this.allArr
                  }              
                })
              break

          }

    },
    getethlist() {
      let url = 'http://api.etherscan.io/api?module=account&action=txlist&address='+ this.mygold.gold_address+'&startblock=0&endblock=99999999&page=1&offset=100&sort=desc&apikey=YourApiKeyToken'
      axios.get(url, {}).then((res) => {
        this.alldata = res.data.result
      })
    },
    goback() {
      this.$router.back()
    },
    goTransferASC(goldId) { // 转账
      localStorage['goldId'] = goldId
      this.$router.push({
        path: '/transferASC/' + this.id,
        query:{
         contract:this.$route.query.contract,
         symbol:this.$route.query.name,
         money:this.goldValue,
         account:this.address
        }
      })
    },
    goReceivables() { // 收款
      this.$router.push({
        path: '/receivables/' + this.id,
        query:{
         account:this.address,
         symbol:this.$route.query.name
        }

      })
    },
    goLock() { // 锁仓
      // this.$router.push({
      //   path: '/lock'
      // })
      this.$router.push({
        path: '/frozenASC',
        query:{
          sum:this.left
        }

      })
    },
    goUsableASC() { // 可用ASC
      // this.$router.push({
      //   path: '/usableASC'
      // })
    },
    goFrozenASC() { // 冻结ASC
      this.$router.push({
        path: '/frozenASC'
      })
    },
    goExchangeETH() { // 兑换ETH
      this.$router.push({
        path: '/exchangeETH'
      })      
    },
    goExchangeASC() { // 兑换ASC
      this.$router.push({
        path: '/exchangeASC'
      })      
    },
    changeTime(str) {
      return formatT(str)
    },
    _getEthHistory(){
      let obj = {}
      obj.contract =  this.$route.query.contract
      obj.page = this.page
      obj.address=  this.$route.query.address
      obj.symbol = this.$route.query.name,
      obj.account = localStorage['asc_address']
      getEthHistory(obj).then(res=>{
         if(res.status == 200) {
           let paramsData = ''
           let newArr = []
              if(this.contract=='ETH') {
              
                 res.data.data.item.map(item=>{
                   this.allArr.push(item)
                             
                  if(item.from == this.address){
                    
                    this.inArr.push(item)
                   
                  }else if(item.to ==this.address ){
                   this.outArr.push(item)
                  
                  } else {
                    this.VariantArray=[]
                    
                  }
              })
               
            }else {
               res.data.data.result.map(item=>{
                  this.allArr.push(item)
                   this.VariantArray = this.allArr
                  if(item.from == this.address){
                    this.inArr.push(item)
                  }else  if(item.to ==this.address ){
                     this.outArr.push(item)
                  } else {
                    this.VariantArray=[]
                  }
              })
            
            }
          
           this.VariantArray = this.allArr
        
         }
        
      })
    },
    getCopy() {
      let clipboard = new Clipboard(".copybutton");
      clipboard.on("success", e => {
        Toast.success("已复制");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        Toast.fail("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
      });
    },
   
  },
  components: {
  }
};
</script>
<style scoped lang="stylus" >
.assetsmanage
  position: absolute
  width: 100%
  min-height: 100%
  background: rgb(245,245,245)
  text-align:center
  .topbg
    background:linear-gradient(left top,rgb(244,170,10),rgb(244,155,10))
    background:url(/images/other/bg3@2x.png)
  .heard
    font-size:17px
    color:#fff
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
    padding-top:25px
    padding-bottom:25px
    display:flex
    align-items: center
    flex-direction: column
    span
      font-size:25px
      color:#fff
    label
      color:rgba(255,255,255,0.7)
    .copy
      margin-top:15px
      display:flex
      align-items: center
      justify-content:space-between
      border-radius:30px
      overflow:hidden
      font-size:15px
      background:rgba(255,255,255,0.3)
      label:first-child
        color:rgba(255,255,255,0.7)
        padding:0 15px 0 10px
      label:last-child
        padding:2px 10px
        border-radius:30px
        background:rgba(255,255,255,0.3)
        color:#885d15
  .top-btn
    display:flex
    justify-content: center
    
    margin:0 15px
    span
      background:rgba(255,255,255,0.3)
      color:#fff
      border-radius:30px
      font-size:15px
      padding:2px 25px
      margin:15px
  .list
    background:#fff
    display:flex
    flex-direction:column
    padding:0 15px
    border-bottom:10px solid rgb(245,245,245)
    li
      display:flex
      align-items: center
      justify-content: space-between
      padding:15px 0
      border-bottom:1px solid rgb(229,229,229)
      font-size:15px
      color:rgb(51,51,51)
      span
        display:flex
        align-items: center
      img
        width:5vw
      label
        margin-right:10px
        color:rgb(51,51,51)
    li:last-child
      border-bottom:none
  .list2
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
          color:rgb(62,108,155);
          width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display:inline-block;
          height:18px;
          position:relative
          top:5px
          text-align: left
        .list-left
          display:flex
          flex-direction:column
          align-items: flex-start
          word-break break-all
        .list-right
          display:flex
          align-items: flex-end
          span
            padding:2px 16px
            border-radius: 30px
            color:rgb(153,153,153)
            border:1px solid rgb(153,153,153)
</style>
<style scope> 
.filter {
  height: 25px;
  margin-top:15px
}
.filter .van-button--primary {
  color:#3b6cff !important;
  border-color: #3b6cff;
  margin-right:10px
  
}

.van-tabs--line {
 padding-bottom:0!important;
}
</style>
