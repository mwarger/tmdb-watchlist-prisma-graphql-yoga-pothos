import React from 'react'
import { Image, Text, AspectRatio, ScrollView } from 'native-base'
import { FragmentType, useFragment } from '../../../generated/gql'
import { MovieFragment } from './MovieFragment'

export function MoviePoster({
  item,
  showOverview,
}: {
  item: FragmentType<typeof MovieFragment>
  showOverview?: boolean
}) {
  const movie = useFragment(MovieFragment, item)

  return (
    <ScrollView>
      <AspectRatio
        ratio={{
          base: 3 / 4,
          md: 9 / 10,
        }}
      >
        <Image
          source={{
            uri: movie.posterImage,
          }}
          alt={`${movie.title} poster`}
          resizeMode="cover"
          w={'full'}
          h={'full'}
        />
      </AspectRatio>
      <Text
        _dark={{
          color: 'warmGray.50',
        }}
        color="coolGray.800"
        bold
        display={'flex'}
        flexWrap={'wrap'}
        flexShrink={1}
        fontSize="md"
      >
        {movie.title}
      </Text>
      {showOverview ? (
        <Text
          _dark={{
            color: 'warmGray.50',
          }}
          color="coolGray.800"
          display={'flex'}
          flexWrap={'wrap'}
          flexShrink={1}
          fontSize="sm"
        >
          {movie.overview}
        </Text>
      ) : null}
      <Text
        fontSize="xs"
        _dark={{
          color: 'warmGray.50',
        }}
        color="coolGray.800"
        alignSelf="flex-start"
      >
        {movie.releaseDate
          ? `Released: ${new Date(movie.releaseDate).toLocaleDateString()}`
          : 'No date scheduled.'}
      </Text>
    </ScrollView>
  )
}
