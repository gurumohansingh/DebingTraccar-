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

Ext.define('Traccar.view.edit.DevicesController', {
    extend: 'Traccar.view.edit.ToolbarController',
    alias: 'controller.devices',

    requires: [
        'Traccar.view.dialog.SendCommand',
        'Traccar.view.dialog.Device',
        'Traccar.view.permissions.Geofences',
        'Traccar.view.permissions.ComputedAttributes',
        'Traccar.view.permissions.Drivers',
        'Traccar.view.permissions.SavedCommands',
        'Traccar.view.BaseWindow',
        'Traccar.model.Device',
        'Traccar.model.Command'
    ],

    config: {
        listen: {
            controller: {
                '*': {
                    selectreport: 'deselectDevice',
                    selectevent: 'deselectDevice'
                },
                'root': {
                    selectdevice: 'selectDevice'
                },
                'map': {
                    selectdevice: 'selectDevice',
                    deselectfeature: 'deselectFeature'
                }
            },
            store: {
                '#Devices': {
                    update: 'onUpdateDevice'
                }
            }
        }
    },

    objectModel: 'Traccar.model.Device',
    objectDialog: 'Traccar.view.dialog.Device',
    removeTitle: Strings.sharedDevice,

    init: function () {
        var self = this, readonly, deviceReadonly;
        deviceReadonly = Traccar.app.getPreference('deviceReadonly', false) && !Traccar.app.getUser().get('administrator');
        readonly = Traccar.app.getPreference('readonly', false) && !Traccar.app.getUser().get('administrator');
        this.lookupReference('toolbarAddButton').setDisabled(readonly || deviceReadonly);
        this.lookupReference('toolbarDeviceMenu').setHidden(readonly || deviceReadonly);

        setInterval(function () {
            self.getView().getView().refresh();
        }, Traccar.Style.refreshPeriod);

        Ext.create('Traccar.view.deviceOverview.DeviceStateStore').load();
    },

    onCommandClick: function () {
        var device, deviceId, dialog, typesStore, commandsStore;
        device = this.getView().getSelectionModel().getSelection()[0];
        deviceId = device.get('id');

        dialog = Ext.create('Traccar.view.dialog.SendCommand');
        dialog.deviceId = deviceId;

        commandsStore = dialog.lookupReference('commandsComboBox').getStore();
        commandsStore.getProxy().setExtraParam('deviceId', deviceId);
        if (!Traccar.app.getPreference('limitCommands', false)) {
            commandsStore.add({
                id: 0,
                description: Strings.sharedNew
            });
        }
        commandsStore.load({
            addRecords: true
        });

        typesStore = dialog.lookupReference('commandType').getStore();
        typesStore.getProxy().setExtraParam('deviceId', deviceId);
        typesStore.load();

        dialog.show();
    },

    updateButtons: function (selected) {
        var readonly, deviceReadonly, empty, deviceMenu;
        deviceReadonly = Traccar.app.getPreference('deviceReadonly', false) && !Traccar.app.getUser().get('administrator');
        readonly = Traccar.app.getPreference('readonly', false) && !Traccar.app.getUser().get('administrator');
        empty = selected.length === 0;
        this.lookupReference('toolbarEditButton').setDisabled(empty || readonly || deviceReadonly);
        this.lookupReference('toolbarRemoveButton').setDisabled(empty || readonly || deviceReadonly);
        deviceMenu = this.lookupReference('toolbarDeviceMenu');
        deviceMenu.device = empty ? null : selected[0];
        deviceMenu.setDisabled(empty);
        this.lookupReference('deviceCommandButton').setDisabled(empty || readonly);
    },

    onItemclick: function (el, record,item, index, e, eOpts ) {
        if (record) {
            this.updateButtons(record);
            this.fireEvent('selectdevice', record, true);
            this.updatingRecord=record;
        }
    },

    onSelectionChange: function (el, records) {
        var visibleStore=Ext.getStore('VisibleDevices');
        visibleStore.loadRecords(records, true ) ;       
    },

    selectDevice: function (device) {
        this.getView().getSelectionModel().select([device], false, true);
        this.updateButtons(this.getView().getSelectionModel().getSelected().items);
        this.getView().getView().focusRow(device);
    },

    deselectDevice: function (object) {
        if (object) {
            this.deselectFeature();
        }
    },

    onUpdateDevice: function () {
        this.updateButtons(this.getView().getSelectionModel().getSelected().items);
    },

    deselectFeature: function () {
        this.getView().getSelectionModel().deselectAll();
    },

    searchDevice: function(field, trigger, e) {
        var searchTxt = field.getValue();
        if(searchTxt){
            this.getView().getStore().filter('name', searchTxt);
        }
    },

    onDeviceSearchChange: function(field, newVal){
        if(!newVal){
            this.getView().getStore().clearFilter();
        }
    },

    onDeviceSelect: function(selModel, record){
        var overview = Ext.ComponentQuery.query('#devicesOverview'),
        panel;
        if(overview.length > 0){
            panel = overview[0];
        }else{
            var tbar = Ext.ComponentQuery.query('#mapTopToolbar')[0];
            var map = tbar.up('mapView');
            panel = Ext.create('Traccar.view.deviceOverview.DevicesView',{
                itemId: 'devicesOverview',
                height: map.getHeight() - 50
            });
            panel.show().alignTo(Ext.getBody(), 'tr-tr');
        }
        panel.fireEvent('addDevice', record);
    },

    onDeviceDeselect: function(selModel, record){
        var overview = Ext.ComponentQuery.query('#devicesOverview');
        if(overview.length > 0){
            overview[0].fireEvent('removeDevice', record);
        }
    }
});
