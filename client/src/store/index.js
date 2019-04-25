/**
 * Vuex
 *
 * @library
 *
 * https://vuex.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import Vuex from 'vuex'

// Store functionality
import modules from './modules'

import feathersVuex from 'feathers-vuex'
import feathersClient from '../plugins/feathers-client'

const { service, auth, FeathersVuex } = feathersVuex(feathersClient, { idField: 'id' })

Vue.use(Vuex)
Vue.use(FeathersVuex)

// Create a new store
const store = new Vuex.Store({
    modules,
    plugins:[
        service('request',{modelName:'Job' , idField:'RequestID'}),
        service('company',{modelName:'Company', idField:'CompanyID'}),
        service('zone',{modelName:'Zone', idField:'ZoneID'}),
        service('technician-belong',{modelName:'TechnicianBelong', idField:'TechnicianBelongID'}),

        service('report',{modelName:'Report'}),
    ]
})

export default store
