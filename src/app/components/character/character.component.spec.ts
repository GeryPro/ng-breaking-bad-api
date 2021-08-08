import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Character } from 'src/app/interfaces/Character';

import { CharacterComponent } from './character.component';

describe('CharactersComponent', () => {
	let component: CharacterComponent;
	let fixture: ComponentFixture<CharacterComponent>;

	const testCharacter: Character = {
		appearance: [1, 2, 3, 4, 5],
		birthday: '09-07-1958',
		char_id: 1,
		img: 'https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg',
		name: 'Walter White',
		nickname: 'Heisenberg',
		occupation: ['High School Chemistry Teacher', 'Meth King Pin'],
		portrayed: 'Bryan Cranston',
		status: 'Presumed dead',
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CharacterComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CharacterComponent);
		component = fixture.componentInstance;
		component.character = testCharacter;
		component.characterId = 1;
		fixture.detectChanges();
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it(`should have a title with the character's name`, () => {
		const title = fixture.nativeElement.querySelector('h1');

		expect(title.textContent).toEqual(testCharacter.name);
	});

	it(`should have an image if added in the character's info`, () => {
		const image = fixture.nativeElement.querySelector('img');

		expect(image.getAttribute('src')).toEqual(testCharacter.img);
	});

	it(`should display a generic image if there isn't one in the character's info`, () => {
		component.character.img = '../../../assets/img/no-image-found.jpg';
		fixture.detectChanges();

		const image = fixture.nativeElement.querySelector('img');

		expect(image.getAttribute('src')).toEqual(
			'../../../assets/img/no-image-found.jpg'
		);
	});

	it(`should have an actor's name`, () => {
		const portrayedBy = fixture.nativeElement.querySelector('#portrayed-by-1');

		expect(portrayedBy.textContent.trim()).toEqual(
			`Actor Name: ${testCharacter.portrayed}`
		);
	});

	it('should have a nickname', () => {
		const nickname = fixture.nativeElement.querySelector('#nickname-1');

		expect(nickname.textContent.trim()).toEqual(
			`Nickname: ${testCharacter.nickname}`
		);
	});

	it('should have a birthday', () => {
		const birthday = fixture.nativeElement.querySelector('#birthday-1');

		expect(birthday.textContent.trim()).toEqual(
			`Birthday: ${testCharacter.birthday}`
		);
	});

	it(`should have a character's status`, () => {
		const status = fixture.nativeElement.querySelector('#status-1');

		expect(status.textContent.trim()).toEqual(
			`Status: ${testCharacter.status}`
		);
	});
});
