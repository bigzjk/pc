export default {
    namespace:'List',
    initState:{
        listMsg:'hello List'
    },
    promise:{},
    actions:{
        changeListMsg(state,listMsg){
            return {
                ...state,
                listMsg:listMsg
            }
        }
    }
}