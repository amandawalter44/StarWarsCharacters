import { Component } from '@angular/core';
import { CharacterListService } from './character-list.service';
import { ICharacter } from './Interfaces/character-list.interface';

const NUMBER_OF_CHARACTERS = 15;
const LIGHT_SIDE_TEXT = "Join the Light Side";
const DARK_SIDE_TEXT = "Join the Dark Side";

@Component({
  selector: 'character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})

export class CharacterListComponent {

  public characterList: ICharacter[] = [];
  public pageLoaded = false;

  public showErrorMessage = false;
  private sortingByHeightDescending = false;
  private sortingByNameDescending = false;

  constructor(private characterListService: CharacterListService) {
  }

  ngOnInit() {
    this.getCharacterList(NUMBER_OF_CHARACTERS);
  }

  async getCharacterList(numberOfCharacters: number): Promise<void> {
    let promises = [];
    for (let i = 1; i <= numberOfCharacters; i++) {
      promises.push(this.characterListService.fetchCharacter(i));
    }
    Promise.allSettled(promises)
      .then((results) => {
        const rejected = results.filter(result => result.status === 'rejected');
        if (rejected.length) {
          this.showErrorMessage = true;
        }
        this.characterList = this.characterListService.returnedCharacters;
        this.sortByName(this.characterList);
        this.pageLoaded = true;
      })
      .catch(err => this.showErrorMessage = true)
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

  toggleLightSide(): void {
    let buttonEl = document.querySelectorAll('button');
    let badgeEl = document.querySelectorAll('.badge');
    let liEl = document.querySelectorAll('li');
    buttonEl.forEach(button => button.classList.toggle('light-side'));
    badgeEl.forEach(badge => badge.classList.toggle('light-side'));
    liEl.forEach(li => li.classList.toggle('light-side'));

    let toggleButton = document.querySelector('.side-toggle');
    if (toggleButton.textContent === LIGHT_SIDE_TEXT) {
      toggleButton.textContent = DARK_SIDE_TEXT;
    } else {
      toggleButton.textContent = LIGHT_SIDE_TEXT;
    }

  }


}
