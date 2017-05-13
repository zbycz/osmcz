import ReactDom from 'react-dom';
import React from 'react';
import Sidebar from './Sidebar';
import {presetIndex} from './presets/index';

const osmcz = window.osmcz || {};
osmcz.events = osmcz.events || {};
osmcz.events.onPoiPanelUpdate = () => {};
osmcz.presetIndex = presetIndex();

osmcz.createPoiPanel = function create(poiSidebarElement) {
    ReactDom.render(
        <Sidebar/>,
        poiSidebarElement
    );
};

window.osmcz = osmcz;

export default osmcz

