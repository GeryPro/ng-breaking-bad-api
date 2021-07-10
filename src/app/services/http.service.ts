import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIResponse, Character } from '../models';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class HttpService {
	BASE_URL = 'https://www.breakingbadapi.com/api/characters';

	constructor(private http: HttpClient) {}

	fetchCharacters(): Observable<APIResponse<Character>> {
		return this.http.get<APIResponse<Character>>(this.BASE_URL);
	}
}
