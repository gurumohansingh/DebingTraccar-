/*
 * Copyright 2016 Anton Tananaev (anton@traccar.org)
 * Copyright 2016 Andrey Kunitsyn (andrey@traccar.org)
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

Ext.define('Traccar.DeviceImages', {
    singleton: true,

    getImageSvg: function (color, zoom, angle, category) {
        var i, info, svg, width, height, rotateTransform, scaleTransform, fill;

        info = Ext.getStore('DeviceImages').findRecord('key', category || 'default', 0, false, false, true);
         if(Ext.isEmpty(info)){
           info= this.addSvgFile(category,'images/' + category + '.svg', category + 'Svg');
        }
        svg = Ext.clone(info.get('svg'));
        if (!svg) {
            svg = this.cloneDocument(info.get('svg'));
        }

        width = parseFloat(svg.documentElement.getAttribute('width'));
        height = parseFloat(svg.documentElement.getAttribute('height'));

        fill = info.get('fillId');
        if (!Ext.isArray(fill)) {
            fill = [fill];
        }
        for (i = 0; i < fill.length; i++) {
            svg.getElementById(fill[i]).style.fill = color;
        }

        rotateTransform = 'rotate(' + angle + ' ' + width / 2 + ' ' + height / 2 + ')';
        svg.getElementById(info.get('rotateId')).setAttribute('transform', rotateTransform);

        if (zoom) {
            width *= Traccar.Style.mapScaleSelected;
            height *= Traccar.Style.mapScaleSelected;
            scaleTransform = 'scale(' + Traccar.Style.mapScaleSelected + ') ';
        } else {
            width *= Traccar.Style.mapScaleNormal;
            height *= Traccar.Style.mapScaleNormal;
            scaleTransform = 'scale(' + Traccar.Style.mapScaleNormal + ') ';
        }

        if (info.get('scaleId') !== info.get('rotateId')) {
            svg.getElementById(info.get('scaleId')).setAttribute('transform', scaleTransform);
        } else {
            svg.getElementById(info.get('scaleId')).setAttribute('transform', scaleTransform + ' ' + rotateTransform);
        }

        svg.documentElement.setAttribute('width', width);
        svg.documentElement.setAttribute('height', height);
        svg.documentElement.setAttribute('viewBox', '0 0 ' + width + ' ' + height);

        return svg;
    },

    formatSrc: function (svg) {
        return 'data:image/svg+xml;charset=utf-8,' +
                encodeURIComponent(new XMLSerializer().serializeToString(svg.documentElement));
    },

    cloneDocument: function (svgDocument) {
        var newDocument, newNode;
        newDocument = svgDocument.implementation.createDocument(svgDocument.namespaceURI, null, null);
        newNode = newDocument.importNode(svgDocument.documentElement, true);
        newDocument.appendChild(newNode);
        return newDocument;
    },

    getImageIcon: function (color, zoom, angle, category) {
        var image, svg, width, height;

        svg = this.getImageSvg(color, zoom, angle, category);
        width = parseFloat(svg.documentElement.getAttribute('width'));
        height = parseFloat(svg.documentElement.getAttribute('height'));

        image = new ol.style.Icon({
            imgSize: [width, height],
            src: this.formatSrc(svg)
        });
        image.fill = color;
        image.zoom = zoom;
        image.angle = angle;
        image.category = category;

        return image;
    },
    addSvgFile:function(key,file, id) {
        var store= Ext.getStore('DeviceImages');
        var svg = document.createElement('object');
        svg.setAttribute('id', id);
        svg.setAttribute('data', file);
        svg.setAttribute('type', 'image/svg+xml');
        svg.setAttribute('style', 'visibility:hidden;position:absolute;left:-100px;');
        document.body.appendChild(svg);
        var data={
            key: key,
            name: 'category' + key.charAt(0).toUpperCase() + key.slice(1),
            svg: document.getElementById(key + 'Svg').contentDocument,
            fillId: key === 'arrow' ? 'arrow' : 'background',
            rotateId: key === 'arrow' ? 'arrow' : 'background',
            scaleId: key === 'arrow' ? 'arrow' : 'layer1'
        };
        store.add(data);
        return  store.findRecord('key', key || 'default', 0, false, false, true);
    }
});
