
<template>
<div class='guide'>
     <van-nav-bar
          :title="title"
          left-arrow
          @click-left="onClickLeft" 
    />
    <div class="guide__img--box" v-if="type==1" >
        <img v-lazy="item.url"  v-for="(item,i) in imglist"  :key="i">
    </div>
    <div class="guide__img--box" v-if="type==2" >
        <img v-lazy="item.url" v-for="(item,i) in imglist2" :key="i">
    </div>
    <div class="guide__img--box" v-if="type==3" >
        <img v-lazy="item.url"  v-for="(item,i) in imglist3" :key="i">
    </div>
     <div class="guide__img--box" v-if="type==4" >
        <img v-lazy="item.url"  v-for="(item,i) in imglist3" :key="i">
    </div>
</div>
</template>

<script>

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    title:'',
    type:this.$route.query.type,
    imglist:[
        {url:require('@img/guide/1/guide1-1.jpg')},
        {url:require('@img/guide/1/guide1-2.jpg')},
        {url:require('@img/guide/1/guide1-3.jpg')},
        {url:require('@img/guide/1/guide1-4.jpg')},
        {url:require('@img/guide/1/guide1-5.jpg')},
        {url:require('@img/guide/1/guide1-6.jpg')},
        {url:require('@img/guide/1/guide1-7.jpg')},
        {url:require('@img/guide/1/guide1-8.jpg')}
    ],
     imglist2:[
        {url:require('@img/guide/2/guide2-1.jpg')},
        {url:require('@img/guide/2/guide2-2.jpg')},
        {url:require('@img/guide/2/guide2-3.jpg')},
        {url:require('@img/guide/2/guide2-4.jpg')},
        {url:require('@img/guide/2/guide2-5.jpg')},
        {url:require('@img/guide/2/guide2-6.jpg')},
        {url:require('@img/guide/2/guide2-7.jpg')}
    ],
     imglist3:[
        {url:require('@img/guide/3/guide3-1.jpg')},
        {url:require('@img/guide/3/guide3-2.jpg')},
        {url:require('@img/guide/3/guide3-3.jpg')},
        {url:require('@img/guide/3/guide3-4.jpg')},
        {url:require('@img/guide/3/guide3-5.jpg')},
        {url:require('@img/guide/3/guide3-6.jpg')},
        {url:require('@img/guide/3/guide3-7.jpg')},
        {url:require('@img/guide/3/guide3-8.jpg')}
    ],
     imglist4:[
        {url:require('@img/guide/4/guide4-1.jpg')},
        {url:require('@img/guide/4/guide4-2.jpg')},
        {url:require('@img/guide/4/guide4-3.jpg')},
        {url:require('@img/guide/4/guide4-4.jpg')},
        {url:require('@img/guide/4/guide4-5.jpg')},
        {url:require('@img/guide/4/guide4-6.jpg')},
        {url:require('@img/guide/4/guide4-7.jpg')},
        {url:require('@img/guide/4/guide4-8.jpg')},
        {url:require('@img/guide/4/guide4-9.jpg')},
        {url:require('@img/guide/4/guide4-10.jpg')},
        {url:require('@img/guide/4/guide4-11.jpg')}
       
    ],
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
 }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
 switch(this.type) {
     case 1:
        this.title = ' 交易转账操作流程图'
        break;
     case 2:
        this.title = ' 注册登录操作流程图'
        break;
     case 3:
        this.title = ' 购买节点操作流程图'
        break;
    case 3:
        this.title = ' 购买主流币操作流程图'
        break;  
   
} 
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
</style>

