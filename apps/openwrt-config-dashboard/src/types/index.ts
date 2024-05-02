export type ChallengeResponse = {
  id: number;
  jsonrpc: string;
  result: Challenge;
};

export interface Challenge {
  error?: ErrorFetchResponse;
  alg: number;
  nonce: string;
  salt: string;
}

export type LoginTokenResponse = {
  error: ErrorFetchResponse;
  id: number;
  result: string;
};

export type ErrorFetchResponse = {
  error: Error;
  status: number;
};
