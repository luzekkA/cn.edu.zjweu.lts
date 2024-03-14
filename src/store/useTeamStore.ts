import { defineStore } from 'pinia'
import { Names } from './store-name'
export const useTeamStore = defineStore(Names.TEAMSTORE, {
    state: () => {
        return {
            select: {
                team: '',
                //比赛名称
                competition: '',
                //比赛小项
                type: '',
                //比赛组别
                group: ''
            }
        }
    },
    getters: {

    },
    actions: {

    }
})

