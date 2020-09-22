import {Component, OnInit} from '@angular/core';
import {FormControl } from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';

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
    isLoading: boolean = false;
    searchControl = new FormControl();
    idControl = new FormControl();
    recentSearch: SearchResultsInterface[] = [];
    searchResultsLength = 5;    //TODO: Make the autoselect options length configurable

    constructor(private router: Router, private apiService: ApiService) {}

    ngOnInit(): void {
        if (localStorage.getItem('recentSearch') !== null) {
            this.recentSearch.push(...eval(localStorage.getItem('recentSearch')));
        }

        this.players = this.searchControl.valueChanges.pipe(
            tap(() => {this.isLoading = true}),
            debounceTime(400),
            distinctUntilChanged(),
            switchMap(query => {
                if (query.length > 2) {
                    return this.getAllSearchResults(query);
                } else {
                    this.isLoading = false;
                    return of(this.getRecentSearchResults(query));
                }
            })
        )
    }

    setSearch(event): void {
        this.idControl.setValue(event.option.value.account_id);
        this.searchControl.setValue(event.option.value.nickname);
    }

    getAllSearchResults(query): Observable<SearchResultsInterface[]> {
        //TODO: Make region changable and obtainable through some service
        return this.apiService.getSearchResults('eu', query).pipe(
            map(results => {
                return this.getRecentSearchResults(query).concat(results);
            }),
            map(results => {
                return results.filter((val, i, self) => self.findIndex(x =>(x.account_id === val.account_id)) === i);
            }),
            map( results => {
                return results.slice(0, this.searchResultsLength);
            }),
            tap(() => {this.isLoading = false})
        );
    }

    getRecentSearchResults(query): SearchResultsInterface[] {
        return this.recentSearch.filter(value => value.nickname.indexOf(query) >= 0);
    }

    searchFormSubmit() {
        const submittedSearchResult: SearchResultsInterface = {
            nickname: this.searchControl.value,
            account_id: this.idControl.value
        };
        this.saveToRecentSearches(submittedSearchResult);

        const newRoute = "/player/" + this.idControl.value;
        this.router.navigate([newRoute]);
    }

    saveToRecentSearches(value) {
        let newRecentSearch = this.recentSearch;
        newRecentSearch.splice(0, 0, value);
        newRecentSearch = newRecentSearch.slice(0, this.searchResultsLength);
        this.recentSearch = newRecentSearch;
        localStorage.setItem('recentSearch', JSON.stringify(this.recentSearch));
    }
}
