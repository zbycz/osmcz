import React, {Component} from 'react';

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
            feature: {properties: {tags: {name: poiName = ''} = {}} = {}} = {}
        } = this.state;
        return (
            <div className="leaflet-control">
                <h4>
                    <img src={iconUrl} className="poi-icon"/>
                    &nbsp;
                    <span className="h4-text">{poiName}</span>
                </h4>
            </div>
        );
    }
}

export default Sidebar;