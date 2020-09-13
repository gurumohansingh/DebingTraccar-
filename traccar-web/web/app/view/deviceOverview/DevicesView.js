Ext.define('Traccar.view.deviceOverview.DevicesView', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Traccar.view.deviceOverview.DeviceOverviewStore',
        'Traccar.view.deviceOverview.OverviewController'
    ],

    controller: 'overview',

    floating: true,
    shadow: false,
    border: false,
    frame: false,
    height: Ext.getBody().getViewSize().height,
    width: 300,
    bodyStyle: 'background:transparent;',
    layout: 'fit',
    margin: '10px 10px 10px 10px',

    items:[{
        xtype: 'dataview',
        listeners:{
            itemclick:'configView' 
        },
        tpl: new Ext.XTemplate('<tpl for=".">',
            '<div style="margin:10px;background-color:lightgrey;border-radius:15px" height= "50 px" class="thumb-wrap">',
                '<div style="background-color:seagreen;font-weight:bold;padding:6px;border-top-left-radius: 15px;border-top-right-radius: 15px;">{name}</div>',
                '<div style="padding:5px;">',
                    '<table width="100%" style="border-spacing:5px;">',
                        '<tr>',
                            '<td {type1} width="20%" style="text-align:center;margin:8px;background-color:white;border-radius:8px;">',
                                '<img src="./images/1.gif" width="20" height="20">',
                                '<br/> Text',
                            '</td>',
                            '<td width="20%" style="text-align:center;margin:8px;background-color:white;border-radius:8px;">',
                                '<img src="./images/2.gif" width="20" height="20">',
                                '<br/> Text',
                            '</td>',
                            '<td width="20%" style="text-align:center;margin:8px;background-color:white;border-radius:8px;">',
                                '<img src="./images/3.png" width="20" height="20">',
                                '<br/> Text',
                            '</td>',
                            '<td width="20%" style="text-align:center;margin:8px;background-color:white;border-radius:8px;">',
                                '<img src="./images/4.png" width="20" height="20">',
                            '</td>',
                            '<td width="20%" style="text-align:center;margin:8px;background-color:white;border-radius:8px;">',
                                '<img src="./images/5.png" width="20" height="20">',
                            '</td>',
                        '</tr>',
                    '</table>',
                '</div>',
            '</div>',
         '</tpl>'),
        itemSelector: 'div.thumb-wrap'
    }],

    listeners: {
        addDevice: 'onAddDevice',
        removeDevice: 'onRemoveDevice'
    }
});
