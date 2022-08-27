/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  popularity: Scalars['Float'];
  posterImage: Scalars['String'];
  posterPath: Scalars['String'];
  releaseDate: Scalars['String'];
  title: Scalars['String'];
  video: Scalars['Boolean'];
  voteAverage: Scalars['Float'];
  voteCount: Scalars['Int'];
  watchListId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addToWatchlist: WatchlistItem;
  removeFromWatchlist: WatchlistItem;
  syncAccount: Scalars['Boolean'];
};


export type MutationAddToWatchlistArgs = {
  input: WatchlistInput;
};


export type MutationRemoveFromWatchlistArgs = {
  input: WatchlistInput;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  movieById: Movie;
  nowPlaying: Array<Movie>;
  watchlist: Array<Scalars['String']>;
};


export type QueryHelloArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryMovieByIdArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryNowPlayingArgs = {
  page?: InputMaybe<Scalars['Int']>;
};

/** This holds the movieId for adding to the logged in user's watchlist */
export type WatchlistInput = {
  id: Scalars['String'];
};

export type WatchlistItem = {
  __typename?: 'WatchlistItem';
  id: Scalars['ID'];
  movieId: Scalars['String'];
  userId: Scalars['String'];
};

export type NowPlayingQueryVariables = Exact<{ [key: string]: never; }>;


export type NowPlayingQuery = { __typename?: 'Query', nowPlaying: Array<(
    { __typename?: 'Movie' }
    & { ' $fragmentRefs': { 'MovieFragmentFragment': MovieFragmentFragment } }
  )> };

export type MovieFragmentFragment = { __typename?: 'Movie', id: string, title: string, posterImage: string, backdropImage: string, releaseDate: string, overview: string, voteAverage: number, voteCount: number, popularity: number, originalLanguage: string } & { ' $fragmentName': 'MovieFragmentFragment' };

export type MovieByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type MovieByIdQuery = { __typename?: 'Query', movieById: (
    { __typename?: 'Movie', id: string, title: string }
    & { ' $fragmentRefs': { 'MovieFragmentFragment': MovieFragmentFragment } }
  ) };

export type AddToWatchlistMutationVariables = Exact<{
  input: WatchlistInput;
}>;


export type AddToWatchlistMutation = { __typename?: 'Mutation', addToWatchlist: { __typename?: 'WatchlistItem', id: string, movieId: string } };

export type RemoveFromWatchlistMutationVariables = Exact<{
  input: WatchlistInput;
}>;


export type RemoveFromWatchlistMutation = { __typename?: 'Mutation', removeFromWatchlist: { __typename?: 'WatchlistItem', id: string, movieId: string } };

export type WatchlistQueryVariables = Exact<{ [key: string]: never; }>;


export type WatchlistQuery = { __typename?: 'Query', watchlist: Array<string> };

export const MovieFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MovieFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Movie"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"posterImage"}},{"kind":"Field","name":{"kind":"Name","value":"backdropImage"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"overview"}},{"kind":"Field","name":{"kind":"Name","value":"voteAverage"}},{"kind":"Field","name":{"kind":"Name","value":"voteCount"}},{"kind":"Field","name":{"kind":"Name","value":"popularity"}},{"kind":"Field","name":{"kind":"Name","value":"originalLanguage"}}]}}]} as unknown as DocumentNode<MovieFragmentFragment, unknown>;
export const NowPlayingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NowPlaying"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nowPlaying"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MovieFragment"}}]}}]}},...MovieFragmentFragmentDoc.definitions]} as unknown as DocumentNode<NowPlayingQuery, NowPlayingQueryVariables>;
export const MovieByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MovieById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movieById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"MovieFragment"}}]}}]}},...MovieFragmentFragmentDoc.definitions]} as unknown as DocumentNode<MovieByIdQuery, MovieByIdQueryVariables>;
export const AddToWatchlistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddToWatchlist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WatchlistInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addToWatchlist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"movieId"}}]}}]}}]} as unknown as DocumentNode<AddToWatchlistMutation, AddToWatchlistMutationVariables>;
export const RemoveFromWatchlistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveFromWatchlist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WatchlistInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFromWatchlist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"movieId"}}]}}]}}]} as unknown as DocumentNode<RemoveFromWatchlistMutation, RemoveFromWatchlistMutationVariables>;
export const WatchlistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Watchlist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"watchlist"}}]}}]} as unknown as DocumentNode<WatchlistQuery, WatchlistQueryVariables>;