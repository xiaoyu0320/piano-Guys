<!--  -->
<template>
<div class='item' @click="goDetail">
   <div class="item-top">
     <van-image width="80" height="80" :src="item.img" style="margin-right:15px;"></van-image>
     <div class="info flex-1">
        <div class="title">{{item.name}}-{{item.spec}}</div>
        <div class="output">矿产量{{item.output}}枚/h</div>
        <div class="hashrate">算力值:&nbsp;&nbsp;{{item.hashrate}}Ghs/h</div>
        <div class="total_output">预计产量:&nbsp;&nbsp;≈{{item.total_output}}枚</div>
        <div class="cycle">运行周期:&nbsp;&nbsp;{{item.cycle}}小时</div>
     </div>
   </div>
   <div class="item-bottom">
     <font>{{item.asc}}ASC</font>
     <van-button type="info" round size="mini">去租赁</van-button>
   </div>
</div>
</template>

<script>

export default {
  components: {},
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  methods: {
    goDetail () {
      this.$router.push({
        path: '/mine/shopdetail',
        query: {
          id: this.item.id
        }
      })
    }
  },
  created () {
  }
}
</script>
<style lang='scss' scoped>
  .item{
    width: 98%;
    border-radius: 5px;
    background: #fff;
    margin: 0 auto .2rem;
    .item-top{
      border-bottom: 1px solid #f6f6f6;
      padding: .25rem;
      display: flex;
      align-items: center;
      .title{
        font-size: .35rem;
        margin-bottom: .2rem;
      }
      .output,.hashrate,.total_output,.cycle{
        font-size: .22rem;
        color: #999;
        margin-bottom: .05rem
      }
      .cycle{
        margin-bottom: 0;
      }
    }
    .item-bottom{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: .2rem;
      font{
        color: red;
        font-size: .35rem;
        display: inline-block;
        margin-right: 10px;
      }
    }
  }
</style>
