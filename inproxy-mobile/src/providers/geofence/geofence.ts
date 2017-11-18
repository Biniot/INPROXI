import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


declare var geofence: any;
/*
  Generated class for the GeofenceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GeofenceProvider {

  constructor() {}

  funcWithoutArg(fonctionSuccess: (success: any) => any, fonctionError: (msg: string) => any) {
    geofence.funcWithoutArg(fonctionSuccess, fonctionError);
  }

  funcWithArg(arg: string, fonctionSuccess: (success: any) => any, fonctionError: (msg: string) => any) {
    geofence.funcWithArg(arg, fonctionSuccess, fonctionError);
  }

}
