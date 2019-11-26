import Vue from 'vue'
import {Axios} from '~/config/api/http.js'

Vue.prototype.$API = Axios
Vue.use(Axios)