import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Movie = {
  __typename?: 'Movie';
  adult: Scalars['Boolean'];
  backdropImage: Scalars['String'];
  backdropPath?: Maybe<Scalars['String']>;
  genreIds: Array<Scalars['Int']>;
  id: Scalars['ID'];
  originalLanguage: Scalars['String'];
  originalTitle: Scalars['String'];
  overview: Scalars['String'];
  popularity: Scalars['Int'];
  posterImage: Scalars['String'];
  postgerPath: Scalars['String'];
  releaseDate: Scalars['String'];
  title: Scalars['String'];
  video: Scalars['Boolean'];
  voteAverage: Scalars['Int'];
  voteCount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  nowPlaying: Array<Movie>;
};


export type QueryHelloArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryNowPlayingArgs = {
  page?: InputMaybe<Scalars['Int']>;
};

export type NowPlayingQueryVariables = Exact<{ [key: string]: never; }>;


export type NowPlayingQuery = { __typename?: 'Query', nowPlaying: Array<{ __typename?: 'Movie', id: string, title: string, posterImage: string, backdropImage: string, releaseDate: string, overview: string, voteAverage: number, voteCount: number, popularity: number, originalLanguage: string }> };


export const NowPlayingDocument = `
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
    `;
export const useNowPlayingQuery = <
      TData = NowPlayingQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: NowPlayingQueryVariables,
      options?: UseQueryOptions<NowPlayingQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<NowPlayingQuery, TError, TData>(
      variables === undefined ? ['NowPlaying'] : ['NowPlaying', variables],
      fetcher<NowPlayingQuery, NowPlayingQueryVariables>(client, NowPlayingDocument, variables, headers),
      options
    );