<template>
  <div class="exchangeETH">
    <div class="heard">
      <label @click="goback"><img src="/images/login/icon_arrow@2x.png" width="36%"/></label>
      <label>锁仓-ASC</label>
      <label style="font-size:14px;">锁仓记录</label>
    </div>
    <div class="login-content">
      <span><label>已锁仓:</label><input type="text" value="5000.00"/></span>
      <span><label>锁仓时间:</label><input type="text" value="3个月"/><img src="/images/other/arrow_down@2x.png" width="6%"/></span>
      <span><label>锁仓数量:</label><input type="text" placeholder="请输入锁仓数量"/></span>
      <span><label>交易密码:</label><input type="text" placeholder="请输入交易密码" /></span>
    </div>
  	<div class="login-bottom">
  		<span class="btn">确认</span>
  	</div>
    <div class="rule">
      <div class="rule-title"><span>锁仓规则</span><label>什么情况下需要锁仓？有什么好处？</label></div>
      <ul class="rule-content">
        <li><span>锁10天：</span><label>xxxxxx</label></li>
        <li><span>锁20天：</span><label>xxxxxx</label></li>
        <li><span>锁30天：</span><label>xxxxxx</label></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goback() {
      this.$router.back()
    }
  },
  components: {}
};
</script>
<style scoped lang="stylus" >
.exchangeETH
  text-align:center
  .heard
    font-size:17px
    color:rgb(51,51,51)
    display:flex
    align-items: center
    justify-content: space-between
    height:44px
    label:first-child,label:last-child
      width:18%
      height: 100%
      padding: 0 3%
      display: flex
      align-items: center
  .login-content
    text-align: left
    display: flex
    flex-direction: column
    padding:0 25px
    span
      display:flex
      align-items: center
      border-bottom:1px solid rgb(229,229,229)
      margin-top:15px
      label
        font-size:15px
        margin-right:15px
        img
          width:100%
    input
      border:none
      outline:none
      flex: 1
      padding:15px 0
  .login-bottom
    display:flex
    flex-direction: column
    margin-top:70px
    padding-bottom:25px
  	.btn
  	  background:linear-gradient(to right,rgb(244,170,10),rgb(244,155,10))
  	  color:#fff
  	  font-size:15px
  	  padding:12px 0
  	  border-radius: 50px
  	  width: 73.5%
  	  margin: 0 auto
  .rule
    padding:0 15px
    border-top:10px solid #f5f5f5
    .rule-title
      display:flex
      align-items: flex-end
      color:#333
      border-bottom:1px solid rgb(229,229,229)
      padding:25px 0 15px
      span
        font-size:16px
        margin-right:10px
      label
        font-size:12px
        color:rgb(153,153,153)
    .rule-content
      list-style: none
      display:flex
      flex-direction:column
      align-items: flex-start
      li
        margin-top:25px
</style>