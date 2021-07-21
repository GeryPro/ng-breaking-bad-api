import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CharacterComponent } from './components/character/character.component';

import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
	declarations: [
		AppComponent,
		CharacterComponent,
		SearchBarComponent,
		HomeComponent,
	],
	imports: [BrowserModule, HttpClientModule, FormsModule],
	providers: [HttpClientModule],
	bootstrap: [AppComponent],
})
export class AppModule {}
