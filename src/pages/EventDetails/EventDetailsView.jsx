import React from 'react';
import { Link } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Button, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import { EventInfo } from '../../components/EventInfo';
import { GENERAL_ROUTES } from '../../routes';

const EventDetailsView = ({ selectedEvent, bntText, handleClick, classes }) => (
    <Box>
        <Typography variant="h4" gutterBottom color="primary">
            {"Who's In Town?"}
        </Typography>
        <Box className={classes.event_details_head_wrapper}>
            <Button className={classes.btn} color="primary" variant="outlined" onClick={handleClick}>
                {bntText}
            </Button>
            <Link to={GENERAL_ROUTES.dashboard.path}>Return to dashboard</Link>
        </Box>

        {selectedEvent ? <EventInfo selectedEvent={selectedEvent} /> : ''}
    </Box>
);

EventDetailsView.propTypes = {
    selectedEvent: PropTypes.shape({}),
    bntText: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({
    event_details_head_wrapper: {
        display: 'flex',
        'justify-content': 'space-between',
        [theme.breakpoints.down('sm')]: {
            'flex-direction': 'column',
        },
    },
    btn: {
        'margin-bottom': '20px',
    },
});

export default withStyles(styles)(EventDetailsView);
