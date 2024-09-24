import { RekognitionService } from "@/services/rekognition-service";
import { Request, Response } from "express";

export class RekognitionController {
  service: RekognitionService;

  constructor() {
    this.service = new RekognitionService();
  }

  async createSession(req: Request, res: Response) {
    try {
      const sessionId = await this.service.createSession();
      res.status(200).json({ sessionId });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Failed to create session" });
    }
  }
}
