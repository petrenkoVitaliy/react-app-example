import moment from 'moment';

import {
    CHANGE_ARTIST_DATA,
    CHANGE_EVENTS_DATA,
    CLEAR_DATA,
    START_GETTING_ARTIST_DATA,
    FAIL_TO_GET_ARTIST_DATA,
    START_GETTING_EVENTS_DATA,
    FAIL_TO_GET_EVENTS_DATA,
} from './band-search-form.actions';

const initialState = {
    isArtistDataLoading: false,
    isEventDataLoading: false,
    artistData: { name: 'not provided', thumb_url: '/img/default_image.jpg' },
    artistEventsData: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CLEAR_DATA: {
            return initialState;
        }
        case START_GETTING_ARTIST_DATA: {
            return {
                ...state,
                isArtistDataLoading: true,
            };
        }
        case FAIL_TO_GET_ARTIST_DATA: {
            return {
                ...state,
                isArtistDataLoading: false,
            };
        }
        case CHANGE_ARTIST_DATA: {
            const artistData = action.payload || initialState.artistData;
            return {
                ...state,
                isArtistDataLoading: false,
                artistData,
            };
        }
        case START_GETTING_EVENTS_DATA: {
            return {
                ...state,
                isEventDataLoading: true,
            };
        }
        case FAIL_TO_GET_EVENTS_DATA: {
            return {
                ...state,
                isEventDataLoading: false,
            };
        }
        case CHANGE_EVENTS_DATA: {
            const artistEventsData = Array.isArray(action.payload) ? action.payload : [];
            return {
                ...state,
                isEventDataLoading: false,
                artistEventsData: artistEventsData.map((event) => ({
                    ...event,
                    datetime: moment(event.datetime).format('LLLL'),
                })),
            };
        }
        default:
            return { ...state };
    }
}
