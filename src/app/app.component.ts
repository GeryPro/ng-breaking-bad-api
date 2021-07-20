import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent {
	searchItem: string;

	getSearchItem(text: string) {
		this.searchItem = text;
	}
}
