import Vue from "vue";
import Router from "vue-router";
import Login from "./views/login/Login.vue";
import Register from "./views/login/Register.vue";
import BindPhone from "./views/setting/BindPhone.vue";
import ReplacePhone from "./views/setting/ReplacePhone.vue";
import RealName from "./views/setting/RealName.vue";
import ModifyPassword from "./views/setting/ModifyPassword.vue";
import ModifyPayPassword from "./views/setting/ModifyPayPassword.vue";
import TransferASC from "./views/deal/TransferASC.vue";
import ExchangeETH from "./views/deal/ExchangeETH.vue";
import ExchangeASC from "./views/deal/ExchangeASC.vue";
import WalletManage from "./views/wallet/WalletManage.vue";
import AccountManage from "./views/setting/AccountManage.vue";
import AssetsManage from "./views/wallet/AssetsManage.vue";
import My from "./views/my/My.vue";
import Wallet from "./views/wallet/Wallet.vue";
import TransactionRecord from "./views/other/TransactionRecord.vue";
import Market from "./views/wallet/Market.vue";
import Lock from "./views/other/Lock.vue";
import Receivables from "./views/other/Receivables.vue";
import FrozenASC from "./views/deal/FrozenASC.vue";
import UsableASC from "./views/other/UsableASC.vue";
import AddContacts from "./views/setting/AddContacts.vue";
import EosResource from "./views/eoscreate/Eosresource.vue";
import EosRight from "./views/eoscreate/EosRight.vue";
import CreateAccount from "./views/eoscreate/CreateAccount.vue";
import Browser from "./views/browse/Browser.vue";
import News from "./views/my/News.vue";
import Save from "./views/deal/Save.vue";
import Note from "./views/deal/Note.vue";
import Detail from "./views/deal/Detail.vue";
import Exchange from "./views/deal/Exchange.vue"
import AddAssets from "./views/wallet/AddAssets.vue"
import Import from "./views/my/import.vue"
import Transin from "./views/deal/Transin.vue"
import System from "./views/system/SystemManage.vue"
import EXlist from "./views/deal/ExchangeList.vue"
import Iframe from "./views/my/Iframe.vue"
import Help from "./views/my/Help.vue"
import UserAgreement from "./views/other/UserAgreement.vue"
import NoteList from "./views/deal/NoteList.vue"
import Address from "./views/my/Address.vue"
import Notice from "./views/my/NewList.vue"
import AddressDetail from "./views/my/AddressDetail.vue"
import Agreement from "./views/my/AgreementEdit.vue"
import AboutEdit from "./views/my/AboutEdit.vue"
import ShareScale from "./views/other/ShareScale.vue"
import MarketManage from "./views/wallet/MarketManage.vue"
import Limits from "./views/deal/Limits.vue"
import MarketDetail from "./views/wallet/MarketDetail.vue"
import Invite from "./views/my/Invite.vue"
import Bill from "./views/my/Bill.vue"
import BaseCheck from "./views/base/BaseCheck.vue"
import Coinage from "./views/base/Coinage.vue"
import WatchSet from "./views/system/WatchSet.vue"
import MyCreateEos from "./views/create/MyCreateEos.vue"
import DownLoad from "./views/down/DownLoad.vue"
import Rule from "./views/my/Rule.vue"
import Rechargelog from './views/system/Rechargelog.vue'
import ForgetPassword from './views/setting/ForgetPassword.vue'
import BasisList from './views/deal/BasisList.vue'
import About from './views/my/About.vue'
// import maintenance from './views/maintenance.vue'
import Guide from './views/my/Guide.vue'
import GuideList from './views/my/GuideList.vue'

Vue.use(Router);

export default new Router({
  mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path:"/CreateAccount",
      name:"CreateAccount",
      component:CreateAccount
    },
    {
      path:"/News/:id",
      name:"News",
      component:News
    },
    {
      path:"/Browser",
      name:"Browser",
      component:Browser
    },
    {
      path:"/EosRight/:id",
      name:"EosRight",
      component:EosRight
    },
    {
      path:"/eosResource/:type",
      name:"eosResource",
      component:EosResource
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/bindphone",
      name: "bindphone",
      component: BindPhone
    },
    {
      path: "/replacephone",
      name: "replacephone",
      component: ReplacePhone
    },
    {
      path: "/realname",
      name: "realname",
      component: RealName
    },
    {
      path: "/modifypassword",
      name: "modifypassword",
      component: ModifyPassword
    },
    {
      path: "/modifypaypassword",
      name: "modifypaypassword",
      component: ModifyPayPassword
    },
    {
      path: "/transferASC/:id",
      name: "transferASC",
      component: TransferASC
    },
    {
      path: "/exchangeETH",
      name: "exchangeETH",
      component: ExchangeETH
    },
    {
      path: "/exchangeASC",
      name: "exchangeASC",
      component: ExchangeASC
    },
    {
      path: "/walletmanage/:type",
      name: "walletmanage",
      component: WalletManage
    },
    {
      path: "/accountManage",
      name: "accountManage",
      component: AccountManage
    },
    {
      path: "/assetsManage/:id",
      name: "assetsManage",
      component: AssetsManage
    },
    {
      path: "/my",
      name: "my",
      component: My
    },
    {
      path: "/wallet",
      name: "wallet",
      component: Wallet
    },
    {
      path: "/transactionrecord/:id",
      name: "transactionrecord",
      component: TransactionRecord
    },
    {
      path: "/market",
      name: "market",
      component: Market
    },
    {
      path: "/lock",
      name: "lock",
      component: Lock
    },
    {
      path: "/receivables/:id",
      name: "receivables",
      component: Receivables
    },
    {
      path: "/frozenASC",
      name: "frozenASC",
      component: FrozenASC
    },
    {
      path: "/usableASC",
      name: "usableASC",
      component: UsableASC
    },
    {
      path: "/addcontacts",
      name: "addcontacts",
      component: AddContacts
    },
    {
      path: "/save/:id",
      name: "save",
      component: Save
    },
    {
      path: "/note/:id",
      name: "note",
      component: Note
    },
    {
      path: "/detail",
      name: "detail",
      component: Detail
    },
    {
      path: "/change",
      name: "change",
      component: Exchange
    },
    {
      path: "/addassets",
      name: "addassets",
      component: AddAssets
    },
    {
      path: "/import",
      name: "import",
      component: Import
    },
    {
      path: "/transin",
      name: "transin",
      component: Transin
    },
    {
      path: "/system",
      name: "system",
      component: System
    },
    {
      path: "/exlist",
      name: "exlist",
      component: EXlist
    },
    {
      path: "/iframe",
      name: "iframe",
      component: Iframe
    },
    {
      path: "/help",
      name: "help",
      component: Help
    },
    {
      path: "/argeement",
      name: "argeement",
      component: UserAgreement
    },
    {
      path: "/notelist",
      name: "notelist",
      component: NoteList
    },
    {
      path: "/address",
      name: "address",
      component: Address
    },
    {
      path: "/notice",
      name: "notice",
      component: Notice
    },
    {
      path: "/Adetail",
      name: "Adetail",
      component: AddressDetail
    },
    {
      path: "/agreement",
      name: "agreement",
      component: Agreement
    },
    {
      path: "/aboutedit",
      name: "aboutedit",
      component: AboutEdit
    },
    {
      path: "/scale",
      name: "scale",
      component: ShareScale
    },
    {
      path: "/marketManage",
      name: "marketManage",
      component: MarketManage
    },
    {
      path: "/limits/:id",
      name: "limits",
      component: Limits
    },
    {
      path: "/marketDetail",
      name: "marketDetail",
      component: MarketDetail
    },
    {
      path: "/invite",
      name: "invite",
      component: Invite
    },
    {
      path: "/bill",
      name: "bill",
      component: Bill
    },
    {
      path: "/basecheck",
      name: "basecheck",
      component: BaseCheck
    },
    {
      path: "/coinage",
      name: "coinage",
      component: Coinage
    },
    {
      path: "/watchset",
      name: "watchset",
      component: WatchSet
    },
    {
      path: "/mycreateeos",
      name: "mycreateeos",
      component:MyCreateEos 
    },
    {
      path: "/download",
      name: "download",
      component:DownLoad 
    },
    {
      path: "/rule",
      name: "rule",
      component:Rule 
    },
    {
      path: "/rechargelog",
      name: "rechargelog",
      component:Rechargelog 
    },
    {
      path: "/forgetpassword",
      name: "forgetpassword",
      component:ForgetPassword 
    },
    {
      path: "/basislist",
      name: "basislist",
      component:BasisList 
    },
    {
      path: "/about",
      name: "about",
      component:About 
    },
    {
      path: "/guide",
      name: "guide",
      component:Guide 
    },
    {
      path: "/guidelist",
      name: "guidelist",
      component:GuideList 
    },

  ]
});
