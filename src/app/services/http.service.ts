import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../models';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class HttpService {
	BASE_URL = 'https://www.breakingbadapi.com/api/characters';

	constructor(private http: HttpClient) {}

	getCharacters(): Observable<Array<Character>> {
		return this.http.get<Array<Character>>(this.BASE_URL);
	}

	getSearchQuery(text: string): Observable<Array<Character>> {
		let query = text;
		if (text.includes(' ')) {
			query = text.replace(' ', '+');
		}
		return this.http.get<Array<Character>>(`${this.BASE_URL}?name=${query}`);
	}
}
