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

Ext.define('Traccar.view.dialog.CustomAvatar', {
    extend: 'Traccar.view.dialog.Base',
    title: 'Upload SVG only',
    controller: 'CustomAvatarController',
    items: {
        xtype: 'form',
        reference:'form',
        items: [{
            xtype: 'fieldset',
            items: [{
                xtype: 'filefield',
                name: 'file',
                fieldLabel: 'Custom Avatar',
                msgTarget: 'side',
                allowBlank: false,
                anchor: '100%',
                buttonText: 'Select Avatar',
                listeners:{
                            afterrender:function(cmp){
                              cmp.fileInputEl.set({
                                accept:'.svg' // or w/e type
                              });
                            }
                        }
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
