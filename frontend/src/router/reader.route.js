// src/router/reader.route.js
import Home from '@/views/reader/Home.vue';
import BookDetail from '@/views/reader/BookDetail.vue';
import BorrowHistory from '@/views/reader/BorrowHistory.vue';
import Profile from '@/views/reader/Profile.vue';
import Login from '@/views/reader/Login.vue';
import Register from '@/views/reader/Register.vue';

export const readerRoutes = [
  {
    path: '/reader',
    name: 'ReaderHome',
    component: Home,
  },
  {
    path: '/reader/book/:id',
    name: 'ReaderBookDetail',
    component: BookDetail,
    props: true,
  },
  {
    path: '/reader/history',
    name: 'ReaderBorrowHistory',
    component: BorrowHistory,
    meta: { requiresAuth: true },
  },
  {
    path: '/reader/profile',
    name: 'ReaderProfile',
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: '/reader/login',
    name: 'ReaderLogin',
    component: Login,
    meta: { guest: true },
  },
  {
    path: '/reader/register',
    name: 'ReaderRegister',
    component: Register,
    meta: { guest: true },
  },
];
