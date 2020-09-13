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
    items: {
        xtype: 'form',
        reference:'form',
        defaultType: 'checkboxfield',
        defaults:{
            width:100,
            height:100
        },
        layout: {
            type: 'table',
            columns: 4
        },
        items: [{
            name:'type1'
        },{
            name:'type2'
        },{
            name:'type3'
        },{
            name:'type4'
        },{
            name:'type5'
        },{
            name:'type6'
        },{
            name:'type7'
        },{
            name:'type7'
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
