import React, {Component} from 'react';
import OpeningHours from './opening-hours/OpeningHours';
import './Sidebar.scss';
import osmcz from './main';
import {currentLocale} from './util/locale';

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

        if (!osm_id) {
            return <div>Nothing selected</div>
        }



        let preset;
        let fields;
        let category;
        let entity = {
            osm_id,
            osm_type,
            geometry: () => "point",
            isOnAddressLine: () => false,
            tags: this.state.feature.properties.tags
        };

        preset = osmcz.presets.match(entity);
        category = preset.name();
        console.log('preset:', preset);

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

        function fieldValueComponent(f, tags) {
            const value = tags[f.key];
            if (f.key == "opening_hours") {
                return <OpeningHours hours={value}/>
            }

            let out = value;
            if (f.type == "localized") {
                out = tags[f.key + ":" + currentLocale] || value;
            }
            if (f.type == "combo") {
                let optstrings = f.strings && f.strings.options;
                out = optstrings && optstrings[value] || value;
            }
            if (f.type == "semiCombo") {
                out = value.split(";").join(", ");
            }
            if (f.type == "address") {
                out = `${tags["addr:street"] || ''} ${tags["addr:housenumber"] || ''} ${tags["addr:postcode"] || ''} ${tags["addr:city"] || ''}`;
                if (!tags["addr:street"] && !tags["addr:housenumber"] && !tags["addr:postcode"] && !tags["addr:city"])
                    out = false;
            }
            if (f.type == "check") {
                out = (value == "yes") && "Ano" || (value == "no") && "Ne";
            }
            if (!out)
                return;
            return <b style={{paddingLeft:"1em"}}>{out}</b>
        }

        fields = fieldsArr.map(f => {
            let field = fieldValueComponent(f, entity.tags);
            if (!field) return;

            return (
                <div key={osm_type+osm_id+f.id} onClick={()=>console.log(f)}>
                    {f.label()}: <i>{f.type}</i><br />
                    {field}
                </div>
            );
        });



        let tags = [];
        _.each(entity.tags, (v,k) => {
            tags.push(<div key={osm_id+k}><b>{k}:</b> {v}</div>);
        });


        return (
            <div className="poi-sidebar">
                <h4>
                    <img src={iconUrl} className="poi-icon"/>
                    &nbsp;
                    <span className="h4-text">{poiName}</span>
                </h4>
                <p><b>{category}</b></p>
                <br />
                    {fields}
                <hr/>
                {tags}

            </div>
        );
    }
}

export default Sidebar;