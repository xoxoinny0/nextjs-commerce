import 'src/styles/globals.css'
import type { AppProps } from 'next/app'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: Infinity },
  },
})

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  )
}
