import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import {Toast} from "@ionic-native/toast";

/**
 * Generated class for the EntregasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entregas',
  templateUrl: 'entregas.html',
})
export class EntregasPage {
  id: '';
  nombre: '';
  chamaco: any;
  status: '';
  request: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restProvider: RestProvider,
    private toast: Toast,
    ) {
    this.id = navParams.get('id');
    this.obtener();
  }

  obtener(){
    this.restProvider.getMorro(this.id)
      .then(data => {
        this.chamaco = JSON.parse(<string>data);
        console.log(this.chamaco);
        if(this.chamaco.beneficiario){
          this.nombre = this.chamaco.beneficiario;
          this.status = this.chamaco.status;
        }
      });

  }

  entregar(){
    this.request = { status: 1 };
    this.restProvider.postEntrega(this.id, this.request)
      .then(data => {
        console.log(data);
        if(data == '200'){
          this.toast.show('bien', '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
          this.obtener();
        }
        if(data == 200){
          this.toast.show('ok', '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
          this.obtener();
        }

      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntregasPage');
  }

}
