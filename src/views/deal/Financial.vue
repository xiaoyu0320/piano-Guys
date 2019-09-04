
<template>
<div class='finanical'>
     <van-row class="manage-box">
      <van-col span="24">
         <van-col span="12">
           
           <span style="float:left"><img src="/images/other/icon_quzhongxin@2x.png"> <span class="manage-money" >去中心化理财</span></span>
         </van-col>
        <van-col span="12">
        <span class="catesapn" style="float:right;font-size:12px"> 
            <span><i class="circle"></i>分红宝 </span>
            <span><i class="circle " style="background:blue"></i>理财</span>
            <span><i class="circle " style="background:orange"></i>众筹</span></span>
         </van-col>
      </van-col>
    </van-row>
    <div class="manage-list"> 
         
        <van-row  class="manage-list--item" v-for="(item,i) in managedata" :key="i"  @click.native="goes(item)" >
            <van-col style="text-align:left;padding-left:5px" span="12" >
              <div class="manage-rate" v-if="item.type==1 || item.type == 0 "  :class="item.type == 1 ? 'active1': ''">
                {{(item.rate*100).toFixed(2)}}%
              </div>
               <div class="manage-rate active2" v-else>
                {{(item.rate*100).toFixed(2)}}%
              </div>  
              <div class="manage-year" style="padding-left:4px">
                {{item.title}}
              </div>
            </van-col>
            <van-col span="12" class="manage-info">
              <img :src="item.imgUrl" width="20px">
             {{item.title}}
            </van-col>
        </van-row>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getSaveList} from '@/api/wallet'
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    managedata:[] ,// 理财列表
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  manageList(){
      getSaveList({
        uid: localStorage['_shop_userId'],
        walletid:localStorage['walletid'],
        
      }).then(res=>{
        if(res.status == 200) {
           this.managedata = res.data.list
           this.ascInfo = JSON.parse(res.data.ascInfo.sum_24_info)
           this.asc= res.data.money
           this.actions= res.data.downList
           
        }else {
          Toast.fail(res.msg)
        }
       
      })
    },
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
 this.manageList()
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

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
<style  scoped>
.manage-money {
  font-size: 15px;
  color: #333;
  font-weight: 600;
  letter-spacing: 2px;
  line-height: 25px
}
.manage-box{
 text-align: left;
 padding: 15px
}
.manage-box img{
  width: 16px;
  margin-right: 8px;
  position: relative;
  top: 2px
}
.manage-rate {
  color: #ff384f;
  font-size: 24px;
  line-height: 1.5;
  font-weight: 600
}
.manage-rate.active1 {
 color: blue
}
.manage-rate.active2 {
 color: orange
}

.manage-year {
  font-size: 12px;
  color: #999;
  word-break: break-all;
  padding-right: 10px
}
.manage-info {
     height: 52px;
    line-height: 52px;
    font-weight: 600;
    font-size: 16px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.manage-info img {
  position: relative;
  top:4px;
  padding-right:10px
}
.manage-list {
  margin:0 15px;
  background: #fff;
  box-shadow: 0 1px 10px #f5f6f7;
  padding: 15px 10px 60px
}
.manage-list--item {
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
}

</style>