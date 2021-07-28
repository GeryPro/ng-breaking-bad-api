import { Component, Input } from '@angular/core';
import { Character } from 'src/app/interfaces/Character';

@Component({
	selector: 'app-character',
	templateUrl: './character.component.html',
})
export class CharacterComponent {
	@Input() character: Character;
}
