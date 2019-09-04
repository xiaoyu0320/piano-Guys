
<template>
<div class='fixed-top new' style="margin-top:44px">
   <van-nav-bar 
      title="行情管理"
      left-arrow
      @click-left="onClickLeft"
      class="fixed"
    />
    <div class="switch-box">
      <label v-if="checked" class="">市场</label>
      <label v-if="!checked">后台设定</label>
      <van-switch v-model="checked" size="20px" style="position:relative;top:5px" />
      
    </div>
    
  <van-cell-group v-if="checked">
    <van-field  label="市场价格" v-model="makretObj.price" placeholder="市场价格" />
    <van-field label="市场交易量"  v-model="makretObj.volume" placeholder="市场交易量" />
    <van-field label="市场增长率"   v-model="makretObj.rate" placeholder="市场增长率" />
   
  </van-cell-group>
  <van-cell-group class="mt20">
    <van-field label="兑换总量"  v-model="makretObj.sum_24" placeholder="兑换总量" />
   <van-field label="最新投资"  v-model="makretObj.new" placeholder="最新投资" />
  </van-cell-group>
  <div class="" style="width:80%;margin:0 auto">
     <van-button size="large" class="linear-button " round type="info" @click="submit()" style="height:44px;line-height:44x;margin-top:30px">提交</van-button>
  </div>
 
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {admin} from '@/api/wallet'
import { Toast } from 'vant'
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
 makretObj:{},
 checked: true
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
 submit(){
      
    let obj = {}
       obj.text = JSON.stringify(this.makretObj)
       obj.op = 2
       obj.type= 4
       obj.uid = localStorage['_shop_userId'] 
       
      admin(obj).then(res=>{
        
        if(res.status==200){
          Toast.success('提交成功')
        }else{
           Toast.fail(res.msg)
        }
      })
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
   
   let obj = {}
     
      
       obj.op = 0
       obj.type= 4
       obj.uid = localStorage['_shop_userId'] 
       
      admin(obj).then(res=>{
        
        if(res.status==200){
           this.makretObj = JSON.parse(res.data)
        }else{
         
        }
      })
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
<style scoped>
.new  .van-field__control {text-align: right;}
.switch-box {
  padding:15px
}
.switch-box label {
  width:90px;
  font-size: 14px;
  display: inline-block
}

.mt20{
  margin-top:20px
}
.van-hairline--top-bottom::after {
  border-bottom: 0
}
</style>
