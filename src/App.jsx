import { useCallback, useEffect, useRef, useState } from "react"

function App() {
  const [password, setpassword] = useState("")
  const [length, setlength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const passwordRef=useRef(null)
  
  
  const passwordGenerator=useCallback(()=>{
    console.log("Heman")
    let pas=""
    let string="abcdefghijklhmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numberAllowed) string+="0123456789"
    if(charAllowed) string+=",,./;][!@#$%^&*()_+<>?:{}"
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*string.length+1)
      pas+=string.charAt(char)
    }
    setpassword(pas)
  },[length,password,numberAllowed,charAllowed])
  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed])
  const copyPasswordToClipBoard=useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,99)
    window.navigator.clipboard.writeText(password)
  },[password])
  return (
    <>
    <div className=" h-screen w-full flex justify-center bg-slate-900 text-white font-semibold ">
      <div className=" w-5/6 flex flex-col item-center" > 
        
        <div className=" w-full mt-10 mb-5">
        <div className="text-center m-3 text-2xl">Password Generator</div>
        <div className="flex w-full">
        <input type="text"
      value={password}
      className="w-full rounded-l-md text-black" 
      placeholder="Password"
      ref={passwordRef}
      readOnly/>
      <button
       onClick={copyPasswordToClipBoard}
       className="bg-gray-200 text-black text-sm font-semibold pt-1 pb-2 px-3 rounded-r-sm
       hover:bg-blue-600 hover:text-white duration-200">Copy</button>

        </div>
        </div>
        

       <div className="flex">
       <div>
          <input type="range" 
          min={6}
          max={40}
          className="cursor-pointer mx-2"
          onChange={(e)=>setlength(e.target.value)}/>
          <label className="" htmlFor="">Length:{length}</label>
        </div>

       <div className=" px-5">
          <input type="checkbox" 
          className="cursor-pointer"
          onChange={()=>setnumberAllowed(!numberAllowed)}/>
          <label htmlFor="">Number</label>
        </div>

        <div>
          <input type="checkbox" 
          min={6}
          max={40}
          className="cursor-pointer"
          onChange={()=>{
            setcharAllowed(!charAllowed)
            console.log(charAllowed)
          }}/>
          <label htmlFor="">Special Character</label>
        </div>
       </div>

      </div>
      
    </div>
      
    </>
  )
}

export default App
