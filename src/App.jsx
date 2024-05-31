import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "react-query-devtools"
import { Analytics } from "@vercel/analytics/react"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Outlet />
      <ReactQueryDevtools />
      <Analytics debug={false} />
    </QueryClientProvider>
  )
}

export default App

// import { useState, useEffect } from "react"
// import supabase from "./utils/supabase"

// function Page() {
//   const [todos, setTodos] = useState([])

//   useEffect(() => {
//     async function getTodos() {
//       const { data: todos } = await supabase.from("countries").select()

//       if (todos.length > 1) {
//         setTodos(todos)
//       }
//       console.log(todos)
//     }

//     getTodos()
//   }, [])

//   return (
//     <div>
//       {todos.map((todo) => (
//         <li key={todo.id}>{todo.name}</li>
//       ))}
//     </div>
//   )
// }
// export default Page
