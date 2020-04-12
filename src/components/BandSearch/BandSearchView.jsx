import React from 'react';

import { Form } from 'formik';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import { EventsList } from '../EventsList';
import { ArtistDetails } from '../ArtistDetails';
import { withStyles } from '@material-ui/core';

class BandSearchView extends React.Component {
    handleSearchFieldChange = (e) => {
        const { setFieldValue, handleSearch } = this.props;
        setFieldValue('searchQuery', e.target.value);
        handleSearch(e.target.value);
    };

    render() {
        const {
            touched,
            errors,
            handleSubmit,
            values,
            handleBlur,
            artistData,
            isLoading,
            artistEventsData,
            classes,
        } = this.props;

        return (
            <Form onSubmit={handleSubmit}>
                <Box>
                    <Typography variant="h4" gutterBottom color="primary">
                        {"Who's In Town?"}
                    </Typography>
                    <Box className={classes.search_wrapper}>
                        <InputLabel shrink>Search</InputLabel>
                        <TextField
                            className={classes.search_field}
                            name="searchQuery"
                            value={values['searchQuery']}
                            type="text"
                            onChange={this.handleSearchFieldChange}
                            onBlur={handleBlur}
                            error={!!errors['searchQuery'] && touched['searchQuery']}
                            helperText={touched['searchQuery'] ? errors['searchQuery'] : ''}
                            variant="outlined"
                        />
                    </Box>
                    {isLoading ? (
                        <LinearProgress className={classes.search_progress} />
                    ) : (
                        <>
                            <ArtistDetails artistData={artistData} />
                            <EventsList artistEventsData={artistEventsData} />
                        </>
                    )}
                </Box>
            </Form>
        );
    }
}

const styles = {
    search_wrapper: { width: '300px', color: 'primary' },
    search_field: { width: '100%' },
    search_progress: { width: '300px', margin: '10px 0' },
};

export default withStyles(styles)(BandSearchView);
