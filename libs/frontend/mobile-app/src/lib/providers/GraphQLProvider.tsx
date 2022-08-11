import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { GraphQLClient } from 'graphql-request'
import reactotron from 'reactotron-react-native'

import Constants from 'expo-constants'
import { useAuthenticatedUser } from './AuthenticationProvider'

const queryClient = new QueryClient()
const { manifest } = Constants
let apiHost = ''
const endpoint = Constants.manifest?.extra?.apiUrl ?? ''
reactotron.log?.('endpoint', endpoint)

if (__DEV__) {
  apiHost =
    typeof manifest?.packagerOpts === `object` && manifest.packagerOpts.dev
      ? manifest.debuggerHost?.split(`:`).shift()?.concat(`:4200`)
      : endpoint

  // add http if not present
  if (!apiHost.startsWith('http')) {
    apiHost = `http://${apiHost}`
  }
} else {
  apiHost = endpoint
}

export const client = new GraphQLClient(`${apiHost}/api/graphql`)

export function GraphQLProvider({ children }: { children: React.ReactNode }) {
  const { userData } = useAuthenticatedUser()

  React.useEffect(() => {
    const idToken = userData.username
    client.setHeader('authorization', `Bearer ${idToken}`)
  }, [userData.username])

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
