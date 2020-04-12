import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';

import EventItem from './EventItem';

const sortOptions = {
    ASC: 'ASC',
    DESC: 'DESC',
};
const sortOptionsFunctionsTransform = {
    [sortOptions.ASC]: -1,
    [sortOptions.DESC]: 1,
};

class EventsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: sortOptions.ASC,
        };
    }

    sortList = (arr, order) => {
        const newArray = arr.slice();
        const sortOptionsTransformValue = sortOptionsFunctionsTransform[order];
        const res = newArray.sort((a, b) => {
            if (moment(a.datetime) > moment(b.datetime)) {
                return -1 * sortOptionsTransformValue;
            }
            if (moment(a.datetime) < moment(b.datetime)) {
                return 1 * sortOptionsTransformValue;
            }
            return 0;
        });

        return res;
    };

    handleSort = (e, type) => {
        if (!type) {
            return;
        }

        this.setState({ sortBy: type });
    };

    render() {
        const { sortBy } = this.state;
        const { artistEventsData } = this.props;
        const sortedList = this.sortList(artistEventsData, sortBy);

        return (
            <Box>
                {sortedList.length ? (
                    <>
                        <Typography variant="h6" gutterBottom color="primary">
                            Sort by date:
                        </Typography>
                        <ToggleButtonGroup
                            value={sortBy}
                            exclusive
                            onChange={this.handleSort}
                            aria-label="text alignment"
                        >
                            <ToggleButton value={sortOptions.ASC} aria-label="left aligned">
                                asc
                            </ToggleButton>
                            <ToggleButton value={sortOptions.DESC} aria-label="centered">
                                desc
                            </ToggleButton>
                        </ToggleButtonGroup>
                        {sortedList.map((event) => (
                            <EventItem key={event.id} event={event} />
                        ))}
                    </>
                ) : (
                    'not provided'
                )}
            </Box>
        );
    }
}

EventsList.propTypes = {
    artistEventsData: PropTypes.arrayOf(
        PropTypes.shape({
            venue: PropTypes.shape({
                id: PropTypes.string,
            }),
        }),
    ),
};

export default EventsList;
