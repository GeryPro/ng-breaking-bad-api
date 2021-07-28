import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HttpService } from './services/http.service';
import { MockHttpService } from './services/mocks/http.service';

describe('AppComponent', () => {
	let app: AppComponent;
	let fixture: ComponentFixture<AppComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AppComponent, HomeComponent, SearchBarComponent],
			providers: [{ provide: HttpService, useClass: MockHttpService }],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		app = fixture.componentInstance;
		app.searchItem = '';
		fixture.detectChanges();
	});

	it('should create the app', () => {
		expect(app).toBeTruthy();
	});

	it('should have a header', () => {
		const header = fixture.nativeElement.querySelector('header');

		expect(header).toBeTruthy();
	});

	it('should have a logo image', () => {
		const logo = fixture.nativeElement.querySelector('img');

		expect(logo.getAttribute('src')).toEqual('../assets/img/logo.png');
	});
});
