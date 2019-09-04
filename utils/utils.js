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

/**
 *  判断是不是一个空对象
 *  @param {Object} e 对象 数组和object都可以
 *  @return {Boolean} true表示是一个空数组 
 */
const isEmptyObject = e => {
     //如果不是对象类型
     for (let t in e) {
          return false
     }
     return true
} 
/**
 *  深度遍历指定对象key
 * @param {Object} item 对象内容
 * @param {String} _key 键值
 */
const deepKeys = function (item,_key){
     //todo 单纯为了遍历是否本来就有这个值 防止遍历太深
     for (const iterator in item) {
          if(iterator === _key){
               return item[_key]
          }
     }
     for (const iterator in item) {
          if(typeof item[iterator] !== 'object' ||  item[iterator] === null){
            //如果不是对象的话就直接遍历属性 还要对null的情况做额外处理
            
              // console.log(iterator,_key,_key === iterator)
               if(iterator === _key){
                  return item[_key]
                    
               }
          }else{
             
               //如果不是空数组的话 就递归
               if(!isEmptyObject(item[iterator])){
                  
                    return deepKeys(item[iterator],_key)
               }
          }
     }
     
     
}
//数组去重 
export const UniqueArr = (arr,_key) => {
     //如果是一个空数组的话 直接把空数组return回去
     if (arr.length == 0) { return arr }
     const newArr = [];//用一个新数组用来存放
     newArr.push(arr[0])
     for (var i = 0; i < arr.length; i++) {
         let repeat = false
          //深度遍历
          for (var k = 0;k < newArr.length; k++) {
               //如果两个相同的话 则表示是有重复 有重复开关就打开 不进行赋值
               if(deepKeys(newArr[k],_key) === deepKeys(arr[i],_key)){

                    repeat = true
                    console.log(k)
                 break
               }
          }
          if(!repeat){
               newArr.push(arr[i])
          }
     
          
     }
     console.log(newArr.length)
     return newArr
 }
