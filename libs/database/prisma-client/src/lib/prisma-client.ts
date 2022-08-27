import { PrismaClient } from '@prisma/client'

// use this to setup prisma to be available globally
// declare global {
//   // eslint-disable-next-line no-var
//   var prisma: PrismaClient | undefined;
// }

// export const prisma =
//   global.prisma ||
//   new PrismaClient({
//     log: ['query'],
//   });

// if (process.env['NODE_ENV'] !== 'production') {
//   global.prisma = prisma;
// }

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
