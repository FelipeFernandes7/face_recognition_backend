import { LivenessSessionStatus } from "@aws-sdk/client-rekognition";

export namespace GetSessionResults {
  export type Params = {
    sessionId: string;
  };

  export type Result = {
    status: LivenessSessionStatus | undefined;
    confidence: number | undefined;
  };
}
