import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
// interface
import { IToken, ITokenResponse, ITokensResponse } from "./interface";

const SUBGRAPH_API_KEY = process.env.NEXT_PUBLIC_SUBGRAPH_API_KEY;

const megoSubgraphClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `https://gateway-arbitrum.network.thegraph.com/api/${SUBGRAPH_API_KEY}/subgraphs/id/2NFuQeiZHg2vQcYWrKYR8iXPMcoDeCehs9Yc75FQKwiR`,
});

export const getTokens = async (
  orderBy: string,
  orderDirection: string,
  limit: number,
  skip: number
): Promise<ITokensResponse> => {
  let response: ITokensResponse = {
    data: [],
    error: "",
    success: false,
  };

  try {
    const { data, error, errors } = await megoSubgraphClient.query({
      query: gql`
            query Tokens {
              tokens(skip: ${skip},first: ${limit}, orderBy: ${orderBy}, orderDirection: ${orderDirection}) {
                id
                tokenId
                owner
                blockTimestamp
                tier
              }
            }
          `,
    });

    if (error) throw error;

    if (errors) throw errors.join("\n");

    response = {
      data: data.tokens.map((item: IToken) => ({ ...item, selected: false })),
      error: "",
      success: true,
    };
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};

export const getTokenByTokenId = async (
  tokenId: string
): Promise<ITokenResponse> => {
  let response: ITokenResponse = {
    data: {
      blockTimestamp: "",
      id: "",
      owner: "",
      selected: false,
      tier: "",
      tokenId: "",
    },
    error: "",
    success: false,
  };

  try {
    const { data, error, errors } = await megoSubgraphClient.query({
      query: gql`
        query Token {
          tokens(where: { tokenId: ${tokenId} }) {
            id
            tokenId
            owner
            blockTimestamp
            tier
          }
        }
      `,
    });

    if (error) throw error;

    if (errors) throw errors.join("\n");

    response = {
      data: data.tokens,
      error: "",
      success: true,
    };
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};

export const getTokenGeneric = async (
  searchTerm: string
): Promise<ITokensResponse> => {
  let response: ITokensResponse = {
    data: [],
    error: "",
    success: false,
  };

  try {
    const { data, error, errors } = await megoSubgraphClient.query({
      query: gql`
        query Token {
          tokens(
            where: { or: [{ tier_contains: ${searchTerm} }, { id_contains: ${searchTerm} }] }
          ) {
            id
            tokenId
            owner
            blockTimestamp
            tier
          }
        }
      `,
    });

    if (error) throw error;

    if (errors) throw errors.join("\n");

    response = {
      data: data.tokens,
      error: "",
      success: true,
    };
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};
