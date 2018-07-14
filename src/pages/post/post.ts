import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';

import { WordpressService } from '../../services/wordpress.service';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  post: any;
  image: String;
  author: String;
  categories: Array<any> = new Array<any>();
  tags: Array<any> = new Array<any>();

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController,
              public wordpressService: WordpressService) {
  }

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.post = this.navParams.get('item');

    Observable.forkJoin(
      this.getImageData(),
      this.getAuthorData(),
      this.getCategories(),
      this.getTags()
    )
    .subscribe( data => {
      this.image = data[0].source_url;
      this.author = data[1].name;
      this.categories = data[2];
      this.tags = data[3];
      loading.dismiss();
    });
  }

  getImageData() {
    return this.wordpressService.getImage(this.post.featured_media);
  }

  getAuthorData() {
    return this.wordpressService.getAuthor(this.post.author);
  }

  getCategories() {
    return this.wordpressService.getPostCategories(this.post);
  }

  getTags() {
    return this.wordpressService.getPostTags(this.post);
  }
}
