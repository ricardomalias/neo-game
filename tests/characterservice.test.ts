import CharacterService from "../src/services/CharacterService";
import Character from "../src/models/Character";
import { describe, it, beforeEach, expect } from "@jest/globals";

describe("CharacterService", () => {
    let warrior: Character;
    let mage: Character;

    beforeEach(() => {
        (CharacterService as any).characters.clear?.();

        warrior = new Character("Zé Pequeno", "Warrior");
        mage = new Character("Asdrubal", "Mage");
    });

    it("should create a character", () => {
        const result = CharacterService.create(warrior);
        expect(result).toBe(warrior);
        expect(CharacterService.list()).toContain(warrior);
    });

    it("should list all characters", () => {
        CharacterService.create(warrior);
        CharacterService.create(mage);
        const all = CharacterService.list();
        expect(all.length).toBe(2);
        expect(all).toEqual(expect.arrayContaining([warrior, mage]));
    });

    it("should find a character by ID", () => {
        CharacterService.create(warrior);
        const found = CharacterService.findById(warrior.id);
        expect(found).toBe(warrior);

        const notFound = CharacterService.findById("nonexistent-id");
        expect(notFound).toBeUndefined();
    });

    it("should mark a character as dead", () => {
        CharacterService.create(mage);
        CharacterService.markDead(mage.id);

        const updated = CharacterService.findById(mage.id);
        expect(updated?.alive).toBe(false);
        expect(updated?.currentHp).toBe(0);
    });

    it("should not throw when marking a nonexistent character as dead", () => {
        expect(() => CharacterService.markDead("invalid-id")).not.toThrow();
    });
});
