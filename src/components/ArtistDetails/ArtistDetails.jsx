import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const ArtistDetails = ({ artistData, classes }) => (
    <>
        <Typography variant="h5" gutterBottom color="primary">
            Artist details
        </Typography>
        <Box className={classes.details_wrapper}>
            <Box className={classes.detail_wrapper}>
                <Box className={classes.detail_name}>Name: </Box>
                <Box className={classes.detail_body}>{artistData.name}</Box>
            </Box>
            {artistData.facebook_page_url ? (
                <Box className={classes.detail_wrapper}>
                    <Box className={classes.detail_name}>Facebook: </Box>
                    <Box className={classes.detail_body}>
                        <a rel="noopener noreferrer" target="_blank" href={artistData.facebook_page_url}>
                            {artistData.facebook_page_url}
                        </a>
                    </Box>
                </Box>
            ) : (
                ' '
            )}

            <img src={artistData.thumb_url} alt="artist logo" />
        </Box>
    </>
);

ArtistDetails.propTypes = {
    artistData: PropTypes.shape({
        name: PropTypes.string,
        facebook_page_url: PropTypes.string,
        thumb_url: PropTypes.string,
    }),
    classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({
    details_wrapper: {
        width: '300px',
        margin: '10px 0',
        display: 'flex',
        'align-items': 'baseline',
        'flex-direction': 'column',
        color: theme.palette.primary.main,
    },
    detail_wrapper: {
        display: 'flex',
        'justify-content': 'space-between',
    },
    detail_name: { 'font-weight': 'bold' },
});

export default withStyles(styles)(ArtistDetails);
