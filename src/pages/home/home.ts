import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { RestProvider } from '../../providers/rest/rest';
import { EntregasPage } from "../entregas/entregas";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  chamaco : any;
  constructor(
    public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
    public restProvider: RestProvider,
  )
  {

  }



  scan() {
    this.barcodeScanner.scan().then((barcodeData) => {

      this.restProvider.getMorro(barcodeData.text)
        .then(data => {
          this.chamaco = JSON.parse(<string>data);
          console.log(this.chamaco);
          if(this.chamaco.beneficiario){
            this.toast.show(this.chamaco.beneficiario, '5000', 'center').subscribe(
              toast => {
                console.log(toast);
              }
            );
            this.navCtrl.push(EntregasPage, {id: barcodeData.text});
          }
        });



    }, (err) => {
      this.toast.show(err, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }


}
