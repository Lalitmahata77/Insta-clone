import { useRef, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { readFileAsDataUrl } from "@/lib/utils"
import { toast } from "react-toastify"
import {useCreatePostMutation} from "../redux/api/postApiSlice"
import { useNavigate } from "react-router-dom"

const CratePost = () => {
    const imageRef = useRef()
    const[file, setFile] = useState("");
    const[caption, setCaption] = useState("")
    const [imagePreview, setImagePreview] = useState("")
    const navigate = useNavigate()
const[createpost] = useCreatePostMutation()
    const fileChangeHandler = async(e)=>{
        const file = e.target.files?.[0]
        if (file) {
            setFile(file)
            const dataUrl = await readFileAsDataUrl(file)
            setImagePreview(dataUrl)
        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const postData = new FormData();
            postData.append("caption", caption)
          if(imagePreview)  postData.append("image", file)
            const {data} = await createpost(postData)
        if (data.error) {
            toast.error("Post create failed. Try again..")
            
        }else{
            toast.success("New Post added")
            navigate("/")
        }
        } catch (error) {
            console.log(error);
            toast.error("Post crate failed. Try again..")
        }
    }
  return (
    <div className=" items-center justify-center flex ">
<div className=" m-52  ">
<DialogHeader className=" text-center font-semibold">Create New Post</DialogHeader>
<div className=" flex gap-3 items-center mt-5">
<Avatar>
    <AvatarImage src="" alt="img"/>
    <AvatarFallback>CN</AvatarFallback>
</Avatar>
<div className=" p-6">
    <h1 className=" font-semibold text-xs">Username</h1>
    <span className=" text-gray-600 text-xs">Bio here......</span>
</div>
</div>
<Textarea className=" focus-visible:ring-transparent border-none" placeholder="Write a caption...." value={caption} onChange={(e)=>setCaption(e.target.value)}/>
{
    imagePreview && (
        <div className=" w-full h-64 flex items-center justify-center">
<img src={imagePreview} alt="preview-image"  className=" w-full h-full object-cover rounded-md"/>
        </div>
    )
}
<input ref={imageRef} type="file" onChange={fileChangeHandler} className=" hidden"/>
<Button onClick={()=> imageRef.current.click()} className=" w-fit mx-auto hover:bg-[#258bcf] mt-3">Select from computer</Button>

{
    imagePreview && (
        <Button className=" w-full mt-4" type="submit" onClick={handleSubmit}>Post</Button>
    )
}

</div>
    </div>
  )
}

export default CratePost