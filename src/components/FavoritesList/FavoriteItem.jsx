import React from 'react';
import { generatePath } from 'react-router-dom';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core';

import { GENERAL_ROUTES, history } from '../../routes';

class FavoriteItem extends React.Component {
    static propTypes = {
        event: PropTypes.shape({
            venue: PropTypes.shape({
                artist: PropTypes.string,
                eventId: PropTypes.string,
                datetime: PropTypes.string,
            }),
        }),
        handleFindEvents: PropTypes.func.isRequired,
    };

    handleEventClick = async () => {
        const { event, handleFindEvents } = this.props;

        await handleFindEvents(event.artist);
        history.push(generatePath(GENERAL_ROUTES.eventDetails.path, { id: event.eventId }));
    };

    render() {
        const { event, classes } = this.props;

        return (
            <Box className={classes.event_wrapper} onClick={this.handleEventClick}>
                <Box className={classes.event_detail_wrapper}>
                    <Box className={classes.event_detail}>Artist: </Box>
                    <Box>{event.artist || 'not provided'}</Box>
                </Box>
                <Box className={classes.event_detail_wrapper}>
                    <Box className={classes.event_detail}>Description: </Box>
                    <Box>{event.description || 'not provided'}</Box>
                </Box>
                <Box className={classes.event_detail_wrapper}>
                    <Box className={classes.event_detail}>Date: </Box>
                    <Box>{event.datetime || 'not provided'}</Box>
                </Box>
            </Box>
        );
    }
}

const styles = (theme) => ({
    event_wrapper: {
        width: '500px',
        border: '1px solid black',
        margin: '10px 0',
        cursor: 'pointer',
        '&:hover': {
            background: theme.palette.text.hint,
        },
        color: theme.palette.primary.main,
        [theme.breakpoints.down('sm')]: {
            width: '300px',
        },
    },
    event_detail: { 'font-weight': 'bold' },
    event_detail_wrapper: {
        display: 'flex',
        'justify-content': 'space-between',
    },
    emptyData: {
        color: theme.palette.secondary.main,
    },
});

export default withStyles(styles)(FavoriteItem);
