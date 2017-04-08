import React from 'react';
import moment from 'moment';

const OpeningHoursInfoSummary = ({isOpen, todayInterval}) => {
    const openStatusClass = `${isOpen ? 'open' : 'closed'}`;
    const todayIntervalString = `${moment(todayInterval[0]).format('HH:mm')}-${moment(todayInterval[1]).format('HH:mm')}`;

    return (
        // TODO: probably too small text
        <h5 className="summary">
            Nyní
            <span className={openStatusClass}>
                &nbsp;{isOpen ? 'otevřeno' : 'zavřeno'}
            </span>
            &nbsp;
            ({todayIntervalString})
        </h5>
    );
};
OpeningHoursInfoSummary.propTypes = {
    // TODO: use proptypes package
    isOpen: React.PropTypes.bool.isRequired,
    todayInterval: React.PropTypes.array.isRequired
};

export default OpeningHoursInfoSummary;