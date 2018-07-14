import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-tips',
  templateUrl: 'tips.html',
})
export class TipsPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public toastCtrl: ToastController, 
              public fire: AngularFireAuth) {
  }

  logout() {
    let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });

    this.fire.auth.signOut();
    toast.setMessage("Usuário deslogado com sucesso!");
    toast.present();
    this.navCtrl.setRoot(HomePage);
  }

}
