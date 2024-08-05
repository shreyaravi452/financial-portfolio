import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule // Import necessary Angular modules
  ],
  providers: [], // Add services/providers if needed
  bootstrap: [AppComponent] // Bootstrap the root component
})
export class AppModule { }
