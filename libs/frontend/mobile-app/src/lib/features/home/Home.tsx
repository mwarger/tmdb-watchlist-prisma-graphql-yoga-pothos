import React from 'react'
import { Center, Spinner, Text } from 'native-base'
import { MovieList } from '../../navigation/MovieList'
import { useQuery } from 'urql'
import { gql } from '../../../generated/gql'

const NowPlayingQuery = gql(/* GraphQL */ `
  query NowPlaying {
    nowPlaying {
      ...MovieFragment
    }
  }
`)

export function NowPlayingScreen() {
  const [{ error, fetching, data }] = useQuery({ query: NowPlayingQuery })

  if (error) {
    if (error instanceof Error) {
      console.log('error', error)

      return <Text>Error: {error.message}</Text>
    }
  }

  if (fetching)
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    )

  const movieData = data?.nowPlaying ?? []

  return <MovieList movieData={movieData} />
}
