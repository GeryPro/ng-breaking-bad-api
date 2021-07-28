import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Character } from 'src/app/interfaces/Character';
import { HttpService } from 'src/app/services/http.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
	@Input() set searchItem(characterName: string) {
		this._filterCharactersByName(characterName);
	}

	isLoading: boolean = true;
	characters: Array<Character> = [];

	private _initialCharacters: Array<Character> = [];

	constructor(private httpService: HttpService) {}

	ngOnInit(): void {
		this.httpService
			.getCharacters()
			.pipe(
				finalize(() => {
					this.isLoading = false;
				})
			)
			.subscribe((characters) => {
				this._initialCharacters = characters;
				this.characters = characters;
			});
	}

	private _filterCharactersByName(characterName: string): void {
		this.characters = this._initialCharacters.filter(
			(character) =>
				character.name.toLowerCase().indexOf(characterName.toLowerCase()) === 0
		);
	}
}
