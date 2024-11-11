"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast"
import { Provider } from 'react-redux';
import store from '../store/store';

const ClientProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const queryClient = new QueryClient()

  return (

    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Provider store={store}>
          <Toaster />
          {children}
        </Provider>
      </SessionProvider>
    </QueryClientProvider>

  )
}

export default ClientProvider