import BattleService from "../src/services/BattleService";
import Character from "../src/models/Character";
import { describe, it, beforeEach, afterEach, expect, jest } from "@jest/globals";

describe("BattleService", () => {
    let warrior: Character;
    let mage: Character;

    beforeEach(() => {
        warrior = new Character("Asdrubal", "Warrior");
        warrior.currentHp = 30;
        warrior.attackModifier = 5;
        warrior.speedModifier = 3;

        mage = new Character("Zé Pequeno", "Mage");
        mage.currentHp = 20;
        mage.attackModifier = 4;
        mage.speedModifier = 2;
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should determine turn order correctly when first is faster", () => {
        jest.spyOn(global.Math, "random")
            .mockReturnValueOnce(0.9)
            .mockReturnValueOnce(0.1);

        const log: string[] = [];
        const { first, second } = BattleService.defineTurnOrder(warrior, mage, log);

        expect(first).toBe(warrior);
        expect(second).toBe(mage);
        expect(log[0]).toContain("was faster");
    });

    it("should let a character win a battle", () => {
        jest.spyOn(global.Math, "random")
            .mockReturnValueOnce(0.9)
            .mockReturnValueOnce(0.1)
            .mockImplementation(() => 0.99);

        const result = BattleService.battle(warrior, mage);

        expect(result.winner).toBe(warrior);
        expect(result.loser).toBe(mage);
        expect(result.winner.alive).toBe(true);
        expect(result.loser.alive).toBe(false);
        expect(result.log.some(line => line.includes("wins the battle"))).toBe(true);
    });

    it("should reduce HP correctly during battle", () => {
        jest.spyOn(global.Math, "random")
            .mockReturnValueOnce(0.9)
            .mockReturnValueOnce(0.1)
            .mockReturnValueOnce(0.6)
            .mockReturnValueOnce(0.5);

        const result = BattleService.battle(warrior, mage);

        expect(result.winner.currentHp).toBeLessThanOrEqual(30);
        expect(result.loser.currentHp).toBeGreaterThanOrEqual(0);
        expect(result.log.find(line => line.includes("attacks"))).toBeDefined();
    });
});
