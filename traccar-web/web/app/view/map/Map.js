/*
 * Copyright 2015 - 2017 Anton Tananaev (anton@traccar.org)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

Ext.define('Traccar.view.map.Map', {
    extend: 'Traccar.view.map.BaseMap',
    xtype: 'mapView',

    requires: [
        'Traccar.view.map.MapController',
        'Traccar.view.SettingsMenu'
    ],

    controller: 'map',

   // title: Strings.mapTitle,
    tbar: {
        itemId: 'mapTopToolbar',
        componentCls: 'toolbar-header-style',
        defaults: {
            xtype: 'button',
            tooltipType: 'title',
            stateEvents: ['toggle'],
            enableToggle: true,
            stateful: {
                pressed: true
            }
        },
        items: [{
            xtype: 'tbtext',
            html: Strings.mapTitle,
            baseCls: 'x-panel-header-title-default'
        }, {
            xtype: 'tbfill'
        }, {
            handler: 'showEventsWindow',
            reference: 'showEventsWindow',           
            icon:'images/pop-up.png',
            stateful: false,
            pressed: false,            
            tooltip: Strings.reportEvents
        },{
            handler: 'showStateWindow',
            reference: 'showStateWindow',           
            icon:'images/rubik.png',
            stateful: false,
            pressed: false,            
            tooltip: Strings.stateTitle
        },{
            handler: 'showReports',
            reference: 'showReportsButton',
            glyph: 'xf0f6@FontAwesome',
            stateful: false,
            enableToggle: false,
            tooltip: Strings.reportTitle
        }, {
            handler: 'showEvents',
            reference: 'showEventsButton',
            glyph: 'xf27b@FontAwesome',
            stateful: false,
            enableToggle: false,
            tooltip: Strings.reportEvents
        }, {
            handler: 'updateGeofences',
            reference: 'showGeofencesButton',
            glyph: 'xf21d@FontAwesome',
            pressed: true,
            stateId: 'show-geofences-button',
            tooltip: Strings.sharedGeofences
        }, {
            handler: 'showLiveRoutes',
            reference: 'showLiveRoutes',
            glyph: 'xf1b0@FontAwesome',
            stateId: 'show-live-routes-button',
            tooltip: Strings.mapLiveRoutes
        }, {
            reference: 'deviceFollowButton',
            glyph: 'xf05b@FontAwesome',
            tooltip: Strings.deviceFollow,
            stateId: 'device-follow-button',
            toggleHandler: 'onFollowClick'
        }, {
            xtype: 'settingsMenu',
            enableToggle: false
        }]
    },

    getMarkersSource: function () {
        return this.markersSource;
    },

    getAccuracySource: function () {
        return this.accuracySource;
    },

    getRouteSource: function () {
        return this.routeSource;
    },

    getGeofencesSource: function () {
        return this.geofencesSource;
    },

    getLiveRouteSource: function () {
        return this.liveRouteSource;
    },

    getLiveRouteLayer: function () {
        return this.liveRouteLayer;
    },
    updatePopup: function (data) {
    setTimeout(function(){
        var attributes=Ext.getStore('Attributes');
        var device=data[0].get("record");
        var  Status=device.get('status'),
             Mileage=attributes.findRecord('attribute','totalDistance')?attributes.findRecord('attribute','totalDistance').get('value'):"NA",
             Time=attributes.findRecord('name','Time')?attributes.findRecord('name','Time').get('value'):"NA",
             Address=attributes.findRecord('name','address')?attributes.findRecord('name','address').get('value'):"NA",
             Power="On",
             Engin="On",
             Temp0='25.6C',
             Fuel=attributes.findRecord('name','fuel')?attributes.findRecord('name','fuel').get('value'):"NA",
             Ac='On'
        document.getElementById("overlayPopup").innerHTML=`
        <dev>
           <div>Status:${Status} </div>
           <div>Mileage:${Mileage} </div>
           <div>Time:${Time} </div>
           <div>Address:${Address} </div>
           <hr>
           <div>
           <img src="images/1.gif" alt="power" width="16" height="16">
                ${Power}
                <img src="images/2.gif" alt="Engine" width="16" height="16">
                ${Engin}
                <img src="images/3.png" alt="Temp" width="16" height="16">
                ${Temp0}
                <img src="images/4.png" alt="Fuel" width="16" height="16">
                ${Fuel}
                <img src="images/5.png" alt="Ac" width="16" height="16">
                ${Ac}
            </div>
        </dev>`;
        },300)
     },
    initMap: function () {
        this.callParent();

        this.geofencesSource = new ol.source.Vector({});
        this.map.addLayer(new ol.layer.Vector({
            name: 'geofencesLayer',
            source: this.geofencesSource
        }));

        this.liveRouteSource = new ol.source.Vector({});
        this.liveRouteLayer = new ol.layer.Vector({
            source: this.liveRouteSource,
            visible: this.lookupReference('showLiveRoutes').pressed
        });
        this.map.addLayer(this.liveRouteLayer);

        this.routeSource = new ol.source.Vector({});
        this.map.addLayer(new ol.layer.Vector({
            source: this.routeSource
        }));

        this.accuracySource = new ol.source.Vector({});
        this.map.addLayer(new ol.layer.Vector({
            name: 'accuracyLayer',
            source: this.accuracySource
        }));

        this.markersSource = new ol.source.Vector({});
        this.map.addLayer(new ol.layer.Vector({
            source: this.markersSource
        }));

        this.popup = new ol.Overlay({
            element: document.getElementById("overlayPopup"),
            id:'popup'
        });
        this.popup.setOffset([0, 30]);
        this.map.addOverlay(this.popup);
    }
});
