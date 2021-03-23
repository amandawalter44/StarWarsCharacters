import { Component } from '@angular/core';
import { CharacterListService } from './character-list.service';
import { ICharacter } from './Interfaces/character-list.interface';

const NUMBER_OF_CHARACTERS = 15;

@Component({
  selector: 'character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})

export class CharacterListComponent {

  public characterList: ICharacter[] = [];
  public pageLoaded = false;
  public selectedCharacter?: ICharacter;

  public showErrorMessage = false;
  private sortingByHeightDescending = false;
  private sortingByNameDescending = false;

  constructor(private characterListService: CharacterListService) {
  }

  ngOnInit() {
    this.getCharacterList(NUMBER_OF_CHARACTERS);
  }

  async getCharacterList(numberOfCharacters: number): Promise<void> {
    for (let i = 1; i <= numberOfCharacters; i++) {
      try {
        let character = await this.characterListService.fetchCharacter(i);
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
      return characterArray.sort((a, b) => (a.name > b.name ? -1 : 1));
    } else {
      this.sortingByNameDescending = true;
      return characterArray.sort((a, b) => (a.name < b.name ? -1 : 1));
    }
  }

  sortByHeight(characterArray: ICharacter[]): ICharacter[] {
    if (this.sortingByHeightDescending) {
      this.sortingByHeightDescending = false
      return characterArray.sort((a, b) => -(a.height - b.height));

    } else {
      this.sortingByHeightDescending = true
      return characterArray.sort((a, b) => (a.height - b.height));

    }
  }
  onSelect(character: ICharacter): void {
    this.selectedCharacter = character;
  }


}
