import React from 'react';
import { connect } from 'react-redux';

import { saveToStorage, getEventFromStorage, removeEventFromStorage } from '../../helpers/local-storage';
import EventDetailsView from './EventDetailsView';
import { history, GENERAL_ROUTES } from '../../routes';

class EventDetails extends React.Component {
    state = {
        selectedEvent: undefined,
        isSaved: false,
    };

    componentDidMount() {
        const { artistEventsData } = this.props;
        const { id } = this.props.match.params;

        const selectedEvent = artistEventsData.find((event) => event.id === id);
        if (!selectedEvent) {
            history.push(GENERAL_ROUTES.dashboard.path);
        }
        const isSaved = this.isSavedCheck();

        this.setState({ selectedEvent, isSaved });
    }

    handleSave = () => {
        const { selectedEvent } = this.state;
        const { artistData } = this.props;

        saveToStorage({
            artist: artistData.name,
            eventId: selectedEvent.id,
            datetime: selectedEvent.datetime,
            description: selectedEvent.description,
        });
        const isSaved = this.isSavedCheck();

        this.setState({ isSaved });
    };

    isSavedCheck = () => {
        const { id } = this.props.match.params;

        return !!getEventFromStorage(id);
    };

    handleRemove = () => {
        const { selectedEvent } = this.state;

        removeEventFromStorage(selectedEvent.id);
        this.setState({ isSaved: false });
    };

    render() {
        const { selectedEvent, isSaved } = this.state;

        return (
            <EventDetailsView
                selectedEvent={selectedEvent}
                bntText={isSaved ? 'Remove from favourites' : 'Add to favarites'}
                handleClick={isSaved ? this.handleRemove : this.handleSave}
            />
        );
    }
}

export default connect((state) => ({
    artistEventsData: state.artistDetails.artistEventsData,
    artistData: state.artistDetails.artistData,
}))(EventDetails);
