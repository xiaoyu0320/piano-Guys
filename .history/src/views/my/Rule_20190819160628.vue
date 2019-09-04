
<template>
<div class='rule' >
 <van-nav-bar
    class="share-bar share__fixed"
    left-arrow
    @click-left="onClickLeft"
    />
 
    <div class="guide__img--box" v-if="type==1" >
        <img v-lazy="item.url"  v-for="(item,i) in imglist"  :key="i">
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
imgUrl:'/images/my/rule.png',
 imglist:[
        {url:require('@img/my/rule01.jpg')},
        {url:require('@img/my/rule02.jpg')},
        {url:require('@img/my/rule03.jpg')},
        {url:require('@img/my/rule04.jpg')},
        {url:require('@img/my/rule05.jpg')},
        {url:require('@img/my/rule06.jpg')},
        {url:require('@img/my/rule07.jpg')},
        {url:require('@img/my/rule08.jpg')}
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
.rule{
    
    color: #fff;
    background-size: cover;
    background-repeat: no-repeat;
}
.rule-title {
    padding: 20% 0 15%;
    text-align: center;
}
.rule-title h4 {
   
	font-size: 32px;
	font-weight: normal;
	font-stretch: normal;
	color: #009fe8;
}
.rule-txt {
    padding:20px;
    font-size: 13px
}
.rule-txt > p {
    text-indent: 2em;
    line-height: 1.8;
    margin-bottom: 15px;
    position: relative;
}
.rule-txt > p span {
   color: rgb(0, 176, 240);
}
.rule-txt .rule-cicle {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: block;
    background:#fff;
    color: #191b75;
    text-indent: 0;
    text-align: center;
    font-weight: normal;
    line-height: 22px;
    font-style: normal;
}

.rule-title h1 {
   
	font-size: 42px;
	font-weight: normal;
	font-stretch: normal;
	color: #ececfe; 
}
.share__fixed {
    position: fixed;
    top:0;
    width:100%
}
.share-bar {
    background: transparent
}
.share-bar .van-nav-bar__title ,.share-bar .van-nav-bar__text {
    color: #fff;
}
.van-nav-bar .van-icon {
    color: #fff!important
}
 .van-hairline--bottom::after {
    border-width: 0
}
.rule-s-title {
   width:40%;
	background-image: linear-gradient(90deg, 
		#2fa0fe 0%, 
		#2766f7 21%, 
		#1f2bef 32%, 
		#441fdc 49%, 
		#6812c8 100%), 
	linear-gradient(
		#7280c1, 
		#7280c1);
	background-blend-mode: normal, 
		normal;
	border-radius: 30px;
    display: block;
    margin: 10% auto;
    text-align: center;
    padding: 5px 10%;
    font-size: 15px;
}
.rule-txt table {
    margin-bottom: 15px
}
.rule-txt table th, .rule-txt table td{
    border:2px solid #fff
}
.rule-txt table td,.rule-txt table th{
    padding:10px;
    font-size: 12px;
    line-height: 1.5
}
.rule-txt table td {
    background:#009FE8
}
</style>
