import { Outlet } from "react-router"
// import {ToastContainer} from "react-toastify"
import Navigation from "./pages/auth/Navigation"
import { Toaster } from "./components/ui/sonner"
import { useDispatch, useSelector } from "react-redux"
import { io } from "socket.io-client"
// import RightSidebar from "./components/RightSIdebar"
import {setSocket} from "./redux/feature/soket/soketSlice"
import { useEffect } from "react"
import {setOnlineUsers} from  "./redux/feature/chat/chatSlice"
function App() {
  // const { socket } = useSelector((state) => state.socketio);
  const {userInfo} = useSelector((state)=>state.auth)
  // const { socket } = useSelector(store => store.socketio);

  const dispatch = useDispatch()
  useEffect(() => {
    if (userInfo) {
      const socketio = io('http://localhost:5000', {
        query: {
          userId: userInfo?._id
        },
        transports: ['websocket']
      });
      dispatch(setSocket(socketio));

      // listen all the events
      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      // socketio.on('notification', (notification) => {
      //   dispatch(setLikeNotification(notification));
      // });

      return () => {
        socketio.close();
        dispatch(setSocket(null));
      }
     }
    // else if (socket) {
    //   socket.close();
    //   dispatch(setSocket(null));
    // }
  }, [userInfo, dispatch]);

  
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
