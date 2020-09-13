Ext.define('Traccar.view.deviceOverview.OverviewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.overview',

    init: function(){
        var overviewStore = Ext.create('Traccar.view.deviceOverview.DeviceOverviewStore');
        this.getView().down('dataview').setStore(overviewStore);
    },

    onAddDevice: function(record){
        //ToDo: Implement Ajax to get device details
        var deviceIcons={type1:"",type2:"",type3:"",type4:"",type5:"",type6:"hidden",type7:"hidden",type8:"hidden"};
        record.set(deviceIcons);
        this.getView().down('dataview').getStore().add(record);
    },

    onRemoveDevice: function(record){
        //ToDo: Implement Ajax to get device details
        this.getView().down('dataview').getStore().remove(record);
    },
    configView:function( view, record, item, index, e, eOpts ) {
       var newConfigWin=Ext.create('Traccar.view.deviceOverview.DevicesViewConfig');
       newConfigWin.down('form').loadRecord (record);
       newConfigWin.show();
    }
});
