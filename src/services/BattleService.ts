import Character from "../models/Character.ts";

interface BattleResult {
    log: string[];
    winner: Character;
    loser: Character;
}

class BattleService {

    battle(c1: Character, c2: Character): BattleResult {
        let log: string[] = [];
        log.push(
            `Battle between ${c1.name} (${c1.job}) - ${c1.currentHp} HP and ${c2.name} (${c2.job}) - ${c2.currentHp} HP begins!`
        );

        let { first, second } = this.defineTurnOrder(c1, c2, log);

        while (c1.currentHp > 0 && c2.currentHp > 0) {
            // First
            const damage1 = Math.floor(Math.random() * (first.attackModifier + 1));
            second.currentHp = Math.max(0, second.currentHp - damage1);
            log.push(
                `${first.name} attacks ${second.name} for ${damage1}, ${second.name} has ${second.currentHp} HP remaining.`
            );

            if (second.currentHp <= 0) break;

            // Second
            const damage2 = Math.floor(Math.random() * (second.attackModifier + 1));
            first.currentHp = Math.max(0, first.currentHp - damage2);
            log.push(
                `${second.name} attacks ${first.name} for ${damage2}, ${first.name} has ${first.currentHp} HP remaining.`
            );
        }

        const winner = c1.currentHp > 0 ? c1 : c2;
        const loser = winner === c1 ? c2 : c1;

        winner.alive = true;
        loser.alive = false;

        log.push(
            `${winner.name} wins the battle! ${winner.name} still has ${winner.currentHp} HP remaining!`
        );

        return { log, winner, loser };
    }

    defineTurnOrder(c1: Character, c2: Character, log: string[]) {
        let first: Character, second: Character;

        while (true) {
            const roll1 = Math.floor(Math.random() * (c1.speedModifier + 1));
            const roll2 = Math.floor(Math.random() * (c2.speedModifier + 1));

            if (roll1 > roll2) {
                first = c1;
                second = c2;
                log.push(
                    `${c1.name} (${c1.speedModifier} speed) was faster than ${c2.name} (${c2.speedModifier} speed) and will begin this round.`
                );
                break;
            } else if (roll1 < roll2) {
                first = c2;
                second = c1;
                log.push(
                    `${c2.name} (${c2.speedModifier} speed) was faster than ${c1.name} (${c1.speedModifier} speed) and will begin this round.`
                );
                break;
            }
        }

        return { first, second };
    }
}

export default new BattleService();