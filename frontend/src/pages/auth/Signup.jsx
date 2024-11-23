import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate,useLocation} from "react-router-dom"
import { useRegisterMutation } from "../../redux/api/userApiSlice"
import { setCredentials } from "../../redux/feature/auth/authSlice"
import { toast } from "react-toastify"

const Signup = () => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [register, {isLoading}] = useRegisterMutation()
    const {userInfo} = useSelector((state)=>state.auth)
const { search} = useLocation()
const sp = new URLSearchParams(search)
const redirect = sp.get("redirect") || "/"
useEffect(()=>{
    if (userInfo) {
        navigate(redirect)
    }
},[redirect,userInfo,navigate])
const submitHandler = async(e)=>{
e.preventDefault()
try {
    const res = await register({username,email,password}).unwrap()
    dispatch(setCredentials({...res}))
    navigate(redirect)
    toast.success("User register successfully")
} catch (error) {
    console.log(error);
    toast.error(error.data.message)
    
}
}
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-green-400">
          {/* <!-- Matrix-themed Login Form --> */}
          <div className="flex flex-col items-center bg-black bg-opacity-60 border border-green-600 p-10 rounded-lg shadow-lg">
            <img src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" className="h-14 mb-6 filter invert" alt="Instagram Logo"/>
            <form className="flex flex-col w-80 space-y-4" onSubmit={submitHandler}>
              <input type="text" placeholder="Phone number, username" className="px-4 py-3 bg-black border border-green-600 text-green-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" value={username} onChange={(e)=>setUsername(e.target.value)}/>
              <input type="email" placeholder=" email" className="px-4 py-3 bg-black border border-green-600 text-green-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <input type="password" placeholder="Password" className="px-4 py-3 bg-black border border-green-600 text-green-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" value={password} onChange={(e)=>setPassword(e.target.value)}/>
              <button type="submit" className="bg-green-600 text-black font-semibold py-2 rounded-lg hover:bg-green-700 transition-all duration-300">
                {isLoading ? "signing.....": "Sign up"}
              </button>
              <div className="flex justify-between items-center">
                <a href="#" className="text-sm text-green-300 hover:underline">Forgot password?</a>
              </div>
              <div className="flex items-center justify-between my-4">
                <hr className="w-full border-t border-green-600"/>
                <span className="px-4 text-green-400">OR</span>
                <hr className="w-full border-t border-green-600"/>
              </div>
              <button  className="flex items-center justify-center w-full py-2 border border-green-600 rounded-lg hover:bg-green-700">
                <img src="https://static.vecteezy.com/system/resources/previews/018/930/698/original/facebook-logo-facebook-icon-transparent-free-png.png" className="h-6 mr-2 invert" alt="Facebook Icon"/>
                Sign up with Facebook
              </button>
            </form>
            <p className="mt-4 text-sm">Don't have an account? <Link to="/login" className="text-green-400 font-semibold hover:underline">Log in</Link></p>
            <p className="mt-4 text-xs">Get the app.</p>
          </div>
        </div>
       
  )
}

export default Signup