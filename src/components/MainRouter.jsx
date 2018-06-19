import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Content from "./Content";
import React from "react";
import BookByCategory from "./BookByCategory";
import BookByPublisher from "./BookByPublisher";
import BookDetail from "./BookDetail";
import AccountRegister from "./AccountRegister";
import SearchResult from "./SearchResult";
import ShoppingCart from "./ShoppingCart";
import ChangePassword from "./ChangePassword";
import UpdateInfor from "./UpdateInfo";
const MainRouter = () =>(
    <Switch>
        <Route exact path='/' component={Content}/>
        <Route exact path='/category/:id' component={BookByCategory}/>
        <Route path='/AccountRegister' component={AccountRegister}/>
        <Route path='/publisher/:id' component={BookByPublisher}/>
        <Route path='/product/:bookid' component={BookDetail}/>
        <Route path='/SearchResult' component={SearchResult}/>
        <Route path='/ShoppingCart' component={ShoppingCart}/>
        <Route path='/ChangePassword' component={ChangePassword}/>
        <Route path='/UpdateInfor' component={UpdateInfor}/>
    </Switch>
);

export default MainRouter;