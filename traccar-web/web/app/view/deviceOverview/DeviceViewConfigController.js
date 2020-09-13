Ext.define('Traccar.view.deviceOverview.DeviceViewConfigController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.deviceViewConfig',

    onConfigFormRender: function(form){
        var record = form.getRecord();
        if(!record.get('speed')){
            form.query('#speedCheck')[0].setValue(true);
        }

        if(!record.get('battery')){
            form.query('#batteryCheck')[0].setValue(true);
        }

        if(!record.get('ignition')){
            form.query('#ignitionCheck')[0].setValue(true);
        }

        if(!record.get('temp')){
            form.query('#tempCheck')[0].setValue(true);
        }

        if(!record.get('airConditioner')){
            form.query('#airConditionerCheck')[0].setValue(true);
        }

        if(!record.get('fuel')){
            form.query('#fuelCheck')[0].setValue(true);
        }

        if(!record.get('coolantTemp')){
            form.query('#coolantTempCheck')[0].setValue(true);
        }

        if(!record.get('rpm')){
            form.query('#rpmCheck')[0].setValue(true);
        }
    },

    onPrefChange: function(checkbox, newVal){
        var form = checkbox.up('form');
        var checked = form.query('checkbox');
        var selected = 0;
        for(var i=0; i < checked.length; i++){
            if(checked[i].checked)
                selected++;
        }
        if(selected > 5 && newVal){
            checkbox.suspendEvents();
            checkbox.setValue(false);
            checkbox.resumeEvents();
        }
    },

    onSaveClick: function(button){
        var form = button.up('form');
        var record = form.getRecord();
        var selected = form.query('checkbox');
        for(var i=0; i < selected.length; i++){
            var checked = false
            if(selected[i].checked){
                checked = true;
            }
            if(selected[i].itemId === 'speedCheck'){
                record.set('speed', checked ? '' : 'hidden');
            }
            if(selected[i].itemId === 'batteryCheck'){
                record.set('battery', checked ? '' : 'hidden');
            }
            if(selected[i].itemId === 'ignitionCheck'){
                record.set('ignition', checked ? '' : 'hidden');
            }
            if(selected[i].itemId === 'tempCheck'){
                record.set('temp', checked ? '' : 'hidden');
            }
            if(selected[i].itemId === 'airConditionerCheck'){
                record.set('airConditioner', checked ? '' : 'hidden');
            }
            if(selected[i].itemId === 'fuelCheck'){
                record.set('fuel', checked ? '' : 'hidden');
            }
            if(selected[i].itemId === 'coolantTempCheck'){
                record.set('coolantTemp', checked ? '' : 'hidden');
            }
            if(selected[i].itemId === 'rpmCheck'){
                record.set('rpm', checked ? '' : 'hidden');
            }
        }
    }
});