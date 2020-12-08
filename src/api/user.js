import request from '@/utils/request'
//登录接口
export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}
//验证码登录
export function loginCode(data) {
    return request({
        url: '/quick_login',
        method: 'post',
        data
    })
}
//注册接口
export function register(data) {
    return request({
        url: '/register',
        method: 'post',
        data
    })
}
//获取验证码
export function sendCode(data) {
    return request({
        url: '/send_code',
        method: 'post',
        data
    })
}
//获取分销员二维码
export function getCode(params) {
    return request({
        url: '/agent/spread_url',
        method: 'GET',
        params
    })
}
//获取项目二维码
export function getCodeDome(params) {
    return request({
        url: '/project/spread_list',
        method: 'GET',
        params
    })
}
//获取佣金列表
export function configList(params) {
    return request({
        url: '/distribute_config/get_projects',
        method: 'GET',
        params
    })
}
//获取佣金项目列表
export function configListDome(params) {
    return request({
        url: '/distribute_config/list',
        method: 'GET',
        params
    })
}
//获取佣金详情
export function configListDetails(params) {
    return request({
        url: '/distribute_config/read',
        method: 'GET',
        params
    })
}
//设置佣金
export function configMoneySave(data) {
    return request({
        url: '/distribute_config/save',
        method: 'POST',
        data
    })
}
//修改佣金
export function configMoneyUpdate(data) {
    return request({
        url: '/distribute_config/update',
        method: 'POST',
        data
    })
}
//修改佣金历史记录
export function configMoneyHistory(params) {
    return request({
        url: '/distribute_config/history',
        method: 'GET',
        params
    })
}
//邀请注册
export function invitationregister(data) {
    return request({
        url: '/spread_register',
        method: 'POST',
        data
    })
}
//邀请注册
export function joinregister(data) {
    return request({
        url: '/team/join',
        method: 'POST',
        data
    })
}
//获取手机号
export function getMobileNum(data) {
    return request({
        url: '/agent/mobile',
        method: 'POST',
        data
    })
}
//获取用户基本信息
export function getUser(params) {
    return request({
        url: '/agent/read',
        method: 'GET',
        params
    })
}
//获取组织二维码
export function getteamqrcode(params) {
    return request({
        url: '/team/qrcode',
        method: 'GET',
        params
    })
}
//获取用户协议
export function treatyuser(params) {
    return request({
        url: '/treaty/user',
        method: 'GET',
        params
    })
}
//获取隐私协议
export function treatyprivacy(params) {
    return request({
        url: '/treaty/privacy',
        method: 'GET',
        params
    })
}
//获取隐私协议new
export function treatyprivacynew(params) {
    return request({
        url: 'treaty/hide',
        method: 'GET',
        params
    })
}
//忘记密码
export function newPsd(data) {
    return request({
        url: '/forget_password',
        method: 'POST',
        data
    })
}
//分销员头像上传
export function avatarUpload(data) {
    return request({
        url: '/agent/avatar_upload',
        method: 'POST',
        data
    })
}
//分销员个人信息修改
export function updateInfo(data) {
    return request({
        url: '/agent/update_info',
        method: 'POST',
        data
    })
}
//客服电话获取
export function getServiceTel(params) {
    return request({
        url: '/system_config/get_service_tel',
        method: 'GET',
        params
    })
}
//获取组织分销员列表数据
export function getAgentList(params) {
    return request({
        url: '/team/get_agent_list',
        method: 'GET',
        params
    })
}
//获取组织的客户列表数据
export function get_customer_list(params) {
    return request({
        url: '/team/get_customer_list',
        method: 'GET',
        params
    })
}
//项目数据获取
export function get_project(params) {
    return request({
        url: '/team/get_project',
        method: 'GET',
        params
    })
}
//获取组织的订单列表数据
export function get_order_list(params) {
    return request({
        url: '/team/get_order_list',
        method: 'GET',
        params
    })
}
//渠道商中心推广信息统计数据
export function get_spread_info(params) {
    return request({
        url: '/team/get_spread_info',
        method: 'GET',
        params
    })
}


//获取分销员推广信息统计数据
export function getInfo(params) {
    return request({
        url: '/agent/get_spread_info',
        method: 'GET',
        params
    })
}


//获取分销员发展新分销员列表数据
export function getNewList(params) {
    return request({
        url: '/agent/get_new_agent_list',
        method: 'GET',
        params
    })
}


//项目数据获取
export function getFxList(params) {
    return request({
        url: '/agent/get_project',
        method: 'GET',
        params
    })
}



export function getFxLists(params) {
    return request({
        url: '/agent/get_customer_list',
        method: 'GET',
        params
    })
}



//获取分销员佣金详情列表数据
export function getCommission(params) {
    return request({
        url: '/agent/get_commission_list',
        method: 'GET',
        params
    })
}



//获取组织总佣金列表数据
export function getCommissionList(params) {
    return request({
        url: '/team/get_commission_list',
        method: 'GET',
        params
    })
}



//获取分销员佣金列表数据
export function getAgent(params) {
    return request({
        url: '/team/get_agent_commission_list',
        method: 'GET',
        params
    })
}


//获取分销员佣金详细列表数据
export function getDetail(params) {
    return request({
        url: '/team/get_agent_commission_detail_list',
        method: 'GET',
        params
    })
}



//渠道商配置历史修订记录获取
export function getDistribute(params) {
    return request({
        url: '/distribute_config/plat_history',
        method: 'GET',
        params
    })
}


//分销商配置历史修订记录获取
export function getConfig(params) {
    return request({
        url: '/distribute_config/history',
        method: 'GET',
        params
    })
}

//获取最新版本
export function getUrlVersion(params) {
    return request({
        url: '/version/new',
        method: 'GET',
        params
    })
}


//修改密码
export function changePassword(data) {
    return request({
        url: '/agent/change_password',
        method: 'POST',
        data
    })
}



//修改手机号
export function changeTel(data) {
    return request({
        url: '/agent/change_tel',
        method: 'POST',
        data
    })
}