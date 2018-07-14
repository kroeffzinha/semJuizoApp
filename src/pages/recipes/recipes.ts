import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { WordpressService } from '../../services/wordpress.service';

import { HomePage } from '../home/home';
import { PostPage } from '../post/post';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage {

  posts: Array<any> = new Array<any>();
  morePagesAvailable: boolean = true;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public toastCtrl: ToastController, 
    public loadingCtrl: LoadingController, 
    public fire: AngularFireAuth, 
    public wordpressService: WordpressService ) {
  }

  ionViewWillEnter() {

    this.morePagesAvailable = true;
    if (!(this.posts.length > 0)) {
      let loading = this.loadingCtrl.create();
      loading.present();

      this.wordpressService.getRecentPosts()
      .subscribe(data => {
        //setando os posts
        for (let post of data) {
          post.excerpt.rendered = post.excerpt.rendered.split("<a")[0] + "<p>";

          this.posts.push(post);
        }
        loading.dismiss();
      });
    }
  }

  postTagged(event, post) {
    //chama a pagina da receita selecionada
    this.navCtrl.push(PostPage, {
      item: post
    });
  }

  doInfinite(infiniteScroll) {
    let page = (Math.ceil(this.posts.length/10)) + 1;
    let loading = true;

    this.wordpressService.getRecentPosts(page)
    .subscribe(data => {
      for (let post of data) {
        //verifica se concluiu o carregamento infinito
        if (!loading){
          infiniteScroll.complete();
        }

        this.posts.push(post);
        loading = false;
      }
    }, err => {
      this.morePagesAvailable = false;
    })
  }

  doRefresh(refresher) {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  logout() {
    let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });

    this.fire.auth.signOut();
    toast.setMessage("Usuário deslogado com sucesso!");
    toast.present();
    this.navCtrl.setRoot(HomePage);
  }

}
