import { Injectable } from "@angular/core";
import { ICharacter } from "./Interfaces/character-list.interface";

@Injectable()
export class CharacterListService {
    public async fetchCharacter(pageNumber: number): Promise<ICharacter> {
        let response = await fetch(`https://www.swapi.tech/api/people/${pageNumber}`)
        let responseJson = await response.json()
        let result = responseJson.result.properties;
        let character = {
            height: result.height,
            name: result.name
        }
        return character
    }
}
