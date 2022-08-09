import React from 'react'
import { Center, Spinner, Text } from 'native-base'
import { MovieList } from '../../navigation/MovieList'
import { useNowPlayingQuery } from '../../../generated/graphql'
import { client } from '../../providers/GraphQLProvider'

export function NowPlayingScreen() {
  const { data, isLoading, error } = useNowPlayingQuery(client)
  // const { data, error, isLoading } = trpc.useQuery(['tmdb.nowPlaying'])

  if (error) {
    if (error instanceof Error) {
      console.log('error', error)

      return <Text>Error: {error.message}</Text>
    }
  }

  if (isLoading)
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    )

  const movieData = data?.nowPlaying ?? []

  return <MovieList movieData={movieData} />
}
