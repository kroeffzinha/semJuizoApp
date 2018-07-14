import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as Config from '../config';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';

@Injectable ()
export class WordpressService {

    constructor(public http: Http){}

    //pega os posts recentes
    getRecentPosts(page: number = 1){
        return this.http.get(Config.WORDPRESS_API_REST_URL + "posts?page=" + page + "&orderby=slug&order=asc")
        .map( res => res.json());
    }

    //pega a imagem de destaque
    getImage(image) {
        return this.http.get(Config.WORDPRESS_API_REST_URL + "media/" + image)
        .map( res => res.json());
    }

    //pega o autor do post
    getAuthor(author) {
        return this.http.get(Config.WORDPRESS_API_REST_URL + "users/" + author)
        .map( res => res.json());
    }

    //pega as categorias (id) do post
    getPostCategories(posts) {
        let observableBatch = [];

        posts.categories.forEach(category => {
            observableBatch.push(this.getCategory(category));
        });

        return Observable.forkJoin(observableBatch);
    }

    //pega a categoria do post
    getCategory(category) {
        return this.http.get(Config.WORDPRESS_API_REST_URL + "categories/" + category)
        .map( res => res.json());
    }

    //pega as tags (id) do post
    getPostTags(posts) {
        let observableBatch = [];

        posts.tags.forEach(tag => {
            observableBatch.push(this.getTag(tag));
        });

        return Observable.forkJoin(observableBatch);
    }

    //pega a tag
    getTag(tag) {
        return this.http.get(Config.WORDPRESS_API_REST_URL + "tags/" + tag)
        .map( res => res.json());
    }
}