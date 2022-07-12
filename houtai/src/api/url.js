const domain = 'http://192.168.2.30:8013'

export default {
    // 登录所需
    login: {
        login: `${domain}/auth/login`,    // 登录
        code: `${domain}/auth/code`,      // 验证码
        build: `${domain}/api/menus/build`,  // 菜单查询
    },
    // 用户管理所需
    user: {
        userStatus: `${domain}api/dictDetail`,  // 用户状态
        userData: `${domain}/api/users`,//用户查询
    },
    dept: {
        dept: `${domain}/api/dept`,  // 部门查询
    },
    job: {
        job: `${domain}/api/job`,  // 职位查询
    },
    roles: {
        roles: `${domain}/api/roles/all` // 角色查询
    },
    delete: {
        delete: `${domain}/api/users/` // 删除用户
    },
    role: {
        role: `${domain}/api/roles`, // 角色管理
    }
}