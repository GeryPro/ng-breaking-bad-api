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
	map,
	takeUntil,
} from 'rxjs/operators';
import { fromEvent, Subject } from 'rxjs';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
})
export class SearchBarComponent implements OnInit, OnDestroy {
	@ViewChild('characterSearchInput', { static: true })
	characterSearchInput: ElementRef;
	@Output() searchItem = new EventEmitter<string>();

	private _destroyed$ = new Subject();

	ngOnInit(): void {
		fromEvent(this.characterSearchInput.nativeElement, 'keyup')
			.pipe(
				map((event: any) => event.target.value),
				debounceTime(500),
				distinctUntilChanged(),
				takeUntil(this._destroyed$)
			)
			.subscribe((text: string) => this.searchItem.emit(text));
	}

	ngOnDestroy(): void {
		this._destroyed$.next();
		this._destroyed$.complete();
	}
}
