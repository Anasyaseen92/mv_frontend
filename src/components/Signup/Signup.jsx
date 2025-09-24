import { useState } from 'react';
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import styles from "../../styles/styles.js"
import {RxAvatar} from 'react-icons/rx'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../../server.js';
import { toast } from "react-toastify";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] =useState(null);
  const navigate = useNavigate();

  
  const handleFileInputChange =(e)=>{
    const file = e.target.files[0];
    setAvatar(file);
  }
  const handleSubmit =(e) =>{
    e.preventDefault();
   const config = {headers: {"Content-Type":"multipart/form-data"}}

   const newForm =new FormData();

   newForm.append("file", avatar);
   newForm.append("name", name);
   newForm.append("email", email);
   newForm.append("password", password);

   axios
   .post(`${server}/user/create-user`,newForm,config)
   .then((res) =>{
   toast.success(res.data.message);
   setName("");
   setEmail("");
   setPassword("");
   setAvatar();
   })
   .catch((error) =>{
    const errMsg = error?.response?.data?.message || "Something went wrong";
    toast.error(errMsg);
   });
  };

  return (
    
    <div className='w-screen h-screen flex items-center justify-center bg-gray-50'>
      
      <div className='w-full max-w-md bg-white p-8 shadow-md rounded-md'>
        <h2 className='text-2xl font-bold text-gray-900 text-center mb-6'>
          Register as a new user
        </h2>

        
        <form className='space-y-4' onSubmit={handleSubmit}>

          {/* Full name section*/}

          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              Full name
            </label>
            <input
              type='text'
              name='text'
              required
              autoComplete='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='mt-1 w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            />
          </div>

          {/* email section*/}
           <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              Email address
            </label>
            <input
              type='email'
              name='email'
              required
              autoComplete='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mt-1 w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            />
          </div>

          {/* password section*/}
            <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              password
            </label>
        <div className='mt-1  relative'>
            <input
              type={visible ? "text" :"password"}
              name='password'
              required
              autoComplete='current-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='mt-1 w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            />
            {
                visible ? (
                    <AiOutlineEye className='absolute right-2 top-2 hover:text-black cursor-pointer'
            size={25}
            onClick={()=> setVisible(false)}
            />
                ) :(
                    <AiOutlineEyeInvisible className='absolute right-2 top-2 hover:text-black cursor-pointer'
            size={25}
            onClick={()=> setVisible(true)}
            />
                )
            }
        </div> 
          </div>

          {/* Avatar section*/}
       <div>
          <label htmlFor='avatar'
          className='block text-sm font-medium text-gray-700'
          >
          </label>
          <div className='mt-2 flex items-center'>
            <span className='inline-block h-8 w-8 rounded-full overflow-hidden'>
  {avatar instanceof Blob ? (
    <img
      src={URL.createObjectURL(avatar)}
      alt='avatar'
      className='h-full w-full object-cover rounded-full'
    />
  ) : (
    <RxAvatar className='h-8 w-8 text-black ' />
  )}
</span>

<label
htmlFor='file-input'
className='ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md  shadow-sm  text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
>
               <span>Upload a file</span>
                   <input
                      type='file'
                      name='avatar'
                      id='file-input'
                      accept='.jpg, .jpeg, .png'
                      onChange={handleFileInputChange}
                      className='sr-only'
                    />
</label>

          </div>
       </div>

{/* submit button */}

<div>
    <button
    type='submit'
    className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 '
    >
        Submit
    </button>
</div>

{/* do not have an account */}
<div className={`${styles.noramlFlex} w-full`}>
  <h4 className="text-black text-sm">Already have an account?</h4>
  <Link to="/login" className="text-blue-600 pl-2">
    Sign In
  </Link>
</div>

          
        </form>
      </div>
    </div>
  );
}

export default Signup;
