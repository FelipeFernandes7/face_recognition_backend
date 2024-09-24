import { rekognitionClient } from "@/config/rekognition-client";
import {
  CreateFaceLivenessSessionCommand,
  GetFaceLivenessSessionResultsCommand,
  RekognitionClient,
} from "@aws-sdk/client-rekognition";
import { v4 as uuid } from "uuid";

export class RekognitionService {
  private client: RekognitionClient;

  constructor() {
    this.client = rekognitionClient;
  }

  async createSession(): Promise<any> {
    const command = new CreateFaceLivenessSessionCommand({
      ClientRequestToken: uuid(),
      KmsKeyId: process.env.KMS_KEY_ID,
    });
    const response = await this.client.send(command);

    return response.SessionId;
  }

  async getSessionResults(sessionId: string) {
    const command = new GetFaceLivenessSessionResultsCommand({
      SessionId: sessionId,
    });
    const response = await this.client.send(command);

    return {
      status: response.Status,
      confidence: response.Confidence,
    };
  }

  async startLivenessSession() {
    const sessionId = await this.createSession();
    console.log("Created a Face Liveness Session with ID:", sessionId);

    if (!sessionId) return;

    let statusData = await this.getSessionResults(sessionId);

    // Adicionando uma verificação periódica a cada 5 segundos até o status final
    while (
      statusData.status === "CREATED" ||
      statusData.status === "IN_PROGRESS"
    ) {
      console.log("Esperando pela conclusão da sessão...");
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Espera 5 segundos
      statusData = await this.getSessionResults(sessionId);
    }

    console.log("Status final da sessão de liveness:", statusData);
    return { status: statusData.status, confidence: statusData.confidence };
  }
}
