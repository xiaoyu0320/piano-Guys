<template>
  <div class="chlist">
      <van-nav-bar
        title="兑换记录"
        left-arrow
        @click-left="onClickLeft"
        />
      <div class="chlist-cell" >
        <div class="chlist-title">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="__getInfo"
            >
                 <div class="list-cell-wrap" v-for="(item,i) in list" :key="i">
                    <div class="item-top">
                     {{Object.keys(item)[0]}}
                    </div>
                    <div class="list-cell">
                      <van-cell-group v-for="(child,index) in item" :key="index">
                        <van-field :v-model="child" :placeholder="'请输入'+ child" :label="index" />
                      </van-cell-group>  
                  </div>
                 </div>
            </van-list>
          </van-pull-refresh>
        </div>
      </div>
      
  </div>
</template>

<script>
import axios from 'axios'
import { Toast, Dialog,List  } from 'vant'
import {admin} from '@/api/wallet'

export default {
  data () {
    return {
      list: [],
      page:1,
      loading: false,
      finished: false,
      isLoading: false,
      contract:'',
      type:this.$route.query.type,
      apiName:'',
      title:'',
    }
  },
  created() {
      this.__getInfo()
 
  },
  methods: {
    onRefresh(){
      this.list = [];
      this.isLoading = true;
      this.page = 1
     this.__getInfo()
    },
    onClickLeft(){
      this.$router.back()
    }, 
   __getInfo(type){
        let obj = {}
        obj.op = 0
        obj.type = 99
        obj.uid = localStorage['_shop_userId'] 
        admin(obj).then(res => {
           
          if(res.status == 200) {
            this.list = res.data
            this.loading= false
            this.finished = true
          }else {
            this.loading= false
            this.finished = true           
          }
         
        })
    
    },
   

  },
 
  components: {
    
  }
};
</script>
<style scoped>
   .chlist-cell {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 15px;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
  

}
 .chlist-cell .van-cell {
    margin-bottom: 10px;
    box-shadow: 0 1px 10px rgba(0,0,0,.06);
 }
.list-cell-wrap{
  width:95%;
  margin: 0 auto 20px;
  overflow: hidden;
  box-shadow: 1px 2px 8px 5px rgba(0,0,0,.06);
  border-radius: 5px;
}
.list-cell-wrap .item-top{
  height: 30px;
  padding: 5px 10px;;
  box-sizing: border-box;
  background: #3b87fa;
  color: #Fff;
}
.list-cell-wrap .list-cell{
  padding: 10px;
  overflow: hidden;
  box-sizing: border-box;
}
.list-cell-wrap .list-cell span{
  display: flex;
  width: 100%;
  overflow: hidden;
  padding-top: 7px;
  padding-bottom: 7px;
  border-bottom: 1px solid #eee;
}
.list-cell-wrap .list-cell span.flex-between{
  justify-content: space-between
}
.list-cell-wrap .list-cell span label{
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
  flex: 1;
  max-height: 60px;
  overflow-y:auto 
}
</style>
