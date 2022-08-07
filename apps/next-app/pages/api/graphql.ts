// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createServer } from '@graphql-yoga/node'
import SchemaBuilder from '@pothos/core'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@conference-demos/prisma-client'

import { z } from 'zod'

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string(),
  posterImage: z.string(),
  backdrop_path: z.string().nullable(),
  backdropImage: z.string(),
  release_date: z.string(),
  overview: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  popularity: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  genre_ids: z.array(z.number()),
  video: z.boolean(),
  adult: z.boolean(),
})
export const MoviesSchema = z.object({
  movies: z.array(MovieSchema),
})

export type MoviesType = z.infer<typeof MoviesSchema>
export type MovieType = z.infer<typeof MovieSchema>

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
}

const builder = new SchemaBuilder<{
  Objects: { Movie: MovieType }
  Context: {
    TMDB_TOKEN: string
  }
}>({})

builder.objectType('Movie', {
  fields: (t) => ({
    id: t.exposeID('id', {}),
    title: t.exposeString('title', {}),
    postgerPath: t.exposeString('poster_path', {}),
    posterImage: t.exposeString('posterImage', {}),
    backdropPath: t.exposeString('backdrop_path', {
      nullable: true,
    }),
    backdropImage: t.exposeString('backdropImage', {}),
    releaseDate: t.exposeString('release_date', {}),
    overview: t.exposeString('overview', {}),
    voteAverage: t.exposeInt('vote_average', {}),
    voteCount: t.exposeInt('vote_count', {}),
    popularity: t.exposeInt('popularity', {}),
    originalLanguage: t.exposeString('original_language', {}),
    originalTitle: t.exposeString('original_title', {}),
    genreIds: t.exposeIntList('genre_ids', {}),
    video: t.exposeBoolean('video', {}),
    adult: t.exposeBoolean('adult', {}),
  }),
})

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (parent, { name }) => `hello, ${name || 'World'}`,
    }),
    nowPlaying: t.field({
      type: ['Movie'],
      args: {
        page: t.arg.int(),
      },
      resolve: async (parent, { page }, ctx) => {
        console.log('resolving nowPlaying', ctx.TMDB_TOKEN)

        const url = 'movie/now_playing'
        const response = await fetch(
          `https://api.themoviedb.org/3/${url}?page=1`,
          {
            headers: {
              Authorization: ctx.TMDB_TOKEN,
            },
          }
        )
        const responseJson = await response.json()

        const movies: MoviesType['movies'] = responseJson.results ?? []

        return movies.map((movie) => ({
          ...movie,
          posterImage: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
          backdropImage: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
        }))
      },
    }),
  }),
})

export default createServer<{
  req: NextApiRequest
  res: NextApiResponse
}>({
  schema: builder.toSchema({}),
  context: async ({ req, res }) => {
    const TMDB_TOKEN = 'Bearer ' + process.env['TMDB_BEARER_TOKEN']

    const response = { req, res, prisma, TMDB_TOKEN, uid: '' }

    const bearerToken = req.headers.authorization || ''
    const bearerTokenParts = bearerToken.split('Bearer ')
    const bearerTokenValue = bearerTokenParts[1]

    if (bearerTokenValue) {
      response.uid = bearerTokenValue
      return response
    }

    return response
  },
})