import Vue from 'vue'
import VueRouter from 'vue-router'
import cookie from "js-cookie"
import { Notify } from 'vant';
Vue.use(VueRouter)

const router = new VueRouter({
        mode: 'history',
        routes: [{
                name: 'selectindex',
                path: '/',
                redirect: '/selectindex', // 重定向
            },
            {
                path: '/selectindex',
                name: 'selectindex',
                component: (resolve) => require(['@/views/selectindex'], resolve),
                meta: {
                    title: '登录选择',
                    keepAlive: false,
                    login: false
                },
            },
            {
                path: '/channellogin',
                name: 'channellogin',
                component: (resolve) => require(['@/views/channellogin'], resolve),
                meta: {
                    title: '渠道商登录',
                    keepAlive: false,
                    login: false
                },
            },
            {
                path: '/distributionlogin',
                name: 'distributionlogin',
                component: (resolve) => require(['@/views/distributionlogin'], resolve),
                meta: {
                    title: '分销商登录',
                    keepAlive: false,
                    login: false
                },
            },
            {
                path: '/codelogin',
                name: 'codelogin',
                component: (resolve) => require(['@/views/codelogin'], resolve),
                meta: {
                    title: '验证码登录',
                    keepAlive: false,
                    login: false
                },
            },
            {
                path: '/register',
                name: 'register',
                component: (resolve) => require(['@/views/register'], resolve),
                meta: {
                    title: '注册',
                    keepAlive: false,
                    login: false
                },
            },
            {
                path: '/distribution',
                name: 'distribution',
                component: (resolve) => require(['@/views/distribution'], resolve),
                meta: {
                    title: '分销中心',
                    keepAlive: true,
                    login: true
                },
            },
            {
                path: '/channel',
                name: 'channel',
                component: (resolve) => require(['@/views/channel'], resolve),
                meta: {
                    title: '渠道中心',
                    keepAlive: true,
                    login: true
                },
            },
            {
                path: '/share',
                name: 'share',
                component: (resolve) => require(['@/views/share'], resolve),
                meta: {
                    title: '注册抖小客',
                    keepAlive: true,
                    login: false
                },
            },
            {
                path: '/join',
                name: 'join',
                component: (resolve) => require(['@/views/join'], resolve),
                meta: {
                    title: '注册抖小客',
                    keepAlive: true,
                    login: false
                },
            },
            {
                path: '/download',
                name: 'download',
                component: (resolve) => require(['@/views/download'], resolve),
                meta: {
                    title: '下载抖小客',
                    keepAlive: true,
                    login: false
                },
            },
            {
                path: '/configurationlist',
                name: 'configurationlist',
                component: (resolve) => require(['@/views/configurationlist'], resolve),
                meta: {
                    title: '分销设置列表',
                    keepAlive: true,
                    login: true
                },
            },
            {
                path: '/configurationlistDOME',
                name: 'configurationlistDOME',
                component: (resolve) => require(['@/views/configurationlistDOME'], resolve),
                meta: {
                    title: '分销项目设置列表',
                    keepAlive: true,
                    login: true
                },
            },
            {
                path: '/configurationss',
                name: 'configurationss',
                component: (resolve) => require(['@/views/configurationss'], resolve),
                meta: {
                    title: '分销佣金设置',
                    keepAlive: true,
                    login: true
                },
            },
            {
                path: '/historical',
                name: 'historical',
                component: (resolve) => require(['@/views/historical'], resolve),
                meta: {
                    title: '修改记录',
                    keepAlive: true,
                    login: true
                },
            },
            {
                path: '/distributioMnember',
                name: 'distributioMnember',
                component: (resolve) => require(['@/views/distributioMnember'], resolve),
                meta: {
                    title: '分销员列表',
                    keepAlive: true,
                    login: true
                },
            },
            {
                path: '/customerMnember',
                name: 'customerMnember',
                component: (resolve) => require(['@/views/customerMnember'], resolve),
                meta: {
                    title: '客户列表',
                    keepAlive: true,
                    login: true
                },
            },
            {
                path: '/ordersCount',
                name: 'ordersCount',
                component: (resolve) => require(['@/views/ordersCount'], resolve),
                meta: {
                    title: '累计订单数',
                    keepAlive: true,
                    login: true
                },
            },
            {
                path: '/qdzyj',
                name: 'qdzyj',
                component: (resolve) => require(['@/views/qdzyj'], resolve),
                meta: {
                    title: '渠道总佣金',
                    keepAlive: true,
                    login: true
                },
            },
            {
                path: '/fxyyj',
                name: 'fxyyj',
                component: (resolve) => require(['@/views/fxyyj'], resolve),
                meta: {
                    title: '分销员佣金',
                    keepAlive: true,
                    login: true
                },
            },
            {
                path: '/agreement',
                name: 'agreement',
                component: (resolve) => require(['@/views/agreement'], resolve),
                meta: {
                    title: '用户协议',
                    keepAlive: false,
                    login: false
                },
            },
            {
                path: '/privacyAgreement',
                name: 'privacyAgreement',
                component: (resolve) => require(['@/views/privacyAgreement'], resolve),
                meta: {
                    title: '隐私协议',
                    keepAlive: false,
                    login: false
                },
            },
            {
                path: '/newPsd',
                name: 'newPsd',
                component: (resolve) => require(['@/views/newPsd'], resolve),
                meta: {
                    title: '忘记密码',
                    keepAlive: false,
                    login: false
                },
            },
            {
                path: '/modify',
                name: 'modify',
                component: (resolve) => require(['@/views/modify'], resolve),
                meta: {
                    title: '修改个人信息',
                    keepAlive: true,
                    login: false
                },
            },
            {
                path: '/orderslist',
                name: 'orderslist',
                component: (resolve) => require(['@/views/orderslist'], resolve),
                meta: {
                    title: '订单列表',
                    keepAlive: true,
                    login: true
                },
            },
            {
                path: '/settings',
                name: 'settings',
                component: (resolve) => require(['@/views/settings'], resolve),
                meta: {
                    title: '设置',
                    keepAlive: false,
                    login: true
                },
            },
            {
                path: '/tiXian',
                name: 'tiXian',
                component: (resolve) => require(['@/views/tiXian'], resolve),
                meta: {
                    title: '我要提现',
                    keepAlive: false,
                    login: true
                },
            },
            {
                path: '/nowtixian',
                name: 'nowtixian',
                component: (resolve) => require(['@/views/nowtixian'], resolve),
                meta: {
                    title: '提现',
                    keepAlive: false,
                    login: true
                },
            },
            {
                path: '/recoed',
                name: 'recoed',
                component: (resolve) => require(['@/views/recoed'], resolve),
                meta: {
                    title: '提现记录',
                    keepAlive: false,
                    login: true
                },
            },
            {
                path: '/account',
                name: 'account',
                component: (resolve) => require(['@/views/account'], resolve),
                meta: {
                    title: '提现账户',
                    keepAlive: false,
                    login: true
                },
            },
            {
                path: '/add',
                name: 'add',
                component: (resolve) => require(['@/views/add'], resolve),
                meta: {
                    title: '编辑银行卡',
                    keepAlive: false,
                    login: true
                },
            },
        ],
    })
    // router.beforeEach((to, form, next) => {
    //     if (to.meta.login) {
    //         if (localStorage.getItem('token')) {
    //             if (to.meta.title) {
    //                 document.title = to.meta.title;
    //             }
    //             next();
    //             // next()
    //         } else {
    //             Notify({ type: 'danger', message: '登录过期,请登录账号！' });
    //             next("/selectindex")
    //         }
    //     } else {
    //         if (localStorage.getItem('token')) {
    //             if (localStorage.getItem('tokentag') == 1) {
    //                 next("/channel")
    //             } else if (localStorage.getItem('tokentag') == 2) {
    //                 // next("/distribution")
    //                 if (to.meta.title) {
    //                     document.title = to.meta.title;
    //                 }
    //                 next();
    //             }
    //         } else {
    //             next()
    //         }
    //     }
    // })

export default router