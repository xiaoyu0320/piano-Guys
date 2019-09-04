<template>
  <div class="fixed-top" style="margin-top:44px">
 
    <van-nav-bar 
      title="系统管理"
      left-arrow
      @click-left="onClickLeft"
      class="fixed"
    />
  
   <van-tabs v-model="active" @click="activeClick">
     

      <van-tab title="项目管理" >
        <h2 class="van-doc-demo-block__title" @click="add" >添加</h2>
       <div class="system-card" v-for="(item,i) in list" :key="i">
      
        <div class="system-card__header">
            <div class="system-card__img" :style="{backgroundImage: 'url('+ item.imgUrl +')'}"></div>
            <div class="system-card__content">
                <div class="system-card__title">{{item.title}}</div>
                <div class="system-card__detail" v-html="item.content"></div>
            </div>
        </div>
          <div class="van-card__footer">
            <span style="font-size:13px;float:left;padding-left:100px"> 收益类型：{{incomeName(item.type)}}</span>
            <van-button size="mini" @click="edit(item)">编辑</van-button>
            <van-button size="mini" @click="del(item.id,i)">删除</van-button>
        </div> 
      </div>
 <!-- 项目管理 -->
  <van-popup v-model="systemVisabled" position="right" :overlay="true">
     <div class="system-form">
       <div class="system-opeat">
          <van-icon name="cross" @click="systemVisabled=false" />
          <van-icon name="success" @click="save"/>
        
       </div>

        <div class="system-form-item">
           <div class="system-form__label">收益类型 </div>
           <div class="system-form__content">
               <div class="system-form-input">
                 <input type="text" v-model="Revenuetype" placeholder="请选择名称" @click="walletType()">
               </div> 
           </div>
        </div>


        <div class="system-form-item" v-if="lang == 'zhChS'">
         
           <div class="system-form__label"  >产品名称</div>
           <div class="system-form__content">
               <div class="system-form-input">
                 <input type="text" v-model="data.title" placeholder="请输入产品名称">
               </div> 
           </div>
        </div>

         <div class="system-form-item" v-if="lang == 'en'">
           <div class="system-form__label" >产品名称</div>
           <div class="system-form__content">
               <div class="system-form-input">
                 <input type="text" v-model="data.english_title" placeholder="请输入产品名称">
               </div> 
           </div>
        </div>

        <div class="system-form-item" v-if="lang == 'zhCHS'">
           <div class="system-form__label">项目说明</div>
           <div class="system-form__content">
               <div class="system-form-input">
                
                 <div  v-html="data.content"  ref="contentHtml" class="system-form-txt" contenteditable="true" placeholder="请输入项目说明" ></div>
                 <!-- <textarea  v-model="data.content"  class="system-form-txt" placeholder="请输入项目说明"></textarea> -->
                              
               </div> 
           </div>
        </div>
        <div class="system-form-item" v-if="lang == 'en'">
           <div class="system-form__label">项目说明</div>
           <div class="system-form__content">
               <div class="system-form-input">
                
                 <div  v-html="data.english_content"  ref="contentHtml" class="system-form-txt" contenteditable="true" placeholder="请输入项目说明" ></div>
                 <!-- <textarea  v-model="data.content"  class="system-form-txt" placeholder="请输入项目说明"></textarea> -->
                              
               </div> 
           </div>
        </div>


         <div class="system-form-item">
           <div class="system-form__label">交易期数(如：第一期)</div>
           <div class="system-form__content">
               <div class="system-form-input">
                 <input type="text" v-model="data.periods" placeholder="请输入交易期数">                         
               </div> 
           </div>
        </div>
        

        <div class="system-form-item">
           <div class="system-form__label">产品头像</div>
           <div class="system-form__content">
               <van-uploader :afterRead="logContent">
                <img ref="headImg" width="88" height="88" style="border-radius: 50%;" :src="data.imgUrl">
              </van-uploader>
           </div>
        </div>



         <div class="system-form-item" v-if="data.type == 2">
           <div class="system-form__label">锁仓周期（周） </div>
           <div class="system-form__content">
               <div class="system-form-input">
                 <input type="number" v-model="data.froze" placeholder="请输入周数" >
               </div> 
           </div>
        </div>

     

         <div class="system-form-item" v-if="data.type == 2">
           <div class="system-form__label">释放速度， 0.1为10%（每周 0-1）</div>
           <div class="system-form__content">
               <div class="system-form-input">
                 <input type="text"  v-model="data.releaseSpeed"  placeholder="请输入释放速度（0-1）">
               </div> 
           </div>
        </div>

     <div class="system-form-item" v-if="data.type == 2">
           <div class="system-form__label">开始释放时间(yyyy-MM-dd hh:mm:ss)</div>
           <div class="system-form__content">
               <div class="system-form-input">
                 <input type="text"  v-model="relaxTime" @click="timeOpen()"  placeholder="请输入开始释放时间如2019-12-01 12:00:00">
               </div> 
           </div>
        </div>

    <div class="system-form-item" v-if="data.type == 2">
           <div class="system-form__label">每份金额ASC</div>
           <div class="system-form__content">
               <div class="system-form-input">
                 <input type="text"  v-model="data.coinMoney"  placeholder="每份金额">
               </div> 
           </div>
        </div>
  <div class="system-form-item" v-if="data.type == 2">
           <div class="system-form__label">总份数</div>
           <div class="system-form__content">
               <div class="system-form-input">
                 <input type="text"  v-model="data.coinTotalNum"  placeholder="请输入总份数">
               </div> 
           </div>
        </div>
  <div class="system-form-item" v-if="data.type == 2">
           <div class="system-form__label">已购份数</div>
           <div class="system-form__content">
               <div class="system-form-input">
                 <input type="text"  v-model="data.coinBuyedNum"  placeholder="请输入已购份数">
               </div> 
           </div>
        </div>



        <div class="system-form-item" v-if="data.type == 0">
           <div class="system-form__label">赎回说明</div>
           <div class="system-form__content">
               <div class="system-form-input">
                 <input type="text"  v-model="data.explain"  placeholder="请输入分红宝说明">
               </div> 
           </div>
        </div>
        <div class="system-form-item" v-if="data.type == 0">
           <div class="system-form__label">委托说明</div>
           <div class="system-form__content">
               <div class="system-form-input">
                 <input type="text"  v-model="data.entrust"  placeholder="请输入委托说明">
               </div> 
           </div>
        </div>
        <div class="system-form-item" v-if="data.type == 0">
           <div class="system-form__label">收益说明</div>
           <div class="system-form__content">
               <div class="system-form-input">
                 <input type="text"  v-model="data.income"  placeholder="请输入收益说明">
               </div> 
           </div>
        </div>
        <div class="system-form-item" v-if="data.type == 0">
           <div class="system-form__label">风险说明</div>
           <div class="system-form__content">
               <div class="system-form-input">
                 <input type="text"  v-model="data.risk"  placeholder="请输入风险说明">
               </div> 
          </div>
        </div>
         <div class="system-form-item" v-if="data.type != 2">
           <div class="system-form__label">他人总收入</div>
           <div class="system-form__content">
               <div class="system-form-input">
                 <input type="number"  v-model="data.earn" placeholder="请输入收入金额">
               </div> 
           </div>
        </div>
        <div class="system-form-item" v-if="data.type !=2">
          <div class="system-form__label">输入月数</div>
           <div class="system-form__content">
               <div class="system-form-input">
                 <input type="number" v-model="data.borrowtime" @click="borrowtime"  placeholder="输入月数">
               </div> 
           </div>
        </div>
        <div class="system-form-item" v-if="data.type !=2">
           <div class="system-form__label">剩余金额</div>
           <div class="system-form__content">
               <div class="system-form-input">
                 <input type="number" v-model="data.left"   placeholder="请输入剩余资金">
               </div> 
           </div>
        </div>
        <div class="system-form-item" v-if="data.type !=2">
           <div class="system-form__label">总金额</div>
           <div class="system-form__content">
               <div class="system-form-input">
                 <input type="number"  v-model="data.total" placeholder="请输入总金额">
               </div> 
           </div>
        </div>
        <div class="system-form-item" v-if="data.type !=2">
           <div class="system-form__label">年化收益</div>
           <div class="system-form__content">
               <div class="system-form-input">
                 <input type="number" v-model="data.rate" placeholder="年化收益（单位百分比）">
               </div> 
           </div>
        </div>
        <!-- <div style="margin:15px 20px">
            <van-button type="danger" size="large" @click="save" >保存</van-button>
        </div> -->
      
     </div>
   
      </van-popup>
        <van-action-sheet
          v-model="walletViabled"
          :actions="actions2"
          @select="onSelect1"
        />
        <van-action-sheet
            v-model="systemShow"
            :actions="actions"
            @select="onSelect"
        />
         <van-popup v-model="showTime" position="bottom">
        <!-- 时间选择  -->
       <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        @confirm="sureTime()"
        @cancel="showTime=false"
        
      />
      </van-popup> 
   
<!-- 项目管理 -->
</van-tab>
  <van-tab title="提现管理">
      <div class="system-card" v-for="(item,index) in shlist" :key="index" @click="cardClick(item)">
        <div class="system-card__header" >
             <div class="system-card__img"><img :src="item.imgUrl"></div>
            <div class="system-card__content">
                <div class="system-card__title" style="word-break: break-all;line-height:1.5;font-size:14px">项目名称：{{item.title}}</div>
                <div class="system-card__detail">
                  <p> EOS账号：{{item.account}}</p>
                   <p>操作金额:{{item.earn}}</p>
                   <p>实际提现金额:{{item.real}}</p>
                   <p>申请时间： {{_formatT(item.createtime)}}</p>
                   <p>电话:{{item.mobile}}</p>
                </div>
            </div>
        </div>
        <div class="van-card__footer" v-if="item.opstatus == 1">
            <van-button size="mini"  style="color:green ;border-color:green" @click="shopearte(2,item)">同意</van-button>
            <van-button size="mini" style="color:red;border-color:red"  @click="shopearte(3,item)">拒绝</van-button>
        </div>  
        <div class="van-card__footer" v-else-if="item.opstatus == 2">
            <van-button size="mini" disabled  style="color:green">已成功</van-button>      
        </div> 
        <div class="van-card__footer" v-else>
            <van-button size="mini" disabled style="color:red" >已拒绝</van-button>
        </div> 
    </div>
    <div style="text-align:center;font-size:12px;margin:20px" v-if="shlist.length==0" >暂无数据</div>
    <van-popup v-model="cardVisabled" position="right" >
       <div class="card-item-title" >明细</div>
         <ul class="card-item-change">
           <li v-for="(item,i) in cardData" :key= "i">
               <p>项目名称：{{item.title}}</p>
               <p>类型：{{changeType(item.type)}}</p>
               <p>{{item.account}}</p>
               <p>申请时间： {{_formatT(item.createtime)}}</p>
               <p><span>异动金额： {{item.earn}}</span> <span v-if="item.type==2">实际金额： {{item.real}}</span> </p>
               <p>手机号： {{item.mobile}}</p>
               <p v-if="item.type==2">操作： {{changeOp(item.opstatus)}}</p>
           </li>
         </ul>
      
    </van-popup>
  </van-tab>
  <!-- 系统管理 -->
   <van-tab title="系统管理">
     <div style="margin:20px 0"></div>
     <van-cell is-link @click="go(1)">
      <template slot="title">
        <span class="custom-text">协议配置</span>
      </template>
    </van-cell>
     <van-cell is-link @click="go(2)">
      <template slot="title">
        <span class="custom-text">关于我们配置</span>
      </template>
    </van-cell>
     <van-cell is-link @click="go(3)">
      <template slot="title">
        <span class="custom-text" >分享比例配置</span>
      </template>
      
    </van-cell>
    <van-cell is-link @click="go(4)">
      <template slot="title">
        <span class="custom-text" >通证管理</span>
      </template>
      
    </van-cell>
    <van-cell is-link @click="go(5)">
      <template slot="title">
        <span class="custom-text" >浏览设置</span>
      </template>
      
    </van-cell>
     <!-- <van-cell is-link @click="go(6)">
      <template slot="title">
        <span class="custom-text" >浏览菜单设置</span>
      </template>
      
    </van-cell> -->
     <van-cell is-link @click="go(7)">
      <template slot="title">
        <span class="custom-text" >充值日志</span>
      </template>
      
    </van-cell>
     <van-cell is-link @click="go(8)">
      <template slot="title">
        <span class="custom-text" >创建账户日志</span>
      </template>
      
    </van-cell>
     <van-cell is-link @click="go(9)">
      <template slot="title">
        <span class="custom-text" >资金日志</span>
      </template>
      
    </van-cell>
     <van-cell is-link @click="go(10)">
      <template slot="title">
        <span class="custom-text" >baslog</span>
      </template>
      
    </van-cell>
     <van-cell is-link @click="go(11)">
      <template slot="title">
        <span class="custom-text" >系统总管理</span>
      </template>
      
    </van-cell>
     <van-cell is-link  @click="consoleMobile()">
      <template slot="title">
        <span class="custom-text" >手机调试(非开发人员勿点)</span>
      </template>
      
    </van-cell>
   </van-tab>
    <!--帮助管理  -->
   <van-tab title="意见管理">
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad">
        <div class="help-box">
          <div class="help-item" v-for="(item,i) in helpList" :key="i" >
            <p class="help-pepple-box">
             <span class="help-pepple">{{item.mobile}}</span>
             <span class="help-time">{{_formatT(item.addtime)}}</span>
            </p>
            <p class="help-content">
              {{item.text}}
            </p>
          </div>
        </div>
 
      </van-list>
   </van-tab>

  </van-tabs>
  
</div>
  
</template>


<script>
import {getCookie,judgeLanguage} from "@/common/auth";
import { formatT } from '@/common/time'
import { AscManager,getUrl,getfhbsh,changeHeadImg,admin } from '@/api/wallet'
import { Toast,Dialog  } from 'vant';
import { setTimeout } from 'timers';
import { nextTick } from 'q';
export default {
  data () {
     return {
       showPickTime:false,
       currentDate: new Date(),
       minDate: new Date(1990,1,1),
       username:'',
       type:0,  //0 get 1 edit 2 edit 3 del
       shtype:0, // 0 get 2 accpit 3 reject
       list:[],
       shlist:[],
       cardData:[],
       helpList:[],
       showTime:false,
       systemShow:false,
       showedit:false,
       systemVisabled:false,
       cardVisabled:false,
       walletViabled:false,
       loading: false,//帮助下拉加载
       finished: false,
       relaxTime:'',//释放时间
        actions: [
        { name: '1个月',value:1 },
        { name: '2个月',value:2  },
        { name: '3个月',value:3},
        { name: '半年',value:6},
        { name: '1年',value:12},
      ],
      actions2:[
        {name:'分红宝',value:0},
        {name:'理财',value:1},
        {name:'基石',value:2}
      ],
    
      Revenuetype:'分红宝',
      data:{
        title:'',
        rate:'',
        imgUrl:'',
        total:null,
        earn:null,
        left:null,
        content:'',
        id:null,
        froze:'',
        type:0,
        borrowtime:null,
        op:1,
        releaseSpeed:'',
        timeStart:'',
        coinMoney:'',
        periods:''
      },
      active:0,
      number:1,
      lang:''
    }
    
  },
  created() {
    this.opearte()
    this.lang = getCookie('lang')
  },
 
  beforeDestroy() {
    this.$parent.footshow = false
  },
  methods: {
    consoleMobile(){
      if(this.number == 10){
         window.eruda.init()
      }else{
        this.number++
      }
     
    },
  
    //收益类型名称
    incomeName(str){
      let name=''
      if(str==0){
        name = '分红宝'
        }else if(str == 1){
        name = '理财'
        }else if (str == 2) {
        name = '基石'
        }
      return name
    },
    sureTime(){
       this.showTime = false
    
       let time =  this.parseTime(this.currentDate)
       this.relaxTime = time
       this.data.timeStart =  this.strtotimestamp(time)/1000
    },
    
    timeOpen(){
      this.showTime = true
    },
    parseTime(d) {
        const newDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' '
                        + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        return newDate;
    },

    walletType(){
      this.walletViabled=true
      this.systemVisabled = false
     
    },
    go(type){
      if(type==1) {
        this.$router.push({
          path:'/agreement'
        })
      }else if(type==2){
        this.$router.push({
          path:'/aboutedit'
        })
      }else if(type==3){
         this.$router.push({
          path:'/scale'
        })
      }else if(type==4){
         this.$router.push({
          path:'/MarketManage'
        })
      }else if(type==5){
         this.$router.push({
          path:'/watchSet'
        })
      }else if(type == 6){
         this.$router.push({
          path:'/watchMenu'
        })
      }else if(type == 7 || type == 8 || type == 9 || type == 10){
         this.$router.push({
          path:'/rechargelog',
          query:{
            type:type
          }
        })
        
      }else if(type == 11){
         this.$router.push({
          path:'/systemGeneral'
        })
      }
    
    },
    activeClick(index, title){
      if(index == 0) {
        this.opearte()
      }else if(index == 1){
        this.getfhbshList()
      }else if(index == 3){
      
        this._helpList()
      }
    },
    onClickLeft() {
      this.$router.back()
    },
     onSelect(item) {
      this.systemShow = false;
      this.data.borrowtime = item.value
    },
    onSelect1(item) {
      this.systemVisabled = true
      this.walletViabled = false;
      this.data.type = item.value
      this.Revenuetype = item.name
    },
    opearte(){
     AscManager({
      op:0,
      uid:localStorage['_shop_userId']
    }).then(res=>{
      if(res.status==200){
        this.list = res.data
      }
       
    })
  },
  
  borrowtime(){
    this.systemShow = true
  },
  _formatT(t){
     return formatT(t)
  },
  edit(item){
    item.op =2
 
    this.relaxTime =  formatT(item.timeStart)
  
    this.data.id = item.id 
    this.systemVisabled = true 
    if(item.type == 0) {
      this.Revenuetype= '分红宝'
    }else if(item.type == 1) {
      this.Revenuetype = '理财'
    } else if(item.type == 2) {
      this.Revenuetype = '基石'
    } 
    this.data = item

  },
  strtotimestamp(s){  
       if (!s) {
        Toast.fail('请输入时间')
        return
      }
      s = s.replace(/-/g,'/'); 
      var timestamp = new Date(s).getTime();
      return timestamp;
  },
  save(){


 let obj ={}
 //操作
 if(this.lang == 'en') {
  this.data.english_content =  this.$refs.contentHtml.innerHTML 
 }else {
   this.data.content = this.$refs.contentHtml.innerHTML 
 }

 if (this.type==1) {
   this.data.op = 1
 }else if(this.type == 2){
   this.data.op = 2
 }
  if (!this.data.title || !this.data.english_title) {
    Toast.fail('产品名称不能为空')
    return
  }
  //内容必填项
  if (!this.data.content || this.data.english_content) {
    Toast.fail('项目说明不能为空')
    return
  }
  if(!this.data.periods) {
    Toast.fail('请输入交易期数')
    return
  }
 
      switch (this.data.type ){
        case 0:
         if (!this.data.explain) {
            Toast.fail('分红宝说明不能为空')
            return
          }
         
           if (!this.data.entrust) {
            Toast.fail('委托说明不能为空')
            return
          }
        
          if (!this.data.income) {
            Toast.fail('收益说明不能为空')
            return
          }
        
           if (!this.data.risk) {
            Toast.fail('风险说明不能为空')
            return
          }
          if (!this.data.earn) {
            Toast.fail('收入金额不能为空')
            return
          }
          if (!this.data.borrowtime) {
            Toast.fail('月数不能为空')
            return
          }       
            if (!this.data.left) {
            Toast.fail('剩余金额不能为空')
            return
          }
          if (!this.data.left) {
            Toast.fail('剩余金额不能为空')
            return
          }
          if (!this.data.total) {
            Toast.fail('总金额不能为空')
            return
          } 
          if (!this.data.rate) {
            Toast.fail('年收益不能为空')
            return
          }
                    
          break;
        case 1:
        if (!this.data.earn) {
            Toast.fail('收入金额不能为空')
            return
          }
          if (!this.data.borrowtime) {
            Toast.fail('月数不能为空')
            return
          }
          if (!this.data.left) {
            Toast.fail('剩余金额不能为空')
            return
          }
          if (!this.data.left) {
            Toast.fail('剩余金额不能为空')
            return
          }
          if (!this.data.total) {
            Toast.fail('总金额不能为空')
            return
          } 
          if (!this.data.rate) {
            Toast.fail('年收益不能为空')
            return
          }
          break;         
        case 2:
         
        
         
          if (!this.data.imgUrl) {
            Toast.fail('图片不能为空')
            return
          }
        
          if (!this.data.froze) {
            Toast.fail('锁仓周期不能为空')
            return
          }
          obj.froze = this.data.froze
          if (this.data.speed>1 || this.data.speed<0) {
            Toast.fail('释放速度错误')
            return
          }
          obj.releaseSpeed = this.data.releaseSpeed
          // let timeStart = this.strtotimestamp(this.data.start)/1000
          //  if (!timeStart) {
          //   Toast.fail('开始时间错误')
          //   return 
          // }
          // obj.timeStart = timeStart
            if (!this.data.coinMoney) {
            Toast.fail('每份金额不能为空')
            return
          }
          obj.coinMoney = this.data.coinMoney
           if (!this.data.coinTotalNum) {
            Toast.fail('总份数不能为空')
            return
          }
            obj.coinTotalNum = this.data.coinTotalNum
           if (!this.data.coinBuyedNum) {
            Toast.fail('已够不能为空')
            return
          }
           obj.coinBuyedNum = this.data.coinBuyedNum
        
    
          break;
      }
     
   
     this.data.uid=localStorage['_shop_userId']
     AscManager(this.data).then(res=>{
      if(res.status == 200){
        Toast.success(res.msg)
        this.systemVisabled = false
        this.list=[]
        this.opearte()
      }else {
        Toast.fail(res.mag)
      }
       
    })
  },
  del(id,index){
    AscManager({
      op:3,
      id:id,
     uid:localStorage['_shop_userId']
    }).then(res=>{
       Dialog.confirm({
          title: '提示',
          message: '确认删除吗'
        }).then(() => {
           if(res.status == 200) {
              Toast.success(res.msg)
              this.list.splice(index,1);
              this.opearte()
          }else {
            Toast.fail(res.mag)
          }
        }).catch(() => {
          // on cancel
        });
      
    })
  },
  add(){
     this.type= 1
     this.systemVisabled = true  
     this.data = {
        title:'',
        rate:'',
        imgUrl:'',
        total:null,
        earn:null,
        left:null,
        content:'',
        id:null,
        borrowtime:null,
       
      }
  },
   logContent(file) {
       
        Toast.loading({ mask: true, message: '正在上传项目logo' })
      
        this.$refs.headImg.src = file.content
        let formData = new FormData()
        formData.append('user_id', localStorage['_shop_userId'])
        formData.append('imgFiles', file.file)

        const xhr = new XMLHttpRequest()
        xhr.open('POST', 'https://api.ascchain.com/asc/upload/upload', true)
        xhr.send(formData)
        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 304) {
            let res = JSON.parse(xhr.responseText)
            if (res.status === 200) {
              Toast.success('头像更新成功')
              this.data.imgUrl = res.data
              // this._changeHeadImg()
            } else {
              Toast.fail(res.msg)
            }
          } else {
            Toast.fail(`${xhr.status} 请求错误!`)
          }
        }
      },
     
    getfhbshList(){
       let obj = {
         op:0,
         uid:localStorage['_shop_userId']
       }
       this.shlist= []
       getfhbsh(obj).then(res=>{
         if (res.status == 200) {
           
      
            this.shlist = res.data.list
           
          
         }
         
       })
    } ,
    /**赎回操作 */
    shopearte(type,item){
       let obj = {
         op:type,
         id:item.id,
         uid:localStorage['_shop_userId']
       }
       getfhbsh(obj).then(res=>{
         if(res.status == 200){
            Toast.success(res.msg)
            this.shlist = []
            this.getfhbshList()
          }else {
            Toast.fail(res.mag)
          }
       })
    },
    cardClick(item){
       this.cardVisabled = true
      let obj = {
         op:1,
         uid:item.uid,
         uid:localStorage['_shop_userId']
       }
       getfhbsh(obj).then(res=>{
         if(res.status == 200){
             this.cardData = res.data.list
          }else {
            Toast.fail(res.mag)
          }
       })
    },
    changeType(str){
      switch(str){
        case 0 :
        return '充值'
        break;  
        case 1 :
        return '分红'  
        break;  
        case 2 :
        return '赎回' 
        break; 
        
      }
    },
    changeOp(str){
    
      switch(str){
        
        case 0 :
        return '无操作'
        break;  
        case 1 :
        return '赎回中'  
        break;  
        case 2 :
        return '已同意' 
        break; 
        case 3 :
        return '已拒绝' 
        break; 
        
      }
    },
    _helpList(){
      admin({
        op:0,
        type:0,
        uid:localStorage['_shop_userId']
      }).then(res=>{
        if(res.status == 200){
          this.helpList = res.data
          this.loading = false;
          this.finished = true;
        }else {
            this.finished = false;
        }
        
      })
    },
    onLoad() {
       this.loading = false;
       this.finished = true;
      // 异步更新数据
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }
      //   // 加载状态结束
      //   this.loading = false;

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 500);
    },
    surecel(){
      this.sureTime = false
    }
  
   
  },

  

};
</script>
<style scope >
   .card-item-change {
     padding:20px
   }
   .van-doc-demo-block__title {
    margin: 0;
    font-weight: 400;
    font-size: 14px;
    color: rgba(69,90,100,.6);
    padding: 15px 15px 15px;
    background: #f8f8f8
  }
   
  .system-card {
    position: relative;
    box-sizing: border-box;
    padding: 10px 15px;
    color: #323233;
    box-shadow: 0 1px 4px rgba(0,0,0,.06);
    border: 1px solid #eee;
    margin: 5px
  }

  .system-card__header {
     display: flex
  }
 .system-card__img{
    position: relative;
    -webkit-box-flex: 0;
    -webkit-flex: none;
    flex: none;
    width: 90px;
    height: 90px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    overflow: hidden;
     background-size: cover!important;
    background-position: center;
    background-repeat: no-repeat!important;
}
.system-card__content {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    min-height: 90px;
}
.system-card__title {
  font-size: 16px;
 
  
}
.system-card__detail {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 13px;
    line-height: 22px;
    margin-bottom: 5px;
    height:44px;
    margin:15px 0
}
 .van-popup--right {
    width: 90%;
    height: 100%;
}
.system-form {
  padding-top:40px
}
.system-opeat {
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  box-sizing: border-box;
  width: 100%;
  color: #07c160;

}
.system-form__label {
   
    vertical-align: middle;
    
    font-size: 14px;
    color: #666;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
    font-weight: 600
}
.system-form__content {
    line-height: 40px;
    position: relative;
    font-size: 14px;
   
}
.system-form-input {
    position: relative;
    font-size: 14px;
    display: inline-block; 
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
}
.system-form-input input {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 36px;
    line-height: 36px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
.system-form-item {
    padding:8px 15px;
  
}
.card-item-change {
  padding:20px 10px;
  font-size: 12px
}
.card-item-change li {
    position: relative;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px 15px;
    color: #323233;
    -webkit-box-shadow: 0 1px 4px rgba(0,0,0,.06);
    box-shadow: 0 1px 4px rgba(0,0,0,.06);
    border: 1px solid #eee;
    margin: 5px;
}
.card-item-change p {
  word-break: break-all;
  line-height:22px
}
.card-item-title {
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  font-weight: 600
}
.help-box {
  padding: 0 10px;
}
.help-pepple-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px
}
.help-item {
  border-bottom: 1px solid #eee;
  padding: 10px 0
}
.help-people{
  font-size: 14px
}
.help-time,.help-content {
    font-size: 12px;
    color: #999;
}
.system-form-input .system-form-txt{
  width:100%;
  border-color: #dcdfe6;
  box-sizing: border-box;
  padding: 0 10px
}
.system-form-input .system-form-txt {
    width: 100%;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 10px;
    max-height: 200px;
    overflow-y: auto;
}
.system-form-input input::-webkit-input-placeholder { /* Chrome/Opera/Safari */ 
		  font-size: 12px
		}
		::-moz-placeholder { /* Firefox 19+ */  
		 font-size: 12px
		}
		:-ms-input-placeholder { /* IE 10+ */ 
		 font-size: 12px
		}
		:-moz-placeholder { /* Firefox 18- */ 
		 font-size: 12px
		}

</style>
