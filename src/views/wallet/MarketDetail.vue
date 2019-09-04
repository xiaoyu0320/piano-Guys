<!--  -->
<template>
<div class='markerD'>
      <van-nav-bar
          title="走势"
          left-arrow     
          @click-left="onClickLeft"
          class="fixed"
        />
         <ve-line :data="chartData" ></ve-line>
         <div class="markertab">
             <ul>
                 <li v-for="(item,i) in tabs" :key="i" @click="linkTab(item,i)" >      
                    <span :class="{active:active==i}"> {{item.name}}  </span> 
                    <p style="margin-top:10px" :class=" Number(item.number)< 0 ? 'green':'red'">{{item.number}}%</p>
                 </li>
             </ul>
         </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getmarketdetail,getCoinChange} from '@/api/wallet'
import { formatT} from '@/common/time'
import { Toast, Dialog } from 'vant'
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
 data: function () {
//这里存放数据
 this.chartSettings = {
    xAxisType: 'time',
    yAxisName: ['value'], 
 },
 this.extend = {
      'xAxis.0.axisLabel.rotate': 45
    }
return {
  chartData: {
        columns: ['time', 'value'],
        //    columns: ['time', 'value', 'btcRate', 'volumn', 'number'],     
        rows: []
    },
    type:'d' ,//D 天 w 周 m 月 3m 季度 6m 半年 y 年 ydt 今年 all 所有,
    tabs:[{
        name:'24小时',
        type:'d',
        typename:'change_day',
        number:'9.55'
    },{
        name:'周',
        type:'w',
        typename:'change_week',
        number:'-9.96'   
    },{
        name:'月',
        type:'m',
        typename:'change_month',
        number:'31.03'   
    },{
        name:'季度',
        type:'3m',
        typename:'change_threemonth',
        number:'130.22'
    },{
        name:'半年',
        type:'6m',
        typename:'change_sixmonth',
        number:'189.56'   
    },{
        name:'年',
        type:'y',
        typename:'change_year',
        number:'71.36'    
    },
    {
        name:'今年',
        type:'ydt',
        typename:'change_thisyear',
        number:'194.15'    
    },{
        name:'所有',
        type:'all',
        typename:'change_ico',
        number:'449692736'    
    }],
    active:0,
    alldata:[],
    code:this.$route.query.code
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
linkTab(item,index){
 this.active = index
 this._getmarkdetail(item.type)

 this._getCoinChange()
}, 
_getCoinChange(){
    let obj = {}
    obj.code = this.code
      Toast.loading({
        duration:20000,
        mask: true
      })
    getCoinChange(obj).then(res=>{
        let i = 0
    this.tabs.map(item=>{
        if(res.data.data.hasOwnProperty(item.typename)){
            console.log(i++)
            item.number = res.data.data[item.typename]
            console.log(item.number)
        }
    })
       Toast.clear()
})
}, 
onClickLeft(){
 this.$router.back()
},
_getmarkdetail(type){
    let obj = {}
    let arr = []
    obj.code = this.code
    obj.type = type
    getmarketdetail(obj).then(res=>{
        let finalstr =  res.data.match(/\[(.+?)\]/g)
        let newArr = []
        finalstr.forEach(v => {
        let item = v.replace('[', '').replace(']', '')
        let inItem = item.split(',')
        let obj2 = {
            time: formatT(inItem[0]/1000),
            value: inItem[1],
            btcRate:inItem[2],
            volumn: inItem[3],
            number: inItem[4]
        }
        newArr.push(obj2)
        })
        console.log(newArr)
        this.chartData.rows = newArr
    })
}

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
console.log(this.code)
 this._getmarkdetail('all')
 this._getCoinChange()
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
 .markertab ul{
     display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid #eee
 }
 .markertab li {
    display: flex;
    flex-basis: 33.3%;
    align-items: center;
    justify-content: center;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #eee;
 
    flex-direction: column;
 }
  .markertab li .active{
      color:blue
  }
  .green{
    color: rgb(31, 236, 31)
  }
  .red{
      color: red
  }
</style>

