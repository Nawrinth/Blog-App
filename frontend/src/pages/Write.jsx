import React , {useState , useRef} from 'react'
  import { useAuth, useUser } from "@clerk/clerk-react";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import LoadingScreen from '../components/LoadingScreen';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import {  useNavigate } from "react-router-dom"
import { Bounce, toast} from 'react-toastify';

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/react";

import Upload from '../components/Upload';


const Write = () => {
  const {isLoaded , isSignedIn} = useUser();
  const {getToken} = useAuth();
  const navigate = useNavigate();
  
  const [value, setValue] = useState('');
  const [progress, setProgress] = useState(0);
  const [fileName , setFileName] = useState(null);

  const fileInputRef = useRef(null);
  const abortController = new AbortController();

  const authenticator = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/upload-auth`);
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }

            
            const data = await response.json();
            const { signature, expire, token, publicKey } = data;
            return { signature, expire, token, publicKey };
        } catch (error) {
            console.error("Authentication error:", error);
            throw new Error("Authentication request failed");
        }
    };
  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const API_URL = import.meta.env.VITE_API_URL;
      const token = await getToken();
      return await axios.post(`${API_URL}/posts`, newPost , {
        headers: {Authorization: `Bearer ${token}`}
      })
    },
    onSuccess:(res)=>{
      console.log("Data: ", res)
      toast.success("Post has been created")
      navigate(`/${res.data.data.slug}`)
    }
  })

  if (!isLoaded) 
    return <LoadingScreen/>
  if (isLoaded && !isSignedIn){
    return toast.error("Login to Share your story")
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const data = {
      title:formData.get("title"),
      category:formData.get("category"),
      desc:formData.get("desc"),
      content:value,
    }
    if (!(data.title && data.category && data.desc && data.content)){
      toast.warning("All the fields are mandatory" , {autoClose:2000 , })
      return;
    }
    const responseImage = await handleUploadImage();
    
    const urlCoverImage = responseImage?.url;
    data.img = urlCoverImage
    console.log(data)
    mutation.mutate(data)
  }

  const handleFileUpload = ()=>{
    setFileName(fileInputRef.current.files[0].name);
    console.log(fileInputRef.current.files[0].name);
    console.log(fileInputRef.current.files[0]);
  }

  const handleError = (error, file) => {
    console.log('error code ' + error.code + ': ' + error.message)
  }

  const handleUploadImage = async () => {
        // Access the file input element using the ref
       
        const fileInput = fileInputRef.current;
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            alert("Please select a file to upload");
            return;
        }

        // Extract the first file from the file input
        const file = fileInput.files[0];

        // Retrieve authentication parameters for the upload.
        let authParams;
        try {
            authParams = await authenticator();
        } catch (authError) {
            console.error("Failed to authenticate for upload:", authError);
            return;
        }
        const { signature, expire, token, publicKey } = authParams;

        // Call the ImageKit SDK upload function with the required parameters and callbacks.
        try {
            const uploadResponse = await upload({
                // Authentication parameters
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file.name, 
                onProgress: (event) => {
                    setProgress((event.loaded / event.total) * 100);
                },
                abortSignal: abortController.signal,
            });
            console.log("Upload response:", uploadResponse);
            return uploadResponse
        } catch (error) {
            if (error instanceof ImageKitAbortError) {
                console.error("Upload aborted:", error.reason);
            } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request:", error.message);
            } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error:", error.message);
            } else if (error instanceof ImageKitServerError) {
                console.error("Server error:", error.message);
            } else {
                console.error("Upload error:", error);
            }
        }
    };


  return (
    <div className='h-screen max-w-screen flex flex-col gap-6'>
      <h1 className='text-xl font-bold mt-2 text-gray-800'>Create a new post</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 flex-1 mb-6'>
        
        <div className='flex  gap-4'>
          <label
            htmlFor="coverImage"
            className="p-3 rounded-xl shadow-md text-gray-600 bg-white  border-gray-300 cursor-pointer hover:bg-gray-50 transition-all text-sm w-fit"
          >
            Add Your Cover Image
            <input
              id="coverImage"
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
          </label>  
          <div>
            <h1 className='text-gray-600 font-medium'>
              {fileName ? fileName : "No file selected"}
            </h1>
            <progress className='h-1 ' value={progress} max={100}></progress>
          </div>
        </div>

        <input className='text-3xl font-semibold bg-transparent outline-0' name='title' type="text" placeholder='My Awesome Story'/>
        <div className='flex gap-4 items-center'>
          <label htmlFor="" className='text-sm'>Choose a category : </label>
          <select name="category" className='p-2 rounded-xl bg-white shadow outline-0 text-sm'  id="">
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="Database">Database</option>
            <option value="database">Database</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea name="desc" className='p-2 rounded-xl bg-white max-h-25 shadow outline-0 text-sm min-h-10'  placeholder='A short description' id=""></textarea>
        <div className='flex-1 flex gap-2 flex-col'>
          <Upload setData = {setValue}/>
            <ReactQuill theme="snow" className='min-h-100 w-full bg-white rounded-xl outline-0 border-0' value={value} onChange={setValue} />
        </div>
        <div className="flex flex-start ml-4 w-full justify-start mb-4">
            <button disabled={mutation.isPending} className='disabled:opacity-85 disabled:cursor-not-allowed cursor-pointer transition-all duration-300 rounded-2xl w-30 flex items-center justify-center h-10 py-2 bg-blue-800 text-white font-semibold z-10 mt-4'>
              {mutation.isPending?<div className='rounded-full h-4 w-4 animate-spin border-b-2'></div>:"Post"}
              </button>
        </div>
        {mutation.isError && (
            toast.error("An Error Has Occured")
          )}
      </form>
    </div>
  )
}

export default Write