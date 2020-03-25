import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker, Polyline } from 'leaflet';
import { ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-route-map',
  templateUrl: './route-map.page.html',
  styleUrls: ['./route-map.page.scss'],
})
export class RouteMapPage implements OnInit {

    map: Map;
    polylineID: String;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
    }    

    ionViewDidEnter() { this.leafletMap(); }

    leafletMap() {
        // In setView add latLng and zoom
        this.map = new Map('mapId').setView([42.339236, -8.461685], 11); //TODO centrar el mapa dependiendo de la ruta dibujada
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'OpenStreetMap © ionic LeafLet',
        }).addTo(this.map);

        this.route.params.subscribe(params => {
            this.polylineID = params["polylineID"];
        });
        /*
        var decoded = this.decodePolyline(this.polylineID);
        var poly = new Polyline(decoded)
        poly.addTo(this.map)

        */
      
        marker([42.339236, -8.461685]).addTo(this.map)
          .bindPopup('Welcome to ÜBRE demo.')
          .openPopup();
    }

    /** Remove map when we have multiple map object */
    ionViewWillLeave() {
        this.map.remove();
    }

    decodePolyline(polyline) {
        var defaultOptions = function (options) {
        if (typeof options === 'number') {
            // Legacy
            options = {
                precision: options
            };
        } else {
            options = options || {};
        }

        options.precision = options.precision || 5;
        options.factor = options.factor || Math.pow(10, options.precision);
        options.dimension = options.dimension || 2;
        return options;
        };

        var PolylineUtil = {
        decode: function (encoded, options) {
            options = defaultOptions(options);

            var flatPoints = this.decodeDeltas(encoded, options);

            var points = [];
            for (var i = 0, len = flatPoints.length; i + (options.dimension - 1) < len;) {
                var point = [];

                for (var dim = 0; dim < options.dimension; ++dim) {
                    point.push(flatPoints[i++]);
                }

                points.push(point);
            }

            return points;
        },

        decodeDeltas: function (encoded, options) {
            options = defaultOptions(options);

            var lastNumbers = [];

            var numbers = this.decodeFloats(encoded, options);
            for (var i = 0, len = numbers.length; i < len;) {
                for (var d = 0; d < options.dimension; ++d, ++i) {
                    numbers[i] = Math.round((lastNumbers[d] = numbers[i] + (lastNumbers[d] || 0)) * options.factor) / options.factor;
                }
            }

            return numbers;
        },

        decodeFloats: function (encoded, options) {
            options = defaultOptions(options);

            var numbers = this.decodeSignedIntegers(encoded);
            for (var i = 0, len = numbers.length; i < len; ++i) {
                numbers[i] /= options.factor;
            }

            return numbers;
        },

        decodeSignedIntegers: function (encoded) {
            var numbers = this.decodeUnsignedIntegers(encoded);

            for (var i = 0, len = numbers.length; i < len; ++i) {
                var num = numbers[i];
                numbers[i] = (num & 1) ? ~(num >> 1) : (num >> 1);
            }

            return numbers;
        },

        decodeUnsignedIntegers: function (encoded) {
            var numbers = [];

            var current = 0;
            var shift = 0;

            for (var i = 0, len = encoded.length; i < len; ++i) {
                var b = encoded.charCodeAt(i) - 63;

                current |= (b & 0x1f) << shift;

                if (b < 0x20) {
                    numbers.push(current);
                    current = 0;
                    shift = 0;
                } else {
                    shift += 5;
                }
            }

            return numbers;
        }
        }
        return PolylineUtil.decode(polyline, 0)
    }

}