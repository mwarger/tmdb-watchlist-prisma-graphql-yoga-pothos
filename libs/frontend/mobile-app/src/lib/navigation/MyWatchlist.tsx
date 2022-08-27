import React from 'react'
import { Center, Spinner, Text } from 'native-base'
import { MovieList } from './MovieList'
import { TextLink } from 'solito/link'
import { useQuery } from 'urql'
import { WatchlistQuery } from './WatchlistQuery'
import { gql } from '../../generated/gql'

const MyWatchlistQuery = gql(/* GraphQL */ `
  query MyWatchlist($ids: [String!]!) {
    movieList(ids: $ids) {
      ...MovieFragment
    }
  }
`)

export function MyWatchlist() {
  const [{ error, fetching, data }] = useQuery({ query: WatchlistQuery })
  const [
    {
      error: myWatchlistError,
      fetching: myWatchlistFetching,
      data: myWatchlistData,
    },
  ] = useQuery({
    query: MyWatchlistQuery,
    variables: { ids: data?.watchlist ?? [] },
  })

  if (error) {
    console.log('error', error)

    return <Text>Error: {error.message}</Text>
  }

  if (fetching)
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    )
  if (!data)
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    )

  const movieData = myWatchlistData?.movieList ?? []

  // show nothing if no movies
  if (!movieData.length)
    return (
      <Center flex={1}>
        <Text>
          No movies to show. Find a movie in{' '}
          <TextLink href="/nowPlaying">
            <Text color="primary.500">Now Playing</Text>
          </TextLink>
        </Text>
      </Center>
    )

  return <MovieList movieData={movieData} />
}
