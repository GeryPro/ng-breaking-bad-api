import { TestBed } from '@angular/core/testing';
import { HttpService } from './http.service';
import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { Character } from '../models';

fdescribe('HttpService', () => {
	let httpService: HttpService;
	let httpTestingController: HttpTestingController;
	const testCharacters: Character[] = [
		{
			appearance: [1, 2, 3, 4, 5],
			birthday: '09-07-1958',
			char_id: 1,
			img: 'https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg',
			name: 'Walter White',
			nickname: 'Heisenberg',
			occupation: ['High School Chemistry Teacher', 'Meth King Pin'],
			portrayed: 'Bryan Cranston',
			status: 'Presumed dead',
		},
	];

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [HttpService],
		});

		httpService = TestBed.inject(HttpService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	it('should retrieve the characters', () => {
		httpService.getCharacters().subscribe((characters) => {
			expect(characters.length).toBe(1);
			expect(characters).toEqual(testCharacters);
		});

		const request = httpTestingController.expectOne(`${httpService.BASE_URL}`);

		expect(request.cancelled).toBeFalsy();
		expect(request.request.responseType).toEqual('json');
		expect(request.request.method).toBe('GET');

		request.flush(testCharacters);
		httpTestingController.verify();
	});

	it('should retrieve the characters by search query', () => {
		httpService.getSearchQuery('walter').subscribe((characters) => {
			expect(characters.length).toBe(1);
		});

		const request = httpTestingController.expectOne(
			`${httpService.BASE_URL}?name=walter`
		);

		expect(request.cancelled).toBeFalsy();
		expect(request.request.responseType).toEqual('json');
		expect(request.request.method).toBe('GET');

		request.flush(testCharacters);
		httpTestingController.verify();
	});

	it('should correctly alter the blank spaces into + for the search query', () => {
		httpService.getSearchQuery('walter white').subscribe((characters) => {
			expect(characters.length).toBe(1);
		});

		const request = httpTestingController.expectOne(
			`${httpService.BASE_URL}?name=walter+white`
		);

		expect(request.request.url).toBe(
			'https://www.breakingbadapi.com/api/characters?name=walter+white'
		);
	});
});
