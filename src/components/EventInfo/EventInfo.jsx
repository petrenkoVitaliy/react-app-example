import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core';

import { Map } from '../Map';

const EventInfo = ({ selectedEvent, classes }) => {
    const venueData = selectedEvent.venue || {};
    const offersData = selectedEvent.offers || [];

    return (
        <Box className={classes.event_wrapper}>
            <Box className={classes.event_detail_wrapper}>
                <Box>
                    <a rel="noopener noreferrer" target="_blank" href={selectedEvent.url}>
                        Go to event page...
                    </a>
                </Box>
            </Box>

            <Box className={classes.event_detail_wrapper}>
                <Box className={classes.event_detail}>{'Date: '}</Box>
                <Box>{selectedEvent.datetime || 'not provided'}</Box>
            </Box>
            <Box className={classes.event_detail_wrapper}>
                <Box className={classes.event_detail}>{'Description: '} </Box>
                <Box>{selectedEvent.description || 'not provided'}</Box>
            </Box>

            <Box className={classes.event_detail_wrapper}>
                <Box className={classes.event_detail}>{'Venue: '} </Box>
                <Box>
                    <Box>{venueData.name}</Box>
                    <Box>{venueData.country}</Box>
                    <Box>{venueData.region}</Box>
                    <Box>{venueData.city}</Box>
                </Box>
            </Box>

            <Box className={classes.event_detail_wrapper}>
                <Box className={classes.event_detail}>{'Offers: '}</Box>
                {offersData.length
                    ? offersData.map((offer) => (
                          <Box key={offer.url}>
                              <Box>
                                  <Box>Type</Box>
                                  <Box>{offer.type}</Box>
                              </Box>
                              <Box>
                                  <Box>
                                      {
                                          <a rel="noopener noreferrer" target="_blank" href={offer.url}>
                                              View more details...
                                          </a>
                                      }
                                  </Box>
                              </Box>
                              <Box>
                                  <Box>Status</Box>
                                  <Box>{offer.status}</Box>
                              </Box>
                          </Box>
                      ))
                    : 'not provided'}
            </Box>
            <Map latitude={Number(venueData.latitude)} longitude={Number(venueData.longitude)} />
        </Box>
    );
};

EventInfo.propTypes = {
    selectedEvent: PropTypes.shape({
        venue: PropTypes.shape({
            name: PropTypes.string,
            country: PropTypes.string,
            region: PropTypes.string,
            city: PropTypes.string,
        }),
        description: PropTypes.string,
        datetime: PropTypes.string,
        offers: PropTypes.array,
    }),
    classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({
    event_details_head_wrapper: {
        display: 'flex',
        'justify-content': 'space-between',
    },
    event_wrapper: {
        width: '500px',
        margin: '10px 0',

        color: theme.palette.primary.main,
    },
    event_detail: { 'font-weight': 'bold' },
    event_detail_wrapper: {
        display: 'flex',
        'justify-content': 'normal',
    },
    emptyData: {
        color: theme.palette.secondary.main,
    },
});

export default withStyles(styles)(EventInfo);
