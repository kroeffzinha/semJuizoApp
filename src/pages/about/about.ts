import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  email: String;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public toastCtrl: ToastController, 
              public fire: AngularFireAuth ) {

    this.email = fire.auth.currentUser.email;
    if (this.email == null) {
      this.email = "visitante";
    } else {
      this.email = "usuário(a) - " + this.email;
    }
  }

  logout() {
    let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });

    this.fire.auth.signOut();
    toast.setMessage("Usuário deslogado com sucesso!");
    toast.present();
    this.navCtrl.setRoot(HomePage);
  }

}
