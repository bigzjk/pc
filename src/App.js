import React, {Suspense} from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Home from '@/pages/Home/index'
import List from '@/pages/List/index'

function App() {
  return (
    <Suspense fallback={<div></div>}>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/list" component={List} />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
