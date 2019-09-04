
<template>
<div class='address'>
  <van-nav-bar
  :title="$t('message.address')"
 
  left-arrow
  @click-left="onClickLeft"

/>
 <div class="address-list" v-if="list.length>0">
  
   
  
      <van-swipe-cell :right-width="60" v-for="(item,i) in list" :key = i >
      
      <van-cell :border="false">
      <div class="address-box" @click="open(item)">
        <div class="address-left">{{item.name}}</div>
        <div class="address-right">{{item.address}}</div>
      </div>
      </van-cell>
      <van-button
        square
        slot="right"
        type="danger"
        text="删除"
        @click="del(item.id)"
      />
    </van-swipe-cell>
    <div class="change__add">
        <van-button type="info" size="large" @click="ress">添加地址本</van-button>
    </div>
   </div>
   <div class="addA "  v-else >
    <van-icon name="plus" size="30px" color="#999" @click="ress" />
   </div>
    <van-popup v-model="show">
        <div class="changeTitle" >
          添加地址本
       </div>
       <div class="change-box">
        
        <div class="change-info">名称</div>
        <div class="chage-input"><input type="text" v-model="addressName"  placeholder="请输入地址名称"></div>
        <div class="change-info">账户地址</div>
        <div class="chage-input"><input type="text"  v-model="address" placeholder="请输入地址"></div>
        <div class="change-btn">
              <van-button type="info" @click="submit()" size='small'>确认提交</van-button>
        </div>
       </div>
    </van-popup>
 </div>


</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { manageaddress } from '@/api/wallet'
import { Toast,Dialog  } from 'vant';
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
  list:[],
  show:false,
  addressName:'',
  address:''
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    open(item){
      this.$router.push({
        path:'/Adetail',
        query:{
          id:item.id,
          name:item.name,
          address:item.address
        }
      })
    },
    onClickLeft(){
      this.$router.back()
    },
    _manageaddress(op,id){
      let obj = {}
      obj.op = op
      obj.uid= localStorage['_shop_userId']
      if(op == 1){
        obj.name= this.addressName
        obj.address= this.address
      }else if(op == 3) {
        obj.id = id
      }
      manageaddress(obj).then(res=>{
        if(res.status == 200) {
          if(op == 0) {
             this.list = res.data  
          }else if(op==1) {
             Toast.success('添加成功')
           
            this._manageaddress(0)
          
          }else if(op == 3){
             Toast.success('删除成功') 
           
            this._manageaddress(0)
          }
        }
      })
    },
    submit(){
     console.log(this.address.length)
    
     this.show = false
     if(this.address.length ==12 || this.address.length>40) {
        
        this.list = []
        this._manageaddress(1)
        this._manageaddress(0)
     } else {
        Toast.fail('错误地址')
       return
     }
  

    },
    del(id){
      Dialog.confirm({
        title: '是否删除',
       
      }).then(() => {
         this.list = []
         this._manageaddress(3,id)
         this._manageaddress(0)
      }).catch(() => {
        // on cancel
      });
    },
    ress(){
      this.addressName = ''
      this.address = ''
      this.show = true
    }
    
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
 this._manageaddress(0)
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

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
.address-list{
  margin: 10px
}
 .address-list-item {
   height: 50px;
   line-height: 50px;
   position: relative;
   padding:0 120px 0 30px;
   box-sizing: border-box;
   overflow: hidden;
   border-bottom: 1px solid #eee
 }
 .address-list-icon {
   position: absolute;
   width: 20px;
   left: 10px;
   top: 0
 }
 .address-list-code {
  position: absolute;
  right: 0;
  top: 0;
  width: 120px
 }
 .address-box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap
}
.change-box {
  padding: 20px
}
.change-info {
    font-size: 14px;
    color: #999;
    text-align: left;
    padding-bottom: 15px;
}
.chage-input  input{
    width: 100%;
    display: block;
    box-sizing: border-box;
    margin: 0;
    padding:5px 10px 5px;
    color: #323233;
    background-color: transparent;
    border: 1px solid #eee;
    resize: none;
    font-size: 12px;
    height:36px;
    line-height: 36px;
    margin-bottom:20px
}
.address .van-popup {
  width: 80%
}
.addA {
  width: 80%;
  margin: 20px auto;
  border: 1px dashed #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
</style>