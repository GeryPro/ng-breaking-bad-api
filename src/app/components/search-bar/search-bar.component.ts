import {
	Component,
	ElementRef,
	ViewChild,
	Output,
	EventEmitter,
	OnDestroy,
	OnInit,
} from '@angular/core';

import {
	debounceTime,
	distinctUntilChanged,
	filter,
	map,
} from 'rxjs/operators';
import { fromEvent, Subscription } from 'rxjs';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
})
export class SearchBarComponent implements OnInit, OnDestroy {
	@ViewChild('characterSearchInput', { static: true })
	characterSearchInput: ElementRef;
	@Output() searchItem = new EventEmitter<string>();

	private searchSub: Subscription;

	constructor() {}

	ngOnInit(): void {
		this.searchSub = fromEvent(this.characterSearchInput.nativeElement, 'keyup')
			.pipe(
				map((event: any) => event.target.value),
				filter((res) => res.length > 2),
				debounceTime(500),
				distinctUntilChanged()
			)
			.subscribe((text: string) => this.newSearch(text));
	}

	newSearch(text: string) {
		this.searchItem.emit(text);
	}

	ngOnDestroy(): void {
		if (this.searchSub) {
			this.searchSub.unsubscribe();
		}
	}
}
