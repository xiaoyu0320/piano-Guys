<template>
  <div class="transactionrecord fixed-top">
 
      <div class="heard">
        <label></label>
        <label>{{$t("message.browser")}}</label>
        <label></label>
      </div>
      <div class="swipe">
        <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
         <a   @click="go(image)"> <img :src="image.imgurl" /></a>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="list-search" >
        <van-search placeholder="请输入搜索关键词"  @search="search" v-model="value"  />
        
    </div>
    <div class="list_row" >
    <div class="list_item"   v-for="(item,index) in lists" :key="index" @click="go(item)" style="display:none">
     <img :src="item.imgUrl">
          {{item.name}}
    </div>
     
    </div>
    <div class = "message">
        <ul class="message-list">
        <li v-for="(item,index) in newsList" :key="index" @click= "goDetail(item.id)">
        
          <span >
           <div class="shopImg"  style="background: url(/images/other/asclogos.png); width: 30px; height: 30px;background-size: contain;background-repeat: no-repeat;    position: relative;top: 10px;left: 10px;"></div>
              
            <label>{{getTitle(item.content) }}</label>
          </span>
          <span>{{changeTime(item.created_at)}}</span>
        </li>
      </ul>
    </div>
   
  </div>
</template>

<script>
import { getmarket,getbrowserlist,getbanner } from '@/api/wallet'
import {stringify} from 'qs'
import { formatT} from '@/common/time'
import { Toast, Dialog, Swipe, SwipeItem } from 'vant'
import axios from 'axios' 
export default {
  data () {
    return {
      news:[],
      newsList:[],
      images: [],
    
      lists:[],
      curSelect:'',
      marketlist: {},
      value:'',
      order: 0,
      tablist: [
      {
        name:'ASC',
        index: 0
      },
      {
        name:'ETH',
        index: 1
      },
      {
        name:'BTC',
        index: 2
      }
      ],
      active: 0
    }
  },
  created() {
     this.getNews()
      getbrowserlist({
       uid:localStorage['_shop_userId']
     }).then(res=>{
        this.lists= res.data
     })
     getbanner({
         uid:localStorage['_shop_userId']
     }).then(res=>{
        this.images = res.data
     })
  },
  mounted () {
    this.$parent.footshow = true

  },
  beforeDestroy() {
    this.$parent.footshow = false
  },
  methods: {
    goDetail(id){
      
        this.$router.push({
        path: '/News/' + id
      })
    },
    getTitle(str){
       
      // str= str.replace(/(^\s*)|(\s*$)/g, "")
      // str = str.replace(/[\r\n]/g, ""); //去掉回车换行

    
      // let finalstr = str.match(/【(\S*)】/)[1]
      // let finalstr = str.match(/(?<=\【)[^}]*(?=\】)/g)
     
    
      return str.replace(/【([\S \|]+)】/g, "$1")
    },
     getNews(){
        Toast.loading({
          forbidClick: true,
          message:'加载中...'
        })
        let url = 'https://api.ascchain.com/asc/asc/getnews?url=https://api.jinse.com/v4/live/list?reading=false%26_source=m%26limit=20'
        axios.get(url).then((res) => {
         
          this.news =  res.data.list[0].lives
         this.newsList = res.data.list[0].lives
           Toast.clear()  
      })
     },
     changeTime(str) {
       return formatT(str)
     },
    goback() {
      this.$router.back()
    },
    go(item){
     
      this.$router.push({
        path:'/iframe',
        query:{
          url:item.url,
          name:item.name
        }
      })
    },
    goUrl(item){
      console.log(item)
      window.location.href = item.url
    },
    search(){
        
        if(this.value) {
          this.newsList = this.news.filter((item)=>{
            return item.content.indexOf(this.value) !=-1
          })
        }else{
           this.newsList=this.news
        }
    }
  },
 
};
</script>
<style scoped lang="stylus" >
.transactionrecord
  position: absolute
  width: 100%
  height: 100%
  background: rgb(245,245,245)
  text-align:center
  .heard
    position: fixed
    top:0
    width: 100%
    z-index: 2
    background:#fff
    font-size:17px
    color:rgb(51,51,51)
    display:flex
    align-items: center
    justify-content: space-between
    height:44px
    label:first-child,label:last-child
      width:6.5%
      height: 100%
      padding: 0 3%
      display: flex
      align-items: center
  .swipe
    width:100%
    img
      width:100%  

  .list_row
    display: flex
    align-items: center
    width:100%
    flex-wrap: wrap
    .list_item
      font-size: 12px;
      display: flex
      justify-content: center
      align-items: center
      flex-direction: column
      width:20%
      padding-top: 10px
      padding-bottom: 10px
      img    
        margin-bottom: 3px
        border-radius:50%
        display: block
    .opacity
      opacity: 0.4
      background: #e5e5e5
  .message
    width:100%
    background:#f5f5f5  
    margin-bottom: 60px
  .message-list
      width:98%
      display:flex
      flex-direction:column
      margin: 0 auto
      li
        background:#fff
        display:flex
        justify-content:space-between
        padding:.8vw
        margin-top:5px
        flex-direction:column
        border-bottom:1px solid rgb(229,229,229)
        span
          display:flex 
          align-items:center
          label
            font-size:14px
            text-align: left
            margin-left: 30px
            margin-top:8px
            width:95%
            overflow: hidden
            text-overflow: ellipsis
            display: -webkit-box
            -webkit-line-clamp: 2
            -webkit-box-orient: vertical
            color:#666
        span:last-child
          margin-left:56px
          font-size: 12px
          margin-top:8px
          color:#999
            
</style>
<style scoped>
 .list-search  {position: relative;background: #fff}
 .list-search img {
    right: 10px;
    top: 50%;
    position: absolute;
    width: 20px;
    margin-top:-10px
 }
  .list-search .van-search {
   padding: 5px 10px;
  }
  .transactionrecord .message-list li:last-child{
    margin-bottom: 5px
  }
</style>
 
