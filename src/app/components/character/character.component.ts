import { Component, Input } from '@angular/core';
import { Character } from 'src/app/models';

@Component({
	selector: 'app-character',
	templateUrl: './character.component.html',
})
export class CharacterComponent {
	// 3 variants - 1) @Input/@Output; 2) Service + rxjs; 3) Redux;
	@Input() character: Character;

	constructor() {}
}
