import { gql } from '../../generated/gql'

export const WatchlistQuery = gql(/* GraphQL */ `
  query Watchlist {
    watchlist {
      id
      watchListId
      ...MovieFragment
    }
  }
`)
