import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ShopApp } from './pages/ShopApp';
import { Header } from './cmps/Header';
import { Notification } from './cmps/Notification';


export function App() {

  return (
    <div className="App">
      <Header />
      {/* <Notification /> */}
      <Switch>
        <Route component={ShopApp} path="/shop"/>
      </Switch>
    </div>
  );
}

