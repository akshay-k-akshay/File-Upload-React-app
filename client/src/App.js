import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';

import "./App.css"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
