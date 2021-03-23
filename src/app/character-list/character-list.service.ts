import { Injectable } from "@angular/core";
import { ICharacter } from "./Interfaces/character-list.interface";

@Injectable()
export class CharacterListService {
    public returnedCharacters: ICharacter[] = [];
    public async fetchCharacter(pageNumber: number): Promise<ICharacter> {
        let response = await fetch(`https://www.swapi.tech/api/people/${pageNumber}`);
        if (response.ok !== true) {
            return Promise.reject();
        }
        let responseJson = await response.json()
        let result = responseJson.result.properties;
        let character = {
            height: result.height,
            name: result.name
        }
        this.returnedCharacters.push(character)
        return character;
    }
}
