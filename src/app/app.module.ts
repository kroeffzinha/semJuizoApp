import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//importacao das paginas do app
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { ForgotPage } from '../pages/forgot/forgot';
import { TipsPage } from '../pages/tips/tips';
import { RecipesPage } from '../pages/recipes/recipes';
import { PostPage } from '../pages/post/post';
import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';

//importacao para os services
import { WordpressService } from '../services/wordpress.service';
import { HttpModule } from "@angular/http";

//importacao do Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

//declarar chave do firebase
const firebaseAuth = {
  apiKey: "AIzaSyC9pAL4S4GmEE8FN9sOP7PQoqdpIiCNBAM",
  authDomain: "sem-juizo.firebaseapp.com",
  databaseURL: "https://sem-juizo.firebaseio.com",
  projectId: "sem-juizo",
  storageBucket: "sem-juizo.appspot.com",
  messagingSenderId: "487241653678"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    ForgotPage,
    TipsPage,
    RecipesPage,
    PostPage,
    AboutPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    ForgotPage,
    TipsPage,
    RecipesPage,
    PostPage,
    AboutPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    WordpressService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
