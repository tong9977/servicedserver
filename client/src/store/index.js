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
        service('techcnician',{modelName:'Techcnician', idField:'TechnicianID'}),

        service('reportbycustomer',{modelName:'Reportbycustomer'}), //1
        service('reportbycustomer2',{modelName:'Reportbycustomer2'}), //2
        service('report',{modelName:'Report'}), //3
        service('reportbycanal',{modelName:'Reportbycanal'}), //4
        service('reportbyrmgroup',{modelName:'Reportbyrmgroup'}),//5
        service('reportbytechnicianbelong',{modelName:'ReportByTechnicianBelong'}),//6
        service('reportbytablet',{modelName:'ReportByTablet'}), //7
        service('reportbytablet2',{modelName:'ReportByTablet2'}), //8
        service('reportbystatus',{modelName:'ReportByStatus'}), //9
        service('reportbystatus2',{modelName:'ReportByStatus2'}), //10

        service('reportforrm1',{modelName:'ReportForRM1'}), //1
        service('reportforrm2',{modelName:'ReportForRM2'}), //2

        service('reporttechnicianbelong1',{modelName:'ReportTechnicianBelong1'}), //1

        service('reporttechnicianbelongperson1',{modelName:'ReportTechnicianBelongPerson'}), //1
    ]
})

export default store
