import ReactDom from 'react-dom';
import React from 'react';
import Sidebar from './Sidebar';

const osmcz = window.osmcz || {};
osmcz.events = osmcz.events || {};

osmcz.createPoiPanel = create;

window.osmcz = osmcz;

function create(poiSidebarElement) {
    ReactDom.render(
        <Sidebar/>,
        poiSidebarElement
    );
}
