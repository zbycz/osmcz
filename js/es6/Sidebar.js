import React, {Component} from 'react';
import OpeningHours from './opening-hours/OpeningHours';
import './Sidebar.scss';

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            feature: {},
            iconUrl: ''
        };
    }

    componentWillMount() {
        osmcz.events.onPoiPanelUpdate = (feature, icon) => {
            this.setState({feature, iconUrl: icon});
        };
    }

    render() {
        const {
            iconUrl,
            feature: {properties: {tags: {
                name: poiName = '',
                opening_hours: openingHours = ''
            } = {}} = {}} = {}
        } = this.state;
        return (
            <div className="poi-sidebar">
                <h4>
                    <img src={iconUrl} className="poi-icon"/>
                    &nbsp;
                    <span className="h4-text">{poiName}</span>
                </h4>
                {!!openingHours && <OpeningHours hours={openingHours}/>}
            </div>
        );
    }
}

export default Sidebar;