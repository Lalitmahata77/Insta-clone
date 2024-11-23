import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../redux/api/userApiSlice'
import { setCredentials } from '../../redux/feature/auth/authSlice'
import { toast } from 'react-toastify'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [login,{isLoading}] = useLoginMutation()
    const {userInfo} = useSelector((state)=>state.auth)
    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get("redirect") || "/"
    
    useEffect(()=>{
        if (userInfo) {
            navigate(redirect)
        }
    },[navigate,redirect,userInfo])
    
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          const res = await login({ email, password }).unwrap();
          console.log(res);
          dispatch(setCredentials({ ...res }));
          navigate(redirect);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      };
    
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-green-400">
          {/* <!-- Matrix-themed Login Form --> */}
          <div className="flex flex-col items-center bg-black bg-opacity-60 border border-green-600 p-10 rounded-lg shadow-lg">
            <img src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" className="h-14 mb-6 filter invert" alt="Instagram Logo"/>
            <form onSubmit={submitHandler} className="flex flex-col w-80 space-y-4">
              <input  type="email" placeholder="Phone number, username, or email" value={email} onChange={(e)=>setEmail(e.target.value)} className="px-4 py-3 bg-black border border-green-600 text-green-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"/>
              <input  type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="px-4 py-3 bg-black border border-green-600 text-green-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"/>
              <button type="submit" className="bg-green-600 text-black font-semibold py-2 rounded-lg hover:bg-green-700 transition-all duration-300">
                {isLoading ? "Loging...." : "Log in"}
              </button>
              <div className="flex justify-between items-center">
                <a href="#" className="text-sm text-green-300 hover:underline">Forgot password?</a>
              </div>
              <div className="flex items-center justify-between my-4">
                <hr className="w-full border-t border-green-600"/>
                <span className="px-4 text-green-400">OR</span>
                <hr className="w-full border-t border-green-600"/>
              </div>
              <button className="flex items-center justify-center w-full py-2 border border-green-600 rounded-lg hover:bg-green-700">
                <img src="https://static.vecteezy.com/system/resources/previews/018/930/698/original/facebook-logo-facebook-icon-transparent-free-png.png" className="h-6 mr-2 invert" alt="Facebook Icon"/>
                Log in with Facebook
              </button>
            </form>
            <p className="mt-4 text-sm">Don't have an account? <Link to="/signup" className="text-green-400 font-semibold hover:underline">Sign up</Link></p>
            <p className="mt-4 text-xs">Get the app.</p>
          </div>
        </div>
  )
}

export default Login