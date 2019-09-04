
<template>

    <div class='address'>
    <van-nav-bar
    :title="addressName"
    left-arrow
    @click-left="onClickLeft"
    />
   
    <van-cell-group>
    <van-field
        v-model="addressName"
        clearable
        label="名称"
        placeholder="请输入名称" 
         
    />
    <!-- <van-field
        v-model="password"
        type="password"
        label="标记"
    /> -->
    <van-field
    v-model="address"
    label="ETH地址"
    type="textarea"
    placeholder="请输入地址"
    rows="4"
    autosize
  />
</van-cell-group>
<van-button size="large" class="linear-button address-btn" round type="info" @click="submit()">提交</van-button>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { manageaddress } from '@/api/wallet'
import { Toast } from 'vant';
import { setTimeout } from 'timers';
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
addressName:this.$route.query.name,

address:this.$route.query.address,
id: this.$route.query.id
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
    obj.op = 2
    obj.id =this.id
    obj.uid= localStorage['_shop_userId']
   
    obj.name= this.addressName
    obj.address= this.address
   
    manageaddress(obj).then(res=>{
    if(res.status == 200) {
       Toast.success('修改成功')
       setTimeout(()=>{
         this.$router.back()
       }, 1000)
    }
    })
},
onClickRight(){

}
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
 
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

.address-btn {
    height: 40px;
    line-height: 36px;
    margin: 20px auto;
    width: 80%;
    font-size: 14px;
    display: block;
}
</style>