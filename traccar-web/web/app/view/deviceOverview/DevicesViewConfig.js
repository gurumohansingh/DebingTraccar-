/*
* Copyright 2017 Anton Tananaev (anton@traccar.org)
* Copyright 2017 Andrey Kunitsyn (andrey@traccar.org)
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

Ext.define('Traccar.view.deviceOverview.DevicesViewConfig', {
    extend: 'Traccar.view.dialog.Base',
    title: 'Select any five',
    controller: 'deviceViewConfig',
    items: {
        xtype: 'form',
        reference:'form',
        listeners:{
            render: 'onConfigFormRender'
        },
        defaults:{
            xtype: 'container',
            width: 100,
            height: 100,
            layout: 'hbox'
        },
        layout: {
            type: 'table',
            columns: 4
        },
        items: [{
            items:[{
                xtype: 'checkbox',
                itemId: 'speedCheck',
                listeners:{
                    change: 'onPrefChange'
                }
            },{
                xtype: 'image',
                src: './images/speed.svg',
                height: 40,
                width: 40,
                margin: 10

            }]
        },{
            items:[{
                xtype: 'checkbox',
                itemId: 'batteryCheck',
                listeners:{
                    change: 'onPrefChange'
                }
            },{
                xtype: 'image',
                src: './images/1.gif',
                height: 40,
                width: 40,
                margin: 10
            }]
        },{
            items:[{
                xtype: 'checkbox',
                itemId: 'ignitionCheck',
                listeners:{
                    change: 'onPrefChange'
                }
            },{
                xtype: 'image',
                src: './images/2.gif',
                height: 40,
                width: 40,
                margin: 10
            }]
        },{
            items:[{
                xtype: 'checkbox',
                itemId: 'tempCheck',
                listeners:{
                    change: 'onPrefChange'
                }
            },{
                xtype: 'image',
                src: './images/3.png',
                height: 40,
                width: 40,
                margin: 10
            }]
        },{
            items:[{
                xtype: 'checkbox',
                itemId: 'airConditionerCheck',
                listeners:{
                    change: 'onPrefChange'
                }
            },{
                xtype: 'image',
                src: './images/5.png',
                height: 40,
                width: 40,
                margin: 10
            }]
        },{
            items:[{
                xtype: 'checkbox',
                itemId: 'fuelCheck',
                listeners:{
                    change: 'onPrefChange'
                }
            },{
                xtype: 'image',
                src: './images/4.png',
                height: 40,
                width: 40,
                margin: 10
            }]
        },{
            items:[{
                xtype: 'checkbox',
                itemId: 'coolantTempCheck',
                listeners:{
                    change: 'onPrefChange'
                }
            },{
                xtype: 'image',
                src: './images/hot-water.svg',
                height: 40,
                width: 40,
                margin: 10
            }]
        },{
            items:[{
                xtype: 'checkbox',
                itemId: 'rpmCheck',
                listeners:{
                    change: 'onPrefChange'
                }
            },{
                xtype: 'image',
                src: './images/1111.svg',
                height: 40,
                width: 40,
                margin: 10
            }]
        }],
        buttons: [{
            glyph: 'xf00c@FontAwesome',
            reference: 'saveButton',
            tooltip: Strings.sharedSave,
            tooltipType: 'title',
            minWidth: 0,
            handler: 'onSaveClick'
        }, {
            glyph: 'xf00d@FontAwesome',
            tooltip: Strings.sharedCancel,
            tooltipType: 'title',
            minWidth: 0,
            handler: function(){
                this.up('window').close()
            }
        }]
    }
});
