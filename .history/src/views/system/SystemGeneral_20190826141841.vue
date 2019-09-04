<template>
  <div class="chlist">
      <van-nav-bar
        title="系统总设置"
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
                     {{item.remarks}}
                    </div>
                    <div class="list-cell">
                      <van-cell-group v-for="(child,index) in item.children" :key="index">
                       
                        <van-field v-model="item[child]"  :label="child"  @click="edit(item)" :disabled="child !='text'"/>
                      </van-cell-group>  
                      
                  </div>
                   
                 </div>
            </van-list>
          </van-pull-refresh>
          
        

           <van-popup v-model="editText" :style="{ width: '80%' }">
             <div style="padding:20px" v-if="jsonFlag">
                <van-cell-group v-for="(item,index) in textArr" :key="index">        
                  <van-field v-model="item.value"  :label="item.name+':'" />
                </van-cell-group>  
                <van-button type="info" size="small" style="margin-left:10px;margin-bottom:10x"  @click="save">保存</van-button>
             </div>
             <div style="padding:20px" v-else>
                <van-cell-group >        
                  <van-field v-model="text"  label="text" />
                </van-cell-group>  
                <van-button type="info" size="small" style="margin-left:10px;margin-bottom:10x"  @click="save">保存</van-button>
             </div>
            
           </van-popup>
      
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
      textArr:[], //设置总列表,
      editText:false,
      id:null,
      jsonFlag:false, // 是否为json,
      text:null
    }
  },
  created() {
      // this.__getInfo()
 
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
            
            this.list = res.data.forEach(data=>{
           
              data.children =[]
              for (const key in data) {
                if(key !== 'children'){
                   data.children.push(key)
                }
              }
              // console.log(data)
            })
            
            this.list =  res.data
            console.log(this.list)
            this.loading= false
            this.finished = true
          }else {
            this.loading= false
            this.finished = true           
          }
         
        })
    
    },
    edit(item){
      
       this.jsonFlag  =  this.isJSON(item.text)
      this.id = item.id
      if(this.jsonFlag) {
      
        let  obj = JSON.parse(item.text)
        this.textArr = Object.keys(obj).map(key => {
          return { name: key, value: obj[key] }
        })
      }else {
        this.text = item.text
      
      }
      this.editText = true
    },
    save(){

    let list = {}
    let obj = {}
    if(this.jsonFlag) {
      this.textArr.map( data=>{
        list[data['name']] = data['value'] 
      })
      obj.text = JSON.stringify(list)
    }else {
      obj.text= this.text
    }   
    obj.uid = localStorage['_shop_userId'] 
    obj.id = this.id
    obj.type = 99
    obj.op = 1
    admin(obj).then(res=>{
         if(res.status == 200) {
           Toast.success('修改成功');
           this.list = []
           this.__getInfo() 
           this.editText = false
         }else {
            Toast.fail(res.msg);
            
         }
      })
    },

    isJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj=JSON.parse(str);
            if(typeof obj == 'object' && obj ){
                return true;
            }else{
                return false;
            }

        } catch(e) {
            console.log('error：'+str+'!!!'+e);
            return false;
        }
    }
    console.log('It is not a string!')
}

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
