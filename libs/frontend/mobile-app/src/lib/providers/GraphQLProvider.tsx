import React from 'react'
import reactotron from 'reactotron-react-native'
import { createClient, Provider, dedupExchange, fetchExchange } from 'urql'
import { cacheExchange } from '@urql/exchange-graphcache'

import Constants from 'expo-constants'
import { useAuthenticatedUser } from './AuthenticationProvider'
import { WatchlistQuery } from '../navigation/WatchlistQuery'
import {
  AddToWatchlistMutationVariables,
  RemoveFromWatchlistMutationVariables,
} from '../../generated/gql/graphql'

const { manifest } = Constants
let apiHost = ''
const endpoint = Constants.manifest?.extra?.apiUrl ?? ''
reactotron.log?.('endpoint', endpoint)

if (__DEV__) {
  apiHost =
    typeof manifest?.packagerOpts === `object` && manifest.packagerOpts.dev
      ? manifest.debuggerHost?.split(`:`).shift()?.concat(`:4200`)
      : endpoint

  // add http if not present
  if (!apiHost.startsWith('http')) {
    apiHost = `http://${apiHost}`
  }
} else {
  apiHost = endpoint
}

const url = `${apiHost}/api/graphql`

const cache = cacheExchange({
  updates: {
    Mutation: {
      addToWatchlist: (
        result,
        args: AddToWatchlistMutationVariables,
        cache,
        info
      ) => {
        cache.updateQuery({ query: WatchlistQuery }, (data) => {
          if (data !== null) {
            data.watchlist.push(args.input.id)
            return data
          }
          return null
        })
      },
      removeFromWatchlist: (
        result,
        args: RemoveFromWatchlistMutationVariables,
        cache,
        info
      ) => {
        cache.updateQuery({ query: WatchlistQuery }, (data) => {
          if (data !== null) {
            data.watchlist = data.watchlist.filter((m) => m !== args.input.id)
            return data
          }
          return null
        })
      },
    },
  },
  optimistic: {
    addToWatchlist: (args: AddToWatchlistMutationVariables, cache, info) => {
      return {
        __typename: 'Watchlist',
        id: args.input.id,
        movieId: args.input.id,
      }
    },
    removeFromWatchlist: (
      args: RemoveFromWatchlistMutationVariables,
      cache,
      info
    ) => {
      return {
        __typename: 'Watchlist',
        id: args.input.id,
        movieId: args.input.id,
      }
    },
  },
})

export function GraphQLProvider({ children }: { children: React.ReactNode }) {
  const { userData } = useAuthenticatedUser()
  const client = React.useMemo(() => {
    return createClient({
      url: url,
      fetchOptions: () => {
        const token = userData.username
        return {
          headers: { authorization: token ? `Bearer ${token}` : '' },
        }
      },
      // @ts-ignore - cache type is not compatible???
      exchanges: [dedupExchange, cache, fetchExchange],
    })
  }, [userData.username])

  return <Provider value={client}>{children}</Provider>
}
