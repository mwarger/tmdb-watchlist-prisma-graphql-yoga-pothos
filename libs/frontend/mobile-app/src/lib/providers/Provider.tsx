import React from 'react'
import NativeBaseProvider from '../native-base/NativeBaseProvider'
import { NavigationProvider } from './NavigationProvider'
import { AuthenticationProvider } from './AuthenticationProvider'
import { GraphQLProvider } from './GraphQLProvider'

export interface ProviderProps {
  children: React.ReactNode
}

export function Provider({ children }: ProviderProps) {
  return (
    <AuthenticationProvider>
      <GraphQLProvider>
        <NativeBaseProvider>
          <NavigationProvider>{children}</NavigationProvider>
        </NativeBaseProvider>
      </GraphQLProvider>
    </AuthenticationProvider>
  )
}

export default Provider
