import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import BaseLayout from './components/layout/layout'
import App from './components/app/App'
import History from './components/history'
import Order from './components/order'
import NotFound from './components/notfound'
const Main = (props) => {
    return (
        <Router>
        <BaseLayout>
                <Switch>
                    <Route path="/history">
                        <History />
                    </Route>
                    <Route path="/order">
                        <Order />
                    </Route>
                    <Route exact path="/">
                        <App />
                    </Route>
                    <Route path="*">
                        <NotFound/>
                    </Route>
                </Switch>
        </BaseLayout>
        </Router>
    )
}

export default Main;