<template>
  <div class="chlist">
      <van-nav-bar
        title="转账记录"
        left-arrow
        @click-left="onClickLeft"
        />
      <div class="chlist-cell">
        <div class="chlist-title">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="gethistory"
            >
                 <div class="list-cell-wrap" v-for="(item,i) in list" :key="i">
                    <div class="item-top">
                      {{i}}
                    </div>
                    <div class="list-cell">
                        <span class="flex-between">
                          <div class="inner">
                            Money:<label>{{item.asc}}</label>
                          </div>
                          <div class="inner" :style="{'color': (item.status==0 ? 'red':'green')}">
                            {{returnStatus(item.status)}}
                          </div>
                        </span>
                        <span>Contract:<label>{{item.contract}}</label></span>
                        <span>TxHash：<label>{{item.hash}}</label></span>
                        <span>From：<label>{{item.from}}</label></span>
                        <span>To：<label>{{item.to }}</label></span>
                        <span class="flex-between">
                          <div class="inner">
                            Value：<label>{{item.quantity}}</label>
                          </div>
                          <div class="inner">
                            confirms:{{item.confirms}}
                          </div>
                        </span>
                        <span>Time：<label>{{returnTime(item.createtime)}}</label></span>
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
import {Baselog} from '@/api/wallet'
import {UniqueArr} from '@/utils/utils'
export default {
  data () {
    return {
      list: [],
      page:1,
      loading: false,
      finished: false,
      isLoading: false,
      contract:''
    }
  },
  created() {
     //this.gethistory()
 
  },
  methods: {
    onRefresh(){
      this.list = [];
      this.isLoading = true;
      this.page = 1
      this.gethistory(2)
    },
    returnStatus (status) {
      return status==0 ? '未确认':'已确认' 
    },
    returnChinese (num) {
      let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"
      let unit = ["", "十", "百", "千", "万"];
      num = parseInt(num);
      let getWan = (temp) => {
      let strArr = temp.toString().split("").reverse();
      let newNum = "";
      for (var i = 0; i < strArr.length; i++) {
        newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
      }
        return newNum;
      }
      let overWan = Math.floor(num / 10000);
      let noWan = num % 10000;
      if (noWan.toString().length < 4) noWan = "0" + noWan;
      return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
    },
    returnTime(timestamp){
        var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
        var date = (d.getFullYear()) + "-" + 
              (d.getMonth() + 1) + "-" +
              (d.getDate()) + " " + 
              (d.getHours()) + ":" + 
              (d.getMinutes()) + ":" + 
              (d.getSeconds());
        return date
    },
    returnCoin (item) {
        switch(item.contract){
            case '0xb7cb1c96db6b22b0d3d9536e0108d062bd488f74':
                return 'WTC';
            case 'eosio.token':
                return 'EOS';
            case 'ETH':
                return 'ETH';
            case '0xdac17f958d2ee523a2206206994597c13d831ec7':
                return 'USDT';
            default:
                return '未知'
        }
    },
   gethistory(type){
        let obj = {}
        obj.page = this.page
        obj.uid = localStorage['_shop_userId'],

        Baselog(obj).then(res => {
         this.list = res.data
          this.loading = false
          this.finished = true
          this.page = Number(this.page)+1
          if(type == 2){
            this.isLoading  = false
          }
        })
    },
    timeFer(time){
     time.replace('T', )
    },
    onClickLeft() {
          this.$router.back()
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
}
</style>
