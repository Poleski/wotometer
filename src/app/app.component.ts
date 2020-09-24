import { Component } from '@angular/core';
import {ThemeService} from "./service/theme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'wotometer';

  constructor(private themeService: ThemeService) {
    this.themeService.init();
  }
}
