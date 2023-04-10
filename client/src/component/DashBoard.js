import { useState,useEffect } from 'react' 
import Garbage from './Garbage'
import BarChart from './BarChart'
import PieChart from './PieChart'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import SideNavbar from './SideNavbar'
import PieCha from './PieCha'
import TARGET_CLASSES from '../utils/classes'
import $ from 'jquery'
// import '../../model/model.json'
// JavaScript

import * as tf from '@tensorflow/tfjs';


// import{useState} from 'react'
import axios from 'axios'

function DashBoard({time,weigh,categories,setload,types,count,currentStreak}) {
 
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
      setload();
    
     // eslint-disable-next-line
  }, [])
  
 
  

  let chartData={
    labels:time?.map((data)=>data),
    
    datasets:[
      {
        data:weigh?.map((data)=>data),
        label:"Carbon Emission"
      },
    
    ],
  }
  

 let categoryData={
    labels:categories?.map((data)=>data.cat),
    
    datasets:[
      {
        data:categories?.map((data)=>data.count),
        label:"Category"
      },
    
    ],
  }
 let typeData={
    labels:types?.map((data)=>data.cat),
    
    datasets:[
      {
        data:types?.map((data)=>data.count),
        label:"Type"
      },
    
    ],
  }
  const [data, setData] = useState([])
  const [weight, setWeight] = useState(0)

    const handleweight=(e)=>{
      if(e.target.value==="")
{
  console.log("weight cannot be empty")
}
      else if(e.target.value>=0)
setWeight(e.target.value)
    }
  const [we, setWe] = useState([])
  const [category, setCategory] = useState([])
  const [type, setType ] = useState([])
  const [helper, setHelper] = useState(true)
  const handleadd=async()=>{
      const dataget=data;
      var a=document.getElementById('file').files
      console.log(a)
      if(a.length===0)
      {
        alert('Cannot Add No data')
        return;
      }
      const fil=files;
      let filr=([...fil,a[0]])
      setFiles(filr)
      let url=window.URL.createObjectURL(a[0]);
      const temp=we;
      let t=[...temp,weight];
      setWe(t);
    
      let formData=new FormData();
      formData.append('file',a[0]);

      // const res=await axios.post("http://127.0.0.1:5000/predict",formData,{
      //   headers:{
      //     "Content-Type": "multipart/form-data"
      //   }
      // });
      // const resp=res.data;

      const model = await tf.loadLayersModel('model.json');
      

//       const image= window.URL.createObjectURL(a[0]);
//       const img=new Image();
//       img.src=image
      // const reader=new FileReader()
      // console.log(reader.result)
      let img = $('#temp').get(0);
let tensor=tf.browser.fromPixels(img).resizeNearestNeighbor([224,224]).toFloat().div(tf.scalar(255.0)).expandDims()

 let predictions=await model.predict(tensor).data()
 let top5 = Array.from(predictions)
 .map(function (p, i) { // this is Array.map
   return {
     probability: p,
     category:TARGET_CLASSES[i][1],
     className: TARGET_CLASSES[i][0] // we are selecting the value from the obj
   };
 }).sort(function (a, b) {
   return b.probability - a.probability;
 }).slice(0, 1);

// $("#prediction-list").empty();
top5.forEach(function (resp) {
//  $("#prediction-list").append(`<li>${p.className}: ${p.probability.toFixed(6)}</li>`);
dataget.push({url,weight,cate:resp.className,type:resp.category});
setData(dataget)
setHelper(!helper)
setWeight(0);
let arr=category;
arr.push(resp.className);
setCategory(arr);
let arr1=type;
arr1.push(resp.category);
setType(arr1);
 }
 );
      

  }

  const handlefinalSubmit=async()=>{
    const url="http://localhost:5001"
  if(we.length===0 || files.length===0)
  {
    alert('Cannot Submit No data')
    return;
  }
    let formData = new FormData();
    for(var prop in files)
          formData.append("file",files[prop]);
   for(var pros in we)
    formData.append('weight',we[pros])
   for(var props in category)
    formData.append('category',category[props])
    for(var pro in type)
    formData.append('type',type[pro])

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
      setCategory([])
      setType([])
      setload();
  }
  const handlechangeinp=(e)=>{
    let reader = new FileReader();
    reader.onload = function () {
      let dataURL = reader.result;
      $(`#temp`).attr("src", dataURL);
      // $("#prediction-list").empty();
     
    }
	let file = $("#file").prop('files')[0];
	reader.readAsDataURL(file);
  }
  return (
<>
<img className='hidden' alt="yoyo" id='temp' />
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
        <input value={ephone} onChange={(e)=>{ setEphone(e.target.value)}} type="number" className="w-full bg-gray-100 p-2 mt-2 mb-3" />
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
          
            <div className='grid grid-cols-[55%_45%]'>
                <div>
                <div> <h1 className='mb-5 font-bold'>Enter Todays Garbage</h1></div> 
<div>{
  data.map((e,i)=>{
return <div key={i} className='grid grid-cols-2'> <Garbage ke={i} fileurl={e.url} weight={e.weight} category={e.cate} type={e.type}/></div>
  })
  
  
  } </div>

                <div>
    <div>
    <input  className="block w-full text-sm text-slate-500
file:mr-4 file:py-2 file:px-4
file:rounded-full file:border-0
file:text-sm file:font-semibold
file:bg-violet-50 file:text-violet-700
hover:file:bg-violet-100"  type="file" name="file" id="file"  onChange={(e)=>{handlechangeinp(e)}}/>
     </div>   
<div>
 <div className='my-5'>
   Weight in <strong>Kg</strong>
 </div>
 <input value={weight} onChange={handleweight} className='p-1 border rounded-md border-black' type="number" step="0.01" name="weight" id="weight" />
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
               <div className='rounded shadow p-5'>
                  <div className="rounded-full m-auto w-[100px]">
                        <img className='w-[100%] rounded-full' src={Cookies.get('dp')} alt="" />
                  </div>
                  <div className="grid grid-cols-2">
                    <div>
                    {
                  (!user?.address || !user?.phone) && 
                  <div className='text-center font-bold my-2'>Complete your profile</div>}
                  <h2 className='font-bold text-lg text-green-700 py-1'>Name</h2>
                  <div className='font-bold'>{user?.name}</div>
                  <h2 className='font-bold text-lg text-green-700 py-1'>Email</h2>
                  <div className='font-bold'>{user?.email}</div>
                  <h2 className='font-bold text-lg text-green-700 py-1'>Address</h2>
                  <div className='font-bold'>{user?.address}</div>
                  <h2 className='font-bold text-lg  text-green-700 py-1'>Phone</h2>
                  <div className='font-bold'>{user?.phone}</div>
                    </div>
                  <div>
                        <h1 className='font-bold text-lg p-2 text-center text-green-700 py-1'>Progress</h1>
                        <div className='rounded border-1'>
                            <div className='grid grid-cols-2 border-4 border-red-800 rounded-full p-6'>
                              <div>
                                <h1 className='font-bold text-center'>Day</h1>
                                <div className='text-center font-bold text-yellow-700'>
                                  {
                                        count
                                  }
                                </div>
                              </div>
                              <div >
                                  <h1 className='font-bold text-center'>Streak</h1>
                                  <div className='text-center font-bold text-yellow-700'>
                                  {
                                        currentStreak
                                  }
                                </div>
                              </div>
                            </div>
                        </div>
                  </div>
                  </div>
               </div>
               
                </div>

              
                </div>
              
            </div>
            <div className='font-bold text-lg text-center my-3'>Analytics</div>
            <hr className='my-3 h-[3px]'/>
         { time?.length!==0 ? <div> <div className='grid grid-cols-2'>
              
                    <div className='w-[100%]'>
                    <BarChart chartData={chartData}/>
                    </div>
                    <div className='w-[100%]'>
                      <div className=' m-auto'>
                      <PieChart chartData={categoryData}/>
                      </div>
                    
                    </div>
                
                </div>
                <h1 className='text-center font-bold text-xl py-3'>Type of waste generated</h1>
                <div className='w-[100%]'>
                      <div className='w-[30%] m-auto'>
                      <PieCha chartData={typeData}/>
                      </div>
                    
                    </div></div>: <div className='text-center font-bold text-xl my-5'>No Records Found</div> }
          </div>
        
    </div>
    
    </>
  )
}

export default DashBoard