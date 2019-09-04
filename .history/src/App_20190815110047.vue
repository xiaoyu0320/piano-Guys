<template>
  <div id="app">

   <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath"></router-view>
  	<foot v-if="footshow"></foot>
    <!-- <maintenance /> -->
  </div>
</template>
<script>
import Foot from "./components/Foot.vue"
// import maintenance from "./components/maintenance.vue"
import { Dialog} from 'vant'
export default {
  data () {
    return {
      footshow: false,
      url:''
    }
  },
  created() {
    
    let people = this.urlInfo(location.search.slice(0))
    
    for (let k in people) {
        
      // 添加用户邀请码
      if (k.toString() === 'ref') {
        localStorage.removeItem('ref')
    
        localStorage['ref'] = people[k] ? people[k]: ''
        
        if(localStorage['_shop_userId']){
          this.$router.replace({
            path:'/'
          })   
          return   
        }
        
         this.$router.replace({
          path:'/register'
        })    
        return
      }
      if(k.toString() === 'gourl'){
         this.$router.replace({
          path:'/'+ people[k]
        })    
        return
      }
      if (k.toString() === 'scanresult') {
        this.$router.replace({
          path: '/transferASC/' + people[k],
          query:{
            toaddr:people[k]
          }
        })    
        return
      }
    }
  },
 

  methods: {
     dom(e){
      this.payShow = e
    },
    urlInfo (str) {
      if (str === undefined) {
        return
      }
      str = str.substr(1)
      let arr = str.split('&')
      let obj = {}
      let newArr = []
      arr.map((value, index, arr) => {
        newArr = value.split('=')
        if (newArr[0] !== undefined) {
          obj[newArr[0]] = newArr[1]
        }
      })
      return obj
    }
  },
  components: {
    Foot,
   
  }
};
</script>
<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
</style>
