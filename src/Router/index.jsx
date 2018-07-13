import React, { Component } from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import history from './history.js';
import Login from "../Pages/Login";
import User from '../Pages/User';
import Logout from '../Pages/Logout';

class RouterIndex extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route path="/login" component={Login} />   
                    <Route path="/dashboard/:path" component={User}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/user" component={User}/>
                    <Route component={NoMatch}/>
                </Switch>
            </Router>
        );
    }
}

const NoMatch = ({location}) => (
    <div>
        <h3>未找到路由: <code>{location.pathname}</code></h3>
        <Link to="/">回主页</Link>
    </div>
);


export default RouterIndex;