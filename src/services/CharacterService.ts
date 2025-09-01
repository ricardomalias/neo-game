import Character from "../models/Character.ts";

class CharacterService {
    private characters: Map<string, Character>;

    constructor() {
        this.characters = new Map();
    }

    create(character: Character): Character {
        this.characters.set(character.id, character);
        return character;
    }

    list(): Character[] {
        return [...this.characters.values()];
    }

    findById(id: string): Character | undefined {
        return this.characters.get(id);
    }

    markDead(id: string): void {
        const char = this.characters.get(id);
        if (char) {
            char.alive = false;
            char.currentHp = 0;
        }
    }
}

export default new CharacterService();
