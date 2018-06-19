import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import React from "react";
import MainAdmin from "../admin/Main";
import Main from "./Main";


class App extends React.Component {

    render() {
        return (
            <Switch>
                <Route path='/admin' component={MainAdmin} />
                <Route path='/' component={Main} />
            </Switch>
        );
    }
}

export default App;