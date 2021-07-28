import { Observable } from 'rxjs';
import { Character } from './Character';

export interface IHttpService {
	getCharacters(): Observable<Array<Character>>;
	getSearchQuery(text: string): Observable<Array<Character>>;
}
