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
    name: 'zone',
    view: 'ManageZone'
  },
  {
    path: '/report',
    name: 'report',
    view: 'Report'
  },  
]
