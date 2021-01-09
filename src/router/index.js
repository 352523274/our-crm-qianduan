import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
   path: '/',
    redirect: '/main'

},
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import( '../views/main/index.vue'),
    children:[
      {
        path: '/index',
        name: 'index',
        component: () => import( '../views/index/index.vue'),
      } ,
      {
        path: '/supplier',
        name: 'supplier',
        component: () => import( '../views/supplier/index.vue'),
      },
      {
        path: '/main/supplier/supplieraddgoods',
        name: 'supplieraddgoods',
        component: () => import( '../views/supplier/SupplierAddGoods/index.vue'),
      },
      {
        path: '/brand',
        name: 'brand',
        component: () => import( '../views/brand/index.vue'),
      }
      ,{
        path: '/category',
        name: 'category',
        component: () => import( '../views/category/index.vue'),
      },
      {
        path: '/putStorage',
        name: 'putStorage',
        component: () => import( '../views/putStorage/index.vue'),
      }
      ,{
        path: '/appliaction',
        name: 'appliaction',
        component: () => import( '../views/appliaction/index.vue'),
      },
      {
        path: 'appliactionDetail',
        name: 'appliactionDetail',
        component: () => import( '../views/appliactionDetail/index.vue'),
      },{
        path: 'goods',
        name: 'goods',
        component: () => import( '../views/goods/goods/index.vue'),
      },{
        path: 'firstGoods',
        name: 'firstGoods',
        component: () => import( '../views/goods/firstGoods/index.vue'),
      },{
        path: 'sellOrder',
        name: 'sellOrder',
        component: () => import( '../views/sellOrder/index.vue'),
      },
      {
        path: 'SellOrderDetail',
        name: 'SellOrderDetail',
        component: () => import( '../views/SellOrderDetail/index.vue'),
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
