import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import {Promise} from 'core-js';
import NewView from '../views/NewView.vue'
import TodoView from "../views/TodoView.vue"
import HomeView from '../views/HomeView.vue'
import QRView from "../views/QRView.vue"
import RegisterView from "../views/Register.vue"
import SigninView from "../views/Signin.vue"
import { reject, resolve } from 'core-js/fn/promise'

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/new",
    name: "new",
    component: NewView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/todo/:id",
    name: "oneTodo",
    component: TodoView
  },
  {
    path: "/qr",
    name: "QRreader",
    component: QRView
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: "/signin",
    name: "signin",
    component: SigninView,
    meta: {
      requiresAuth: false,
    }
  },
]

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    )
  })
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async(to, from, next) => {
  if(to.matched.some((record) => record.meta.requiresAuth)){
    if(await getCurrentUser()){
      next();
    }else{
      console.log("you dont have token");
      next("/");
    }
  }else{
    next();
  }
});

export default router
