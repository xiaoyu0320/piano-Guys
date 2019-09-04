
<template>
<div class='coin' ref="bodyHeight">
    <van-nav-bar
        title="EOS充币"
      
        right-text="充币记录"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
    />
    <div class="conin__tabs" style="margin-top:-2px">
        <van-tabs v-model="coinActive">
            <van-tab title="地址充币">
                <van-cell-group style="margin:10px 0">
                <van-field
                    v-model="sms"
                    center
                    clearable
                    label="选择币总"
                    placeholder="EnterPRISE operations"
                >
                </van-field>
                </van-cell-group>
                <div class="coin-white coin-detail">
                    <div class="coin-code">
                         <img src="images/other/3.png">
                    </div>
                    <div class="coin-choice">
                        <span>充币地址 &nbsp;<img src="images/other/other.png" width="15px" @click="msg()"></span>
                        <span>memo  &nbsp;<img src="images/other/other.png" width="15px" @click="msg()"></span>
                    </div>
                    <div class="coin-choice">
                        <span>okbthothemoon </span>
                        <span style="font-size:18px;color:orange">947746</span>
                    </div>
                    <van-row style="margin-top:35px">
                        <van-col span="16">
                            <van-button type="info" style="width:100%">复制地址</van-button>
                        </van-col>
                        <van-col span="8" style="text-align:right">
                             <van-button type="info">复制标签</van-button>
                        </van-col>
                    </van-row>

                </div>
                <div class="coin-infomation">
                    <h5>注意事项</h5>
                    <p style="color:orange">需要一个网络确认才能到账，任何非EOS资产充值到EOS地址后不可找回！</p>
                    <p style="color:#999">充值EOS同时需要一个充值地和EOS memo,警告：如果未遵守正确的EOS充值步骤，币会丢失</p>
                </div>
            </van-tab>
            <van-tab title="内部转账">内容 2</van-tab>
        </van-tabs>
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
 coinActive:0
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    onClickLeft() {
      this.$router.back()
    },
    onClickRight() {
        Toast('按钮');
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

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
.coin-code img{
    width: 35%;
    display: block;
    margin: 0 auto;
}
.coin {
    background: #f5f5f5
}
.coin-white {
  background: #fff
}
.coin-detail {
   padding:40px 15px 20px 15px
}
.coin-choice {
  display:flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
 margin-top: 15px;
}
.coin-choice span {
    align-items: center;
    display: flex;
}
.coin-infomation {
    font-size: 14px;
    padding: 15px
}
.coin-infomation h5 {
    font-size: 16px;
    font-weight: normal
}
.coin-infomation p {
    margin-top:10px;
    
}
</style>
