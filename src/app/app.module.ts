import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppLoaderComponent } from './loader/loader.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NotificationBarComponent } from './notification-bar/notification-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    AppLoaderComponent,

    NotificationBarComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
