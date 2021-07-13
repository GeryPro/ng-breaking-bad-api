import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Character } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
	selector: 'app-characters',
	templateUrl: './characters.component.html',
})
export class CharactersComponent implements OnInit, OnDestroy {
	characters: Array<Character>;
	private charactersSub: Subscription;

	constructor(private httpService: HttpService) {}

	ngOnInit(): void {
		this.getAllCharacters();
	}

	getAllCharacters(): void {
		this.charactersSub = this.httpService
			.getCharacters()
			.subscribe((charactersList: Array<Character>) => {
				this.characters = charactersList;
			});
	}

	ngOnDestroy(): void {
		if (this.charactersSub) {
			this.charactersSub.unsubscribe();
		}
	}
}
