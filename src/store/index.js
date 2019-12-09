import { createStore, compose, applyMiddleware } from 'redux'
import logger from "redux-logger";
import thunk from './middleware/thunk'
import models from './model'

const rootReducer = (state = {}, acts) => {
    const result = {};
    models.forEach(({ namespace, initState, promise, actions }) => {
      result[namespace] = ((innerState, innerAction) => {
        // type名称为 namespace/action，例如：Order/add
        const [modeName, type] = innerAction.type.split("/");
        if (namespace !== modeName) return innerState;
  
        // 有指定的action的情况
        if (actions[type]) return actions[type](innerState, innerAction.payload);
  
        // 如果type名称是以Up结尾，则创建修改对应state的action
        if (/^(\w+)Up$/.test(type) && innerState[RegExp.$1] !== undefined) {
          return {
            ...innerAction,
            [RegExp.$1]: innerAction.payload
          };
        }
        //中间件自己触发的action（不在action列表中）将state和payload合并
        return {...innerState,...innerAction.payload}
      })(state[namespace] || initState, acts);
    });
    return result;
  };

//开发环境对谷歌插件react-devtool的支持
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store =
  process.env.NODE_ENV === "production"
    ? createStore(rootReducer, applyMiddleware(thunk,logger))
    : createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk,logger))
      );

export default store;
