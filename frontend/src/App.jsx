import { Outlet } from "react-router"
import {ToastContainer} from "react-toastify"
import Navigation from "./pages/auth/Navigation"

function App() {
  
  return (
    <>
    <ToastContainer/>
    <Navigation/>
    <main>
      <Outlet/>
    </main>
     
    </>
  )
}

export default App
