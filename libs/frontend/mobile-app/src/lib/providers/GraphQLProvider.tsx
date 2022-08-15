import React from 'react'
import reactotron from 'reactotron-react-native'
import { createClient, Provider } from 'urql'

import Constants from 'expo-constants'
import { useAuthenticatedUser } from './AuthenticationProvider'

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

const url = `${apiHost}/api/graphql`

export function GraphQLProvider({ children }: { children: React.ReactNode }) {
  const { userData } = useAuthenticatedUser()
  const client = React.useMemo(() => {
    return createClient({
      url: url,
      fetchOptions: () => {
        const token = userData.username
        return {
          headers: { authorization: token ? `Bearer ${token}` : '' },
        }
      },
    })
  }, [userData.username])

  return <Provider value={client}>{children}</Provider>
}
