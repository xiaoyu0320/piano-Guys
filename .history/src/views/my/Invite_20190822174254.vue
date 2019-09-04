
<template>
<div class='invite ' ref="bodyHeight" style="padding-top:40px" >
     <van-nav-bar
          title="ASC"
          left-arrow
        
          @click-left="onClickLeft"
         
          class="fixed"
    />
    <div class="invite__header" >
      <div class="invite__header--left">
          <h1>{{$t("message.Invitefriendstoget")}} &nbsp;5ASC</h1>
          <p class="invite__header--p">{{$t("message.InvitationEarnings")}}：{{Income()}} ASC</p>
          <p>{{$t("message.NumberofInvitation")}}：{{person}}</p>
      </div>
    </div>
    <div class="invite__box">
        <div class="invite__box--tabs">
            <div  class="heard-top"><span :class="{active:inviteActive==1}" @click="tabs(1)">{{$t('message.Invitation')}}</span><span :class="{active:inviteActive==2}" @click="tabs(2)">{{$t('message.Earning')}} </span></div>
        </div>
        <div class="invite__list" v-if="inviteActive == 1">
            <div class="invite__list--thead">
                 <div class="invite__list--td" style="flex: 35%;">
                  {{$t('message.InvitationFriends')}}
                </div>
                 <div class="invite__list--td" style="flex: 35%;">
                   {{$t('message.FriendsLevel')}}
                </div>
                 <div class="invite__list--td" style="flex: 30%;">
                   {{$t('message.InvitationTime')}}
                </div>
            </div>
            <div class="invite__list--thbody" v-for="(item, index) in inviteList" :key="'s'+index">
                <div class="invite__list--td" style="flex: 35%;">
                   {{item.mobile}}
                </div>
                 <div class="invite__list--td" style="flex: 35%;">
                  {{returnRole(item.level)}}
                </div>
                 <div class="invite__list--td" style="flex: 30%;">
                   {{returnTime(item.createtime)}}
                </div>
            </div>
            
        </div>
        <div class="invite__list" style="margin-top:15px" v-else>
            <van-tabs v-model="active">
                <van-tab title="全部">
                    <div class="invite__list--item" v-for="(item, index) in allProfitList" :key="'p'+index">
                        <div class="invite__list--left">
                            <h5>{{item.teammobile}}</h5>
                            <p>{{$t('message.time')}}</p>
                            <p>{{returnTime(item.createtime)}}</p>
                        </div>
                        <div class="invite__list--right">
                           <h5 v-if="item.teammobile">{{$t('message.Arrived')}}</h5>
                           <p>{{returnCoin(item)}}</p>
                           <p>+{{item.coin}}</p>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="一级">
                    <div class="invite__list--item" v-for="(item, index) in lv1" :key="'p1'+index">
                        <div class="invite__list--left">
                            <h5>{{item.teammobile}}</h5>
                            <p>{{$t('message.time')}}</p>
                            <p>{{returnTime(item.createtime)}}</p>
                        </div>
                        <div class="invite__list--right">
                           <h5 v-if="item.teammobile">{{$t('message.Arrived')}}</h5>
                           <p>{{returnCoin(item)}}</p>
                           <p>+{{item.coin}}</p>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="二级">
                    <div class="invite__list--item" v-for="(item, index) in lv2" :key="'p2'+index">
                        <div class="invite__list--left">
                            <h5>{{item.teammobile}}</h5>
                            <p>{{$t('message.time')}}</p>
                            <p>{{returnTime(item.createtime)}}</p>
                        </div>
                        <div class="invite__list--right">
                           <h5 v-if="item.teammobile">{{$t('message.Arrived')}}</h5>
                           <p>{{returnCoin(item)}}</p>
                           <p>+{{item.coin}}</p>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="团队">
                    <div class="invite__list--item" v-for="(item, index) in lv3" :key="'p3'+index">
                        <div class="invite__list--left">
                            <h5>{{item.teammobile}}</h5>
                            <p>{{$t('message.time')}}</p>
                            <p>{{returnTime(item.createtime)}}</p>
                        </div>
                        <div class="invite__list--right">
                           <h5 v-if="item.teammobile">{{$t('message.Arrived')}}</h5>
                           <p>{{returnCoin(item)}}</p>
                           <p> {{item.coin}}</p>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
    <div class="invite__foot">
        <!-- <div class="invite__foot--menu">
            <div>邀请码：{{code}}</div>
            <div  class="copybutton" @click="getCopy" :data-clipboard-text="code" >复制</div>
            
        </div> -->
        <div class="invite__foot--btn">
           <van-button type="primary" size="large" round  @click="share()">{{$t('message.InviteFriendsNow')}}</van-button>
        </div>
    </div>
</div>
</template>

<script>
import {getInviteInfo } from '@/api/wallet'
import { Toast, Actionsheet } from 'vant'
import Clipboard from "clipboard"
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
 inviteActive:1,
 person:0,
 active:0,
 inviteList:[],// 邀请记录
 profitList: [],// 当前选中的收益记录
 lv2:[],
 lv1:[],
 lv3:[],
 allProfitList: [], //所有的收益记录
 code:this.$route.query.code,

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {
    active:function(val){
        // 0全部 1 1级 2 2级  3团队
        switch (val) {
            case 0:
                this.profitList = this.allProfitList
                break;
            case 1:
                this.profitList = this.lv1
                break;
            case 2:
                this.profitList = this.lv2
                break;
            case 3:
                this.profitList = this.lv3
                break;
            default:
                break;
        }
    }
},
//方法集合
methods: {
onClickLeft(){
    this.$router.back()
},
returnTime(timestamp){
    var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
    var date = (d.getFullYear()) + "-" + 
           (d.getMonth() + 1) + "-" +
           (d.getDate()) + " " + 
           (d.getHours()) + ":" + 
           (d.getMinutes()) + ":" + 
           (d.getSeconds());
    return date
},
returnCoin (item) {
    switch(item.contract){
        case '0xb7cb1c96db6b22b0d3d9536e0108d062bd488f74':
            return 'WTC';
        case 'eosio.token':
            return 'EOS';
        case 'ETH':
            return 'ETH';
        case '0xdac17f958d2ee523a2206206994597c13d831ec7':
            return 'USDT';
        default:
            return '未知'
    }
},
returnRole (type) {
    switch (type) {
        case 0:
            return '一级'
            break;
        case 1:
            return '二级'
            break;
        case 2:
            return '三级'
            break;
        case 3:
            return '四级'
            break;
        case 4:
            return '五级'
            break;
        case 5:
            return '六级'
            break;
        case 6:
            return '七级'
            break;
        default:
            break;
    }
},
getlist(){
    let obj = {}
    obj.uid = localStorage['_shop_userId']
    obj.page = 1
    obj.limit = 20
    getInviteInfo(obj).then(res=>{
      if(res.status == 200) {
        res.data.lv1Lists.forEach(item => {
            item.level = 0
        });
        res.data.lv2Lists.forEach(item => {
            item.level = 1
        });
        res.data.lv3Lists.forEach(item => {
            item.level = 2
        });
        this.person = res.data.number
        this.inviteList = this.inviteList.concat(res.data.lv1Lists,res.data.lv2Lists,res.data.lv3Lists)
        this.allProfitList = this.allProfitList.concat(res.data.lv1CoinLog,res.data.lv2CoinLog,res.data.lv3CoinLog)
        this.profitList = this.allProfitList
        this.lv1 = res.data.lv1CoinLog
        this.lv2 = res.data.lv2CoinLog
        this.lv3 = res.data.lv3CoinLog

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
  
tabs(index){
 this.inviteActive = index
},
share(){
    this.$router.push({
        path:'/bill',
        query:{
           code:this.code
        }
    })
},
Income(){
    let incomeAmount =  Number(this.person)*5 
    if(incomeAmount >= 50){
        incomeAmount = 50
    }
    return incomeAmount
}
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
  this.getlist()
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
this.$refs.bodyHeight.style.minHeight = window.innerHeight + 'px'
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
  .invite__header{
    padding: 15px;
    margin: 22px 15px 0;
    border-radius: 8px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    background: url(/images/team/bg.png) no-repeat center/cover;
    color: #fff
  }
  .invite__header h1 {
        font-size: 20px;
        font-weight: normal;
  }
  .invite__header p {
      font-size: 14px;
     
  }
  .invite__header--p {
       margin: 10px 0 20px 0
  }
  .invite__box--tabs {
      align-items: center;
      justify-content: center  ;
     
  }
    .invite__box--tabs  .heard-top {
    border: 1px solid #eee;
    border-radius: 30px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 176px;
    margin: 0 auto ;
    }
    .heard-top span {
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-flex: 1;
        -ms-flex: 1;
            flex: 1;
    font-size: 14px;
    padding: 5px 15px;
    border-radius: 30px;
    justify-content: center
    }
    .heard-top .active {
    background-image: linear-gradient(-30deg, #376bff 0%, #409afe 100%), linear-gradient( #ff52a7, #ff52a7);
    color: #fff
    }
    .invite__list--thead, .invite__list--thbody {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin:15px 0
    }
   .invite__list--thead .invite__list--td{
       flex:1;
       text-align: center;
   }
    .invite__list--thbody .invite__list--td {
        font-size: 13px;
        flex:1;
        text-align: center;
        color:#999
    }
    .invite {
        background:#f5f5f5;
        position: relative;
        box-sizing: border-box;
        margin-bottom: 60px
    }
  
    .invite__box {
        margin: 15px;
        background: #fff;
        padding: 15px;
        border-radius: 5px;
    }
    .invite__foot {
        position: fixed;
        bottom: 0;
        width: 100%;
        padding: 10px;
        background: #fff;
        box-sizing: border-box;
        text-align: center
    }
    .invite__foot--btn .van-button--large {
        height: 40px;
        line-height: 38px;
        width: 80%;
        margin-top:10px;
        background-image: linear-gradient(-30deg, #376bff 0%, #409afe 100%), linear-gradient( #ff52a7, #ff52a7);
        border-color:#376bff
    }
    .invite__foot--menu {
        display: flex;
        justify-content: space-around;
        margin-bottom: 10px
    }
    .invite__foot--menu div {
        flex: 1;
        text-align: left
    }
    .invite__foot--menu div:last-child {
        text-align: right
    } 
    .invite__list--item {
        display: flex;
        justify-content: space-around;
    } 
    .invite__list--left{
        flex-basis:65%
    }
    .invite__list--right{
        flex-basis: 35%;
        text-align: right
    }
    .invite__list--item h5 {
        font-size: 14px;
        font-weight: normal;
        margin-top: 10px
    }
    .invite__list--item p {
        font-size: 12px;
        color: #999;
        margin-top: 10px
    }
    .van-hairline--top-bottom::after {
        border-width: 0
    }
</style>
