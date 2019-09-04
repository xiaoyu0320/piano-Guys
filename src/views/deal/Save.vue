<template>
  <div class="fixed-top">
    <van-nav-bar
      title="分红宝"
      left-arrow
      @click-left="onClickLeft"
      class="fixed"
    />
      <van-row class="progerss-header">
         <div style="width:100px;margin:0 auto">
            <van-circle
              v-model="currentRate"
              :rate="value"
              :speed="100"
              :text="text"
              color="orange"
            />
         </div>
      </van-row>
      
      <van-row class="progerss-tab">
          <van-col span="12">
            <div class="progerss-tab-item">
                <p>平台总额 </p>
                <p class="progerss-num">{{parseFloat(data.total).toFixed(4)}} ASC</p>
            </div>
          </van-col>
          <van-col span="12">
             <div class="progerss-tab-item">
                <p>投资总额</p>
                <!-- <p class="progerss-num">{{data.left}}</p> -->
                <p class="progerss-num">{{parseFloat(data.total-data.left).toFixed(4)}} ASC</p>
            </div>
          </van-col>
          <van-col span="12">
            <div class="progerss-tab-item">
                <p>有效余额</p>
                <!-- <p class="progerss-num">{{data.earn}}</p> -->
                 <p class="progerss-num">{{parseFloat(list.total).toFixed(4)}} ASC</p>
            </div>
          </van-col>
          <van-col span="12">
            <div class="progerss-tab-item">
                <p>累计分红</p>
                <!-- <p class="progerss-num">{{data.earn}}</p> -->
                 <p class="progerss-num">{{parseFloat(list.earn).toFixed(4)}} ASC</p>
            </div>
          </van-col>
      </van-row>
      <div class="progerss-box">
      <div class="progerss-info">
        <div class="progerss-info-n1">
          产品介绍
        </div>
         <div class="progerss-info-n2">
          {{data.content}}
        </div>
         <div class="progerss-info-n3">
          每周一早晨结转，转入后隔日生效。
        </div>
      </div>
     </div> 
     <div class="progerss-list">
     
        <van-list
          v-model="listLoading"
          :finished="listFinished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell
            v-for="item in fhblist"
            :key="item.id"
            
          >
          <div slot="default"> 
              <van-row >
                <van-col span="12">
                  <h3>有效余额：{{item.money}}</h3>
                  <p>{{ _formatTime(item.createtime)}}</p>
                </van-col>
                <van-col span="12">
                  <div class="infomation"  style="color:#666"> {{ earnN(item.earn)  }}</div>
                  <div class="infomation "  v-if="item.type==0"> 充值</div>
                  <div class="infomation active1" v-else-if="item.type==1">分红</div>
                  <div class="infomation active1" v-else-if="item.type==2">赎回</div>
                </van-col>
              </van-row>
          </div>
          </van-cell>
        </van-list>
      
     </div>
      
      <van-row class="progerss-op progerss-fixed">
           <van-col span="12" ><van-button  round size="small" class="progress-btn1" @click="switchOn(0)" type="default">转入</van-button></van-col>
          <van-col span="12"><van-button round size="small"  class="progress-btn2"  @click="switchOn(1)" type="default">赎回</van-button></van-col>
      </van-row>
    
  </div>
</template>

<script>
import { getgolddetail, getgoldlist, getNoteDetail,getascfroze } from '@/api/wallet'
import { formatT,formatTime } from '@/common/time'
import Clipboard from "clipboard"
import QrcodeVue from 'qrcode.vue'
import empty from '@/components/empty.vue'
import { Toast } from 'vant';

export default {
  data () {
    return {
      currentRate: 123,
      id: 0,
      data:{
        total:0,
        left:0,
        earn:0,
        money:0,
        createtime:0
      },
      value:0,
      list:{},
      listLoading: false,
      listFinished: false,
      nowPage:1,
      numberCount:0,
      fhblist:[],
    }
  },
  created() {
    this.id = this.$route.params.id
    console.log(this.id)
    let obj ={}
    obj.id = this.id
    obj.uid = localStorage['_shop_userId']
    obj.token = localStorage['_shop_token']
    getNoteDetail(obj).then(res=>{
      if(res.status == 200) {
          console.log(res)
          this.data = res.data
          this.fhblist = res.data.fhb.list
          this.numberCount = res.data.fhb.number
          this.value = (this.data.total - this.data.left) *100/ this.data.total
          this.list = res.data.ascFHB
      }else {
        Toast.fail(res.msg)
      }
       
    })

  },

  beforeDestroy() {
    this.$parent.footshow = false
  },
  methods: {
    earnN(number){
      if(number < 0){
        return number
      }else {
        return '+'+number
      }
    },
    onClickLeft() {
      this.$router.back()
    },
    switchOn(type){
       if(!localStorage['asc_address']){
         Toast.fail('请切换至EOS钱包')
         return
       }
       this.$router.push({
          path:'/transin/' ,
          query:{
            type:type,
            id:this.id
          }       
       })
    },
    _formatTime(atime){
      return formatT(atime)
    },
    onLoad() {
      setTimeout(() => {
            
            // 加载状态结束
            this.listLoading = false;

            // 数据全部加载完成
            if (this.fhblist.length >= this.numberCount) {
              this.listFinished = true;
            }
      }, 500);
    },
   
    getstatus(str){
      switch(str){
        case '0':
        return '充值'
        break;
        case '1':
        return '分红'
        break;
        case '2':
        return '赎回'
        break;
      }
    }    
  },
  computed: {
    text() {
      return this.currentRate.toFixed(0) + '%' +"\n" +'   已投资'
    }
  }
};
</script>
<style scope >
.infomation.active1 {
 color:red
}
.progerss-header.van-row {
    padding: 15px 0;
}
.van-circle {
    background: url(/images/other/circle-bg.png) no-repeat;
    border-radius: 50%;
    background-size: cover;
}
.progerss-tab-item {
    text-align: center;
}
.progerss-tab-item p{
   line-height: 28px;
   font-size: 13px;
   color: #666
}
.progerss-tab-item .progerss-num{
  font-size: 15px;
  color: #409afe;
 
}
.progerss-info-n1 {
  margin: 10px 0;
  font-size: 16px
}
.progerss-box {
  padding:  0 15px;
  box-shadow: 0 1px 10px rgba(0,0,0,.15);
  margin:15px 10px;
  border-radius: 5px
}
.progerss-info {
  padding:10px 0
}
.progerss-info-n2 {
  font-size: 14px;
  color: #777;
  margin-top:10px;
 
}
.progerss-info-n3 {
  font-size: 14px;
  color: #bf4040;
  margin-top:10px;
}
.progerss-list {
    margin: 10px 10px 60px;
    box-shadow: 0 1px 10px rgba(0,0,0,.15);
    border-radius:5px 
}
.progerss-list .van-row {
  padding:15px;
  border-bottom: 1px solid #eee
}
.progerss-list .van-row h3 {
 font-weight: normal;
 font-size: 16px
}
.progerss-list .van-row p {
  color: green;
  font-size: 12px;
  margin-top:10px
}
.infomation {
  line-height: 30px;
  text-align: right;
  color: #4db17f;
  font-size: 12px
}
.progerss-op{
  height: 50px;
  line-height: 50px;
  width: 100%
}
.progerss-op .van-col {
  text-align: center;
}
.van-circle__text {
  color: #fff!important
}
.progerss-op .van-col:last-child {
  border-left: 1px solid #fff
}
.progress-btn1 {
  padding:0 30px !important;
  color:#fff!important;
  background: #00ccd9 !important
}
.progress-btn2 {
  padding:0 30px !important;
  color:#fff!important;
  background: #5273ff !important
}
.progerss-fixed {
  position: fixed;
  bottom: 0;
  background: #fff
}
.progerss-header .van-circle__text {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50px;
    margin-left: -25px;
    color: #323233;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
}
</style>
