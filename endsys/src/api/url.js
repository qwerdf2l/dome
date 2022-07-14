const domain = "http://192.168.2.30:8013";

export default {
    login:{
        code:`${domain}/auth/code`, //登录
        login:`${domain}/auth/login`,//验证码
        build:`${domain}/api/menus/build`  //菜单查询
    },
    user: {
        user: `${domain}/api/users`
    },
    menu: {
        //角色管理菜单分配确认
        menu:`${domain}/api/roles/menu`,
    },
    dept: {
        dept: `${domain}/api/dept`   // 部门查询
    },
    job: {
        job: `${domain}/api/job`   // 岗位
    },
    role: {
        all: `${domain}/api/roles/all` , // 所有角色数据
        role: `${domain}/api/roles/level`,    // 角色级别
        roles:`${domain}/api/roles`,
        tree:`${domain}/api/menus/tree`,
        
    },
    dict:{
        dict:`${domain}/api/dict`,  //字典
        dictDetail:`${domain}/api/dictDetail`
    },
    online:{
        online:`${domain}/auth/online` //在线用户
    },
    logs:{
        logs:`${domain}/api/logs` , //操作日志
        error:`${domain}/api/logs/error`
    },
    redis:{
        redis:`${domain}/api/redis`,     //系统缓存
        delRedis:`${domain}/api/redis/` ,    //删除系统缓存
        delAllRedis:`${domain}/api/redis/all`     //清空系统缓存
    },
    
    menus: {
        menus:`${domain}/api/menus`,
    },
    log:{
        errorLog:`${domain}api/logs/error`
    }
}