/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '/home',
    name: 'Home',
    view: 'Home'
  },
  {
    path: '/zone',
    name: 'ManageZone',
    view: 'ManageZone'
  },
  {
    path: '/report',
    name: 'Report',
    view: 'Report'
  },
  {
    path: '/reportrm',
    name: 'ReportRM',
    view: 'ReportRM'
  },
  {
    path: '/reporttechnicianbelong',
    name: 'ReportTechnicianBelong',
    view: 'ReportTechnicianBelong'
  },
  {
    path: '/reporttechnicianbelongperson',
    name: 'ReportTechnicianBelongPerson',
    view: 'ReportTechnicianBelongPerson'
  },
  {
    path: '/homeExample',
    name: 'HomeExample',
    view: 'HomeExample'
  },
]
