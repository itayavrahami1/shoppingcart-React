import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ShopApp } from './pages/ShopApp';
import { Header } from './cmps/Header';
import { Notification } from './cmps/Notification';
import { ItemDetails } from './pages/ItemDetails';


export function App() {

  return (
    <div className="App">
      <Header />
      {/* <Notification /> */}
      <Switch>
        <Route component={ItemDetails} path="/:id"/>
        <Route component={ShopApp} path="/"/>
      </Switch>
    </div>
  );
}

