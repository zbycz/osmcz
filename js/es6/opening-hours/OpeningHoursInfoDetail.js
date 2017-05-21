import React from 'react';
import moment from 'moment';

const OpeningHoursInfoDetail = ({intervals, collapseHandler}) => (
    <div>
        <a href="#" onClick={collapseHandler} style={{float:"right"}}>&#9652;</a>
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
    </div>
);

OpeningHoursInfoDetail.propTypes = {
    // TODO: use proptypes package
    intervals: React.PropTypes.array.isRequired
};

export default OpeningHoursInfoDetail;