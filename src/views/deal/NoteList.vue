
<template>

<div class='notelist fixed-top'>
  <van-nav-bar
          title="交易明细"
          left-arrow     
          @click-left="onClickLeft"
          class="fixed"
        />
     <div v-if ="chartData.length>0"> <ve-line :data="chartData" v-if="charFlag"></ve-line></div>   
    
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
                  <div class="infomation"  style="color:#666"><!-- {{ item.earn < 0 ? item.earn : '+'+ item.earn  }}--> {{item.earn}}</div>
                  <div class="infomation "  v-if="item.type==0"> 充值</div>
                  <div class="infomation active1" v-else-if="item.type==1">分红</div>
                  <div class="infomation active1" v-else-if="item.type==2">赎回</div>
                </van-col>
              </van-row>
          </div>
          </van-cell>
        </van-list>
      
     </div>
      
</div>
</template>

<script>

import { getNoteDetail,transfer,getgolddetail } from '@/api/wallet' ;
import { formatT,formatTime } from '@/common/time'
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
  chartData: {
  columns: ['time', 'money'],
  rows: []
  },
  listLoading: false,
  listFinished: false,
  fhblist:[],
  id:this.$route.query.id,
  numberCount:0,     
  charFlag:false
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
onClickLeft(){
   this.$router.back()
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
     _formatTime(atime){
      return formatT(atime)
    },  
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    let obj ={}
    obj.id = this.id
    obj.uid = localStorage['_shop_userId']
    obj.token = localStorage['_shop_token']
    getNoteDetail(obj).then(res=>{
      if(res.status == 200) {
          this.numberCount = res.data.fhb.number
          this.fhblist = res.data.fhb.list
          let datalist= []
          res.data.fhb.list.map((data,index)=>{
            datalist.push({
                'time' : formatT(data.createtime),
                'money':  data.money
             })
          })
         
           this.chartData.rows = datalist.slice(0,4)
          
         
         console.log( this.chartData.rows)
         this.charFlag = true;
      }else {
        Toast.fail(res.msg)
      }
       
    })
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},

}
</script>
<style  scoped>


</style>