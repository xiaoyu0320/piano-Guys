<template>
  <div class="transactionrecord">
 
      <div class="heard">
         <label @click="goback"><img src="/images/login/icon_arrow@2x.png" width="100%"/></label>
        <label>{{$t("message.news")}}</label>
        <label></label>
      </div>
    <div class="transaction__color"></div>
    <div class="body" v-if="news">
      <span class="transaction__title">{{getTitle(news.content)}}</span>
      <label style="margin-top:15px">
        <van-rate v-model="news.grade" :size="15" />
        <span style="padding-left:10px">{{changeTime(news.created_at).substring(11,16)}}</span>
       </label>
     
      <span>  {{news.content}}</span>
    
    </div>
    </div>
  
</template>

<script>
import { getmarket } from '@/api/wallet'
import { formatT} from '@/common/time'
import { Toast, Dialog ,Rate} from 'vant'
import axios from 'axios' 
export default {
  data () {
    return {
      news:'',
     
    }
  },
  created() {
     let id = this.$route.params.id
     console.log(id)
     this.getNews(id)
  },
  mounted () {
    this.$parent.footshow = true

  },
  beforeDestroy() {
    this.$parent.footshow = false
  },
  methods: {
    getTitle(str){
        console.log("str",str)
        if (str !=undefined) {
             // str = str.match(/(?<=【).*?(?=】)/);
           str = str.match(/\【(.+?)\】/g )
           console.log(str[0])
          return str[0]
        }
 
        return ''
    },
     getNews(id){
        Toast.loading({
          mask:true,
          message:'加载中...'
        })
        let burl = encodeURIComponent('https://api.jinse.com/v4/live/detail?id='+id+'&_source=m')
        console.log(burl)
        let url = 'https://api.ascchain.com/asc/asc/getnews?url=' + burl
        
        axios.get(url).then((res) => {
          this.news =  res.data
          Toast.clear
           console.log(this.news)
      })
     },
     changeTime(str) {
       return formatT(str)
     },
    goback() {
      this.$router.back()
    },

  },
  components: {
  }
};
</script>
<style scoped lang="stylus" >
.transactionrecord
  position: absolute
  width: 100%
  height: 100%
  background: #fff
  text-align:center
  .heard
    position: fixed
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
  .body
    display:flex
    flex-direction: column
    width: 90%
    padding: 5%
    margin-left: 0
   
    label
      font-size:14px
      display:flex
      margin-bottom:10px
      align-items: center
    span:last-child
      color: #9999a6;
      font-size: 14px
      text-align: left
     
    
    
         
</style>
<style scoped>
 .transaction__color{
    margin-top:60px;
    height: 10px;
    width:100%;
    background: #f5f5f5
 }
  .transaction__title {
    font-size: 16px;
    text-align: left
  }      
</style>