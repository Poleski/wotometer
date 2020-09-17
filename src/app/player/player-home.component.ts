import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
    selector: 'app-player-home',
    templateUrl: './player-home.component.html',
    styleUrls: ['./player-home.component.less']
})
export class PlayerHomeComponent implements OnInit {
    playerId: string;

    constructor(public route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('playerId')) {
                this.playerId = paramMap.get('playerId');
            }
        });
    };

}
