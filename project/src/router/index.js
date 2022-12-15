import Vue from 'vue'
import VueRouter from 'vue-router'
import FriendsPosts from '../views/FriendsPosts.vue'
import Comments from '../views/Comments.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import UploadUserPhoto from '../views/UploadUserPhoto.vue'
import Followers from '../views/Followers.vue'
import AddPhoto from '../views/AddPhoto.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'posts',
    component: FriendsPosts
  },
  {
    path: '/comments/:id',
    name: 'comments',
    component: Comments,
    props: (route) => ({
      id: +route.params.id
    })
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/profile/:userId',
    name: 'profile',
    component: Profile,
    props: (route) => ({
      userId: +route.params.userId
    })
  },
  {
    path: '/followers',
    name: 'followers',
    component: Followers,
  },
  {
    path: '/uploadUserImg/:userId',
    name: 'uploadUserImg',
    component: UploadUserPhoto,
    props: (route) => ({
      userId: +route.params.userId
    })
  },
  {
    path: '/AddPhoto/:userId',
    name: 'AddPhoto',
    component: AddPhoto,
    props: (route) => ({
      userId: +route.params.userId
    })
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router