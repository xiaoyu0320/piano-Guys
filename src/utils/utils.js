//数组去重 
export const ascUniqueArr = arr => {
    if (arr.length == 0) { return arr }
    const newArr = [];//用一个新数组用来存放
    newArr.push(arr[0])
    for (var i = 0; i < arr.length; i++) {
         //深度遍历
         for (var k = 0;k < newArr.length; k++) {
              if(newArr[k].action_trace.trx_id !== arr[i].action_trace.trx_id){
                newArr.push(arr[i])
                break
              }
              
              
         }
         
    }
    console.log(newArr)
    return newArr
}
//判断ios和安卓
export const judgeTerminal =  () => {
     const useragent = navigator.userAgent
     if (useragent.indexOf('Android') > -1 || useragent.indexOf('Linux') > -1) {
          return 'Android'
     }
     if (useragent.indexOf('iPhone'>-1)) {
          return 'Ios'
     }
}
//判断是否是微信端 
export const isWeiXin = ()  => {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true; // 是微信端
  } else {
      return false;
  }
}

//扫码
/**
     * 返回需要返回的扫码内容
     * @return Obj {name:'',content:''} content为接收内容
     */

     //ethereum:0x6Dd23EbDeC30040731E71a5981931d17DA817E8b?decimal=18&value=100000000000000000000'
  
    export const  returnValue = (str) =>  { 
       if(!str)return;
       let obj = {}
       if(str.indexOf('?')!=-1){
         let prefix = str.split('?')
         let regDecimal ="(^|&)decimal=([^&]*)(&|$)"
         let regValue = "(^|&)value=([^&]*)(&|$)"
         let prefixKey =  prefix[0].split(':') //取得分号前后的内容
         if(prefixKey[1].slice(0,2).indexOf('0x')==-1){
           prefixKey[1] = '0x'+prefixKey[1]
         }
         obj.name = prefixKey[0]
         obj.content = prefixKey[1]
         obj.decimal = prefix[1].match(regDecimal)[2]
         obj.value = prefix[1].match(regValue)[2]
         
       }else{
         if(str.slice(0,2).indexOf('0x')==-1){
              if (str.length >12)  {obj.content = '0x'+str}
              else {
               obj.content = str 
              }
          
         }else{
           obj.content = str
         }
       }
       return obj
     }

     export const decodeStr = (str) =>{
          // let str = 'ethereum:0x27A8a05dC7b24e5B44c4341b899593751E2461f3?contractAddress=0xb9feb10ec48f1377e3232504c8d55d8b829e7925&decimal=18&value=100000000000000000000'
          // // let str = '0x27A8a05dC7b24e5B44c4341b899593751E2461f3'
          // // let str= 'eos:ascchainston?contractAddress=EOS%40eosio.token&decimal=0&value=123'
          str  = decodeURI(str)
          let res ={}
          if(str.indexOf('?')!=-1){
              let strArr = str.split('?')
              let coinType = strArr[0].split(':')[0]
              let addr = strArr[0].split(':')[1]
              if (addr.slice(0,2).indexOf('0x')==-1 && coinType=='ethereum') {
                addr = '0x' + addr
              }
              let paramArr = urlInfo(strArr[1])
              paramArr['addr'] = addr
              paramArr['coinType'] = coinType
              paramArr['money'] =  paramArr['value'] /  Math.pow(10,paramArr['decimal']  )
              res = paramArr
             
          } else {
             if (str.length==40 && str.slice(0,2).indexOf('0x')==-1){
                 str = '0x' + str
                 res.addr = str
             } else {
                 res.addr = str
             }
      
          }
        
         return res
     }
     function urlInfo (str) {
          if (str === undefined) {
            return
          }
          str = str.substr(1)
          let arr = str.split('&')
          let obj = {}
          let newArr = []
          arr.map((value, index, arr) => {
            newArr = value.split('=')
            if (newArr[0] !== undefined) {
              obj[newArr[0]] = newArr[1]
            }
          })
          return obj
        }