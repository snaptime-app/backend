import { Request, Response } from "express";

export function test(req: Request, res: Response): Response {
  return res.json({ message: "It works!" });
}
