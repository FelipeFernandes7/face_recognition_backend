import { GetSessionResults } from "@/models/rekognition.types";

export interface RekognitionRepository {
  createSession: <T = any>() => Promise<T>;

  getSessionResults: (
    params: GetSessionResults.Params,
  ) => Promise<GetSessionResults.Result>;
}
