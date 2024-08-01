const layout = () => import(/* webpackChunkName: "views/layout" */'@/views/layout.vue')
const layoutM = () => import(/* webpackChunkName: "views/layout-m" */'@/views/layout-m.vue')

const routes =[
    {
        path: '/layout/:id',
        name: 'layout',
        component: layout
    },
    {
        path: '/layout-m/:id',
        name: 'layout-m',
        component: layoutM
    },
]

export default routes
