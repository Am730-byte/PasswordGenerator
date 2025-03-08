import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length,setLength] = useState(6)
  const [numbersAllowed,setNumbers] = useState(false)
  const [uppercaselettersAllowed,setLetters] = useState(false)
  const [symbolsAllowed,setSymbols] = useState(false)
  const [Password,setPassword] = useState('')
  const passwordRef = useRef(null)

  const copytoclipboard = () =>{
    window.navigator.clipboard.writeText(Password)
    passwordRef.current?.select()
   alert('copied to clipboard')
  }

  const generatePasswords = useCallback(()=>{
     let pass = ""
     let str = "abcdefghijklmnopqrstuvwxyz"
     if(numbersAllowed){
        str += "0123456789"
     }
     if(uppercaselettersAllowed){
        str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
     }
     if(symbolsAllowed){
        str += "!@#$%^&*()_+~`|}{[]\:;?><,./-="
     }
     for(let i = 1; i<=length; i++){
        let char = Math.floor(Math.random()*str.length + 1)
        pass += str.charAt(char)
     }

     setPassword(pass)

  },[length,numbersAllowed,uppercaselettersAllowed,symbolsAllowed])

   useEffect (()=>{
    generatePasswords()
   },[length,numbersAllowed,uppercaselettersAllowed,symbolsAllowed,generatePasswords]) 

  return (
  
    <div className='bg-gray-700 w-full h-screen flex justify-center align-self'>
      <div className='flex flex-wrap justify-center align-self bg-yellow-500 h-1/2 w-xlg mt-40 rounded-lg shadow-2xl gap-5'>
       <div className='flex w-full m-5 h-1/10 justify-center align-self gap-2'>
       <input className='bg-stone-800 outline-none w-8/10 h-full pl-5 rounded-lg placeholder:pl-5 text-yellow-500 text-xl '  placeholder='Password 'readOnly value={Password} ref={passwordRef}></input>
             <button  className='w-1/10 h-full bg-stone-800  text-yellow-500 text-md justify-center align-self rounded-lg  z-10 cursor-pointer hover:scale-110 ease-in-out'
              onClick={copytoclipboard}>Copy</button>
       </div>
         <div className='flex items-start justify-center w-3/4'>
          <label className='mr-2'>Length</label>
           <input type='range' min={6} max={50} value={length} onChange={(e) => setLength(e.target.value)} className='cursor-pointer'></input>  
           <div className='border-2 bg-white w-20 text-center ml-2'><label htmlFor='length'>{length}</label></div>   
         
             <div className='flex-col flex-1/2 justify-self-start align-self flex-wrap p-1  top-0'>
              <div className='flex flex-start align-self  ' >
                   <input  type='checkbox' defaultChecked={numbersAllowed} className='cursor-pointer mr-5 top-0' onChange={()=>{setNumbers((prev)=>!prev)}}></input>   
                  <label className=''>Numbers</label>
              </div>

              <div className='flex justify-self-start align-self ' >
                   <input type='checkbox' defaultChecked={uppercaselettersAllowed} className='cursor-pointer mr-5 ' onChange={()=>{setLetters((prev)=>!prev)}}></input>   
                 <label className=''>Upper Case</label>
              </div>
  
              <div className='flex justify-self-start align-self ' >
                   <input type='checkbox' defaultChecked={symbolsAllowed} className='cursor-pointer mr-5' onChange={()=>{setSymbols((prev)=>!prev)}}></input>   
                  <label className=''>symbols</label>
              </div>
           </div>
         </div>
    </div>
  </div> 
 )
}

export default App
