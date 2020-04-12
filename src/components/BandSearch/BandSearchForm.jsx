import { withFormik } from 'formik';

import BandSearchView from './BandSearchView';

const BandSearchForm = withFormik({
    mapPropsToValues: () => ({ searchQuery: '' }),

    displayName: 'BandSearchForm',
})(BandSearchView);

export default BandSearchForm;
