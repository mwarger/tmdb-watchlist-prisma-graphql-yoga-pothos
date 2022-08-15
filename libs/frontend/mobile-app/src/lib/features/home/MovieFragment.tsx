import { gql } from '../../../generated/gql'

export const MovieFragment = gql(/* GraphQL */ `
  fragment MovieFragment on Movie {
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
`)
