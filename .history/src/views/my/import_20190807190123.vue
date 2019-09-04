<template>
  <div class="import">
         <div class="heard">
          <label @click="goback"><img src="/images/login/icon_arrow@2x.png"  style="width:60%"/></label>
            <label> {{title}}</label>
            <label></label>
          </div>
        <div class="lead-content" v-if="type==1">
           <van-tabs v-model="ETHactive">
            <van-tab title="keystore" disabled>内容 1</van-tab>
            <van-tab title="助记词" disabled>内容 2</van-tab>
            <van-tab title="私钥">
               
              <div class="eth-lead-group">
                <div class="noticetext">输入private Key 文件内容至输入框。请留意字符大小写敏感。</div>
               <van-cell-group>
                 <van-field v-model="name"  label="钱包别名" placeholder="请输入钱包别名" />
                <van-field
                  v-model="Key"
                  label="明文私钥"
                  type="textarea"
                  placeholder="请输入明文私钥"
                  rows="1"
                  size="large"
                  minHeight="100"
                 
                />

              </van-cell-group>
                <!-- <van-cell-group>
                 <van-field v-model="password" placeholder="请输入钱包密码" />
                 <van-field v-model="password1" placeholder="请重复输入密码" />
               </van-cell-group> -->
             
              </div>
            </van-tab>
            <van-tab title="钱包" disabled>内容 4</van-tab>
          </van-tabs>
        </div>
        <div class="lead-content" v-if="type==2">
          <van-tabs v-model="BTCactive">
           
            <van-tab title="助记词" disabled>内容 2</van-tab>
            <van-tab title="私钥">
               
              <div class="eth-lead-group">
                <div class="noticetext">输入private Key 文件内容至输入框。请留意字符大小写敏感。</div>
               <van-cell-group>
                <van-field v-model="name"  label="钱包别名" placeholder="请输入钱包别名" />
                <van-field
                  v-model="Key"
                  label="明文私钥"
                  type="textarea"
                  placeholder="请输入明文私钥"
                  rows="1"
                  size="large"
                  minHeight="100"
                 
                />
              </van-cell-group>
              
              <van-radio-group class="BTCradio" v-model="BTCradio" style="padding: 15px">
                <van-radio name="0" >隔离见证 </van-radio>
                <van-radio name="1">普通</van-radio>
              </van-radio-group>
            
              </div>
            </van-tab>
          
          </van-tabs>
        </div>
        <div class="lead-content" v-if="type==3">
            <van-tabs v-model="Eosactive">
           
            
            <van-tab title="私钥">
               
              <div class="eth-lead-group">
                <div class="noticetext">输入private Key 文件内容至输入框。请留意字符大小写敏感。</div>
               <van-cell-group>
                <van-field v-model="name"  label="钱包别名" placeholder="请输入钱包别名" />
                <van-field
                  v-model="Key"
                  label="明文私钥"
                  type="textarea"
                  placeholder="请输入明文私钥"
                  rows="1"
                  size="large"
                  minHeight="100"
                 
                />
              </van-cell-group>
              
             
            
              </div>
            </van-tab>
             <van-tab title="ETH私钥" disabled></van-tab>
          </van-tabs>
             
          
        </div>
              <div class="lead-content" v-if="type==4">
            <van-tabs v-model="USTDactive">
           
            
            <van-tab title=" ERC20">
               
              <div class="eth-lead-group">
                <div class="noticetext">输入private Key 文件内容至输入框。请留意字符大小写敏感。</div>
               <van-cell-group>
                <van-field  label="钱包别名"  v-model="name" placeholder="请输入钱包别名(最长限制5  个中文字符)" />
                <van-field
                  v-model="Key"
                  label="明文私钥"
                  type="textarea"
                  placeholder="请输入明文私钥"
                  rows="1"
                  size="large"
                  minHeight="100"
                  maxlength = "12"
                />
              </van-cell-group>
              
             
            
              </div>
            </van-tab>
             <van-tab title="OMNI" disabled></van-tab>
          </van-tabs>
             
          
        </div>
           <van-button type="large" @click="lead" class="eth-button" :disabled="!reMsg" :class="{'linear-button':reMsg}"   style="border:0;margin:30px auto 0;width:80%;display:block;border-radius:5px" >开始导入</van-button>
    </div>
</template>

<script>

import { importWallet  } from '@/api/wallet'
import { Toast } from 'vant';
import {ECPair,payments} from 'bitcoinjs-lib';
import {bip32}  from 'bip32'
const util = require('ethereumjs-util')
export default {
  data () {
    return {
      type:this.$route.query.id, //1.eth 2. etc 3. eos  4.ustd
      ETHactive:1,
      BTCactive:2,
      Eosactive:3,
      USTDactive:4,
      Key:'',
      password:'',
      BTCradio:'0',
      title:'',
      name:'',
      btcaddress:''
      
    }
  },
  created() {
   this.type= this.$route.query.id
   this.changeName()
 

// let addrr = util.privateToAddress('0x26bc034bb6af813ea646fbcde152d46925040fec0cc6ed95862d0dac92970de1')

    
    
  }, 

  methods: {
    goback() {
      this.$router.back()
    },
    lead(){
      console.log(this.$route.query.id)
       let _key = this.Key
       if (this.$route.query.id == '4' || this.$route.query.id == '1') {
         if(_key.slice(0,2).indexOf('0x') == -1){
           _key = '0x'+_key
         }
       }
       let obj ={
          type:this.type,
          pk:_key,
          uid:localStorage['_shop_userId'],
          name:this.name
        }
        if(!this.name){
          Toast.fail('钱包名称不能为空')
          return
        }

        if (this.type == 1) {
          try{
            let addrr = util.publicToAddress(util.privateToPublic(this.Key)).toString('hex')
            obj.address = addrr 
          }catch(e){
            Toast.fail('导入失败，请检查私钥') 
            return
          }

        }



// //  // 普通1
// let keyPair = ECPair.fromWIF('Kxr9tQED9H44gCmp6HAdmemAzU3n84H3dGkuWTKvE23JgHMW8gct')
// const p2pkh = payments.p2pkh({ pubkey: keyPair.publicKey });
// let addr = p2pkh.address;
// console.log(addr);

// // SW 0
//   keyPair = ECPair.fromWIF('KwvFAjTd8Nf8DeRAMiB5gaS9SnKP8rTJ31CN5DV5DXLKBiy55WfS');
//   let p2pkh1 = payments.p2sh({
//     redeem: payments.p2wpkh({ pubkey: keyPair.publicKey  })
//   });
// console.log(p2pkh1.address);

        if(this.type == 2) {
          obj.btctype= this.BTCradio
          if (this.BTCradio == 0) {
            // sw
            try{
               let  keyPair = ECPair.fromWIF(this.Key);
              let p2pkh1 = payments.p2sh({
                redeem: payments.p2wpkh({ pubkey: keyPair.publicKey  })
              });
              console.log(p2pkh1.address);
              obj.btcaddress = p2pkh1.address
            }catch (e) {
              Toast.fail('错误的私钥')
              return
            }

          }
          if (this.BTCradio == 1 ) {
            // putong
            try{
             let keyPair = ECPair.fromWIF(this.Key)
            const p2pkh = payments.p2pkh({ pubkey: keyPair.publicKey });
            let addr = p2pkh.address;
            obj.btcaddress = addr
            console.log(addr);   
            } catch (e) {
               Toast.fail('错误的私钥')
              return 
            }
  
          }
        }
   
        importWallet(obj).then(res=>{
           if(res.status== 200) {
             Toast.success('导入成功')
              
             setTimeout(() => {
                  this.$router.push({
                    path:'/wallet'
                  })
              }, 500);
            
           }else {
              Toast.fail(res.msg)
           }

        })
    },
     changeName(){
       switch(this.type) {
          case 1:
              this.title = '以太坊'
              break;
          case 2:
             this.title = '比特币'
              break;
          case 3:
              this.title = 'EOS'
            break;
          case 4:
              this.title = 'USTD'
          break;
    } 
      },
    },
     computed:{
      reMsg () {
        if( this.Key) {
            return true
          }else {
            return false
          }
      }
  },
    onlead(){
     this.show = false
     this.leadVisabled = true
    },
   
};
</script>
<style scoped lang="stylus" >

  .topbg
    background:#fff
  .heard
    font-size:17px
    color:rgb(51,51,51)
    display:flex
    align-items: center
    justify-content: space-between
    height:44px
    label:first-child,label:last-child
      width:10%
      height: 100%
      padding: 0 3%
      display: flex
      align-items: center
      justify-content: center
    .select
      display:flex
      align-items:center
      justify-content: center
      border:1px solid rgb(229,229,229)
      border-radius:15px
      padding:2px 0
      span
        margin-right:10px
      img
        width:20%
  
</style>
<style scope>
  .noticetext {
      background: #f9f9f9;
      font-size: 12px;
      padding: 15px 15px;
      color: #999;
      text-align: center;
  }
  .eth-btn {
    background: #f1f1f1;

  }
</style>
<style>
 .lead-content .van-field--min-height .van-field__control {
   border: 1px solid #eee;
   border-radius: 3px;
   padding: 5px;
   min-height: 80px
 }
 .lead-content .van-radio {
   display: block;
  width: 50%;
  float: left
 }
 .BTCradio .van-radio__icon {
   float:left
 }
 .eth-lead-group .van-cell--large .van-cell__title{
   font-size:14px
 }
</style>

