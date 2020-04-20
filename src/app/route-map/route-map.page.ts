import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker, Polyline } from 'leaflet';
import { ActivatedRoute, Router} from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-route-map',
  templateUrl: './route-map.page.html',
  styleUrls: ['./route-map.page.scss'],
})
export class RouteMapPage implements OnInit {

    ID_solicitud: string;
    polylineID: string;

    constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router, private toastController: ToastController) {
        this.route.queryParams.subscribe(params => { // con esto recogemos el parámetro "id" que enviamos desde tab1
        if (this.router.getCurrentNavigation().extras.state) {
          this.ID_solicitud = this.router.getCurrentNavigation().extras.state.ID_solicitud;
          this.polylineID = this.router.getCurrentNavigation().extras.state.polylineID;
        }
      });
    }

    ngOnInit() {
    }    

    suscribeToRoute(){
        this.presentToast(); //mensajito pop-up que indica que te has suscrito al viaje
        this.saveRouteToMyTrips(); //guarda la ruta reservada en la pantalla de "as miñas viaxes"
        this.sendConfirmationToBackEnd(); //le indica al servidor que X usuario se ha suscrito a Y ruta
    }

    async presentToast() {
        const toast = await this.toastController.create({
          message: 'Viaxe reservado! Podes acceder a "As miñas viaxes" para consultala máis adiante',
          duration: 5000
        });
        toast.present();
    }

    saveRouteToMyTrips(){
        
    }

    sendConfirmationToBackEnd(){
        //enviar un post al backend SOLAMENTE CON EL ID DE LA SOLICITUD !!

        var myHeaders = new HttpHeaders();
        myHeaders.append("Accept", 'application/json');
        myHeaders.append('Content-Type', 'application/json' );
        
        var URL = "";
        var backend_response = this.httpClient.post(URL, this.ID_solicitud, {headers: myHeaders})
          .subscribe(data => {
            console.log(data['_body']);
          }, error => {
            console.log(error);
          });
    }


    ////////////////////////////////////////////////////////////

    map: Map;

    ionViewDidEnter() { this.leafletMap(); }

    leafletMap() {
        // In setView add latLng and zoom
        
        var decoded = this.decodePolyline(this.polylineID);
        
        var middle_lat = decoded[Math.round(decoded.length/2)][0];
        var middle_lon = decoded[Math.round(decoded.length/2)][1];
        var origin_lat = decoded[0][0];
        var origin_lon = decoded[0][1];
        var destination_lat = decoded[decoded.length-1][0];
        var destination_lon = decoded[decoded.length-1][1];

        this.map = new Map('mapId').setView([middle_lat, middle_lon], 11); //TODO centrar el mapa dependiendo de la ruta dibujada
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        }).addTo(this.map);

        var poly = new Polyline(decoded)
        poly.addTo(this.map)

        marker([destination_lat, destination_lon]).addTo(this.map)
          .bindPopup('Punto de deixada')
          .openPopup();
          
        marker([origin_lat, origin_lon]).addTo(this.map)
          .bindPopup('Punto de recollida')
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