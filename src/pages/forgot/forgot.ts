import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {

  @ViewChild('usuario') email;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public toastCtrl: ToastController, 
              public fire: AngularFireAuth) {
  }

  recuperar() {
    let toast = this.toastCtrl.create({ duration: 2000, position: 'bottom' });

    this.fire.auth.sendPasswordResetEmail(this.email.value)
    .then(data => {
      toast.setMessage("Solicitação enviada para seu e-mail.");
      toast.present();
      this.navCtrl.pop();
    })
    .catch((error: any) => {
      if  (error.code == "auth/invalid-email") {
        toast.setMessage("O e-mail digitado não é válido.");
      } else
        if  (error.code == "auth/user-not-found") {
        toast.setMessage("Usuário não encontrado.");
      } 
      toast.present();
    });
  }

}
