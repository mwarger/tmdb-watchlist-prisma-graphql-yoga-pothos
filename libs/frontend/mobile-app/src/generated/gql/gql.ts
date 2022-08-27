/* eslint-disable */
import * as graphql from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query NowPlaying {\n    nowPlaying {\n      ...MovieFragment\n    }\n  }\n": graphql.NowPlayingDocument,
    "\n  fragment MovieFragment on Movie {\n    id\n    title\n    posterImage\n    backdropImage\n    releaseDate\n    overview\n    voteAverage\n    voteCount\n    popularity\n    originalLanguage\n  }\n": graphql.MovieFragmentFragmentDoc,
    "\n  query MovieById($id: Int!) {\n    movieById(id: $id) {\n      id\n      title\n      ...MovieFragment\n    }\n  }\n": graphql.MovieByIdDocument,
    "\n  mutation AddToWatchlist($input: WatchlistInput!) {\n    addToWatchlist(input: $input) {\n      id\n      movieId\n    }\n  }\n": graphql.AddToWatchlistDocument,
    "\n  mutation RemoveFromWatchlist($input: WatchlistInput!) {\n    removeFromWatchlist(input: $input) {\n      id\n      movieId\n    }\n  }\n": graphql.RemoveFromWatchlistDocument,
    "\n  query MyWatchlist($ids: [String!]!) {\n    movieList(ids: $ids) {\n      ...MovieFragment\n    }\n  }\n": graphql.MyWatchlistDocument,
    "\n  mutation SyncAccount {\n    syncAccount\n  }\n": graphql.SyncAccountDocument,
    "\n  query Watchlist {\n    watchlist\n  }\n": graphql.WatchlistDocument,
};

export function gql(source: "\n  query NowPlaying {\n    nowPlaying {\n      ...MovieFragment\n    }\n  }\n"): (typeof documents)["\n  query NowPlaying {\n    nowPlaying {\n      ...MovieFragment\n    }\n  }\n"];
export function gql(source: "\n  fragment MovieFragment on Movie {\n    id\n    title\n    posterImage\n    backdropImage\n    releaseDate\n    overview\n    voteAverage\n    voteCount\n    popularity\n    originalLanguage\n  }\n"): (typeof documents)["\n  fragment MovieFragment on Movie {\n    id\n    title\n    posterImage\n    backdropImage\n    releaseDate\n    overview\n    voteAverage\n    voteCount\n    popularity\n    originalLanguage\n  }\n"];
export function gql(source: "\n  query MovieById($id: Int!) {\n    movieById(id: $id) {\n      id\n      title\n      ...MovieFragment\n    }\n  }\n"): (typeof documents)["\n  query MovieById($id: Int!) {\n    movieById(id: $id) {\n      id\n      title\n      ...MovieFragment\n    }\n  }\n"];
export function gql(source: "\n  mutation AddToWatchlist($input: WatchlistInput!) {\n    addToWatchlist(input: $input) {\n      id\n      movieId\n    }\n  }\n"): (typeof documents)["\n  mutation AddToWatchlist($input: WatchlistInput!) {\n    addToWatchlist(input: $input) {\n      id\n      movieId\n    }\n  }\n"];
export function gql(source: "\n  mutation RemoveFromWatchlist($input: WatchlistInput!) {\n    removeFromWatchlist(input: $input) {\n      id\n      movieId\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveFromWatchlist($input: WatchlistInput!) {\n    removeFromWatchlist(input: $input) {\n      id\n      movieId\n    }\n  }\n"];
export function gql(source: "\n  query MyWatchlist($ids: [String!]!) {\n    movieList(ids: $ids) {\n      ...MovieFragment\n    }\n  }\n"): (typeof documents)["\n  query MyWatchlist($ids: [String!]!) {\n    movieList(ids: $ids) {\n      ...MovieFragment\n    }\n  }\n"];
export function gql(source: "\n  mutation SyncAccount {\n    syncAccount\n  }\n"): (typeof documents)["\n  mutation SyncAccount {\n    syncAccount\n  }\n"];
export function gql(source: "\n  query Watchlist {\n    watchlist\n  }\n"): (typeof documents)["\n  query Watchlist {\n    watchlist\n  }\n"];

export function gql(source: string): unknown;
export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;