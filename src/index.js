import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import { configereStore } from './store';
import { RoutesComponent } from './routes';

const store = configereStore();

ReactDOM.render(
    <Provider store={store}>
        <RoutesComponent />
    </Provider>,
    document.getElementById('root'),
);
