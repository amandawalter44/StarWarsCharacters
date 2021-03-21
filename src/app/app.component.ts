import { Component } from '@angular/core';
import { ICharacter } from './Interfaces/interface.app.component';

const NUMBER_OF_CHARACTERS = 15;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  public characterList: ICharacter[] = [];
  public pageLoaded = false;
  public showErrorMessage = false;
  private sortingByHeightDescending = false;
  private sortingByNameDescending = false;


  ngOnInit() {
    this.getCharacterList(NUMBER_OF_CHARACTERS);
  }

  async getCharacterList(numberOfCharacters: number): Promise<void> {
    let character: ICharacter;
    for (let i = 1; i <= numberOfCharacters; i++) {
      try {
        let response = await fetch(`https://www.swapi.tech/api/people/${i}`)
        if (!response.ok) {
          this.showErrorMessage = true;
        }
        let responseJson = await response.json()
        let result = responseJson.result.properties;
        character = {
          height: result.height,
          name: result.name
        }
        this.characterList.push(character);
      } catch (error) {
        this.showErrorMessage = true;
      }

    }
    this.sortByName(this.characterList);
    this.pageLoaded = true;
  }

  sortByName(characterArray: ICharacter[]): ICharacter[] {
    if (this.sortingByNameDescending) {
      this.sortingByNameDescending = false;
      return characterArray.sort((a, b) => (a.name < b.name ? -1 : 1));
    } else {
      this.sortingByNameDescending = true;
      return characterArray.sort((a, b) => (a.name > b.name ? -1 : 1));
    }
  }

  sortByHeight(characterArray: ICharacter[]): ICharacter[] {
    if (this.sortingByHeightDescending) {
      this.sortingByHeightDescending = false
      return characterArray.sort((a, b) => (a.height - b.height));
    } else {
      this.sortingByHeightDescending = true

      return characterArray.sort((a, b) => -(a.height - b.height));
    }
  }
}
