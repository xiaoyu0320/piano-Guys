import VueI18n from 'vue-i18n';
import LangEn from './assets/lang/en';
import LangZhCHS from './assets/lang/zhCHS';
import {getCookie,judgeLanguage} from "@/common/auth";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vant from 'vant';
import 'vant/lib/index.css';
import VeLine from 'v-charts/lib/line.common'
import VueLazyload from 'vue-lazyload'
Vue.use(Vant);
Vue.use(VueI18n)
Vue.component(VeLine.name, VeLine)
Vue.config.productionTip = false;
//预先加载图
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: '/images/loading.gif',
  attempt: 1,
  listenEvents: [ 'scroll' ]
})
router.beforeEach((to, from, next) => {
  const toastDom = document.querySelectorAll('.van-toast')
  const toastOuerlay = document.querySelector('.van-overlay')
  if (toastDom) {
    for(let i=0; i<toastDom.length; i++){
      toastDom[i].remove()
    }
    
  }
  if (toastOuerlay) {
    toastOuerlay.remove()
  }
// 配置白名单
  // const whiteList = ['/argeement']
  // console.log()
 
  // if (whiteList.indexOf(to.path) !== -1) {
  //   next()
  //   return
  // }
  if (to.matched.length ===0) { //如果未匹配到路由
    from.name ? next({ name:from.name }) : next('/'); //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
  } else {
    next();//如果匹配到正确跳转
  }
  if(to.path == '/register' || to.path == '/argeement' || to.path == '/download' ) {
    next()
    return
  }
  
 if ((from.path != '/')  ) {
     
    if (!localStorage['_shop_userId'] || !localStorage['_shop_token']) {
      localStorage.clear()
      next('/')
    }
    
 }

 
});
router.afterEach((to, from) => {
  // to and from are both route objects.
  // setTimeout(() => {
  //   document.querySelector('.van-toast').remove()
  // }, 1500);
 
  
})
judgeLanguage()
const i18n = new VueI18n({
  //定义默认语言
 
  locale:getCookie('lang') ? getCookie('lang') : 'zhCHS', 

   messages:{

    'en':LangEn,

    'zhCHS':LangZhCHS

  },
  
  silentTranslationWarn: true

})



new Vue({
  i18n,
  router,
  Vant,
  data:{
    bus:new Vue()
  },
  render: h => h(App)
}).$mount("#app");
