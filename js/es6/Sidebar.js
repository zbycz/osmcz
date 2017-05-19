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



        let preset;
        let fields;
        if (osm_id) {
            let entity = {
                osm_id,
                osm_type,
                geometry: () => "point",
                isOnAddressLine: () => false,
                tags: this.state.feature.properties.tags
            };
            preset = osmcz.presets.match(entity);
            console.log(preset);

            let fieldsArr = [];

            //name jako první
            if (osmcz.presets.field('name')) {
                fieldsArr.push(osmcz.presets.field('name'));
            }

            // dle geometrie
            preset.fields.forEach(function(field) {
                if (field.matchGeometry(entity.geometry())) {
                    fieldsArr.push(field);
                }
            });

            // universální??
            osmcz.presets.universal().forEach(function(field) {
                if (preset.fields.indexOf(field) < 0) {
                    fieldsArr.push(field);
                }
            });

            fields = fieldsArr.map((f, step) => {
                let x = JSON.stringify(f);
                return (
                    <div key={f.id}>
                        {f.label()}: <input value={entity.tags[f.key]} onclick={()=>alert(x)}/>
                    </div>
                );
            });
        }



        return (
            <div className="poi-sidebar">
                <h4>
                    <img src={iconUrl} className="poi-icon"/>
                    &nbsp;
                    <span className="h4-text">{poiName}</span>
                </h4>
                {!!openingHours && <OpeningHours hours={openingHours}/>}

                <br />
                    {fields}
            </div>
        );
    }
}

export default Sidebar;