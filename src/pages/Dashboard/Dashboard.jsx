import React from 'react';

import { withStyles, Box } from '@material-ui/core';

import { BandSearch } from '../../components/BandSearch';
import { FavoritesList } from '../../components/FavoritesList';

const Dashboard = ({ classes }) => (
    <Box className={classes.dashboard_wrapper}>
        <BandSearch />
        <FavoritesList />
    </Box>
);

const styles = (theme) => ({
    dashboard_wrapper: {
        display: 'flex',
        'justify-content': 'space-between',
        [theme.breakpoints.down('sm')]: {
            'flex-direction': 'column',
        },
    },
});

export default withStyles(styles)(Dashboard);
