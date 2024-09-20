import { rekognitionClient } from "@/config/rekognition-client";
import {
  CreateFaceLivenessSessionCommand,
  CreateFaceLivenessSessionCommandOutput,
  DescribeCollectionCommand,
} from "@aws-sdk/client-rekognition";
import { v4 as uuid } from "uuid";

type Result = CreateFaceLivenessSessionCommandOutput & {
  ClientRequestToken: string;
};

export class FaceLivenessSessionService {
  constructor() {}

  async createSession(): Promise<Result> {
    const clientRequestToken = uuid();
    const command = new CreateFaceLivenessSessionCommand({
      ClientRequestToken: clientRequestToken,
    });

    const response = await rekognitionClient.send(command);
    if (!response) {
      throw new Error("Failed to create Face Liveness Session");
    }

    return {
      ClientRequestToken: clientRequestToken,
      ...response,
    };
  }

  async getSession(sessionId: string) {
    const command = new DescribeCollectionCommand({
      CollectionId: sessionId,
    });

    try {
      const response = await rekognitionClient.send(command);
      return response;
    } catch (error) {
      console.error("Failed to get session status:", error);
      throw error;
    }
  }
}
