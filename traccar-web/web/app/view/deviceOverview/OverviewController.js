Ext.define('Traccar.view.deviceOverview.OverviewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.overview',

    init: function(){
        var overviewStore = Ext.create('Traccar.view.deviceOverview.DeviceOverviewStore');
        this.getView().down('dataview').setStore(overviewStore);
    },

    onAddDevice: function(record){
        //ToDo: Implement Ajax to get device details
        this.getView().down('dataview').getStore().add(record);
    },

    onRemoveDevice: function(record){
        //ToDo: Implement Ajax to get device details
        this.getView().down('dataview').getStore().remove(record);
    }
});
