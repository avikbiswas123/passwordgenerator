import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'
function App() {
  const passwordref=useRef(null)
  const [length, setLength] = useState(8)
  const [numallowed, setnumallowed] = useState(false)
  const [charallowed, setcharallowed] = useState(false)
  const [pasword, setpasword] = useState("")
  const passwordgenerator=useCallback(()=>{
let pass=""
let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
if (numallowed) {
  str+="0123456789"
}
if (charallowed) {
  str+="!@#$%^&*(){}[]?/<>,.+=|*"
}
  for (let index = 1; index < length; index++) {
    let char=Math.floor((Math.random()*str.length)+1)
    pass+=str.charAt(char)  
  }
  setpasword(pass)
  },[length,numallowed,charallowed,setpasword])
  const copytoclipboard=useCallback(()=>{
passwordref.current?.select()
window.navigator.clipboard.writeText(pasword)
  })
useEffect(()=>{
  passwordgenerator();
},
[length,numallowed,charallowed,passwordgenerator]
)
  return (
    <>
<div className='w-full max-width-md mx-auto shadow-md rounded-lg px-4 bg-gray-800 text-orange-400 my-8 py-8  '>
  <div className='flex  shadow rounded-lg overflow-hidden mb-4'>
    <input type="text" 
    value={pasword}
    className='outline-none w-full py-1 px-3'
    placeholder='Password'
    readOnly
    ref={passwordref} />
    <button className=' px-8  bg-blue-700 text-white'
    onClick={copytoclipboard}
    >Copy</button>
  </div>
  <div className='flex gap-x-2 text-s'>
    <div className='flex items-center gap-x-1'>
      <input type="range" 
      min={4}
      max={100}
      value={length}
      className='cursor-pointer'
      onChange={(e)=>{
setLength(e.target.value)
      }}
      />
      <label >Length({length})</label> 
    </div>
    <div className='flex items-center gap-x-1'>
<input type="checkbox" 
defaultChecked={numallowed}
id='numberInput'
onChange={()=>setnumallowed((prev)=>!prev)}/>
<label htmlFor="numberInput">Number</label>
    </div>
    <div className='flex items-center gap-x-1'>
<input type="checkbox" 
defaultChecked={charallowed}
id='characterInput'
onChange={()=>setcharallowed((prev)=>!prev)}
/>
<label htmlFor="characterInput">Character</label>
    </div>
  </div>
</div>
    </>
  )
}
export default App