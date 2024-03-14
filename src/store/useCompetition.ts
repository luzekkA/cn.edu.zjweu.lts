import { defineStore } from 'pinia'
import { Names } from './store-name'
import { getCompetition,getType } from '../api/competition.ts'
export const useUserStore = defineStore(Names.COMPETITIONSTORE, {
    state: () => {
        return {
            //创建队伍时使用
            competitionList: [],
            //创建比赛时使用
            typeList: []
        }
    },
    getters: {
        // UserRolesList(): string[] {
        //     return this.userRolesList
        // },
        // Token():string{
        //     return this.token
        // }

    },
    actions: {
        getCompetitionList() {
            getCompetition().then(res => {
                if (res.data) {
                    console.log(res.data);
                    // commit("SET_COMPETITIONLIST", res.data)
                    this.competitionList = res.data
                }
            })
        },
        //获取类型列表
        getTypeList() {
            getType().then(res => {
                console.log(res);
                if (res.data) {
                    this.typeList = res.data
                }
            })
        }
    }
})

