// src/router/admin.route.js
import Dashboard from '../views/admin/Dashboard.vue';
import BookManagement from '../views/admin/BookManagement.vue';
import BorrowManagement from '../views/admin/BorrowManagement.vue';
import PublisherManagement from '../views/admin/PublisherManagement.vue';
import ReaderManagement from '../views/admin/ReaderManagement.vue';
import Login from '../views/admin/Login.vue';
import Register from '../views/admin/Register.vue';

export const adminRoutes = [
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: Login,
    meta: { guest: true },
  },
  {
    path: '/admin/register',
    name: 'AdminRegister',
    component: Register,
    meta: { guest: true },
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/books',
    name: 'AdminBookManagement',
    component: BookManagement,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/borrows',
    name: 'AdminBorrowManagement',
    component: BorrowManagement,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/publishers',
    name: 'AdminPublisherManagement',
    component: PublisherManagement,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/readers',
    name: 'AdminReaderManagement',
    component: ReaderManagement,
    meta: { requiresAuth: true },
  },
];
