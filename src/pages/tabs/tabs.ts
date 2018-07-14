import { Component } from '@angular/core';

import { TipsPage } from '../tips/tips';
import { RecipesPage } from '../recipes/recipes';
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TipsPage;
  tab2Root = RecipesPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
