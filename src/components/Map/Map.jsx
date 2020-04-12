import React from 'react';
import ReactMapGL from 'react-map-gl';
import PropTypes from 'prop-types';

import { config } from '../../config';

class Map extends React.Component {
    static propTypes = {
        longitude: PropTypes.number.isRequired,
        latitude: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);
        const { latitude, longitude } = props;

        this.state = {
            viewport: {
                width: 400,
                height: 400,
                zoom: 8,
                latitude,
                longitude,
            },
        };
    }

    componentDidMount() {}

    render() {
        return (
            <ReactMapGL
                mapboxApiAccessToken={config.reactMapGLToken}
                {...this.state.viewport}
                onViewportChange={(viewport) => this.setState({ viewport })}
            />
        );
    }
}

export default Map;
