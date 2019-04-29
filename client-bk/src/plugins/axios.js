import Vue from 'vue'

// Lib imports
import axios from 'axios'

window.axios = axios.create({
    baseURL: 'http://localhost:3030'
});

Vue.prototype.$http = axios
