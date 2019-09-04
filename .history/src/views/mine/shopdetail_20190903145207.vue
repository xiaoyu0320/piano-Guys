<!--  -->
<template>
<div class='detail'>
  <van-nav-bar
    title="租赁矿机"
    left-arrow
    fixed
    @click-left="onClickLeft"
    />
    <div class="list">
      <div class="info">
        <van-image
          width="100"
          height="100"
          :src="info.img"
        />
        <p class="title">
          {{info.name}}-{{info.spec}}
        </p>
        <div class="line"></div>
        <div class="bottom">
          <div class="left">
            <div class="item">单价:≈{{info.asc}}ASC</div>
            <div class="total">总价: <font style="color:red">≈{{total}}ASC</font></div>
             <div class="total">没人限购数: <font style="color:red">≈{{info.limit_qty}}</font></div>
          </div>
          <div class="right">
            <van-stepper @change="onChange" integer min="1" v-model="value" />
          </div>
        </div>
      </div>
      <div class="bottom-wrap">
        <van-button type="info" round @click.native="gobuy">立即租赁</van-button>
      </div>
    </div>
    <div class="masked" v-if="passwordShow" @click="passwordShow = false">
    </div>
    <!-- 密码输入框 -->
      <van-password-input
        :value="password"
        info="密码为 6 位数字"
        :focused="passwordShow"
        @focus="passwordShow = true"
         v-if="passwordShow"
      />
      <van-number-keyboard
        close-button-text="完成"
        :show="passwordShow"
        @input="onInput"
        @delete="onDelete"
        @close="onClose"
      />
</div>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'
import { mineDetail, lease } from 'api'
import { Toast, Dialog, Actionsheet,Popup ,Icon} from 'vant'
export default {
  components: {},
  data () {
    return {
      id: this.$route.query.id,
      info: {},
      total: 0,
      value: 1,
      passwordShow:false,
      password:''
    }
  },
  computed: {},
  watch: {},
  methods: {
    onInput(key) {
      this.password = (this.password + key).slice(0, 6);
    },
    onDelete() {
      this.password = this.password.slice(0, this.password.length - 1);
    },
    onBlur(){},
    onClose () {
      console.log(1111)
     if(this.password.length == 6){
       const obj = {
        id: this.id,
        qty: this.value,
        password:this.password
      }
      lease(obj).then(res => {
        if (res.status == 200) {
          this.$toast.success(res.msg)
          setTimeout(() => {
             this.passwordShow = false
            this.$router.back()
          }, 1500);
        }else if(res.msg = '余额不足！'){
             Dialog.confirm({
              title: '提示',
              message: '您的余额不足，是否前去充值？'
            }).then(() => {
                this.$router.push({
              path:'/exchangeETH'
            })
              
            }).catch(() => {
              
            });
    
        }else {
            this.$toast.fail(res.msg)
        }
      })
     }else{
       this.passwordShow = false
     }
    },
    onClickLeft () {
      this.$router.back()
    },
    getDetail () {
      mineDetail({ id: this.id }).then(res => {
        this.info = res.data
        this.total = res.data.asc
      })
    },
    onChange (val) {
      this.total = (this.info.asc * val).toFixed(2)
    },
    gobuy () {
      this.passwordShow = true
    }
  },
  created () {
    this.getDetail()
    store.dispatch('toSetBottom',false)
  },
  mounted () {
    this.$nextTick( () => {
      document.querySelector('html').style.fontSize = '13.333333333333vw'
    })
  },
  destroyed () {
    document.querySelector('html').style.fontSize = '12px'
  }
}
</script>
<style lang='scss' scoped>
  .detail{
     /deep/ .van-number-keyboard__body{
      font-size: 0;
    }
  }
  .list{
    @extend .scrollListContainer ;
    .info{
      background:#fff;
      border-radius: 5px;
      padding-top:15px;
      .van-image{
        display: block;
        margin: 0 auto 15px;
      }
      .title{
        font-size: 16px;
        text-align: center;
      }
      .bottom{
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: 20px;
        .left{
          font-size: 15px;
          .item{
            margin-bottom: 10px;
          }
        }
      }
    }
    .van-button{
      width: 100%;
    }
  }
  .line{
    border-bottom: 1px dashed #ccc;
    height: 1px;
    margin-top: 20px;
    position: relative;
    &::before{
      content: '';
      position: absolute;
      left: -5px;
      top: -5px;
      width: 10px;
      height: 10px;
      background: #f2f6f7;
      border-radius: 100%;
    }
    &::after{
      content: '';
      position: absolute;
      right: -5px;
      top: -5px;
      width: 10px;
      height: 10px;
      background: #f2f6f7;
      border-radius: 100%;
    }
  }
  .van-password-input{
    position: fixed;
    bottom:246px;
    left: 0;
    width: 100%;
    z-index: 100;
    margin: 0;
    background: #ebedf0;
  }
  .van-password-input__info{
    margin-top: 0;
    padding:10px 0;
  }
  .masked{
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    height: 100%;
    z-index: 99;
    background: rgba($color: #000000, $alpha: .3)
  }
</style>
