/**
 * 前端
 * 2017-11-10
 */
import axios from 'axios' 
import {stringify} from 'qs'
import {encode} from './password'
import { promises } from 'fs';
import { reject } from 'q';
import {Toast} from 'vant'
 
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

function gethref () {
  if (process.env.NODE_ENV === 'development') {
    return 'http://192.168.1.227:8080'
  }
  if (process.env.NODE_ENV === 'production') {
    return 'https://wallet.ascchain.com'
  }
};

axios.interceptors.response.use(
  response => {
 
    const res = response.data
    if (res.msg) {

      if (res.msg.indexOf('重新登录') > -1 ) {
       Toast.fail('重新登录')
       localStorage.clear()
       location.href = gethref()
      }
    }
   return response
  },
  error => {
    console.log('erorr:' + error)
    
    return Promise.reject(error)
  }
)


export function getData(url, data) { // 走token的接口 
  if (data.uid || data.user_id) {
    return encode().then((res) => {
      data.token = res
      return axios.post(url, stringify(data)).then((res) => {
        return Promise.resolve(res.data)
      })
    })
  } else { // 不走token的接口
    data.uid ='d4f0670b8926ffa8761a23534cc11876'
    // data.uid = localStorage['_shop_userId']
    data.token = localStorage['_shop_token']
    return encode().then((res) => {
      data.token = res
      return axios.post(url, stringify(data)).then((res) => {
        return Promise.resolve(res.data)
      })
    })
  }
}

export function gettData(url, data) { // 走token的接口 
    return axios.post(url, stringify(data)).then((res) => {
      return Promise.resolve(res.data)
    })

}

export function getUrl() {
  return 'https://api.ascchain.com/asc/'
}
export function getv3Url() {
  return 'http://devapi.ezoonet.com/v3index/'
}

function get(urls, obj) {
  const url = getUrl() + urls
  const data = obj
  return getData(url, data)
}

function gett(urls, obj) {
  const url = getUrl() + urls
  const data = obj
  return gettData(url, data)
}
function getv3(urls, obj) {
  const url = getv3Url() + urls
  const data = obj
  return getData(url, data)
}
// 登录
export function login(obj) {
  return gett('user/login', obj)
}
// 我的信息
export function getinfobyuid(obj) {
  return get('user/getinfobyuid', obj)
}
// 检查y用户信息
export function checkuserstatus(obj) {
  return get('user/checkuserstatus', obj)
}
// 获取验证码
export function forget(obj) {
  return getv3('sms/forget', obj)
}
// 修改登录密码
export function forgetpassword(obj) {
  return get('user/forgetpassword', obj)
}
// 修改交易密码
export function forgetpaypassword(obj) {
  return get('user/forgetpaypassword', obj)
}
// 实名认证
export function bindId(obj) {
  return get('user/checkId', obj)
}
// 更换绑定手机
export function updatemobile(obj) {
  return get('user/updatemobile', obj)
}
// 获取资产大类
export function getgoldlist(obj) {
  return get('user/getGoldlist', obj)
}
// 获取资产
export function getmygold(obj) {
  return get('user/getMyGold', obj)
}
// 获取行情
export function getmarket(obj) {
  return get('user/getmarket', obj)
}
// 转账
export function asc2asc(obj) {
  return get('user/asc2asc', obj)
}
// 交易记录
export function getlog(obj) {
  return get('user/getlog', obj)
}
// 兑换ETH
export function asc2eth(obj) {
  return get('user/asc2eth', obj)
}
// 获取可用ASC明细
export function getusablelog(obj) {
  return get('user/getusablelog', obj)
}
// 获取兑换ASC
export function ascwithdraw(obj) {
  return get('user/ascwithdraw', obj)
}
// 检查手机号
export function checkmobile(obj) {
  return get('user/checkmobile', obj)
}
// ETH兑换ETH
export function eth2eth(obj) {
  return get('user/eth2eth', obj)
}
//---new--
export function getaccountinfo(obj) {
  return get('asc/getaccountinfo', obj)
}


export function transfer(obj) {
  return get('asc/transfer', obj)
}
function getnodeUrl () {
  return 'https://mainnet.meet.one'
}

export function createkey(obj) {
  return get('asc/createkey', obj)
}
export function getcurrency(obj) {
  return get('asc/getcurrency', obj)
}

export function getbalance(obj) {
  return get('currency/getbalance', obj)
}
export function createAccount(obj) {
  return get('asc/createAccount', obj)
}
export function getSaveList(obj) {
  return get('asc/getSaveList', obj)
}
export function register(obj) {
  return gett('user/register', obj)
}
export function getmykey(obj) {
  return get('user/getmykey', obj)
}
//getNoteDetail
export function getNoteDetail(obj) {
  return get('asc/getNoteDetail', obj)
}
export function getRegisterPost(obj) {
  return get('asc/getRegisterPost', obj)
}
export function AscManager(obj) {
  return get('asc/AscManager', obj)
}
export function fhbsh(obj) {
  return get('asc/fhbsh', obj)
}
export function getfhbsh(obj) {
  return get('asc/getfhbsh', obj)
}
export function importWallet(obj) {
  return get('user/importWallet', obj)
}
export function getgolddetail(obj) {
  return get('asc/getgolddetail', obj)
}
export function getbrowserlist(obj) {
  return get('asc/getbrowserlist', obj)
}
export function getbanner(obj) {
  return get('asc/getbanner', obj)
}
export function changeHeadImg(obj) {
  return get('user/changeHeadImg', obj)
}
export function admin(obj) {
  //op 0查询 1修改 2增加 3 删除
  //type 0帮助 1协议 2 关于我们 3系统管理 5浏览轮播配置 6浏览菜单配置 7充值日志 8创建账户日志 9资金日志 10baselog
  return get('admin/admin', obj)
}
export function getInfo(obj){
  // type 1 协议 2 关于我们  3基石列表
  return get('asc/getInfo', obj)
}
export function sendsms(obj) {
  return gett('user/sendsms', obj)
}
// 国际验证码
export function sendisms(obj) {
  return gett('user/sendisms', obj)
}
export function getEthHistory(obj) {
  return get('asc/getEthHistory', obj)
}
export function managewallet(obj) {
  //op 1 编辑 2 删除
  return get('user/managewallet', obj)
}
export function getHistory(obj) {

  return get('asc/getHistory', obj)
}
export function getascfroze(obj) {
  return get('user/getascfroze', obj)
}
export function manageaddress(obj) {
  return get('user/manageaddress', obj)
}
//manageMsg
export function manageMsg(obj) {
  return get('user/manageMsg', obj)
}
//邀请码
export function getInviteInfo(obj) {
  return get('user/getInviteInfo', obj)
}

export function getmarketdetail(obj) {
  return get('asc/getmarketdetail', obj)
}
export function getCoinChange(obj) {
  return get('asc/getCoinChange', obj)
}
//eth eos wtc ustd
export function getethusdt(obj) {
  return get('currency/getethusdt', obj)
}
export function getusdtprice(obj) {
  return get('currency/getusdtprice', obj)
}
export function getascprice(obj) {
  return get('currency/getascprice', obj)
}
export function geteosusdt(obj) {
  return get('currency/geteosusdt', obj)
}
export function getbtcusdt(obj) {
  return get('currency/getbtcusdt', obj)
}
export function getwtcusdt(obj) {
  return get('currency/getwtcusdt', obj)
}
export function getInvestmentAccount(obj) {
  //symbol 'WTC','ETH','EOS','BTC','USDT'
  //uid
  return get('user/getInvestmentAccount', obj)
}

export function getNewCurrency(obj) {
  
  return get('currency/getCurrency', obj)
}
//支付方案2
export function transferEthtoken(obj) {
  return get('asc/transferEthtoken', obj)
}

//存储支付节点
export function token2EosAccount(obj) {
  return get('user/token2EosAccount', obj)
}
//兑换列表
export function Baselog (obj) {
  return get('user/getBaselog', obj)
}
//手续费
export function getgas (obj) {
  return get('asc/getgas', obj)
}
//忘记密码
export function getforget (obj) {
  return gett('user/forget', obj)
}
//检查创建eos账户是否存在
export function checkmobilealive (obj) {
  return get('user/checkmobilealive', obj)
}
//检查是否系统维护中
export function serverStatus (obj) {
  return gett('asc/serverStatus', obj)
}
// 付款成功后确认合约地址 
export function sendgas (obj) {
  return gett('asc/sendgas', obj)
}
// 矿机商城
export const minelist = data => {
  return getv3('Ascmine/goodsList', data)
}
// 矿机详情
export const mineDetail = data => {
  return getv3('Ascmine/goodsDetail', data)
}
// 我的矿机
export const getMylease = data => {
  return getv3('Ascmine/myLease', data)
}
// 收益记录
export const profit = data => {
  return getv3('Ascmine/profitLogList', data)
}
// 矿场首页
export const mineIndex = data => {
  return getv3('Ascmine/index',data)
}
// 立即租赁
export const lease = data => {
  return getv3('Ascmine/lease', data)
}
// 矿池资产
export const getMineCoin = data => {
  return getv3('Ascmine/getMineCoin', data)
}
// transferToAsc
export const transferToAsc = data => {
  return getv3('Ascmine/transferToAsc', data)
} 
// mineLogList
export const mineLogList = data => {
  return getv3('Ascmine/mineLogList', data)
}
// export function upload(data) {
//   return new Promise((resolve, reject) => {
//     axios.post('https://api.ezoonet.com/v3index/upload/upload', stringify(data)).then((res) => {
//       return Promise.resolve(res)
//     })
//   })
// }

// export function sendsms(obj) {
//   let d = new Date()
//   obj.tokens = Base64.encode(d.getHours()+''+ (d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes()))
//   return post('https://api.ezoonet.com/v3index/sms/goSendsms', obj)
// }

// export function sendsms(data){
//   let d = new Date()
//   data.tokens = Base64.encode(d.getHours()+''+ (d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes()))
//   return new Promise((resolve, reject) => {
//     axios.post('https://api.ezoonet.com/v3index/sms/goSendsms', stringify(data)).then((res) => {
     
//       return Promise.resolve(res)
//     })
//   })
// }
