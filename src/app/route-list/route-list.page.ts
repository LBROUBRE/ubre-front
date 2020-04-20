import { Component, OnInit, ViewChild} from '@angular/core';
import { IonSelect } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, NavigationExtras} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.page.html',
  styleUrls: ['./route-list.page.scss'],
})
export class RouteListPage implements OnInit {

  // show: boolean = true
  hideList = true;
 
  @ViewChild('routeList', {static: false}) routeOrderRef: IonSelect;
  reorderRoutes() {
    this.routeOrderRef.open();
  }

  // rellenar array de routes con la info proveniente de la bbdd, que se llena mediante la demanda
  // o sea, suscribirse a rutas a modo de reservas hasta cumplir cierto umbral
  routes: any = [
    {
      routeID: "ROUTE_ID_1",
      polylineID: "_qlaGp|qr@??CPDh@FEXYpAaBd@jBz@jEB\\LzA?xAIfAQbA}@hC_@rAENSnAC^C|@?hABhCDrCDhFGpCOvAOr@St@i@tAcAxAGJwArBa@lAU~AAxAJrA\\vAj@hAfAnAnAzAl@dAl@jBV`BLfBDnBNtI^lRHfCNzA^xBl@nBt@~ArBxCt@rAlAfDv@pAp@v@vMhKl@d@n@x@j@hAd@`BZ~@`@pAlCtI`@rAHXd@bAt@bAbAv@hAb@|Dn@rAb@~A`ArAnAt@fAbBfD~K`UvAtB~EzEzAxBnArCnEbMpGjQTn@pC|Hl@p@RNVFrE`@l@DxBn@bAXn@h@xAfB`AXf@Tj@f@vBxBfM~INPxAbB~@`Bl@dAnD`Ib@lBBvAa@hOPzCrChN`AzC|AnChBbBjB`AxBj@pNlCjBx@hBnA`BnBpA~B|@fC~BlKh@|Ar@~@~@d@z@JvESzBItAGhAPfAn@v@fAd@vAh@zBb@|@TTf@f@j@Z^VZTTLn@`@b@X^Rp@d@n@`@TRZXn@f@^`@^f@X^b@j@AH@LDFBDFJFFFBD?LXNXLLNLb@ZNNNNFTFTJ~@RhB\\fDFZNl@HVJRJLLFb@RfCdAXRP\\HPZdAbDzKV~@Z`B^fHKjB[hB}@hBm@l@{@b@uCv@iAp@{@dAm@hA_@n@s@v@U\\S^aCjHGXEZCf@Ad@@^D\\Z`BPt@Nz@^`DHp@~BxSpAdL^dELfD?pEQnEkAdKMnACfA@bAZpDDhC?~C?hCJ|AbArHJpCT|B^pAl@bAxAlAhCzA`HrCdAf@`@X~@x@fAhBb@lAh@xBJx@JnAJnGh@hODzBG|AI~Ae@bD{@hDw@dCmClJe@rCShDOlCYjBcAlFIrBBx@BnBKbDG|@AZNdAnApDj@~BZ~BVt@jBtDVh@H`@E`@Y\\[BcA@Y@WDGHKLKj@GpBN^ZR|FnCr@Zd@ZDDFDlNtK\\`@Lh@LrCPz@zBzDxCjFLn@BR@^?lAAd@Gl@Mt@C?E?EBCDADAF@F@DBDBBWvACVAP@^DVRp@N^HPXXfA`@r@ZZZb@x@BZId@OT_A~AEZ@NJRZb@BDFRFbBN`@FVJXHXFNBHHN@@@H@H?JAJEAC@CBCBAD?D?D?DBB@BB@B@B?BABCDLv@r@NNXXNLJJLLJJLLJJHFXNv@X`ATh@FpB?VJNBLB\\TLJR\\Vp@BHBJDNNt@BTDTBXAXAVCFAF?L@JBHDHDDFBH?HCFEDIPIRER@P@p@Z|@d@Zb@^p@LLlBd@XHdAh@vEnD`Ar@dAvAHFn@f@f@R",
      origin: "1 minuto da túa posición",
      destination: "3 minutos do destino",
      timeToDest: "22",
      price: "2,50",      
    },
    {
      routeID: "ROUTE_ID_2",
      polylineID: "POLYLINE_ID_2",
      origin: "4 minutos da túa posición",
      destination: "3 minutos do destino",
      timeToDest: "25",
      price: "2,15",
    },
    {
      routeID: "ROUTE_ID_3",
      polylineID: "POLYLINE_ID_3",
      origin: "8 minutos da túa selección",
      destination: "3 minutos do destino",
      timeToDest: "27",
      price: "1,85",
    }
  ]

  ID_solicitud: String;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => { // con esto recogemos el parámetro "id" que enviamos desde tab1
      if (this.router.getCurrentNavigation().extras.state) {
        this.ID_solicitud = this.router.getCurrentNavigation().extras.state.id;
      }
    });
  }

  ngOnInit() {
    //this.getRouteList();
  }

  getRouteList(){ //Obtenemos todas las rutas asociadas a una solicitud
    const URL = "http://localhost:8000/movility/requests/route/" + this.ID_solicitud + "/"; // url/id_de_solicitud_que_recibimos_de_tab1
    this.httpClient.get(URL)
      .subscribe(apiData => (this.routes = apiData)); //lo guardamos en el array "routes"
  }


  showRouteInfo(polylineID: String) {

    //this.router.navigate(['/route-map', polylineID]);

    let navigationExtras: NavigationExtras = {
      state: {
        id: this.ID_solicitud,
        polylineID
      }
    };

    this.router.navigate(['/route-map'], navigationExtras);
  }

}
