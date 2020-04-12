import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Typography, Box } from '@material-ui/core';

import FavoriteItem from './FavoriteItem';
import { getAllEventsFromStorage } from '../../helpers/local-storage';
import { getArtistEvents } from '../../store/band-search/band-search-form.actions';

class FavoritesList extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    };

    state = {
        favoriteEvents: [],
    };

    componentDidMount() {
        const favoriteEvents = getAllEventsFromStorage();

        this.setState({ favoriteEvents });
    }

    findEvents = async (artistName) => {
        const { dispatch } = this.props;

        await dispatch(getArtistEvents(artistName));
    };

    render() {
        const { favoriteEvents } = this.state;

        return (
            <Box>
                <Typography variant="h4" gutterBottom color="primary">
                    Favorites
                </Typography>
                {favoriteEvents.length
                    ? favoriteEvents.map((event) => (
                          <FavoriteItem key={event.eventId} event={event} handleFindEvents={this.findEvents} />
                      ))
                    : 'not provided'}
            </Box>
        );
    }
}

export default connect()(FavoritesList);
