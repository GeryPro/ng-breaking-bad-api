import {
	Input,
	OnChanges,
	OnDestroy,
	Output,
	SimpleChanges,
} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Character } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnChanges, OnDestroy {
	@Input() searchItem: string;
	isLoading: boolean = true;

	characters: Array<Character> = [];
	private charactersSub: Subscription;

	constructor(private httpService: HttpService) {}

	ngOnInit(): void {
		this.getAllCharacters();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes && this.searchItem) {
			this.isLoading = true;
			this.getCharactersSearch(this.searchItem);
		}

		if (changes && !this.searchItem) {
			this.isLoading = true;
			this.getAllCharacters();
		}
	}

	getAllCharacters(): void {
		this.charactersSub = this.httpService
			.getCharacters()
			.subscribe((charactersList: Array<Character>) => {
				this.characters = charactersList;
				this.isLoading = false;
			});
	}

	getCharactersSearch(text: string): void {
		this.charactersSub = this.httpService
			.getSearchQuery(text)
			.subscribe((charactersList: Array<Character>) => {
				this.characters = charactersList;
				this.isLoading = false;
			});
	}

	ngOnDestroy(): void {
		if (this.charactersSub) {
			this.charactersSub.unsubscribe();
		}
	}
}
