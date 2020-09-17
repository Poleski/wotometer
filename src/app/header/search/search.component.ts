import {Component, OnInit} from '@angular/core';
import {FormControl } from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

interface SearchResultsInterface {
    nickname: string,
    account_id: string;
}

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
    players: Observable<SearchResultsInterface[]>;
    searchControl = new FormControl();
    idControl = new FormControl();
    searchResultsLength = 5;    //TODO: Make the autoselect options length configurable

    constructor(private router: Router, private apiService: ApiService) {
    }

    ngOnInit(): void {
        //TODO: Add spinner when waiting for search results

        this.players = this.searchControl.valueChanges.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            switchMap(query => {
                return (query.length > 2) ? this.getSearchResults(query) : of([]);
            })
        )
    }

    setSearch(event): void {
        this.idControl.setValue(event.option.value.account_id);
        this.searchControl.setValue(event.option.value.nickname);
    }

    getSearchResults(query): Observable<SearchResultsInterface[]> {
        //TODO: Make region changable and obtainable through some service
        return this.apiService.getSearchResults('eu', query).pipe(
            map( results => {
                return results.slice(0, this.searchResultsLength);
            })
        );
    }

    searchFormSubmit() {
        const newRoute = "/player/" + this.idControl.value;
        this.router.navigate([newRoute]);
        console.log(this.idControl.value);
    }
}
