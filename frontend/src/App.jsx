import { Outlet } from "react-router"
// import {ToastContainer} from "react-toastify"
import Navigation from "./pages/auth/Navigation"
import { Toaster } from "./components/ui/sonner"
// import RightSidebar from "./components/RightSIdebar"

function App() {
  
  return (
    <>
    {/* <ToastContainer/> */}
    <Toaster/>
    <Navigation/>
   
    <main>
      <Outlet/>

    </main>
    </>
  )
}

export default App
