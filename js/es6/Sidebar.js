import React, {Component} from 'react';
import OpeningHours from './opening-hours/OpeningHours';
import './Sidebar.scss';
import osmcz from './main';

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
            feature: {
                properties: {
                    osm_id,
                    osm_type,
                    tags: {
                        name: poiName = '',
                        opening_hours: openingHours = ''
                    } = {}
                } = {}
            } = {}
        } = this.state;



        if (osm_id) {
            let entity = {
                osm_id,
                osm_type,
                geometry: () => "point",
                isOnAddressLine: () => false,
                tags: this.state.feature.properties.tags
            };
            let preset = osmcz.presets.match(entity);
            console.log(preset);
        }

        // let fieldsArr = [];
        //
        // //name jako první
        // if (presets.field('name')) {
        //     fieldsArr.push([presets.field('name'), entity]);
        // }
        //
        // // dle geometrie
        // preset.fields.forEach(function(field) {
        //     if (field.matchGeometry(entity.geometry())) {
        //         fieldsArr.push(UIField(field, entity, true));
        //     }
        // });
        //
        // // universální??
        // presets.universal().forEach(function(field) {
        //     if (preset.fields.indexOf(field) < 0) {
        //         fieldsArr.push(UIField(field, entity));
        //     }
        // });



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