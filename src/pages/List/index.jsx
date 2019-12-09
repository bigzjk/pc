import React from "react";
import connect from "@/store/connect";
import model from "./model";

import { Button } from "antd";

const List = function(props) {
  console.log('props:', props);
  
  const { listMsg, changeListMsg, history } = props;
  return (
    <div>
      <p>listMsg：{listMsg}</p>
      <Button
        onClick={() => {
          changeListMsg("改变后的listMsg");
        }}
      >
        改变listMsg
      </Button>
      <Button
        onClick={() => {
          history.push('/home')
        }}
      >
        goHome
      </Button>
    </div>
  );
};

export default connect(model)(List);
