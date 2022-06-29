import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login.vue";
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from "../firebaseConfig";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        auth: true,
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
});

const currentUser = () => {
  return new Promise((resolve, reject) => {
    const listener = onAuthStateChanged(auth, (user) => {
      listener()
      resolve(user)
    },
    reject
    )
  })
};

router.beforeEach( async (to,from,next) => {
  if(to.matched.some((record) => record.meta.auth)) {
    if( await currentUser()) {
      next()
    } 
    else {
      next("/login")
    }
  } else {
    next()
  }
})

export default router
