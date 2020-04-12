const SAVED_EVENTS = 'SAVED_EVENTS'; // just one key for storage

export const saveToStorage = (value) => {
    const eventToPush = {
        artist: value.artist,
        eventId: value.eventId,
        datetime: value.datetime,
        description: value.description,
    };

    const savedEvents = localStorage.getItem(SAVED_EVENTS);
    const newEventsList = !savedEvents ? [] : [...JSON.parse(savedEvents)];

    const existedItem = newEventsList.find((event) => event.eventId === eventToPush.eventId);
    if (!existedItem) {
        newEventsList.push(eventToPush);
    }

    localStorage.setItem(SAVED_EVENTS, JSON.stringify(newEventsList));
};

export const getEventFromStorage = (id) => {
    const savedEvents = JSON.parse(localStorage.getItem(SAVED_EVENTS)) || [];
    const currentEvent = savedEvents.find((event) => event.eventId === id);

    return currentEvent;
};

export const removeEventFromStorage = (id) => {
    const savedEvents = JSON.parse(localStorage.getItem(SAVED_EVENTS));
    const filteredEvents = savedEvents.filter((event) => event.eventId !== id);

    localStorage.setItem(SAVED_EVENTS, JSON.stringify(filteredEvents));
};

export const getAllEventsFromStorage = () => {
    const savedEvents = JSON.parse(localStorage.getItem(SAVED_EVENTS)) || [];

    return savedEvents;
};
