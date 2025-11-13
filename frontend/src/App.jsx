import axios from 'axios';
import { useState ,useEffect } from 'react'


function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submit, setSubmit] = useState([]);
  const [editId , setEditId] = useState(null);

  function showTask(e) {
    setName(e.target.value);
  }

  function showTask2(e) {
    setEmail(e.target.value);
  }

  function showTask3(e) {
    setPassword(e.target.value);
  }

  
//get
  const getUser = async ()=>{
    const res = await axios.get("http://localhost:3000/api/submit")
    setSubmit(res.data)
  }

 useEffect(() => {
      getUser()
  }, [])

  //delete
  const handleDelete = async (id) =>{
   await axios.delete(`http://localhost:3000/api/submit/${id}`)
    getUser();
  }

  const handleEdit = (item) =>{
    setName(item.name)
    setEmail(item.email)
    setPassword(item.password)
    setEditId(item._id)
  }
  
  //post
  const handleSubmit = async () => {
    if(!name || !email || !password){
      alert("all field are required");
      return 
    }

    const userData =  {name , email , password}
    try{
        if(editId)
        {
              await axios.put(`http://localhost:3000/api/submit/${editId}`,userData)
              setEditId(null);
        }
        else
        {
           await axios.post('http://localhost:3000/api/submit',userData)
        }

        setName("");
        setEmail("");
        setPassword("");

        getUser()
    }
    catch{
        console.log(err)
    }

  }


  return (
    <>
      <div className='w-full h-screen flex flex-col items-center p-10 bg-zinc-900 text-white '>
        <h2 className='text-3xl text-center'>CRUD OPERATION</h2>

        <div className=' w-[40%] sm:w-[70%] md:w-[40%] mt-10 flex flex-col gap-4 '>
          <input type="text" onChange={showTask} className='w-full  py-3 rounded-md bg-transparent border-2 border-zinc-800 outline-none px-3' placeholder='Enter your Name' name='Name' value={name} />
          <input type="email" onChange={showTask2} className='w-full py-3 rounded-md bg-transparent border-2 border-zinc-800 outline-none px-3' placeholder='Enter your Email' name='Email' value={email} />
          <input type="password" onChange={showTask3} className='w-full py-3 rounded-md bg-transparent border-2 border-zinc-800 outline-none px-3' placeholder='Enter your Password' name='Password' value={password} />
          <button onClick={handleSubmit} className={`${editId ?"bg-green-500" : "bg-blue-500"} py-2 rounded-md active:scale-9`}>{editId?"update" : "Submit"}</button>
       
        </div>

       <div className=' w-full max-w-5xl mt-1 lg:flex justify-center  overflow-x-auto'>
         <table className='min-w-[600px] border border-gray-400 border-collapse mt-10'>
          <tbody >
              {
                 submit.map((item , idx)=>
                  (
                     <tr key={item._id || idx} className='hover:bg-gray-700 transition'>
                          <td className='border border-gray-400 px-6 py-3'>{item.name}</td>
                          <td className='border border-gray-400 px-6 py-3'>{item.email}</td>
                          <td className='border border-gray-400 px-6 py-3'>{item.password}</td>
                          <td className='border border-gray-400 px-6 py-3 flex flex-row gap-3'>
                            <button onClick={()=>handleEdit (item)} className='px-3 py-1 bg-green-400 rounded-md active:scale-95'>Edit</button>
                           <button onClick={()=> handleDelete(item._id)} className='px-3 py-1 bg-red-400 rounded-md active:scale-95'>Delete</button>
                           </td>
                     </tr>
                 )
                 )
              }
          </tbody>
        </table>
       </div>


      </div>
    </>
  )
}

export default App

