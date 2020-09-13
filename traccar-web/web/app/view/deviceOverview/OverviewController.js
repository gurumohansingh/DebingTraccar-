Ext.define('Traccar.view.deviceOverview.OverviewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.overview',

    init: function(){
        var overviewStore = Ext.create('Traccar.view.deviceOverview.DeviceOverviewStore');
        this.getView().down('dataview').setStore(overviewStore);
    },

    onAddDevice: function(record){
        var stateStore = Ext.data.StoreManager.lookup('deviceStateStore');
        var stateRecord = stateStore.getAt(stateStore.findExact('deviceId', record.get('id')));
        if(stateRecord){
            record.set('state', stateRecord.getData());
        }
        var activeIcons = {speed:"", battery:"", ignition:"", temp:"", airConditioner:"", fuel:"hidden", coolantTemp:"hidden", rpm:"hidden"};
        record.set(activeIcons);
        this.getView().down('dataview').getStore().add(record);
    },

    onRemoveDevice: function(record){
        //ToDo: Implement Ajax to get device details
        this.getView().down('dataview').getStore().remove(record);
    },
    onStateItemClick: function( view, record, item, index, e, eOpts ) {
       var newConfigWin = Ext.create('Traccar.view.deviceOverview.DevicesViewConfig');
       newConfigWin.down('form').loadRecord (record);
       newConfigWin.show();
    }
});
