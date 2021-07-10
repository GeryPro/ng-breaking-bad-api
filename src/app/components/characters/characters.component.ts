import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIResponse, Character } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
	selector: 'app-characters',
	templateUrl: './characters.component.html',
})
export class CharactersComponent implements OnInit, OnDestroy {
	public characters: Array<Character>;
	private charSubscription: Subscription;

	constructor(private httpService: HttpService) {}

	ngOnInit(): void {
		this.getAllCharacters();
	}

	getAllCharacters(): void {
		this.charSubscription = this.httpService
			.getCharacters()
			.subscribe((charList: APIResponse<Character>) => {
				this.characters = charList.results;
			});
	}

	ngOnDestroy(): void {
		if (this.charSubscription) {
			this.charSubscription.unsubscribe();
		}
	}
}
