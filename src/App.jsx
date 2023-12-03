import { useState ,useCallback,useRef,useEffect } from 'react'


function App() {
  const [password, setpassword] = useState("")
  const [length,setLength] = useState(8)
  const [number,setNumber] = useState(false)
  const [character,setCharacter] = useState(false)

  const passwordRef= useRef(null)

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) str+="1234567890"
    if(character) str+="!@#$%&*"

    for (let i = 0; i <= length; i++) {
      let char= Math.floor(Math.random()* str.length+1)

      pass+=str.charAt(char)
      
      
    }
    setpassword(pass)
  },[length,number,character,setpassword])

  const copytoclip=useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,18)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,number,character,passwordGenerator])


  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1>Password Generator</h1>
      <div>
        <input type="text" value={password} placeholder='Password' readOnly ref={passwordRef}/>
        <button className='bg-blue-700' onClick={copytoclip}>Copy</button>
      </div>

        <div>
          <div>
          <input type="range" value={length} min={8} max={20} className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}} />
          <label> Label :{length}</label>
        </div>
        <div>
          <input type="checkbox" defaultChecked={number}  id='numberInput' onChange={()=>{setNumber((prev)=>!prev)}}/>
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div>
          <input type="checkbox" defaultChecked={character}  id='characterInput' onChange={()=>{setCharacter((prev)=>!prev)}}/>
          <label htmlFor="characterInput">Characters</label>
        </div>
        </div>
    </div>
    </>
  )
}

export default App
