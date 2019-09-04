<template>
  <div>
    <van-nav-bar
      title="ASC"
      left-arrow
      @click-left="onClickLeft"
    
    />
    <div style="padding-top:15px"></div>
     <ve-line :data="chartData" >
    </ve-line>
    <van-tabs v-model="active">
      <van-tab title="全部">
        <div class="detail-group">
           <div class="detail-icon"><img src="/images/other/icon_turnout@2x.png"></div>
           <div class="detail-info">
             <h3>0Xeec6...df8722</h3>
             <p>05/30/2019  19:01:26</p>
           </div>
           <div class="detail-right co1">+0.095</div>
        </div>
        <div class="detail-group">
           <div class="detail-icon"><img src="/images/other/icon_turnin@2x.png"></div>
           <div class="detail-info">
             <h3>0Xeec6...df8722</h3>
             <p>05/30/2019  19:01:26</p>
           </div>
           <div class="detail-right co2">+0.095</div>
        </div>
        <div class="detail-group">
           <div class="detail-icon"><img src="/images/other/icon_stop@2x.png"></div>
           <div class="detail-info">
             <h3>0Xeec6...df8722</h3>
             <p>05/30/2019  19:01:26</p>
           </div>
           <div class="detail-right co3">+0.095</div>
        </div>
      </van-tab>
      <van-tab title="转出">
         <div class="detail-group">
           <div class="detail-icon"><img src="/images/other/icon_turnin@2x.png"></div>
           <div class="detail-info">
             <h3>0Xeec6...df8722</h3>
             <p>05/30/2019  19:01:26</p>
           </div>
           <div class="detail-right co2">+0.095</div>
        </div>
      </van-tab>
      <van-tab title="转入">
         <div class="detail-group">
           <div class="detail-icon"><img src="/images/other/icon_turnin@2x.png"></div>
           <div class="detail-info">
             <h3>0Xeec6...df8722</h3>
             <p>05/30/2019  19:01:26</p>
           </div>
           <div class="detail-right co2">+0.095</div>
        </div>
      </van-tab>
      <van-tab title="失败">
        <div class="detail-group">
           <div class="detail-icon"><img src="/images/other/icon_stop@2x.png"></div>
           <div class="detail-info">
             <h3>0Xeec6...df8722</h3>
             <p>05/30/2019  19:01:26</p>
           </div>
           <div class="detail-right co3">+0.095</div>
        </div>
      </van-tab>
    </van-tabs>
    <div class="detail-footer">
        <div class="detail-change" @click="change">
           <img src="/images/other/icon_change@2x.png">
           兑换
        </div>
        <div class="detail-opeart">
            <van-button size="small" class="btn1" type="primary" @click="count">转账</van-button>
            <van-button size="small" class="btn2" type="primary" @click="pay">收款</van-button>
        </div>
    </div>
  </div>
  
</template>

<script>


export default {
  data () {
  
    this.grid = {
      right: 60
    }
     return {
        active: 0,
        chartData: {
       
          columns: ['data', 'ASC', 'CNY'],
          rows: [
            { 'data': '5/24', 'ASC': 0, 'CNY': 0 },
            { 'data': '5/25', 'ASC': 0, 'CNY': 0 },
            { 'data': '5/26', 'ASC': 0, 'CNY': 0 },
            { 'data': '5/28', 'ASC': 0, 'CNY': 0 },
            { 'data': '5/29', 'ASC': 50, 'CNY': 50 },
            { 'data': '5/30', 'ASC': 50 , 'CNY': 55 },
          ]
        }
      }
  },
  created() {
    
  },

  beforeDestroy() {
    this.$parent.footshow = false
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    
    change(){
        this.$router.push({
          path:'/change'
        })
    },
    pay(){
       this.$router.push({
          path:'receivables/0'
        })
    },
    count(){
       this.$router.push({
          path:'/transferASC/4'
        })
    }
  },

};
</script>
<style scope >
  .detail-group {
    position: relative;
    padding: 15px 80px 15px 60px;
    border-bottom: 1px solid #eee
  }
  .detail-group .detail-icon {
    position: absolute;
    left: 18px;
  }
  .detail-group .detail-icon img {
    width: 32px;  
  }
   .detail-group  h3 {
     font-size: 16px;
     color: #333;
     line-height: 1.5;
     font-weight: normal
   }
  .detail-group  p{
    font-size: 14px;
    color:#999;
    line-height: 26px
  }
  .detail-right {
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top:-7px;
    font-size: 14px;
   
  } 
  .detail-right.co1{
    color: #0dcbd3;
  }
  .detail-right.co2{
    color: #5273ff;
  }
  .detail-right.co3{
    color: #ff566a;
  }
  .van-tabs--line {
    margin-top:5px;
    padding-bottom: 60px
  }
  .van-tabs__line {
  background-image: linear-gradient(0deg, #376bff 0%, #46b3ff 100%), linear-gradient( #ff52a7, #ff52a7);
  }
  .detail-footer {
    position: fixed;
    bottom: 0;
    height: 40px;
    width: 100%;
    background: #fff;
    padding: 8px 0
  }
  .detail-footer .detail-change{
    float: left;
    padding-left:15px;
    font-size: 12px;
    color: #333
  }
  .detail-footer .detail-change img {
    width: 22px;
    display: block;
    margin-bottom: 5px

  }
  .detail-opeart {
    float: right
  }
  .btn1.van-button--primary {
    background: #00ccd9;
    color: #fff;
    border-color: #00ccd9;
    border-radius: 30px;
    margin-right: 15px;
    margin-top: 7px;
    padding: 0 30px
  }
  .btn2.van-button--primary {
    background: #5273ff;
    color: #fff;
    border-color: #5273ff;
    border-radius: 30px;
    margin-right: 15px;
    margin-top: 7px;
    padding: 0 30px
  }
</style>
