import {Component, OnInit} from '@angular/core';
import {ThemeService} from "../service/theme.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

    constructor(public themeService: ThemeService) {
    }

    ngOnInit(): void {
    }

    toggleTheme() {
        this.themeService.switchTheme();
    }
}
