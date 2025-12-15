import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import PostListPage from './pages/PostListPage.jsx'
import Write from './pages/Write.jsx'
import {createBrowserRouter , RouterProvider ,} from "react-router-dom"
import MainLayout from './layouts/MainLayout.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { shadesOfPurple , neobrutalism , light } from '@clerk/themes'  
import SinglePostPage from './pages/SinglePostPage.jsx'
import { ToastContainer} from 'react-toastify';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'



const queryClient = new QueryClient()

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}


const router = createBrowserRouter([
  {
    element:<MainLayout/>,
    children:[
      { path: '/',
    element: <HomePage />,
    errorElement: <div>Page not found</div>
  },
  { path: '/posts',
    element: <PostListPage />,
    errorElement: <div>Page not found</div>
  },
  { path: '/:slug',
    element: <SinglePostPage />,
    errorElement: <div>Page not found</div>
  },
  { path: '/write',
    element: <Write />,
    errorElement: <div>Page not found</div>
  },
  { path: '/login',
    element: <LoginPage />,
    errorElement: <div>Page not found</div>
  },
  { path: '/register',
    element: <RegisterPage />,
    errorElement: <div>Page not found</div>
  },
  { path: '/test',
    element: <RegisterPage />,
    errorElement: <div>Page not found</div>
  },
  
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider
    appearance={{
        baseTheme: light,
      }}
    publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer position='bottom-right'/>
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>,
)
