import { getArtistInformationApi, getArtistEventsApi } from './band-search-form.api';

export const CLEAR_DATA = 'CLEAR_DATA';

export function clearArtistData() {
    return async (dispatch) => {
        dispatch({ type: CLEAR_DATA });
    };
}

export const START_GETTING_EVENTS_DATA = 'START_GETTING_EVENTS_DATA';
export const FAIL_TO_GET_EVENTS_DATA = 'FAIL_TO_GET_EVENTS_DATA';
export const CHANGE_EVENTS_DATA = 'CHANGE_EVENTS_DATA';
export function getArtistEvents(artistName) {
    return async (dispatch) => {
        dispatch({ type: START_GETTING_EVENTS_DATA });
        try {
            const artistEventsData = await getArtistEventsApi(artistName);

            dispatch({
                type: CHANGE_EVENTS_DATA,
                payload: artistEventsData,
            });
        } catch (ex) {
            dispatch({ type: FAIL_TO_GET_EVENTS_DATA });

            throw Error(`Can't get Artist Events: ${ex}`);
        }
    };
}

export const START_GETTING_ARTIST_DATA = 'START_GETTING_ARTIST_DATA';
export const FAIL_TO_GET_ARTIST_DATA = 'FAIL_TO_GET_ARTIST_DATA';
export const CHANGE_ARTIST_DATA = 'CHANGE_ARTIST_DATA';
export function getArtistInformation(searchQuery) {
    return async (dispatch) => {
        dispatch({ type: START_GETTING_ARTIST_DATA });
        try {
            const artistData = await getArtistInformationApi(searchQuery);

            dispatch({
                type: CHANGE_ARTIST_DATA,
                payload: artistData,
            });
        } catch (ex) {
            dispatch({ type: FAIL_TO_GET_ARTIST_DATA });

            throw Error(`Can't get Artist Information: ${ex}`);
        }
    };
}
