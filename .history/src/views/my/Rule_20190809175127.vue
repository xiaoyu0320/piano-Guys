
<template>
<div class='rule'  v-lazy:background-image="imgUrl" >
 <van-nav-bar
        
        class="share-bar share__fixed"
        left-arrow
        @click-left="onClickLeft"
        />
  <div class="rule-title">
     <h4>ASC节点预订</h4>   
     <h1>火热抢占中</h1>
  </div> 
  <div class="rule-txt">
       <p>
            艾达链（代币名称ASC），是由<span style="color: rgb(0, 176, 240);">美国硅谷区块技术研究中心</span>研发英国区块链数字发展研究所作为技术顾问的重点项目，旨在通过<span style="color: rgb(0, 176, 240);">区块</span><span style="color: rgb(0, 176, 240);">链技术、人工智能技术、物联网技术</span>等的有效融合实现电商生态链资源的共享、共治与共联。
        </p>
        <p>
             为了更好的凝聚社群的力量，为ASC寻找有实力的守护节点和超级节点，特推出节点预订抢位方案，<span style="color: rgb(0, 176, 240);">在ASC上交易所后的2个月</span><span style="color: rgb(0, 176, 240);">内，将在预订的节点里，竞选出63个守护节点和21个超级节点。</span>
        </p>
        <p>
            本次节点抢占仅在ASC官方发布的多功能数字钱包中进行，用户注册ASC钱包，<span style="color: rgb(0, 176, 240);">必须填写邀请码。</span>
        </p>
        <h5 class="rule-s-title">
            申请节点
        </h5>

      <p><i class="rule-cicle">1</i> 普通节点：<span>投资1万元等值主流币</span>（WTC、ETH、EOS、USDT），均可按ASC基石轮价格0.1元/个进行兑换。</p>
      <p><i class="rule-cicle">2</i>    守护节点：<span>投资5万元等值主流币</span>（WTC、ETH、EOS、USDT），可抢占守护节点的位置（候选），有资格参与竞选。</p>
      <p><i class="rule-cicle">3</i>   竞选条件及权益：</p>
      <table border="2" cellspacing="0">
          <thead>
            <tr>  
                <th>节点</th>
                <th>条件</th>
                <th>权益</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                  <td>63个守护节点<br /><span>(在预节点中竞选63个)</span></td>
                  <td>团队成员大于10人 团队投资总额大于100完 及诶单个人投资10完</td>
                  <td>可享受全球0.2%分红权</td>
              </tr>
              <tr>
                  <td>21个超级节点<span>（在63守护节点中竞选21个）</span> </td>
                  <td>团队成员大于100人团队投资总额大于100万 节点个人投资50万</td>
                  <td>可享受全球0.5%分红权</td>
              </tr>
          </tbody>
      </table>
       <p><i class="rule-cicle">4</i> 推荐节点奖励：<span>可得佣金10%</span>（一次性返佣，不锁仓）
       <span> 至少抢占普通节点后，才能推荐节点（只限直推）</span> </p>
        <p><i class="rule-cicle">5</i> 释放： 节点所得的ASC都按照<span>每周1%进行释放。</span>   </p>
        <h5 class="rule-s-title">
            抢占节点优势分析
        </h5>
        <p><i class="rule-cicle">1</i>享受ASC基石轮最低价格</p>
        <p><i class="rule-cicle">2</i>ASC总发行量30亿枚，基石轮节点占比10%，每周1%进行
        释放；社群激励占比5%，其余85%的各项占比，锁仓期2年。
        即：前期在交易所或市面上所流通的ASC几乎来源于各节点每
        周释放出来的，节点在基石轮抢占越多，将来的价值空间就越大。</p>
        <p><i class="rule-cicle">3</i>每周所释放的ASC可以到<span>交易所按实时价格变现</span>  </p>
        <h5 class="rule-s-title">
            云矿机收益解析
        </h5>
        <p><i class="rule-cicle">1</i>基石轮结束后，用户可在交易所购买ASC，用ASC参与云矿机投资。</p>
        <p><i class="rule-cicle">2</i>  购买云矿机的挖矿收益： </p>
        <p>
            静态收益：
        </p>
        <p>
          <span>  可产生所投入3倍金额的ASC，日产量为投资额1%的ASC数量， 共产300天。即ASC不涨不跌的前提下，即可获得3倍回报率！</span>
        </p>
        
        <p>
        举例：假设购买1万元的ASC参与云矿机，每日产出等值100元的ASC数量（日产量），共产出300天。如当日ASC价格为0.5元，则日产200个ASC。
        </p>
        
        <p>
        动态收益：
        </p>
        <p>
            <span>一级推荐奖：矿机日产量*10%</span>
        </p>
        <p>
            <span> 二级推荐奖：矿机日产量*5%</span>
        </p>
        <p>
            <span> 团队业绩奖：矿机日产量*5%</span>
        </p>
        <p>
            说明：个人直推大于10人、团队总额大于100万才可享受团队业绩奖
        </p>
        <p>
            （团队业绩奖为绩差奖）
        </p>
        <p><i class="rule-cicle">3</i>任何用户可进行云矿机的投资和推荐</p>
     
        <img src="/images/my/rule-1.png" style="max-width:100%;margin:10px 0">    
         <p style="text-align:center">（最终解释权归新加坡ASC基金会所有）</p>
       
  </div>

  
   



</div>
</template>

<script>

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
imgUrl:'/images/my/rule.png'
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
onClickLeft(){
    this.$router.back()
}
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

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
.rule{
    
    color: #fff;
    background-size: cover;
    background-repeat: no-repeat;
}
.rule-title {
    padding: 20% 0 15%;
    text-align: center;
}
.rule-title h4 {
   
	font-size: 32px;
	font-weight: normal;
	font-stretch: normal;
	color: #009fe8;
}
.rule-txt {
    padding:20px;
    font-size: 13px
}
.rule-txt > p {
    text-indent: 2em;
    line-height: 1.8;
    margin-bottom: 15px;
    position: relative;
}
.rule-txt > p span {
   color: rgb(0, 176, 240);
}
.rule-txt .rule-cicle {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: block;
    background:#fff;
    color: #191b75;
    text-indent: 0;
    text-align: center;
    font-weight: normal;
    line-height: 22px;
    font-style: normal;
}

.rule-title h1 {
   
	font-size: 42px;
	font-weight: normal;
	font-stretch: normal;
	color: #ececfe; 
}
.share__fixed {
    position: fixed;
    top:0;
    width:100%
}
.share-bar {
    background: transparent
}
.share-bar .van-nav-bar__title ,.share-bar .van-nav-bar__text {
    color: #fff;
}
.van-nav-bar .van-icon {
    color: #fff!important
}
 .van-hairline--bottom::after {
    border-width: 0
}
.rule-s-title {
   width:40%;
	background-image: linear-gradient(90deg, 
		#2fa0fe 0%, 
		#2766f7 21%, 
		#1f2bef 32%, 
		#441fdc 49%, 
		#6812c8 100%), 
	linear-gradient(
		#7280c1, 
		#7280c1);
	background-blend-mode: normal, 
		normal;
	border-radius: 30px;
    display: block;
    margin: 10% auto;
    text-align: center;
    padding: 5px 10%;
    font-size: 15px;
}
.rule-txt table {
    margin-bottom: 15px
}
.rule-txt table th, .rule-txt table td{
    border:2px solid #fff
}
.rule-txt table td,.rule-txt table th{
    padding:10px;
    font-size: 12px;
    line-height: 1.5
}
.rule-txt table td {
    background:#009FE8
}
</style>
