export interface IRecord {
  [name: string]: string;
}

interface IGenericResponse<T> {
  data: T;
  error: string;
  success: boolean;
}

export interface IToken {
  blockTimestamp: string;
  id: string;
  owner: string;
  tier: string;
  tokenId: string;
  selected: boolean;
}

export interface ITokensResponse extends IGenericResponse<IToken[]> {}

export interface ITokenResponse extends IGenericResponse<IToken> {}

// details of Token from smart contract
interface ITokenAttribute {
  trait_type: string;
  value: string;
}

export interface ITokenSC {
  name: string;
  description: string;
  image: string;
  attributes: ITokenAttribute[];
  tokenId: number;
}

export interface ITokenSCResponse extends IGenericResponse<ITokenSC[]> {}
