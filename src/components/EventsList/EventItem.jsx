import React from 'react';
import classnames from 'classnames';
import { generatePath } from 'react-router';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core';

import { history } from '../../routes';
import { GENERAL_ROUTES } from '../../routes';

class EventItem extends React.Component {
    static propTypes = {
        event: PropTypes.shape({
            venue: PropTypes.shape({
                id: PropTypes.string,
                description: PropTypes.string,
                datetime: PropTypes.string,
            }),
        }),
        classes: PropTypes.object,
    };

    handleEventClick = () => {
        const { event } = this.props;

        history.push(generatePath(GENERAL_ROUTES.eventDetails.path, { id: event.id }));
    };

    render() {
        const { event, classes } = this.props;

        return (
            <Box className={classes.event_wrapper} onClick={this.handleEventClick}>
                <Box className={classes.event_detail_wrapper}>
                    <Box className={classes.event_detail}>Description: </Box>
                    <Box
                        className={classnames({
                            [classes.emptyData]: !event.description,
                        })}
                    >
                        {event.description || 'not provided'}
                    </Box>
                </Box>
                <Box className={classes.event_detail_wrapper}>
                    <Box className={classes.event_detail}>Date: </Box>
                    <Box
                        className={classnames({
                            [classes.emptyData]: !event.datetime,
                        })}
                    >
                        {event.datetime || 'not provided'}
                    </Box>
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

export default withStyles(styles)(EventItem);
