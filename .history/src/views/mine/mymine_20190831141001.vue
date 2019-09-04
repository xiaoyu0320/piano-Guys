<!--  -->
<template>
<div class='mymine'>
    <van-nav-bar
    title="我的矿机"
    right-text="收益记录"
    left-arrow
    fixed
    @click-left="onClickLeft"
    @click-right="onClickRight"
    />
    <div class="_mymine">
      <div class="computed-wrap">
          <div class="computed-top dp-flex">
             <div class="info flex-1">
               <div class="_title">矿机算力值</div>
               <div class="_info">
                 <font>{{total_hashrate}}</font>/小时
               </div>
             </div>
             <div class="up">
                <img src="/images/minefield/upup.png" alt="">
                <p>提升算力值</p>
             </div>
          </div>
          <div class="computed-bottom">
            累计收益 {{total_asc}}ASC
          </div>
      </div>
      <div class="listtitle">矿机列表</div>
      <van-list 
      v-model="loading" 
      :finished="finished"
      finished-text="没有更多了"
      @load="getList" class="list">
        <div class="item" v-for="(item, index) in list" :key="index">
           <van-image  width="100" height="100" :src="item.img"></van-image>
           <div class="info">
              <div class="info-top dp-flex">
                 <div class="info-t-l">
                    <div class="title">{{item.name}}</div>
                    <div class="spec">{{item.spec}}</div>
                    <div class="rate">运行{{item.running_time}}/{{item.cycle}}h</div>
                 </div>
                 <div class="info-t-r">
                   <svgItem></svgItem>
                   <p>运行中</p>
                 </div>
              </div>
              <div class="info-bottom">
                    <div class="inner-progress" :style="{'width':item.running_percent+'%'}"></div>
              </div>
           </div>
        </div>
      </van-list>
    </div>
</div>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'
import svgItem from '@c/svg'
import { getMylease } from 'api'
export default {
  components: {
    svgItem
  },
  data () {
    return {
      page: 1,
      total_asc: '6000',
      total_hashrate: '10000',
      list: [],
      finished:false,
      loading:false
    }
  },
  computed: {},
  watch: {},
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onClickRight () {
      this.$router.push({
         path: '/mine/profit'
      })
    },
    getList () {
      const obj = {
        'page': this.page
      }
      getMylease(obj).then(res => {
        const { data } = res
        this.loading = false
        if (data.count === this.list.length) {
          this.finished = true
          return
        }
        this.list = this.list.concat(res.data.list)
        this.page = this.page + 1
        this.total_asc = res.data.total_asc
        this.total_hashrate = res.data.total_hashrate
      })
    }
  },
  created () {
    store.dispatch('toSetBottom',false)
  },
  mounted () {
    this.$nextTick(() => {
      document.querySelector('html').style.fontSize = '13.333333333333vw'
    })
  },
  destroyed () {
    document.querySelector('html').style.fontSize = '12px'
  }
}
</script>
<style lang='scss' scoped>
  ._mymine{
    @extend .scrollListContainer ;
    display: flex;
    flex-direction: column;
    .computed-wrap{
      background: url('../../assets/bg-top.png')no-repeat;
      background-size: 100% 100%;
      overflow: hidden;
      width: 100%;
      border-radius: 5px;
      .computed-top{
        border-bottom: 1px solid rgba(247, 248, 250, 0.31);
        padding: 10px;
        align-items: center;
        color: #fff;
        ._title{
          font-size: .25rem;
          margin-bottom: .15rem
        }
        ._info{
          font-size: .25rem;
          font{
            font-size: .4rem;
            font-weight: bold;
          }
        }
        .up{
          width: 1.5rem;
          img{
            width: 1rem;
            height: auto;
            display: block;
            margin: 0 auto;
          }
          p{
            font-size: .25rem;
            color: #fff;
            text-align: center;
          }
        }
      }
      .computed-bottom{
        font-size: .25rem;
        padding: .2rem .3rem;
        color: #fff;
      }
    }
    .listtitle{
      font-size: .4rem;
      margin: .3rem 0 .25rem;
    }
  }
  .list{
    flex:1;
    overflow-y: scroll;
    .item{
      display: flex;
      align-items: center;
      background: #fff;
      margin-bottom: 15px;
      padding: 10px;
      border-radius: 8px;
      .info{
        margin-left: 10px;
        flex: 1;
        overflow: hidden;
        .info-top{
          justify-content: space-between;
          align-items: center;
          width: 100%;
          .info-t-l{
            flex: 1;
            overflow: hidden;
            font-size: 0;
          }
          .info-t-r{
            font-size: 12px;
            color: #333;
            text-align: center;
            .svg{
              display: inline-block;
              margin-bottom: 10px;
            }
          }
          .title{
            font-size: 16px;
          }
          .spec{
            font-size: 14px;
            color: #fff;
            background: #65abf9;
            border-radius: 4px;
            padding: 3px 10px;
            display: inline-block;
            margin: 10px 0;
          }
          .rate{
            color: #bdbdbd;
            font-size: 14px;
            margin-bottom: 15px;
          }
        }
        .info-bottom{
          width: 100%;
          position: relative;
          height: 4px;
          background: #e4e5e6;
          border-radius: 4px;
          overflow:hidden;
          .inner-progress{
            position: absolute;
            left: 0;
            top: 0;
            background-image: linear-gradient(267deg,  #9769f4 0%, #4180f4 26%,  #72c8f6 100%), linear-gradient( #e5e5e5, #e5e5e5);
          background-blend-mode: normal, normal;
          height: 4px
          }
        }
      }
    }
  }
</style>
