let sleep = (timeout = 1000) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(true)
    }, timeout);
})

export default {
    namespace: 'Home',
    initState: {
        homeMsg: 'homeMsgModel'
    },
    promise:{
        getAjaxData(){
            return async dispatch =>{
                await sleep(3000)
            }
        }
    },
    actions: {
        changeHomeMsg(state, homeMsg){
            return {
                ...state,
                homeMsg
            }
        }
    }
}