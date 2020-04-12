import React from 'react';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BandSearchForm from './BandSearchForm';
import {
    getArtistEvents,
    getArtistInformation,
    clearArtistData,
} from '../../store/band-search/band-search-form.actions';

class BandSearch extends React.Component {
    static propTypes = {
        artistEventsData: PropTypes.array,
        artistData: PropTypes.shape({}),
        isArtistDataLoading: PropTypes.bool,
        isEventDataLoading: PropTypes.bool,
        dispatch: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(clearArtistData());
        this.debouncedSearchArtistData = debounce(this.searchArtistData, 1000);
    }

    searchArtistData = async (searchQuery) => {
        const { dispatch } = this.props;

        if (searchQuery) {
            dispatch(getArtistInformation(searchQuery));
            dispatch(getArtistEvents(searchQuery));
        } else {
            dispatch(clearArtistData());
        }
    };

    handleSearch = async (searchQuery) => {
        this.debouncedSearchArtistData(searchQuery);
    };

    render() {
        const { artistEventsData, artistData, isArtistDataLoading, isEventDataLoading } = this.props;
        const isLoading = isArtistDataLoading || isEventDataLoading;
        return (
            <BandSearchForm
                artistData={artistData}
                artistEventsData={artistEventsData}
                handleSearch={this.handleSearch}
                isLoading={isLoading}
            />
        );
    }
}

export default connect((state) => ({
    artistData: state.artistDetails.artistData,
    artistEventsData: state.artistDetails.artistEventsData,
    isArtistDataLoading: state.artistDetails.isArtistDataLoading,
    isEventDataLoading: state.artistDetails.isEventDataLoading,
}))(BandSearch);
