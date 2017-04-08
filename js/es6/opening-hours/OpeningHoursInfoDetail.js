import React from 'react';
import moment from 'moment';

const OpeningHoursInfoDetail = ({intervals}) => (
    <table className="detail">
        <tbody>
        {intervals.map((interval, i) =>
            <tr key={i}>
                <td className="day">
                    <b>{moment(interval[0]).format('dddd')}</b>:
                </td>
                <td className="interval">
                    {`${moment(interval[0]).format('HH:mm')}-${moment(interval[1]).format('HH:mm')}`}
                </td>
            </tr>
        )}
        </tbody>
    </table>
);

OpeningHoursInfoDetail.propTypes = {
    // TODO: use proptypes package
    intervals: React.PropTypes.array.isRequired
};

export default OpeningHoursInfoDetail;