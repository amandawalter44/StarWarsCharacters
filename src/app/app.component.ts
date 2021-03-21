import { Component } from '@angular/core';
import { ICharacter } from './Interfaces/interface.app.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const NUMBER_OF_CHARACTERS = 15;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  characterList: ICharacter[] = [];
  errorMessage = null;
  private cache;

  ngOnInit() {
    this.getCharacterList(NUMBER_OF_CHARACTERS);
  }

  async getCharacterList(numberOfCharacters: number): Promise<void> {
    let character: ICharacter;
    for (let i = 0; i <= numberOfCharacters; i++) {
      try {
        let response = await fetch(`https://www.swapi.tech/api/people/${i}`)
        if (!response.ok) {
          console.log('Error')
        }
        let responseJson = await response.json()
        let result = responseJson.result.properties;
        character = {
          height: result.height,
          name: result.name
        }
        this.characterList.push(character);
      } catch (error) {
        console.log('HERE TOO');
      }

    }
    this.sortByName(this.characterList);
  }

  sortByName(characterArray: ICharacter[]): ICharacter[] {
    return characterArray.sort((a, b) => (a.name < b.name ? -1 : 1));
  }

  sortByHeight(characterArray: ICharacter[]): ICharacter[] {
    return characterArray.sort(function (a, b) {
      return (a.height - b.height);
    });
  }

}
