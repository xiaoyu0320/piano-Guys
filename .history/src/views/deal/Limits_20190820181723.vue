<!-- 限购 -->
<template>
<div>
    <van-nav-bar
        title="基石轮"
        left-arrow
        right-text="转账记录"
        @click-right="onClickRight"
        @click-left="onClickLeft"

    />
<div class='limits'>
     <div class = "mainText">
        {{fhbInfo.title}}
     </div>

    
    <div class="eos-contract"  >
            <div class="caption"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">锁定合同地址</font></font></div>

            <input style="font-size:12px" id="LOCKDROP_CONTRACT_ADDRESS" type="text" :value="baseContract" readonly="">
            <!-- <div class="network-selector">
                <van-radio-group v-model="radio" style="display:flex">
                    <van-radio name="1">Mainnet</van-radio>
                    <van-radio name="2">Ropsten</van-radio>
                </van-radio-group>
            </div> -->
            <div class="explanation">合同由Quantstamp审核。验证链上的代码和ABI 。</div>
            <!-- <div class="form-field">
                <font style="vertical-align: inherit;display:block;margin:15px 0 60px; ">EDG公钥（十六进制）</font>
                <input id="EDGEWARE_PUBLIC_KEY1" class="publickey-input" type="text" value="" placeholder="e.g. 0x12b2d1...">
                <div class="explanation">合同由Quantstamp审核。验证Etherscan上的代码和ABI 。</div>
            </div> -->

    </div>

 

     <div class="form-field">
         <div class="caption"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">选择</font></font></div>
        <van-radio-group v-model="radio2" class="form-radio">
            <van-radio :name="item" v-for="(item,i) in lockItems" :key="i">锁定{{item}}周</van-radio>
  
        </van-radio-group>
        <div class="explanation">
           <p v-html="fhbInfo.content"> </p>
        </div>
    </div>
 
    <div class="form-field">
        <div class="form-field-card">
            <div class="coin-money">
            <p style="padding-left:3px">每份金额{{fhbInfo.coinMoney}}ASC</p>
            <p style="display:flex;    align-items: center;justify-content: space-between;margin-top:10px">
            请选择认购数量  &nbsp;   &nbsp; 
            <van-stepper 
                 v-model="value"
                 input-width="40px"
                 button-size="32px" 
            />
            </p>
            </div>
            <div class="form-field-status">
          
            <span>本期总发行：{{fhbInfo.coinTotalNum}}份</span>  <span>已认购数：{{fhbInfo.coinBuyedNum}}份</span>
            </div>
            <div class="form-field-progress">
              
                <van-progress :percentage="progress" />
            </div>
            <div class="form-field-time">
                预计释放时间：{{changeTime(fhbInfo.timeStart)}}
            </div>
        </div>
    </div>
    <div class="change-btn" style="text-align:center;margin-top:35px">
        <van-button type="info"  size='large' @click="submit" >确认提交</van-button>
    </div>
</div>
   <!-- 支付组件 -->
    <pay :payShow="payShow"  :paramePay="paramePay" @callback="dom" ref="payConfirm" />  
    <!-- 支付组件 -->
   
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import { getNoteDetail } from '@/api/wallet'
import { Toast,Dialog } from 'vant'
import { formatT} from '@/common/time'
import Pay from "@/components/Pay.vue"
import { setTimeout } from 'timers';
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    Pay
},
data() {
//这里存放数据
return {
    value:1,
    baseContract:'',
    lockItems:[{

    }],
    type:0,
  money:'',
  radio2:'1',
  fhbInfo:{
    total:100,
    left:100,
    timeStart:'2019-07-30 18:09:07' 
  },
  payShow:false,
  paramePay:{},
  //传递参数
  //请选择认购  数量
  number:'',
  //合同地址
  address:'',
  //价格
  price:null   ,
  progress:0
  //f
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
     dom(e){
      this.payShow = e
    },
     changeTime(str) {
        return formatT(str)
       },
    _getNoteDetail(){
        let obj = {}
        obj.uid = localStorage['_shop_userId']
        obj.id =  this.$route.params.id
        obj.type = localStorage['type']
        Toast.loading({
            mask: true,
            message: '加载中...'
        }); 
        console.log(this.$toast.clear)
        this.$toast.clear();
        console.time('11111')
        getNoteDetail(obj).then(res=>{
            if (res.status == 200) {    
                this.$toast.clear();
                this.fhbInfo = res.data
                this.baseContract = res.data.baseContract
                let apreiod = String(res.data.froze)
                this.lockItems = apreiod.split(',')
                this.radio2 = this.lockItems[0]
                this.address = res.data.baseContract
                this.price = res.data.coinMoney  
                this.progress = Number(((this.fhbInfo.coinBuyedNum)*100/this.fhbInfo.coinTotalNum).toFixed(2))
            } else {
                Toast.fail(res.msg)
            }
        })
    },
 onClickLeft() {
    this.$router.back()
},
submit(){
      let obj = {}
      obj.uid = localStorage['_shop_userId']
      obj.id =  this.$route.params.id
      obj.type = localStorage['type']
      getNoteDetail(obj).then(res => {
          if (res.status == 200) {
              let diff = Number(res.data.coinTotalNum) -  Number(res.data.coinBuyedNum)
              if (Number(this.value) > diff) {
                  // 如果输入的值大于接口返回的内容,则需要重新修改
                  Toast.fail('已售完')
                  this.fhbInfo = res.data
                  this.value = 1
                  return
              }else{
                    this.$router.push({
                        path:'/basecheck',
                        query:{
                            number:this.value,
                            address:this.address,
                            price:this.price,
                            baseid:this.$route.params.id
                        }
                    })
              }
          }
      })
     
    
  
},
onClickRight(){
    this.$router.push({
        path:'/exList'
    })
}
},

//生命周期 - 创建完成（可以访问当前this实例）
created() {


    this._getNoteDetail()
    this.type = localStorage['type']
    console.log(this.type )
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
<style scope>
.coin-money {
 
    padding:20px 0;
}
  
.limits{
margin: 20px auto;
padding: 0 20px;
font-size: 14px;
line-height: 1.45;
font-weight: 400;
color: #222;
}
.mainText{
    font-size: 18px;
    font-weight: 600;
    text-align: center;
}
.caption{
 margin-bottom: 8px   
}
#LOCKDROP_CONTRACT_ADDRESS {
height: 42px;
outline: none;
box-shadow: none;
border: 1px solid #eee;
border-radius: 4px;
padding-left: 14px;
display: block;
width: 95%;
}
.limits > input[type="text"][readonly] {
background: #f8f8f8;
}
.network-selector {
margin:10px 0 
}
.network-selector .van-radio {
    margin-right:15px 
}
 .explanation {
    width: 100%;
    margin: 10px 0;
    padding: 0;
    color:#aaa
}
 .explanation  p {
    margin-bottom: 10px
 }
.form-radio .van-radio{
    margin-bottom: 15px
}
.form-field-status {
  display: flex;
  padding: 0 3px;
  justify-content: space-between;
  align-items: center
}
.form-field-progress {
    margin:15px 0
}
.payshow__choice--input {
    width:100%
}
</style>
