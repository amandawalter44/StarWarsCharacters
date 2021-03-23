import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CharacterListComponent } from './character-list.component';
import { AppLoaderComponent } from '../loader/loader.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NotificationBarComponent } from '../notification-bar/notification-bar.component';
import { CharacterListService } from './character-list.service';

@NgModule({
  declarations: [
    CharacterListComponent,
    AppLoaderComponent,

    NotificationBarComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [CharacterListService],
  bootstrap: [CharacterListComponent]
})
export class CharacterListModule { }
