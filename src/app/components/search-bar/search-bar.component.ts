import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import {
	debounceTime,
	distinctUntilChanged,
	filter,
	map,
} from 'rxjs/operators';
import { fromEvent, Subscription } from 'rxjs';
import { Character } from 'src/app/models';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
})
export class SearchBarComponent implements OnInit {
	@ViewChild('characterSearchInput', { static: true })
	characterSearchInput: ElementRef;

	result: Array<Character>;
	private searchSub: Subscription;

	constructor(private httpService: HttpService) {}

	ngOnInit(): void {
		fromEvent(this.characterSearchInput.nativeElement, 'keyup')
			.pipe(
				map((event: any) => event.target.value),
				filter((res) => res.length > 2),
				debounceTime(500),
				distinctUntilChanged()
			)
			.subscribe((text: string) =>
				this.httpService
					.getSearchQuery(text)
					.subscribe((searchResult: Array<Character>) => {
						this.result = searchResult;
						console.log(searchResult);
					})
			);
	}

	ngOnDestroy(): void {
		if (this.searchSub) {
			this.searchSub.unsubscribe();
		}
	}
}
