
<template>
<div class='wathcSet' ref="bodyHeight">
   <van-nav-bar 
      title="浏览设置"
      
      left-arrow
      right-text="保存"
      @click-left="onClickLeft"
     
    
    />
    <div class="watch-box">
      
             <van-swipe-cell v-for="(item,i) in imgList"  :key="i">
                    <van-cell  >
                       <div class="setbox">
                            <img :src="item.imgurl" class="set_img">
                            <label>{{item.url}}</label>
                       </div>
                        
                    </van-cell>

                    <template slot="right">
                         <van-button square type="primary" @click="edit(item)" text="编辑"  style="height:100%"/>
                        <van-button square type="danger" @click="del(item.id)"  text="删除" style="height:100%"/>
                    </template>
                </van-swipe-cell>
                 <div class="watch-opeate">
                    <van-button type="info" size="large" @click="addLink()">添加</van-button>
                </div>
        </div>
        <van-popup v-model="setVisabled"  style="width:80%">

             <div class="set__box--container">
                 <div class="set__title">banner配置</div>
                 <div class="set__box">
                      
                      <van-uploader :after-read="afterUpload" />
                      <img :src="imgUrl" v-if="imgUrl" style="width:78px;height:78px">
                 </div>
                 <div class="set__title">推广链接</div>
                  <div class="set__box">
                     <input type="text" class="form__input" v-model="shareLink" placeholder="请输入链接地址">
                 </div>
                 <div class="set__opeate">
                      <van-button type="info" size="small" @click="sure()" style="margin-right:15px">确定</van-button>
                      <van-button type="default" size="small" @click="setVisabled= false">取消</van-button>
                 </div>
            </div>
             
        </van-popup>    

</div>
</template>

<script>
import axios from 'axios'
import {admin,getbanner } from '../../api/wallet'
import { Toast, Actionsheet,Dialog } from 'vant'
import { truncate } from 'fs';
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
  setVisabled:false,
  fileList: [],
  shareLink:'',

  imgList:[],
  imgUrl:'',
  type:null, //1 编辑请求 2 删除请求,
  id:null
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
getlist(){
      getbanner({
         uid:localStorage['_shop_userId']
     }).then(res=>{
        this.imgList = res.data
     })
},
onClickLeft(){
    this.$router.back()
},
//添加banner
addLink(){
    this.type = 2
    this.setVisabled = true
    this.fileList = []
    this.shareLink = ''
     this.imgUrl = ''
},
afterUpload (file) {
    this.logContent(file)
},

//确认添加
sure(){
  
  let obj ={}
  if(this.type == 1){
    obj.id = this.id
  }
  obj.op = this.type
  obj.imgUrl= this.imgUrl
  obj.name = ''
  obj.url = this.shareLink 
  obj.type = 5
  obj.uid = localStorage['_shop_userId']
  admin(obj).then(res=>{
     if(res.status == 200) {
         Toast.success(res.msg)
          this.imgList = []
          this.getlist()
          this.imgUrl = ''
     }
  })
  
  this.setVisabled = false
},
//上传头像
   logContent(file) {
       
        Toast.loading({ mask: true, message: '正在上传项目logo' })
        console.log(file.content)
      
        this.$refs.uploader.src = file.content
        let formData = new FormData()
        formData.append('user_id', localStorage['_shop_userId'])
        formData.append('imgFiles', file.file)

        const xhr = new XMLHttpRequest()
        xhr.open('POST', 'https://api.ascchain.com/asc/upload/upload', true)
        xhr.send(formData)
        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 304) {
            let res = JSON.parse(xhr.responseText)
            if (res.status === 200) {
              Toast.success('上传成功')
              this.imgUrl = res.data
              console.log(this.imgUrl)
              
            } else {
              Toast.fail(res.msg)
            }
          } else {
            Toast.fail(`${xhr.status} 请求错误!`)
          }
        }
      },
     
    //删除
    del(id){
         Dialog.confirm({
            message: '确定删除吗？'
          }).then(() => {
                let obj ={}
                obj.op = 3
                obj.type = 5
                obj.id = id
                obj.uid=localStorage['_shop_userId']
                admin(obj).then(res=>{
                    if(res.status == 200) {
                        Toast.success(res.msg)
                        this.imgList = []
                        this.getlist()
                    }
                })
                
          });
       
    },
    //编辑
    edit(item){
        console.log(item)
        this.type =1
        this.setVisabled = true
       
        this.id = item.id
        this.shareLink = item.url
        this.imgUrl= item.imgurl
      
      
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    this.getlist()
//     let url = 'https://www.okex.me/v2/spot/markets/tickers?t=156446968364'
//     let params= {}
//     axios.post(url,params).then((res) => {
        
//    })
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
this.$refs.bodyHeight.style.height= window.innerHeight+'px'
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
.wathcSet {
    background: #f5f5f5
}
.wathch-white {
  background:#fff;
  padding:20px
}
 .wathc-imgbox {
     padding: 20px
 }

 .wathch-title {
    font-size: 14px;
    line-height: 40px;
    padding-left: 20px
}
.watch-link {
    font-size: 14px;
    margin-bottom: 20px
}
.watch-link input,.form__input{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 1;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
.watch-link label {
    line-height: 40px;
    display: inline-block
}
.wathch-imgbox {
    display: flex;
    flex-wrap: wrap
}
.wathch-img--list {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 80px;
    height: 80px;
    margin: 0 10px 10px 0;
    background-color: #fff;
    border: 1px dashed #e5e5e5;
} 
.wathch-img--list img {
    width: 100%;
    height: 100%;
}
.set__box--container {
    padding:20px
}
.set__title {
    margin: 10px 0;
    font-size: 14px
    
}

.set__opeate {
    margin-top: 15px
}
.set_img {
  width: 60px;
  height: 60px;
}
.setbox {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center
}
.watch-opeate {
    margin: 15px;
}
.set__box {
  display: flex
}
</style>
