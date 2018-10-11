import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainView from './MainView';
import EditView from './EditView';

export default (
    <Switch>
        <Route exact path="/" component={MainView}></Route>
        <Route path="/edit/:id" component={EditView}></Route>
    </Switch>
)