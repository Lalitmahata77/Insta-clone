import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {useEditProfileMutation} from "../redux/api/userApiSlice"
import { Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { setAuthUser } from '../redux/feature/auth/authSlice';

const EditProfile = () => {
    const imageRef = useRef();
    const [editprofile] = useEditProfileMutation()
    const { userInfo } = useSelector((state) => state.auth);
 
    
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        profilePicture: userInfo?.profilePicture,
        bio: userInfo?.bio,
        gender: userInfo?.gender
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
const params = useParams()
    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) setInput({ ...input, profilePicture: file });
    }

    const selectChangeHandler = (value) => {
        setInput({ ...input, gender: value });
    }


    const editProfileHandler = async () => {
        
        console.log(input);
        const formData = new FormData();
        formData.append("bio", input.bio);
        formData.append("gender", input.gender);
        if(input.profilePhoto){
            formData.append("profilePicture", input.profilePicture);
        }
        try {
            setLoading(true);
            const data = await editprofile({postId : params._id,formData}).unwrap()
            if(data.data.success){
                const updatedUserData = {
                    ...userInfo,
                    bio:data.data.user?.bio,
                    profilePicture:data.data.user?.profilePicture,
                    gender:data.data.user.gender
                };
                dispatch(setAuthUser(updatedUserData));
                navigate(`/profile/${userInfo?._id}`);
                toast.success(data.data.message);
            }
            // if (data?.error) {
            //     toast.error(data.error, {
            //       position: toast.POSITION.TOP_RIGHT,
            //       autoClose: 2000,
            //     });
            //   } else {
            //     toast.success(`Product successfully updated`, {
            //       position: toast.POSITION.TOP_RIGHT,
            //       autoClose: 2000,
            //     });
            //     navigate(`/profile/${userInfo?.user._id}`);
            //   }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.messasge);
        } finally{
            setLoading(false);
        }
    }
    return (
        <div className='flex max-w-2xl mx-auto pl-10'>
            <section className='flex flex-col gap-6 w-full my-8'>
                <h1 className='font-bold text-xl'>Edit Profile</h1>
                <div className='flex items-center justify-between bg-gray-100 rounded-xl p-4'>
                    <div className='flex items-center gap-3'>
                        <Avatar>
                            <AvatarImage src={userInfo?.profilePicture} alt="post_image" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className='font-bold text-sm'>{userInfo?.user?.username}</h1>
                            <span className='text-gray-600'>{userInfo?.bio || 'Bio here...'}</span>
                        </div>
                    </div>
                    <input ref={imageRef} onChange={fileChangeHandler} type='file' className='hidden' />
                    <Button onClick={() => imageRef?.current.click()} className='bg-[#0095F6] h-8 hover:bg-[#318bc7]'>Change photo</Button>
                </div>
                <div>
                    <h1 className='font-bold text-xl mb-2'>Bio</h1>
                    <Textarea value={input.bio} onChange={(e) => setInput({ ...input, bio: e.target.value })} name='bio' className="focus-visible:ring-transparent" />
                </div>
                <div>
                    <h1 className='font-bold mb-2'>Gender</h1>
                    <Select defaultValue={input.gender} onValueChange={selectChangeHandler}>
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex justify-end'>
                    {
                        loading ? (
                            <Button className='w-fit bg-[#0095F6] hover:bg-[#2a8ccd]'>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                            </Button>
                        ) : (
                            <Button onClick={editProfileHandler} className='w-fit bg-[#0095F6] hover:bg-[#2a8ccd]'>Submit</Button>
                        )
                    }
                </div>
            </section>
        </div>
    )
}

export default EditProfile