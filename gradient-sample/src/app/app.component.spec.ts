import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
  MatGridListModule,
  MatFormFieldModule,
  MatDividerModule,
  MatCheckboxModule,
  MatChipsModule
} from '@angular/material';
const MAT_MODULES = [
  MatToolbarModule,
  MatButtonModule,
  MatSnackBarModule,
  MatIconModule,
  MatDividerModule,
  MatGridListModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatChipsModule
];

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        ...MAT_MODULES
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  
  it(`should accept valid color format`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.colorIsValid('#000')).toEqual(true, 'HEX 3 format');
    expect(app.colorIsValid('#000000')).toEqual(true, 'HEX 6 format');
    expect(app.colorIsValid('rgb(0, 0, 0)')).toEqual(true, 'Rgb format');
    expect(app.colorIsValid('rgba(0, 0, 0, 1)')).toEqual(true, 'Rgba format');
    expect(app.colorIsValid('hsl(0, 0, 0)')).toEqual(true, 'Hsl format');
    expect(app.colorIsValid('hsla(0, 0, 0, 1)')).toEqual(true, 'Hsla format');
  }));

  it(`should fail with unsupported color format`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.colorIsValid('000')).toEqual(false);
    expect(app.colorIsValid('000000')).toEqual(false);
    expect(app.colorIsValid('rgb(0, 0, 0, 1)')).toEqual(false);
    expect(app.colorIsValid('rgba(0, 0, 0)')).toEqual(false);
    expect(app.colorIsValid('hsl(0, 0, 0, 1)')).toEqual(false);
    expect(app.colorIsValid('hsla(0, 0, 0)')).toEqual(false);
    expect(app.colorIsValid('(0, 0, 0)')).toEqual(false);
    expect(app.colorIsValid('0, 0, 0')).toEqual(false);
    expect(app.colorIsValid('white')).toEqual(false);
  }));
});
