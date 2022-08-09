/* eslint-disable @typescript-eslint/no-unused-vars */
import { gql } from 'graphql-tag'

const NOW_PLAYING = gql`
  query NowPlaying {
    nowPlaying {
      id
      title
      posterImage
      backdropImage
      releaseDate
      overview
      voteAverage
      voteCount
      popularity
      originalLanguage
    }
  }
`
