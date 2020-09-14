import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

interface SearchResultsInterface {
    nickname: string,
    account_id: string;
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) {
    }

    private endpoints = {
        players: 'players/search/',
        player_info: 'player/',
        player_tank_stats: 'player/tanks/',
        tanks: 'tanks/',
    };

    private getFull = (reg, api, value?): string => {
        let url = `${environment.backendUrl}/api/${reg}/${this.endpoints[api]}`;

        if (value) {
            url += value;
        }

        return url;
    };

    getSearchResults(reg, query): Observable<SearchResultsInterface[]> {
        return this.http.get(this.getFull(reg, 'players', query)) as Observable<SearchResultsInterface[]>;
    }
}
