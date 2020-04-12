import { Dashboard } from '../pages/Dashboard';
import { EventDetails } from '../pages/EventDetails';

export const GENERAL_ROUTES = {
    dashboard: {
        path: '/',
        exact: true,
        component: Dashboard,
    },
    eventDetails: {
        path: '/event-details/:id',
        component: EventDetails,
    },
};
