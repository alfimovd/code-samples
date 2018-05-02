import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
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

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    ...MAT_MODULES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
