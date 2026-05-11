import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // 瀏覽器上一頁/下一頁
    if (savedPosition) {
      return savedPosition
    }
    // 每次換頁置頂
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      component: () => import('../views/front/FrontLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/front/HomeView.vue'),
        },
        {
          path: 'products',
          name: 'products',
          component: () => import('../views/front/ProductsView.vue'),
        },
        {
          path: 'product/:id',
          name: 'product',
          component: () => import('../views/front/ProductSingle.vue'),
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('../views/front/CartView.vue'),
        },
        {
          path: 'order',
          name: 'order',
          component: () => import('../views/front/OrderView.vue'),
        },
        {
          path: 'orderComplete/:id',
          name: 'orderComplete',
          component: () => import('../views/front/OrderCompleteView.vue'),
        },
        {
          path: 'articles',
          name: 'articls',
          component: () => import('../views/front/ArticleList.vue'),
        },
        {
          path: 'article/:id',
          name: 'article',
          component: () => import('../views/front/ArticleView.vue'),
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/dashboard/DashboardView.vue'),
      children: [
        {
          path: '',
          name: 'dashboard-products',
          component: () => import('../views/dashboard/DashboardProducts.vue'),
        },
        {
          path: 'coupon',
          name: 'dashboard-coupons',
          component: () => import('../views/dashboard/DashboardCoupon.vue'),
        },
        {
          path: 'orders',
          component: () => import('../views/dashboard/DashboardOrders.vue'),
        },
        {
          path: 'articles',
          component: () => import('../views/dashboard/DashboardArticle.vue'),
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
    }
  ],
})

export default router
