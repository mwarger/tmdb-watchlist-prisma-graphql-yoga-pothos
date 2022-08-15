import React from 'react'
import { Center, Spinner, Text } from 'native-base'
import { MovieList } from './MovieList'
import { TextLink } from 'solito/link'
import { useQuery } from 'urql'
import { WatchlistQuery } from './WatchlistQuery'

export function MyWatchlist() {
  const [{ error, fetching, data }] = useQuery({ query: WatchlistQuery })

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

  const movieData = data.watchlist ?? []

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
