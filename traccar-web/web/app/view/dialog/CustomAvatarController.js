/*
 * Copyright 2016 - 2018 Anton Tananaev (anton@traccar.org)
 * Copyright 2016 - 2018 Andrey Kunitsyn (andrey@traccar.org)
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

Ext.define('Traccar.view.dialog.CustomAvatarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CustomAvatarController',

    onSaveClick: function (btn) {
    var me=this,view=me.getView(),form=view.lookupReference('form');
        if(form.isValid()) {
            form.submit({
                url: 'api/devices/upload',
                params: {deviceId: "json"},
                waitMsg: 'Uploading your photo...',
                success: function(fp, o) {
                    Ext.Msg.alert('Success', 'Your photo "' + o.result.file + '" has been uploaded.');
                }
            });
        }
    }
});
