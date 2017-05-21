import React from 'react';
import moment from 'moment';

const OpeningHoursInfoSummary = ({isOpen, todayInterval, expandHandler}) => {
    const openStatusClass = `${isOpen ? 'open' : 'closed'}`;
    const todayIntervalString = `${moment(todayInterval[0]).format('HH:mm')}-${moment(todayInterval[1]).format('HH:mm')}`;

    return (
        <div>
            <b className={openStatusClass}>
                &nbsp;{isOpen ? 'otevřeno' : 'zavřeno'}
            </b>
            &nbsp;
            ({todayIntervalString})

            <a href="#" onClick={expandHandler}>&#9662;</a>
        </div>
    );
};
OpeningHoursInfoSummary.propTypes = {
    // TODO: use proptypes package
    isOpen: React.PropTypes.bool.isRequired,
    todayInterval: React.PropTypes.array.isRequired
};

export default OpeningHoursInfoSummary;