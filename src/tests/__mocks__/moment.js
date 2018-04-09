const moment = require.requireActual('moment'); // Must be used instead of import
                                                // otherwise would import itselfu
export default (timestamp = 0 ) => {
    return moment(timestamp);
}

