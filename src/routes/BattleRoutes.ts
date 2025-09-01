import { Router, Request, Response } from "express";
import CharacterService from "../services/CharacterService";
import BattleService from "../services/BattleService";

const router = Router();


router.post("/", (req: Request, res: Response) => {
    const { character1, character2 } = req.body;

    const c1 = CharacterService.findById(character1);
    const c2 = CharacterService.findById(character2);

    if (!c1 || !c2) {
        return res.status(404).json({ error: "One or both characters not found" });
    }

    const result = BattleService.battle(c1, c2);
    res.json(result);
});

export default router;
