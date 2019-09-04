<template>
  <div class="foot">
    <!-- <ul>
      <li v-for="(item,index) in tabs" :key="index"  @click="check(index,item.link)" >
        <span><img :src="active==item.index ? item.img_y:item.img_n"/></span>
        <label :style="active == item.index ? 'color:#3b6cff':''">{{item.name}}</label>
      
      </li>
    </ul> -->
    <div class="foot-box">
        <router-link class="foot-li" v-for="(item,index) in tabs"  :key="index" :to="item.link" >
          <img :src="item.img_n" class="img_n"/><img :src="item.img_y" class="img_y"/>
          <label>{{item.name}}</label>
        </router-link>
    </div>
  </div>
</template>

<script>
import { Icon} from 'vant'
export default {
  props:{
    url:{
      type:String
    }
  },
  data() {
    return {
      active: 0,
      tabs:[{
        img_n:'/images/foot/tab_icon_money_default@2x.png',
        img_y:'/images/foot/tab_icon_money_selected@2x.png',
        name: this.$i18n.t("message.asset"),
        link: '/wallet',
        index:0
      },
      {
        img_n:'/images/foot/tab_icon_market_default@2x.png',
        img_y:'/images/foot/tab_icon_market_selected@2x.png',
        name: this.$i18n.t("message.mine"),
        link: '/mine',
        index:1
      },
      {
        img_n:'/images/foot/tab_icon_market_default@2x.png',
        img_y:'/images/foot/tab_icon_market_selected@2x.png',
        name: this.$i18n.t("message.market"),
        link: '/exchangeETH',
        index:4
      },
      {
        img_n:'/images/foot/tab_icon_look_default@2x.png',
        img_y:'/images/foot/tab_icon_look_selected@2x.png',
        name: this.$i18n.t("message.browser"),
        link: '/Browser',
        index:2
      },
      {
        img_n:'/images/foot/tab_icon_user_default@2x.png',
        img_y:'/images/foot/tab_icon_user_selected@2x.png',
        name: this.$i18n.t("message.my"),
        link: '/my',
        index:3
      }]
    }
  },
  created() {

   
  },
  methods: {
   
  },
  watch:{
    name(a) {
      console.log(a)
    },

    
    deep: true
  },
  components: {}
};
</script>
<style scoped lang="stylus" >
.foot
  background:#fff
  padding:5px 0
  position: fixed
  bottom: 0
  z-index: 99
  width: 100%
  ul
    display:flex
    justify-content: space-around
    li
      display:flex
      align-items: center
      flex-direction: column
      color:rgb(51,51,51)
      img
        width:6vw
      label
        font-size:10px
</style>
<style scoped>
 .foot-box {
    display:flex;
    justify-content: space-around;
    height: 44px;
    align-items: center;
 }
 .foot-li {
    flex:1;
    color:rgb(51,51,51);
    height: 100%;
 }
  .foot-li img {
     width: 20px;
     height: auto;
     margin: 5px auto;
     display: block;
  }
 .foot-li label  {
   font-size:10px;
   display: block;
   text-align: center;
 }
  .router-link-active {
  color:rgb(59, 108, 255)
 }
 .foot-li .img_y {
  display: none
 }
  .router-link-active .img_y {
    display: block;
    margin-bottom: 4px
  }
  .router-link-active .img_n {
    display: none
  }
  
</style>
