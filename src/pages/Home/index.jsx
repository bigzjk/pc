import React from "react";
import connect from "@/store/connect";
import HomeModel from "./model";
import ListModel from "@/pages/List/model";

import { Button } from "antd";

import "./index.scss";

const Home = function(props) {
//   props.history.push('/dashboard/list')
  const { Home, List, changeListMsg, changeHomeMsg, getAjaxData } = props;
  console.log('props', props);
  
  return (
    <div className="home">
      <p>home的state：{Home.homeMsg}</p>
      <p>list的state：{List.listMsg}</p>
      <p>loadingState：{Home.getAjaxDataLoadingState===1?'加载中':Home.getAjaxDataLoadingState===2?'加载完毕':'准备加载'}</p>
      <Button
        onClick={() => {
          changeListMsg("改变后的listMsg");
        }}
      >
        改变listMsg
      </Button>
      <Button
        onClick={() => {
          changeHomeMsg("改变后的homeMsg");
        }}
      >
        改变homeMsg
      </Button>

      <Button
        onClick={() => {
          getAjaxData();
        }}
      >
        getAjaxData
      </Button>
    </div>
  );
};

//传入list和home两个model,可垮模块访问state和action
export default connect([HomeModel, ListModel])(Home);
