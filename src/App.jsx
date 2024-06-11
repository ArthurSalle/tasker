import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "react-query-devtools"
import { Analytics } from "@vercel/analytics/react"

import { queryClient } from "./utils/queryClient"
import { DefaultLayout } from "./components/DefaultLayout"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DefaultLayout />
      <ReactQueryDevtools />
      <Analytics debug={false} />
    </QueryClientProvider>
  )
}

export default App
