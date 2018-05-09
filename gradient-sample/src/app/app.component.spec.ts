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
  MatChipsModule,
  MatChipInputEvent
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

  it(`should create correct sample object series`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    let range = {
      min: -100,
      max: 100
    }
    let itemsCount = 100;
    let list = app.createSampleObjectList(itemsCount, range);
    expect(list.length).toEqual(itemsCount, 'wrong counts');
    expect(
      // min value in list
      list.reduce(
        (mem, item) => item.value > mem ? mem : item.value,
        Number.POSITIVE_INFINITY
      )
    ).toBeGreaterThanOrEqual(range.min, 'range min err');
    expect(
      // max value in list
      list.reduce(
        (mem, item) => item.value < mem ? mem : item.value,
        Number.NEGATIVE_INFINITY
      )
    ).toBeLessThanOrEqual(range.max, 'range max err');
  }));

  it(`should add/remove colors`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    let newColor = "#000";
    app.add({
      input: {
        value: newColor
      },
      value: newColor
    });
    expect(app.colors[app.colors.length - 1]).toEqual(newColor, 'color must be added');
    app.remove(newColor);
    expect(app.colors[app.colors.length - 1]).not.toEqual(newColor, 'color must be removed');
    let length = app.colors.length;
    app.remove(newColor);
    expect(app.colors.length).toEqual(length);
  }));
});
