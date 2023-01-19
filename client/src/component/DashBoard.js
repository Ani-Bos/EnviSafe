import { useState,useEffect } from 'react' 
import Garbage from './Garbage'
import { Data,Data1 } from '../utils/data'
import BarChart from './BarChart'
import PieChart from './PieChart'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import SideNavbar from './SideNavbar'
// import{useState} from 'react'
import axios from 'axios'
function DashBoard({time,weigh,pushhelper}) {
 
  const [tim, setTim] = useState([])
  const [weig, setWeig] = useState([])
  const getchartdata=async()=>{
    const url1="http://localhost:5001"
    const res1= await axios.post(`${url1}/api/graph/getall`,{},{
      headers:{
        "auth-token":Cookies.get('auth-Tokensynex')
      }
    })
    const resp=res1.data;
setWeig(resp.weight)

// resp.time.map((e)=>{
//   arr.push(e.toLocalDateString())
// })

const getFile = fruit => {
  return resp.time[fruit];
 };

const arr= resp.time.map(async(e,i)=>{
const res= await new Date(getFile(i)).toLocaleString()
return res;
})
const arr1=await Promise.all(arr)
setTim(arr1)


  }
  // useEffect(() => {

  //   getchartdata()
  // }, [tim,weig])
  


const [files, setFiles] = useState([])
  const url='http://localhost:5001/api/auth'

  const getuser=async()=>{
    const getuser=await axios.post(`${url}/getuser`,{},{headers:{
      "auth-token":Cookies.get('auth-Tokensynex')
    }})

    const data=getuser.data;
    setUser(data.user)
    setEaddress(data.user.address)
    setEphone(data.user.phone)
  }

const [eaddress, setEaddress] = useState("")
const [ephone, setEphone] = useState(0)

const handleupdate=async()=>{
const updated=await axios.put(`${url}/updateuser`,{address:eaddress,phone:ephone},{headers:{"auth-token":Cookies.get('auth-Tokensynex')}})

const res=updated.data;
console.log(res);

getuser();

}



  const [user, setUser] = useState({})

let navigate=useNavigate();
  useEffect(() => {
    if(!Cookies.get('auth-Tokensynex'))
      navigate('/login')
    console.log(time,weigh)
      getuser();
      
  }, [])
  
 
  

  const [chartData, setchartData] = useState({
    labels:time?.map((data)=>data),
    
    datasets:[
      {
        data:weigh?.map((data)=>data),
        label:"Carbon Emission"
      },
    
    ],
  })
  const [data, setData] = useState([])
  const [weight, setWeight] = useState(0)

    const handleweight=(e)=>{
setWeight(e.target.value)
    }
  const [we, setWe] = useState([])
  const [category, setCategory] = useState([])
  
  const handleadd=async()=>{
      const dataget=data;
      var a=document.getElementById('file').files
      console.log(a)
      const fil=files;
      let filr=([...fil,a[0]])
      setFiles(filr)
      let url=window.URL.createObjectURL(a[0]);
      const temp=we;
      let t=[...temp,weight];
      setWe(t);
    


      dataget.push({url,weight});
      setData(dataget)
      setWeight(0);
      let formData=new FormData();
      formData.append('file',a[0]);

      const res=await axios.post("http://127.0.0.1:5000/predict",formData,{
        headers:{
          "Content-Type": "multipart/form-data"
        }
      });
      const resp=res.data;
      console.log(resp);
      let arr=category;
      arr.push(resp);
      setCategory(arr);
    
  }

  const handlefinalSubmit=async()=>{
    const url="http://localhost:5001"
    // const getFile = fruit => {
    //   return files[fruit];
    //  };
  
  //  const arr= files.map(async(e,i)=>{
  //   const res= await window.URL.createObjectURL( getFile(i))
  //   return res;
  //   })
  //   const arr1=await Promise.all(arr)
  //   console.log(arr1)
    let formData = new FormData();
    for(var prop in files)
          formData.append("file",files[prop]);
   for(var pros in we)
    formData.append('weight',we[pros])
   for(var props in category)
    formData.append('category',category[props])

    const submit=await axios.post(`${url}/api/garbage/upload`,formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        
        "auth-token":Cookies.get("auth-Tokensynex")
      },
    })
      const res=submit.data;
      console.log(res)
    formData = new FormData();
      console.log(files)
      setWe([])
      setData([])
      setFiles([])
      
  }
  return (
<>
<div className="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden" id="modal">
  <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div className="fixed inset-0 transition-opacity">
      <div className="absolute inset-0 bg-gray-900 opacity-75" />
    </div>
    <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
    <div className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <label>Address</label>
        <input value={eaddress} onChange={(e)=>{
          setEaddress(e.target.value)
        }} type="text" className="w-full bg-gray-100 p-2 mt-2 mb-3" />
        <label>Phone</label>
        <input value={ephone} onChange={(e)=>{ setEphone(e.target.value)}} type="text" className="w-full bg-gray-100 p-2 mt-2 mb-3" />
      </div>
      <div className="bg-gray-200 px-4 py-3 text-right">
        <button type="button" className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2" onClick={()=>{document.getElementById('modal').classList.toggle('hidden')}}><i className="fas fa-times"></i> Close</button>
        <button onClick={handleupdate} type="button" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"><i className="fas fa-plus"></i> Update</button>
      </div>
    </div>
  </div>
</div>


    <div className=' grid grid-cols-[8%_92%]'>
        <div className=''>
           <SideNavbar/>
        </div>
        <div className='p-5 overflow-scroll h-[100vh]' >
          
            <div className='grid grid-cols-2'>
                <div>
                <div> <h1 className='mb-5 font-bold'>Enter Todays Garbage</h1></div> 
<div>{
  data.map((e,i)=>{
return <div key={i} className='grid grid-cols-2'> <Garbage fileurl={e.url} weight={e.weight} category={e.category}/></div>
  })
  
  
  } </div>

                <div>
    <div>
    <input  className="block w-full text-sm text-slate-500
file:mr-4 file:py-2 file:px-4
file:rounded-full file:border-0
file:text-sm file:font-semibold
file:bg-violet-50 file:text-violet-700
hover:file:bg-violet-100"  type="file" name="file" id="file" />
     </div>   
<div>
 <div className='my-5'>
   Weight
 </div>
 <input value={weight} onChange={handleweight} className='p-1 border rounded-md border-black' type="text" name="weight" id="weight" />
</div>
<div>

 
</div>
       </div>
         
           <div className='my-3'>
            <button onClick={handleadd} className='px-3 py-2 rounded font-bold text-white bg-blue-500'>Add</button>
           </div>
           <div className='my-3'>
            <button onClick={handlefinalSubmit} className='px-3 py-2 rounded font-bold text-white bg-blue-500'>Submit</button>
           </div>
                </div>
                <div>
                <div>
               <div className='flex justify-between my-3'>  <h1 className='font-bold text-lg text-center'>Profile</h1> <div><button onClick={()=>{
                document.getElementById('modal').classList.toggle('hidden')
               }} className='bg-green-700 rounded-md px-3 py-2 text-white font-bold'>Update</button></div> </div> 
               <div className='rounded border-2 p-5'>
                  <div className="rounded-full m-auto w-[100px]">
                        <img className='w-[100%] rounded-full' src={Cookies.get('dp')} alt="" />
                  </div>
                  <h2 className='font-bold text-lg'>Name</h2>
                  <div>{user?.name}</div>
                  <h2 className='font-bold text-lg'>Email</h2>
                  <div>{user?.email}</div>
                  <h2 className='font-bold text-lg'>Address</h2>
                  <div>{user?.address}</div>
                  <h2 className='font-bold text-lg'>Phone</h2>
                  <div>{user?.phone}</div>
               </div>
               
                </div>

              
                </div>
              
            </div>
            <div className='font-bold text-lg text-center my-3'>Analytics</div>
            <hr className='my-3 h-[3px]'/>
            <div className='grid grid-cols-2'>
              
                    <div className='w-[100%]'>
                    <BarChart chartData={chartData}/>
                    </div>
                    <div className='w-[100%]'>
                    <PieChart chartData={chartData}/>
                    </div>
                </div>
          </div>
        
    </div>
    </>
  )
}

export default DashBoard