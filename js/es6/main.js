import ReactDom from 'react-dom';
import React from 'react';
import Sidebar from './Sidebar';
import {presetIndex} from './presets/index';
import {addTranslation, setLocale} from './util/locale';
import locale_cs from './data/locales/cs.json';

const osmcz = window.osmcz || {};
osmcz.events = osmcz.events || {};
osmcz.events.onPoiPanelUpdate = () => {};
osmcz.presets = presetIndex();
osmcz.presets.init();
//    areaKeys = presets.areaKeys();

osmcz.createPoiPanel = function create(poiSidebarElement) {
    ReactDom.render(
        <Sidebar/>,
        poiSidebarElement
    );
};

window.osmcz = osmcz;

export default osmcz;


//locale
addTranslation('cs', locale_cs);
setLocale('cs');
