import minIndex from '@/views/mine/index'
/**
 * home是首页
 * index是入口页
 * explain是玩法说明
 * mymine是我的矿机
 * mineshop是矿机商城
 * shopdetail是商品详情
 * pool矿池资产
 * profitrecord 收益记录
 * poolrecord 矿池记录
 */
const mine = {
  path: '/mine',
  redirect: '/mine/home',
  component: minIndex,
  children: [
    {
      path: 'home',
      component: () => import('@v/mine/Home')
    },
    {
      path: 'explain',
      component: () => import('@v/mine/explain')
    },
    {
      path: 'mymine',
      component: () => import('@v/mine/mymine')
    },
    {
      path: 'mineshop',
      component: () => import('@v/mine/mineshop')
    },
    {
      path: 'shopdetail',
      component: () => import('@v/mine/shopdetail')
    },
    {
      path: 'pool',
      component: () => import('@v/mine/pool')
    },
    {
      path: 'profit',
      component: () => import('@v/mine/profitrecord')
    },
    {
      path: 'poolrecord',
      component: () => import('@v/mine/poolrecord')
    }
  ]
}
export default mine
