// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { readerRoutes } from './reader.route';
import { adminRoutes } from './admin.route';
import NotFound from '@/views/notFound/NotFound.vue';

const routes = [
  ...readerRoutes,
  ...adminRoutes,
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware kiểm tra đăng nhập
router.beforeEach((to, from, next) => {
  const readerToken = localStorage.getItem('readerToken');
  const adminToken = localStorage.getItem('adminToken');

  // Nếu route yêu cầu đăng nhập
  if (to.meta.requiresAuth) {
    if (to.path.startsWith('/reader') && !readerToken)
      return next({ name: 'ReaderLogin' });
    if (to.path.startsWith('/admin') && !adminToken)
      return next({ name: 'AdminLogin' });
  }

  // Nếu route chỉ cho khách truy cập (chưa đăng nhập)
  if (to.meta.guest) {
    if (to.path.startsWith('/reader') && readerToken)
      return next({ name: 'ReaderHome' });
    if (to.path.startsWith('/admin') && adminToken)
      return next({ name: 'AdminDashboard' });
  }

  next();
});

export default router;
