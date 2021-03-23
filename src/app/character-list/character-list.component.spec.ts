import { TestBed } from '@angular/core/testing';
import { CharacterListComponent } from './character-list.component';
import { CharacterListService } from './character-list.service';

const character1 = {
    name: '!@#&^#%!$%!',
    height: 123
}
const character2 = {
    name: '2147y12794y2194',
    height: -1
}
const character3 = {
    name: 'Tess Turr',
    height: 0
}
const character4 = {
    name: 'C',
    height: 1234567890987654321
}
const characterArray = [
    character1,
    character2,
    character3,
    character4
]
describe('CharacterListComponent', () => {
    let characterListServiceStub: CharacterListService;
    beforeEach(async () => {
        characterListServiceStub = new CharacterListService();
        await TestBed.configureTestingModule({
            declarations: [CharacterListComponent],
            providers: [CharacterListService]
        }).compileComponents();
    });

    it('sortByHeight sorts correctly by ascending', () => {
        const fixture = TestBed.createComponent(CharacterListComponent);
        const component = fixture.componentInstance;
        let expected = [character2, character3, character1, character4];

        let actual = component.sortByHeight(characterArray);

        expect(expected).toEqual(actual);
    });

    it('sortByHeight sorts correctly by descending', () => {
        const fixture = TestBed.createComponent(CharacterListComponent);
        const component = fixture.componentInstance;
        (<any>component).sortingByHeightDescending = true;
        let expected = [character4, character1, character3, character2];

        let actual = component.sortByHeight(characterArray);

        expect(expected).toEqual(actual);
    });

    it('sortByName sorts correctly by ascending', () => {
        const fixture = TestBed.createComponent(CharacterListComponent);
        const component = fixture.componentInstance;
        let expected = [character1, character2, character4, character3];

        let actual = component.sortByName(characterArray);

        expect(expected).toEqual(actual);
    });

    it('sortByHeight sorts correctly by descending', () => {
        const fixture = TestBed.createComponent(CharacterListComponent);
        const component = fixture.componentInstance;
        (<any>component).sortingByNameDescending = true;
        let expected = [character3, character4, character2, character1];

        let actual = component.sortByName(characterArray);

        expect(expected).toEqual(actual);
    });

    it('showErrorMessage is true when API returns error', () => {
        const fixture = TestBed.createComponent(CharacterListComponent);
        const component = fixture.componentInstance;
        let getCharacterListSpy = spyOn(characterListServiceStub, 'fetchCharacter').and.throwError('ERROR');

        component.getCharacterList(2);

        expect(component.showErrorMessage).toBeTrue;
    });
});
