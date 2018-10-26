import {HTTP} from "@ionic-native/http";
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  constructor(private http: HTTP) {
    console.log('Hello RestProvider Provider');
  }

  getMorro(id) {
    return new Promise(resolve => {
      this.http.get('http://187.216.191.84/entregas/api/sfoct18/'+id, {}, {}).
      then((data) => {
        resolve(data.data);
      })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  postEntrega(id, data){
    return new Promise(resolve => {
      this.http.put('http://187.216.191.84/entregas/api/sfoct18/'+id, data, {}).
      then((data) => {
        resolve(data.data);
      })
        .catch((error) => {
          console.log(error);
        });
    });

  }

}
