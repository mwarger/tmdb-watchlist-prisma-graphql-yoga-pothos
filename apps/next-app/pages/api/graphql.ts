import { createServer } from '@graphql-yoga/node'
import SchemaBuilder from '@pothos/core'
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

import { PrismaClient, WatchListItem } from '@prisma/client'

export const prisma = new PrismaClient({
  log: ['query'],
})

export async function upsertUser({
  uid,
  email,
}: {
  uid: string
  email?: string
}) {
  return prisma.user.upsert({
    where: {
      id: uid,
    },
    update: {
      email: email,
    },
    create: {
      id: uid,
      email: email,
    },
  })
}

export async function createWatchlistItem(data: {
  movieId: string
  userId: string
}) {
  return prisma.watchListItem.create({
    data,
  })
}

export async function deleteWatchlistItem(data: {
  movieId: string
  userId: string
}) {
  return prisma.watchListItem.delete({
    where: {
      userId_movieId: data,
    },
  })
}

// get watchlist
export async function getWatchlist(userId: string) {
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      watchList: true,
    },
  })

  return result?.watchList ?? []
}



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
  watchListId: z.string(),
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

export const builder = new SchemaBuilder<{
  Objects: { Movie: MovieType; WatchlistItem: WatchListItem }
  Context: {
    TMDB_TOKEN: string
    uid: string
  }
}>({})

builder.objectType('Movie', {
  fields: (t) => ({
    id: t.exposeID('id', {}),
    title: t.exposeString('title', {}),
    posterPath: t.exposeString('poster_path', {}),
    posterImage: t.exposeString('posterImage', {}),
    backdropPath: t.exposeString('backdrop_path', {
      nullable: true,
    }),
    backdropImage: t.exposeString('backdropImage', {}),
    releaseDate: t.exposeString('release_date', {}),
    overview: t.exposeString('overview', {}),
    voteAverage: t.exposeFloat('vote_average', {}),
    voteCount: t.exposeInt('vote_count', {}),
    popularity: t.exposeFloat('popularity', {}),
    originalLanguage: t.exposeString('original_language', {}),
    originalTitle: t.exposeString('original_title', {}),
    genreIds: t.exposeIntList('genre_ids', {}),
    video: t.exposeBoolean('video', {}),
    adult: t.exposeBoolean('adult', {}),
    watchListId: t.exposeString('watchListId', {}),
  }),
})

builder.objectType('WatchlistItem', {
  fields: (t) => ({
    id: t.exposeID('id', {}),
    movieId: t.exposeString('movieId', {}),
    userId: t.exposeString('userId', {}),
  }),
})

const WatchlistInput = builder.inputType('WatchlistInput', {
  description:
    "This holds the movieId for adding to the logged in user's watchlist",
  fields: (t) => ({
    id: t.string({ required: true }),
  }),
})

builder.mutationType({
  fields: (t) => ({
    addToWatchlist: t.field({
      type: 'WatchlistItem',
      args: {
        input: t.arg({ type: WatchlistInput, required: true }),
      },
      resolve: async (root, { input }, ctx) => {
        const result = await createWatchlistItem({
          movieId: input.id,
          userId: ctx.uid,
        })

        return result
      },
    }),
    removeFromWatchlist: t.field({
      type: 'WatchlistItem',
      args: {
        input: t.arg({ type: WatchlistInput, required: true }),
      },
      resolve: async (root, { input }, ctx) => {
        console.log('INPUT', input.id)

        const result = await deleteWatchlistItem({
          movieId: input.id,
          userId: ctx.uid,
        })

        return result
      },
    }),
    syncAccount: t.field({
      type: 'Boolean',
      resolve: async (root, args, ctx) => {
        await upsertUser({
          uid: ctx.uid,
          email: ctx.uid,
        })

        return true
      },
    }),
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
    movieById: t.field({
      type: 'Movie',
      args: {
        id: t.arg.int(),
      },
      resolve: async (parent, { id }, ctx) => {
        const url = `movie/${id}`

        try {
          const response = await fetch(`https://api.themoviedb.org/3/${url}`, {
            headers: {
              Authorization: ctx.TMDB_TOKEN,
            },
          })

          const data = await response.json()

          return {
            ...data,
            posterImage: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
            backdropImage: `https://image.tmdb.org/t/p/w500${data.backdrop_path}`,
          }
        } catch (error) {
          console.log(error)
        }
      },
    }),
    nowPlaying: t.field({
      type: ['Movie'],
      args: {
        page: t.arg.int(),
      },
      resolve: async (parent, { page }, ctx) => {
        const url = 'movie/now_playing'
        const response = await fetch(
          `https://api.themoviedb.org/3/${url}?page=${page}`,
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
    movieList: t.field({
      type: ['Movie'],
      args: {
        ids: t.arg.stringList({
          required: true,
        }),
      },
      resolve: async (parent, { ids }, ctx) => {
        const urls = ids.map((id) => `movie/${id}`)

        const promises = urls.map((url) => {
          return fetch(`https://api.themoviedb.org/3/${url}`, {
            headers: {
              Authorization: ctx.TMDB_TOKEN,
            },
          })
        })

        const responses = await Promise.all(promises)

        const data = await Promise.all(
          responses.map((response) => response.json())
        )

        return (
          data.map((movie) => ({
            ...movie,
            posterImage: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            backdropImage: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
          })) ?? []
        )
      },
    }),
    watchlist: t.stringList({
      resolve: async (parent, args, ctx) => {
        const uid = ctx.uid

        const watchlist = await getWatchlist(uid)

        return watchlist.map((item) => item.movieId)
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
