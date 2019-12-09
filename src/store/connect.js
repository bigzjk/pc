import { connect } from "react-redux";

export const createActions = namespace => (type, payload) => ({
  type: `${namespace}/${type}`,
  payload
});

export default (model, namespace) => {
  const acts = {};
  let resnameSpace = namespace || null
  if (Array.isArray(model)) {
    model.forEach(MapActions);
  } else {
    resnameSpace = model.namespace
    MapActions(model);
  }
  function MapActions(curModel) {
    const { namespace, promise, actions } = curModel;
    //同步action
    Object.keys(actions).forEach(acName => {
      acts[acName] = payload => ({
        type: `${namespace}/${acName}`,
        payload
      });
    });

    // 异步action
    promise &&
      Object.keys(promise).forEach(name => {
        // acts[name] = promise[name]//(...params) => promise[name](...params);
        acts[name] = ()=>{
          //异步action都自动添加一个loadingName，用于自动生成loading状态
          let a = promise[name]()
          a.namespace = namespace
          a.loadingName = name
          return a
        }
      });
  }
  return connect(
    state => resnameSpace?state[resnameSpace]:state,
    acts
  );
};
