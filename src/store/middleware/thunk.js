function createThunkMiddleware(extraArgument) {
    return ({ dispatch, getState }) => next => async action => {
      //扩展dispatch方法
      //当actionType传string时，格式应该为 `${namespace}/${actionname}`
      //当actionType传对象是，格式为标准的action格式{type:action-type,payload:payload-data}
      let dispatchPlus = (actionType, payload) => {
        if (typeof actionType === "string") {
          dispatch({
            type: actionType,
            payload
          });
        } else {
          dispatch(actionType);
        }
      };
      if (typeof action === "function") {
  
        //为每一个异步action自动注入一个loadingState状态，状态名字为`${actionname}LoadingState`
        //当异步action开始执行的时候，loadingState状态将设置为1，表示异步操作正在loading
        //当一部action执行完毕之后，loadingState将设置为2，表示异步操作已经结束
        //可用于做局部或者页面的loading状态
        function createLoadStateAction(action,loadState){
          return {
            type:`${action.namespace}/${action.loadingName}Loading`,
            payload:{
              [`${action.loadingName}LoadingState`]:loadState,
            }
          }
        }
        dispatch(createLoadStateAction(action,1))
        let reutrns = await action(dispatchPlus, getState, extraArgument);
        dispatch(createLoadStateAction(action,2))
        return reutrns
      }
  
      return next(action);
    };
  }
  
  const thunk = createThunkMiddleware();
  thunk.withExtraArgument = createThunkMiddleware;
  
  export default thunk;
  