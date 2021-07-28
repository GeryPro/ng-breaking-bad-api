import { Observable, of } from 'rxjs';
import { IHttpService } from 'src/app/interfaces/IHttpService';
import { Character } from 'src/app/interfaces/Character';

export class MockHttpService implements IHttpService {
	getCharacters(): Observable<Array<Character>> {
		return of([]);
	}

	getSearchQuery(_text: string): Observable<Array<Character>> {
		return of([]);
	}
}
