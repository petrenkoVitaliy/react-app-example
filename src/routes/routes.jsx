import React, { Component, Suspense } from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';

import { GENERAL_ROUTES } from './general-routes';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export default class RoutesComponent extends Component {
    renderRoures = (routes) =>
        Object.values(routes).map(({ path, exact, component: Component }) => (
            <Route key={path} path={path} exact={exact} render={(props) => <Component {...props} />} />
        ));

    render() {
        return (
            <Router history={history}>
                <Suspense fallback={'loading'}>
                    <Switch>
                        {this.renderRoures(GENERAL_ROUTES)}

                        <Route render={(props) => <Redirect to="/" {...props} />} />
                    </Switch>
                </Suspense>
            </Router>
        );
    }
}
