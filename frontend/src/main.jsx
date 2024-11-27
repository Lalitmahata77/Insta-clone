import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom"
import { Provider } from 'react-redux'
import store from './redux/store.js'
import Signup from './pages/auth/Signup.jsx'
import Login from './pages/auth/Login.jsx'
import Home from './Home.jsx'
import PrivateRoute from './components/PrivateRoute'
import CratePost from './components/CratePost'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
          <Route index={true} path="/" element={<Home />} />

      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>

<Route path='' element={<PrivateRoute/>}>
<Route path='/create' element={<CratePost/>}/>
<Route path="/profile/:id" element={<Profile/>}/>
<Route path='/account/edit' element={<EditProfile/>}/>
</Route>

    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
