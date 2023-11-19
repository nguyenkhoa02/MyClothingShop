import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
// import { createPersistedState } from 'pinia-plugin-persist'
import {bool} from "yup";

// export const useAuthStore = defineStore('auth',{
//     state:() => ({
//         token: null,
//         user: null,
//         isUserLoggedIn: false
//     }),
//     actions: {
//         setToken(token) {
//             this.token = token
//             this.isUserLoggedIn = !!token
//         },
//
//         setuser(user) {
//             this.user  = user
//         }
//     },
//     plugins: [createPersistedState]
// })

export const useAuthStore = defineStore('auth', () =>{
    const token = ref(null);
    const user = ref(null)
    // const isUserLoggedIn = ref(false);

    function login(token, user) {
        this.token = token;
        this.user = user;
    }

    function logout(user) {
        this.token = null
        this.user = null
    }

    return {token, user, login, logout}


})