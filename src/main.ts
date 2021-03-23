import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CharacterListModule } from './app/character-list/character-list.module';


platformBrowserDynamic().bootstrapModule(CharacterListModule)
  .catch(err => console.error(err));
