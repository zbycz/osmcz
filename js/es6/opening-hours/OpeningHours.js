import React, {Component} from 'react';
import moment from 'moment';
import OpeningHoursInfo from 'opening_hours';
import './OpeningHours.scss';
import OpeningHoursInfoSummary from './OpeningHoursInfoSummary';
import OpeningHoursDetail from './OpeningHoursInfoDetail';

class OpeningHours extends Component {
    static propTypes = {
        // TODO: use proptypes package
        hours: React.PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            openingInfo: new OpeningHoursInfo(props.hours),
            infoExpanded: false
        };

        moment.locale('cs');
    }

    toggleInfoDetail = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({infoExpanded: !this.state.infoExpanded});
        return false;
    };

    render() {
        const {openingInfo, infoExpanded} = this.state;
        const openIntervals = openingInfo.getOpenIntervals(
            moment().startOf('day').toDate(),
            moment().endOf('day').add(7, 'days').toDate()
        );

        return (
            <div className="opening-hours">
                {!infoExpanded && <OpeningHoursInfoSummary isOpen={openingInfo.getState()} todayInterval={openIntervals[0]} expandHandler={this.toggleInfoDetail} />}
                {infoExpanded && <OpeningHoursDetail intervals={openIntervals} collapseHandler={this.toggleInfoDetail}/>}
            </div>
        );
    }
}

export default OpeningHours;