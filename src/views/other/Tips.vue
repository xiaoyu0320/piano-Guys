<!--  -->
<template>
  <div class='wrap '>
      <div class="top note">
        <van-nav-bar
          title="转账信息"
          left-arrow
          @click-left="onClickLeft"
   
        />
      </div>
      
  
      <div class="intro" >
         <div class="title">产品介绍</div>
         <div class="text">
           {{data.content}}
         </div>
      </div>
        <div class="intro" >
         <div class="title">交易规则</div>
         <div  class= "fix-value">
            <div class="fix-text" style="clear:both">
              <div class="fix-title">
                <p>转账收益</p>
                <p>结束计息</p>
              </div>
              <img src="/images/other/note-time.png" style="max-width:100%">
              <div class="fix-title">
                <p>{{nowDate}}</p>
                <p>{{afterDate}}</p>
              </div>
            </div>

         </div>
         <div class="intro-notice"> 
           <ul>
             <li><span>交易提醒</span><span>预约申请成功后不可撤销</span></li>
             <li><span>投资下限</span><span>10.0000 EOS</span></li>
             <li><span>付币方式</span><span>直接从钱包账户扣除</span></li>
           </ul>
         </div>
      </div>    
      

      
  </div>
</template>

<script>
import { getNoteDetail,dosave } from '../api/wallet' 
import { NavBar, NoticeBar,Skeleton  } from 'vant'
export default {
  components: {},
  data	() {
    return {
   
     nowDate:'',
     afterDate:'',
    
    };
  },
  computed: {},
  watch: {

  },
  methods: {
     goes(){
     this.changeVisabled = true
    //  this.$router.push({
    //    path:'/save/' + this.data.id
    //  })
   },
   p(s){
    return s < 10 ? '0' + s: s;
   },
   onClickLeft() {
      this.$router.back()
  },
   onChange(value) {
      this.$toast('已释放：' + value);
   },
   confrimCount(){
     
   }
  },
  created	() {
  
  },

  mounted	() {
  
  },
  destroyed	() {}, //	生命周期 - 销毁完成
  activated	() {} //	如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='stylus' scoped>
  .swiper{
    background: #fff;
    height:30px;
    line-height 30px;
    .van-swipe-item{
      padding:0 10px;
      font-size:14px;
      color:#999
    }
  }
  .flex-wrap{
    display:flex;
  }
  .wrap{
    min-height :100vh;
    background #f2f5f7;
    .top{
      padding-bottom:20px;
      position: relative;
      background:url(../../public/images/other/bg3@2x.png);
      .arrow-icon{
        position: absolute;
        width: 20px;
        height: 20px;
        left:20px;
        top:20px;
        transform: rotate(-180deg)
      }
      .van-nav-bar{
        background: #509ff7;
       .van-nav-bar__title van-ellipsis{
          color: #fff
        }
      }
 
      .item{
        flex: 1;
        color #fff;
        text-align :center
        .head{
          font-size:13px;
          margin-bottom :5px;
        }
        .bottom{
          font-size :14px;
          line-height:22px;
          font-weight:600;
        }
      }
      .title1{
        font-size:40px;
        font-weight:600;
        line-height 1.5
      }
      .title2{
        font-size:14px;
      }
      .title1,.title2{
        text-align center;
        color: #fff;
      }
    }
    .intro{
      padding:15px;
      background #fff;
      margin-top 15px;
      .title{
        font-size:18px;
        height 22px;
        line-height:22px;
        margin-bottom:5px;
      }
      .text{
        font-size: 14px;
        line-height: 1.5;
        color:#353535
      }
      .fix-value{
        display: flex
      }
    }
  }
.intro-notice
 
  li
    display: flex
    font-size: 14px
    span 
     padding-right:15px
.progerss-op  {
  margin-top:20px;
  bottom :20px
}
.progerss-op .van-col {
    background: linear-gradient(0deg, 
		#376bff 0%, 
		#409afe 100%), 
	linear-gradient(
		#70bde9, 
		#70bde9);
    color: #fff;
    position: relative;
    left: 10%;
    width: 80%;
    border-radius 30px;
    
    
}
.wrap-box {
  position:relative;
  background #fff;
  
}
.wrap-left{
    width 20px;
    position : absolute;
    left:5px;
    top :7px
  }
.release {
  color: #fff;
  font-size: 13px;
  padding-left: 15px;
  padding-bottom: 15px;
}
.fix-text {
  margin: 20px 0
}
.fix-title {
  position: relative;
}
.fix-title p {
  width:50%;
  text-align:center;
  font-size:12px;
  color:#999;
  float:left;
  box-sizing :border-box
}
.fix-title p:first-child{
   
    padding-right:15px
}
.fix-title p:last-child{
    float:right;
    padding-left:18px
}
.changeTitle {
    padding: 15px 30px;
    background-image: linear-gradient(-30deg, #376bff 0%, #409afe 100%), linear-gradient( #ff52a7, #ff52a7);
    color: #fff
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
   display: block;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: #323233;
    background-color: transparent;
    border: 0;
    resize: none;
    font-size: 12px;
    height:30px;
    line-height: 30px
}
.popupbox {
  width:80%;
  border-radius: 5px
}
</style>
<style>
.note .van-nav-bar__title.van-ellipsis {
  color:#fff
}
.note .van-nav-bar .van-icon {
  color: #fff
}
</style>