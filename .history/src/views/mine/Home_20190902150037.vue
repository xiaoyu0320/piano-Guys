<template>
  <div class="home">
    <img class="img" src="/images/minefield/bg.png" alt="" >
    <img class="cloud cloud1" src="/images/minefield/cloud1.png" alt="">
    <img class="cloud cloud2" src="/images/minefield/cloud2.png" alt="">
    <img class="cloud cloud3" src="/images/minefield/cloud3.png" alt="">
    <div class="play" @click="goExplain">玩法说明</div>
    <img src="/images/minefield/ren.gif" class="ren" alt="">
    <div class="info">
      <!-- <div class="floor1-list">
        <div class="item">
          <img src="/images/minefield/coin.png" alt="">
          <p>一键领取</p>
        </div>
      </div> -->
      <div class="floor2-list">
         <div class="item" @click="go('poolrecord')">
            <img src="/images/minefield/jiankon.png" alt="">
            <p>矿池待释放{{not_release}}</p>
         </div>
         <div class="item" @click="go('my')">
           <img src="/images/minefield/jisuan.png" alt="">
           <p>算力值{{total_hashrate}}</p>
         </div>
      </div>
      <div class="floor3-list bottom-list">
          <div class="item" @click="go('my')">
            <img src="/images/minefield/me.png" alt="">
            <p class="title">我的矿机</p>
            <p class="desc">矿机越多 收益越高</p>
          </div>
          <div class="item" @click="go('shop')">
            <img src="/images/minefield/up.png" alt="">
            <p class="title">提升算力</p>
            <p class="desc">海量矿机 等你租赁</p>
          </div>
          <div class="item" @click="go('pool')">
            <img src="/images/minefield/enlarge.png" alt="">
            <p class="title">ASC矿池</p>
            <p class="desc">实现资产快速兑换</p>
          </div>
          <div class="item" @click="go('invite')">
            <img src="/images/minefield/share_active.png" alt="">
            <p class="title">邀请好友</p>
            <p class="desc">轻松邀请 躺着赚钱</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mineIndex,getinfobyuid } from 'api'
import { Toast} from 'vant'
export default {
  name: 'home',
  data () {
    return {
      not_release:'',
      total_hashrate: '',
      uid:this.$route.query.uid,
      userinfo:{}
    }
  },
  created () {
    this.getIndex()
    // localStorage['_shop_userId'] = this.uid
    this._getinfobyuid()
  },
  mounted () {
    this.$nextTick(() => {
      document.querySelector('html').style.fontSize = '13.333333333333vw'
    })
  },
  methods: {
    getIndex () {
      mineIndex({
       uid:localStorage['_shop_userId']
      }).then(res => {
        const { data } = res
        this.total_hashrate = data.total_hashrate
        this.not_release = data.not_release
      })
    },
    goExplain () {
      this.$router.push({
        path: '/mine/explain'
      })
    },
    go (type) {
      switch (type) {
        case 'shop':
          this.$router.push({
            path: '/mine/mineshop'
          })
          break
        case 'my':
          this.$router.push({
            path: '/mine/mymine'
          })
          break
        case 'pool':
          this.$router.push({
            path: '/mine/pool'
          })
          break
        case 'invite':
          this.$router.push({
            path: '/bill',
            query:{
               code:this.userinfo.invite_code
            }
          })
          break
        case 'poolrecord':
          this.$router.push({
            path: '/mine/poolrecord'
          })
      }
    },
    _getinfobyuid() {
      let obj = {}
      obj.uid = localStorage['_shop_userId']
      obj.token = localStorage['_shop_token']
      Toast.loading({
        message:'loading',
        duration: 20000,
      })
       this.$toast.clear()
      getinfobyuid(obj).then((res)=>{
        
        if (res.status == 200) {
        
          this.userinfo = res.data
         
        
        } else {
          Toast.fail(res.msg)
            if (res.msg.indexOf("请重新登录") >= 0) {
              localStorage.clear()
              
              Toast.loading({
                duration: 2000,
                forbidClick: true,
                message: res.msg
              });
             this.$router.replace({
                path: '/'
              })
            }
        }
      })
    },
  },
  destroyed () {
    document.querySelector('html').style.fontSize = '12px'
  }
}
</script>
<style lang="scss" scoped>
  $opacityFFF:rgba($color: #ffffff, $alpha: .3);
  .home{
    display: block;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    .play{
      position: absolute;
      top: 0.5rem;
      right: 0.3rem;
      z-index: 2;
      font-size: 0.3rem;
      color: #fff;
    }
    .img{
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 1;
    }
    .cloud{
      position: absolute;
      z-index: 3;
      opacity:.6;
    }
    .cloud1{
      width: 110px;
      height: auto;
      top:1rem;
      right: -55px;
      animation: cl0 12s infinite linear;
    }

    @keyframes cl0 {
        0%{transform: translateX(-100vmin) }
        100%{transform: translateX(100vmin) }
    }
    .cloud2{
      width: 60px;
      height: auto;
      top:3.3rem;
      left: 1.5rem;
      animation: cl1 12s infinite linear;
    }
    @keyframes cl1 {
        0%{transform: translateX(-100vmin) }
        100%{transform: translateX(100vmin) }
    }
    .cloud3{
      width: 100px;
      height: auto;
      top:2rem;
      right: 1rem;
      animation: cl2 12s infinite linear;
    }
    @keyframes cl2 {
        0%{transform: translateX(-100vmin) }
        100%{transform: translateX(100vmin) }
    }
    .info{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: auto;
      box-sizing: border-box;
      padding: 0 0 .25rem .25rem;
      display: flex;
      flex-direction: column;
      z-index: 3;
      .floor1-list{
        text-align: right;
        margin-bottom: .25rem;
        .item{
            background:$opacityFFF;
            height: .6rem;
            line-height: .6rem;
            font-size: .2rem;
            border-radius: .5rem;
            padding: 0 .25rem;
            flex: 1;
            overflow: hidden;
            margin-right: .3rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            img{
              display: block;
              width: .3rem;
              height: auto;
            }
            p{
              white-space: nowrap;
              margin-left: .2rem;
              overflow: hidden;
              text-overflow: ellipsis;
            }
        }
      }
      .floor2-list{
        display: flex;
        margin-bottom: .25rem;
        .item{
            background:$opacityFFF;
            height: .6rem;
            line-height: .6rem;
            font-size: .2rem;
            border-radius: .5rem;
            padding: 0 .25rem;
            flex: 1;
            overflow: hidden;
            margin-right: .3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            img{
              display: block;
              width: .3rem;
              height: auto;
            }
            p{
              white-space: nowrap;
              margin-left: .2rem;
              overflow: hidden;
              text-overflow: ellipsis;
            }
        }
      }
      .bottom-list{
        width: 100%;
        overflow-x: scroll;
        white-space: nowrap;
        letter-spacing: 0;
        font-size: 0;
        .item{
          background:$opacityFFF;
          display: inline-block;
          border-radius: .25rem;
          padding:.5rem .25rem;
          text-align: center;
          color: #fff;
          margin-right: .25rem;
          &:last-child{
            margin-right: 0;
          }
          img{
            width: .6rem;
            height: auto;
            display: block;
            margin: 0 auto;
          }
          .title{
            font-size: .3rem;
            height:.4rem;
            line-height: .4rem;
            margin:.15rem 0
          }
          .desc{
            font-size: .2rem;
            height: .25rem;
            min-width: 2rem;
          }
        }
      }
    }
  }
</style>
