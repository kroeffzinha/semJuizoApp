import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  tabBarElement: any;

  @ViewChild('usuario') email;
  @ViewChild('senha') password;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public fire: AngularFireAuth, 
              public toastCtrl: ToastController ) {

    this.tabBarElement = document.querySelector('.show-tabbar');
  }

  //ocultando o nav tabs depois de entrar
  ionViewWillEnter() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs == null) {
      this.tabBarElement.style.display = "none";
    }
  }

  //ocultando o nav tabs depois de sair
  ionViewWillLeave() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = "none";
      });
    }
  }

  registrar () {
    let toast = this.toastCtrl.create({ duration: 2000, position: 'bottom' });

    this.fire.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
    .then(data => {
      toast.setMessage("Usuário criado com sucesso!");
      toast.present();
      //chamar próxima página logado!
      this.navCtrl.setRoot(TabsPage);
    })
    .catch((error: any) => {
      //verificando as mensagens de erro
      if (error.code == "auth/email-already-in-use") {
        toast.setMessage("O e-mail digitado já está em uso.");
      } else
        if (error.code == "auth/invalid-email") {
        toast.setMessage("O e-mail digitado não é válido.");
      } else
        if  (error.code == "auth/operation-not-allowed") {
        toast.setMessage("Não está habilitado criar usuários.");
      } else
        if  (error.code == "auth/weak-password") {
        toast.setMessage("Ops, a senha é muito fraca.");
      } 
      toast.present();
    });
  }

}
