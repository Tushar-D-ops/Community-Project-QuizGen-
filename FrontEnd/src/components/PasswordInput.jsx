import React, { useState } from 'react'

import {FaRegEye , FaRegEyeSlash} from 'react-icons/fa6';
const PasswordInput = ({value,onChange, placeholder}) => {
 
 const [isShowPassword ,setisShowPassword ]=useState(false);
 const toggleShowPassword=()=>{
    setisShowPassword(!isShowPassword);
 };
    return (
    <div className='flex items-center bg-white border-2 px-5 rounded mb-4'>
      <input type={isShowPassword? "text":"password"} value={value} onChange={onChange} placeholder={placeholder || "password"} className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'/>
      {isShowPassword? 
      <>
       <FaRegEye size={22} 
      className="text-white cursor-pointer"
      onClick={()=>toggleShowPassword()}/>
         </>:
         <>
         <FaRegEyeSlash size={22} 
      className="text-white cursor-pointer"
      onClick={()=>toggleShowPassword()}/>
         </>}
    </div>
  )
}

export default PasswordInput; 