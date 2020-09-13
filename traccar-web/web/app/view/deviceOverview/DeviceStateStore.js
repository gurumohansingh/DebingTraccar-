Ext.define('Traccar.view.deviceOverview.DeviceStateStore', {
    extend: 'Ext.data.Store',
    alias: 'store.deviceStateStore',
    storeId: 'deviceStateStore',
    proxy: {
        type: 'rest',
        url: 'api/positions'
    }
});