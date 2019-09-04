
<template>
 
  <div class="newlist">
    <van-nav-bar
      :title="$t('message.MessageCenter')"
      
      left-arrow
      @click-left="onClickLeft"
    
    />

    <van-tabs v-model="active" @change="tabActive()" > 
      <van-tab :title="navBar.name" v-for="(navBar,i) in navlist" :key="i"   >
          <van-list v-model="loading" :finished="finished" :finished-text="$t('message.Nomore')"  @load="scorllPage"   >
            <van-cell  v-for="(item,ii) in VariantArray" :key="ii" >
            

              
              <div class="newlist-cell" v-if="active==0">
                  <div v-if="type == 3">
                    <div class="newlist-txt">
                      <div class="newslist-title van-ellipsis">name:{{item.symbol}}</div>
                      <div class="newslist-title van-ellipsis">trx_id:{{item.trx_id}}</div>
                      <div class="newslist-time">time:{{item.timestamp}} </div>
                    </div>
                    <div class="nesslist-desc">transfer: {{item.sender}}->{{item.receiver}} {{item.quantity + ' ' +item.symbol}}</div>
                  </div> 



                  <div v-else-if="type == 1||type ==2">
                    <div class="newlist-txt">
                       <div class="newslist-title van-ellipsis">name:{{item.symbol}}</div>
                      <div class="newslist-title van-ellipsis">tx:{{item.tx}}</div>
                      <div class="newslist-time">time:{{changeTime(item.timestamp)}} </div>
                      
                    </div>
                    <!-- <div class="nesslist-desc">transfer:{{item.from}}->{{item.to}} {{item.value > 10000000000 ?  (item.value/1000000000000000000):item.value }}</div> -->
                    <div class="nesslist-desc">transfer:{{item.from + '->'}}{{item.to}} {{item.value > 10000000000 ?  (item.value/1000000000000000000):item.value }}</div>
                  </div>
              </div> 
        
              <div class="newlist-cell" v-if="active==1">
                <div class="newlist-txt">
                  <div class="newslist-title van-ellipsis">{{item.title}}</div>
                  <div class="newslist-time">{{changeTime(item.createtime)}} </div>
                </div>
                <div class="nesslist-desc">{{item.text}}</div>
              </div> 
             </van-cell>  
          </van-list>
          <!-- <div class="empty" v-else style="padding:20px;text-align:center;color:#999;font-size:14px">暂无数据</div> -->
      </van-tab>
    </van-tabs>
 
<!-- 转账通知 系统消息 -->
  </div>
</template>

<script>
  import { getHistory,manageMsg } from '@/api/wallet'
import { formatT} from '@/common/time'
  export default {
  data() {
    return {
      list: [],
      page:1,
      navlist:[
       {name:'转账通知'},
       {name:'系统消息'},
      ],
      loading: false,
      finished: false,
      active: 0,
      VariantArray:[],
      systemData:'',
      type:localStorage['type']
    }
  },
  created(){
    // this._gethistory()
  },
  methods: {
     changeTime(str) {
      return formatT(str)
      },
    _gethistory(){
       
        if (this.active == 0) {
           let obj = {}
          switch(localStorage['type']){
            case '3':
              obj.account = localStorage['asc_address']
              obj.page = this.page
              obj.size = 20
              
              obj.type = 3

               getHistory(obj).then(res=>{
              
                    this.VariantArray =res.data.data.trace_list;
                    this.finished = true
                    this.loading = false                              
                           
                    
                })
              break
          case '2':
              obj.account = localStorage['asc_address']
              obj.page = this.page
              obj.size = 20
            
              obj.type = 2



               getHistory(obj).then(res=>{
                    if (res.data.data.length>0) {
                      this.page = this.page + 1

                      this.VariantArray =res.data;
                 
                    }
                      this.finished = true
                      this.loading = false                                                      
                })
              break  
            case '1':
             
              obj.account = localStorage['asc_address']
              obj.page = this.page
              obj.contract = 'ALL'
  
              obj.type =1
              getHistory(obj).then(res=>{
                  if(res.status == 200) {
                 
                    this.VariantArray =res.data;
                    this.finished = true
                    this.loading = false 
                  }
                  
                })
              break

          }
           
         
    
        } 
        if (this.active == 1) {
          let obj = {}
          obj.op = 0
          obj.page = 1
          obj.uid = localStorage['_shop_userId']
            manageMsg(obj).then(res=>{
              this.VariantArray = res.data
            })
        }
    },
    scorllPage() {
      
      this._gethistory()
      if(this.VariantArray.length == 0) {
        this.loading = false
      }
    
    
     
       
    },
    onClickLeft(){
      this.$router.back()
    },
    tabActive(){
      console.log(this.active)
      this._gethistory()
    }
  }
}
</script>
<style scoped>
.newlist-cell {
  margin: 15px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 10px rgba(0,0,0,.06);
}
.newlist-txt{
  line-height: 15px;
  border-bottom: 1px solid #eee;
  
  padding: 10px;
  box-sizing: border-box
  
}
.newslist-title {
  color: #333;
  font-size: 12px;

}
.newlist{
  background: #EBEEF5
}
.newslist-time {
  font-size: 12px;
  color: #999;
  margin-top: 10px
}
.nesslist-desc {
  font-size: 13px;
  padding: 10px;
  color: #666;
  line-height: 18px;
  word-wrap: break-word;
}
.newlist .van-cell {
  padding:0
}

</style>