<!--  -->
<template>
  <div class='fixed-top '>
   <div style="background:#fff;padding-bottom:20px">
    <van-nav-bar
      title="用户协议"
      left-arrow
      @click-left="onClickLeft"
      class="fixed help"
    />
    <div class="law-content-wrap">
     <div class="text" v-html="content" >
        
     </div>
   
  </div>
 </div> 
</div>
</template>

<script>

import { Toast} from 'vant'
import {getInfo} from '@/api/wallet';
export default {

  data	() {
    return {
    content:''
    };
  },
  computed: {},
  watch: {

  },
  methods: {
    furlencode(clearString) {
    var output = '';
    var x = 0;
     
    clearString = utf16to8(clearString.toString());
    var regex = /(^[a-zA-Z0-9-_.]*)/;
 
    while (x < clearString.length) 
    {
        var match = regex.exec(clearString.substr(x));
        if (match != null && match.length > 1 && match[1] != '') 
        {
            output += match[1];
            x += match[1].length;
        } 
        else
        {
            if (clearString[x] == ' ')
                output += '+';
            else
            {
                var charCode = clearString.charCodeAt(x);
                var hexVal = charCode.toString(16);
                output += '%' + ( hexVal.length < 2 ? '0' : '' ) + hexVal.toUpperCase();
            }
            x++;
        }
    }
 
    function utf16to8(str) 
    {
        var out, i, len, c;
 
        out = "";
        len = str.length;
        for(i = 0; i < len; i++) 
        {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) 
            {
                out += str.charAt(i);
            } 
            else if (c > 0x07FF) 
            {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } 
            else
            {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    }
 
    return output;
},
    onClickLeft(){
      this.$router.back()
    }
  },
  created	() {
    
     getInfo({
        type:1,
        op:0,
        uid:localStorage['_shop_userId']
      }).then(res=>{
         
        if(res.status==200){
          this.content = res.data
        this.content = this.content.replace(/\n/g,"<br/>") 
        console.log(this.content)
        }else{
           Toast.fail(res.msg)
        }
      })
  
    
    
    //  this.content.replace(/\n/g,"<br/>") 
    //   console.log(this.content)
  },

  mounted	() {
  //  this.$refs.bodyHeight.style.height= window.innerHeight + 'px'
  },
  destroyed	() {}, //	生命周期 - 销毁完成
  activated	() {} //	如果页面有keep-alive缓存功能，这个函数会触发
  }

</script>
<style  scoped>
 .help.van-nav-bar .van-icon {
   color:#333
 }
 .problem{
   padding:15px;
  box-sizing: border-box
 }
 .problem span {
    font-size: 15px;
    margin-bottom: 15px;
    font-weight: 600;
    display: block;
 }
 .problem textarea {
    font-size: 11px;
    color: #999;
    border: none;
    resize: none;
    padding: 15px;
    background-color: #f7f7f7;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box
}
.btn {
      background:rgb(229,229,229);
  	  color:#fff;
  	  font-size:15px;
  	  padding:12px 0;
  	  border-radius: 50px;
  	  width: 73.5%;
  	  margin: 0 auto;
}
.help-btn {
 
  height:44px;
  line-height: 44px;
  width: 75%;
  margin:30px auto;
  display: block
}
.law-content-wrap {
  padding: 20px
}
.law-content-wrap .level1 {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 20px;
}
.law-content-wrap .text {
    font-size: 14px;
    margin-bottom: 20px;
}
</style>
