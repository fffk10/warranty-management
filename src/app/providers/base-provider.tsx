import { ReactNode } from 'react'
import { UIProvider } from '@yamada-ui/react'

type BaseProviderProps = {
  children: ReactNode
}

export default function BaseProvider({ children }: BaseProviderProps) {
  return <UIProvider>{children}</UIProvider>
}
