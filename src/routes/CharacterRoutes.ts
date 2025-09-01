import { Router, Request, Response } from "express";
import Character from "../models/Character.ts";
import type { Job } from "../models/Character.ts";
import CharacterService from "../services/CharacterService.ts";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  const { name, job } = req.body as { name: string; job: Job };

  if (!/^[A-Za-z_]{4,15}$/.test(name)) {
    return res.status(400).json({ error: "Invalid name" });
  }
  if (!["Warrior", "Thief", "Mage"].includes(job)) {
    return res.status(400).json({ error: "Invalid job" });
  }

  const character = new Character(name, job);
  CharacterService.create(character);
  res.status(201).json(character);
});

router.get("/", (req: Request, res: Response) => {
  const characters = CharacterService.list().map(c => ({
    id: c.id,
    name: c.name,
    job: c.job,
    alive: c.alive,
  }));

  res.json(characters);
});

router.get("/:id", (req: Request, res: Response) => {
  const char = CharacterService.findById(req.params.id);
  if (!char) return res.status(404).json({ error: "Character not found" });

  res.json(char);
});

export default router;
