import { gql } from "@apollo/client";
import { GetVaultsQuery } from "../gql/graphql";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

interface Params {
  symbols?: boolean;
  revalidate?: number;
}

const GetVaults = gql`
  query GetVaults {
    vaults {
      underlyingAsset {
        address
        name
        symbol
        decimals
      }
      totalBalance
      interestRate
      lastHarvestTime
      address
      name
      symbol
      decimals
    }
  }
`;

const GetVaultsSymbols = gql`
  query GetVaultsSymbols {
    vaults {
      symbol
    }
  }
`;

/**
 * Get list of Vaults
 * */
export const useGetVaults = (params: Params = {}) => {
  const { symbols } = params;
  const { data, error } = useSuspenseQuery<GetVaultsQuery>(
    symbols ? GetVaultsSymbols : GetVaults
  );
  return { data, error };
};
