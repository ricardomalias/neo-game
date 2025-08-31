import { v4 as uuidv4 } from "uuid";

export type Job = "Warrior" | "Thief" | "Mage";

export interface CharacterStats {
    hp: number;
    strength: number;
    dexterity: number;
    intelligence: number;
    attackModifier: number;
    speedModifier: number;
}

export default class Character {
    id: string;
    name: string;
    job: Job;
    alive: boolean;
    maxHp: number;
    currentHp: number;
    strength: number;
    dexterity: number;
    intelligence: number;
    attackModifier: number;
    speedModifier: number;

    constructor(name: string, job: Job) {
        this.id = uuidv4();
        this.name = name;
        this.job = job;
        this.alive = true;

        const jobStats = this.getJobStats(job);
        this.maxHp = jobStats.hp;
        this.currentHp = jobStats.hp;
        this.strength = jobStats.strength;
        this.dexterity = jobStats.dexterity;
        this.intelligence = jobStats.intelligence;
        this.attackModifier = jobStats.attackModifier;
        this.speedModifier = jobStats.speedModifier;
    }

    private getJobStats(job: Job): CharacterStats {
        switch (job) {
            case "Warrior":
                return {
                    hp: 20,
                    strength: 10,
                    dexterity: 5,
                    intelligence: 5,
                    attackModifier: 0.8 * 10 + 0.2 * 5,
                    speedModifier: 0.6 * 5 + 0.2 * 5,
                };
            case "Thief":
                return {
                    hp: 15,
                    strength: 4,
                    dexterity: 10,
                    intelligence: 4,
                    attackModifier: 0.25 * 4 + 1.0 * 10 + 0.25 * 4,
                    speedModifier: 0.8 * 10,
                };
            case "Mage":
                return {
                    hp: 12,
                    strength: 5,
                    dexterity: 6,
                    intelligence: 10,
                    attackModifier: 0.2 * 5 + 0.2 * 6 + 1.2 * 10,
                    speedModifier: 0.4 * 6 + 0.1 * 5,
                };
            default:
                throw new Error("Invalid job");
        }
    }
}
