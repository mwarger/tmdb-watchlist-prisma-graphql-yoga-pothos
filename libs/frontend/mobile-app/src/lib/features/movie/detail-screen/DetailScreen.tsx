import React from 'react'
import { createParam } from 'solito'

import { Text, Box, VStack, Button, Spinner } from 'native-base'
import { parseMovieId } from './parseMovieId'
import { stringifyMovieId } from './stringifyMovieId'
import { MoviePoster } from '../../home/MoviePoster'
import { WatchlistMovieScreenNavigationProps } from '../../../navigation/Navigation'
import { WatchlistQuery } from '../../../navigation/WatchlistQuery'
import { useMutation, useQuery } from 'urql'
import { gql } from '../../../../generated/gql'

const { useParam } = createParam<{ id: number }>()

const MovieByIdQuery = gql(/* GraphQL */ `
  query MovieById($id: Int!) {
    movieById(id: $id) {
      id
      title
      ...MovieFragment
    }
  }
`)

const AddToWatchlistMutation = gql(/* GraphQL */ `
  mutation AddToWatchlist($input: WatchlistInput!) {
    addToWatchlist(input: $input) {
      id
      movieId
    }
  }
`)

const RemoveFromWatchlistMutation = gql(/* GraphQL */ `
  mutation RemoveFromWatchlist($input: WatchlistInput!) {
    removeFromWatchlist(input: $input) {
      id
      movieId
    }
  }
`)

export function MovieDetailScreen({
  navigation,
}: WatchlistMovieScreenNavigationProps) {
  const [id] = useParam('id', {
    initial: 0,
    parse: parseMovieId,
    stringify: stringifyMovieId,
  })

  const [addToWatchlistResult, addToWatchlist] = useMutation(
    AddToWatchlistMutation
  )
  const [removeFromWatchlistResult, removeFromWatchlist] = useMutation(
    RemoveFromWatchlistMutation
  )

  const [{ fetching: isWatchlistLoading, data }] = useQuery({
    query: WatchlistQuery,
  })

  const watchlist = data?.watchlist ?? []

  const [movieResult] = useQuery({
    query: MovieByIdQuery,
    variables: { id },
  })

  const movie = movieResult.data?.movieById

  let watchedMovieId = ''
  if (watchlist) {
    watchedMovieId = watchlist.find((m) => +m === id) ?? ''
  }

  React.useEffect(() => {
    navigation.setOptions({ title: movie?.title ?? 'Movie' })
  }, [movie?.title, navigation])

  if (!movieResult) return null

  function handleWatched(movieId: string) {
    addToWatchlist(
      {
        input: {
          id: movieId,
        },
      },
      { additionalTypenames: ['WatchlistItem'] }
    )
  }

  function removeWatched(watchlistId: string) {
    removeFromWatchlist(
      { input: { id: watchlistId } },
      { additionalTypenames: ['WatchlistItem'] }
    )
  }

  if (movieResult.error) {
    return <Text>Error: {movieResult.error.message}</Text>
  }

  return movie ? (
    <VStack
      height={'full'}
      _dark={{
        backgroundColor: '#000',
      }}
    >
      <Box
        height="100%"
        width={'100%'}
        p={2}
        display={'flex'}
        flexDirection="column"
        justifyContent="space-between"
      >
        <MoviePoster item={movie} showOverview />
        {isWatchlistLoading ? (
          <Spinner />
        ) : watchedMovieId ? (
          <Button
            onPress={() => removeWatched(watchedMovieId)}
            isLoading={removeFromWatchlistResult.fetching}
          >
            Remove from watchlist
          </Button>
        ) : (
          <Button
            onPress={() => handleWatched(movie.id)}
            isLoading={addToWatchlistResult.fetching}
          >
            I've watched this!
          </Button>
        )}
      </Box>
    </VStack>
  ) : null
}
