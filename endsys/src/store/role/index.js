import { getRole, getTree } from '@/api/role'
export default {
    namespaced: true,
    state: {
        roleList: [], //用户管理界面角色下拉列表
        roleData: [], //角色管理界面角色列表
        rolesize: 10, //一页几条
        rolepage: 0,  //页数
        roleTreeList: [],//角色管理界面菜单分配数据
        roleDept: [],//角色管理界面新增弹与修改框部门列表
    },
    getters: {
    },
    mutations: {
        setroleList(state, newVal) {
            state.roleList = newVal
        },
        setroleData(state, newVal) {
            state.roleData = newVal
        },
        setroleSize(state, newVal) {
            state.rolesize = newVal
        },
        setrolePage(state, newVal) {
            state.rolepage = newVal
        },
        setroleTreeList(state, newVal) {
            state.roleTreeList = newVal
        },
        setroleDept(state, newVal) {
            state.roleDept = newVal
        }
    },
    actions: {
        searchroleData(context) {
            return new Promise(resovle => {
                getRole({
                    page: context.state.rolepage,
                    size: context.state.rolesize,
                    sort: 'level,asc',
                }).then(res => {
                    context.commit('setroleData', res)
                    resovle(res)
                })
            })
        },
        searchroleTreeList(context) {
            return new Promise(resolve => {
                getTree().then(res => {
                    context.commit('setroleTreeList', res)
                    resolve(res)
                })
            })
        }
    }
}