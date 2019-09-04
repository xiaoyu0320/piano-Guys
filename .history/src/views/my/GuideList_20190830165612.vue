
<template>
<div class='guide'>
         <van-nav-bar
          title="操作指南"
          left-arrow
          @click-left="onClickLeft" 
    />
    <ul>
      <li @click="go(2)">
            <span >
               注册登录操作流程图 {{$t('message.TutorialonRegisterLogin')}}
            </span>
            <span ><img src="/images/other/arrow@2x.png" width="20px"></span>
        </li>
        <li @click="go(1)">
            <span >
               交易转账操作流程图
            </span>
            <span ><img src="/images/other/arrow@2x.png" width="20px"></span>
        </li>
       
        <li @click="go(3)">
            <span >
                购买节点操作流程图
            </span>
            <span ><img src="/images/other/arrow@2x.png" width="20px"></span>
        </li>
         <li @click="go(4)">
            <span >
                购买主流币操作流程图
            </span>
            <span ><img src="/images/other/arrow@2x.png" width="20px"></span>
        </li>
    </ul>
  
   
</div>
</template>

<script>

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
   title:''
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
 go(type){
     this.$router.push({
         path:'/guide',
         query:{
             type:type
         }
     })
 },
  onClickLeft(){
     this.$router.back()
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
 .guide__img--box img {
     max-width: 100%;
     display: block
 }
 .guide li{
    background: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid #e5e5e5;
    font-size: 10px;
    color: #333;
    font-size: 14px
}
</style>

