import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Activity from './component/Activity'
import DashBoard from './component/DashBoard'
import Landing from './component/Landing'
import Login from './component/Login'
import Navbar from './component/Navbar'
import Password from './component/Password'
import Signup from './component/Signup'
function App() {
  const [cattt, setCattt] = useState(0)
  const [time, setTime] = useState([])
  const [timearr, setTimearr] = useState(0)
  const [weight, setWeight] = useState([])
  const [type, setType] = useState([{cat:"Biodegradable",count:0},{cat:"NonBiodegradable",count:0}])

  const [category, setCategory] = useState([{cat:"battery",count:0},{cat:"biological",count:0},{cat:"brown-glass",count:0},{cat:"cardboard",count:0},{cat:"clothes",count:0},{cat:"green-glass",count:0},{cat:"metal",count:0},{cat:"paper",count:0},{cat:"plastic",count:0},{cat:"shoes",count:0},{cat:"trash",count:0},{cat:"white-glass",count:0},])
  const getchartdata=async()=>{
    const url1="http://localhost:5001"
    const res1= await axios.post(`${url1}/api/graph/getall`,{},{
      headers:{
        "auth-token":Cookies.get('auth-Tokensynex')
      }
    })
    const resp=res1.data;
setWeight(resp.weight)
console.log(resp)


let catt=category;

for(var i in resp.category){
  for(var j in resp.category[i])
  {
    if(resp.category[i][j]==='battery')
   catt[0].count=catt[0].count+1;

    if(resp.category[i][j]==='biological')
   catt[1].count=catt[1].count+1;

    if(resp.category[i][j]==='brown-glass')
   catt[2].count=catt[2].count+1;

    if(resp.category[i][j]==='cardboard')
   catt[3].count=catt[3].count+1;

    if(resp.category[i][j]==='clothes')
   catt[4].count=catt[4].count+1;

    if(resp.category[i][j]==='green-glass')
   catt[5].count=catt[5].count+1;

    if(resp.category[i][j]==='metal')
   catt[6].count=catt[6].count+1;

    if(resp.category[i][j]==='paper')
   catt[7].count=catt[7].count+1;

    if(resp.category[i][j]==='plastic')
   catt[8].count=catt[8].count+1;

    if(resp.category[i][j]==='shoes')
   catt[9].count=catt[9].count+1;

    if(resp.category[i][j]==='trash')
   catt[10].count=catt[10].count+1;

    if(resp.category[i][j]==='white-glass')
   catt[11].count=catt[11].count+1;
  }
}
setCategory(catt);
let typ=type;

for(var it in resp.type){
  for(var jt in resp.type[it])
  {
    if(resp.type[it][jt]==='Biodegradable')
   typ[0].count=typ[0].count+1;

   else
   typ[1].count=typ[1].count+1;

    
  }
}
setType(typ);
console.log(catt)

const getFile = fruit => {
  return resp.time[fruit];
 };

const arr= resp.time.map(async(e,i)=>{
const res= await new Date(getFile(i)).toLocaleString()
return res;
})
const arr1=await Promise.all(arr)

 setTime(arr1)
const timearr= resp.time.map(async(e,i)=>{
const res= await new Date(getFile(i)).toLocaleDateString()
return res;
})
const timear=await Promise.all(timearr)
console.log(timear)
setCattt(new Set(timear).size)
let tt=new Set(timear)

let count=0;
let newarr=Array.from(tt);
newarr.reverse().forEach((el, i) => {
  if (new Date(newarr[0]) - new Date(el) === i * 86400000) count++

  console.log("ok",count)
})
setTimearr(count)
console.log(count)
  }
 
 
const [help, setHelp] = useState(false)

useEffect(() => {
  if(Cookies.get('auth-Tokensynex'))
getchartdata()
// console.log("ok")
else
console.log("not authorized");
// eslint-disable-next-line
}, [help])
const setload=()=>{
  setCategory([{cat:"battery",count:0},{cat:"biological",count:0},{cat:"brown-glass",count:0},{cat:"cardboard",count:0},{cat:"clothes",count:0},{cat:"green-glass",count:0},{cat:"metal",count:0},{cat:"paper",count:0},{cat:"plastic",count:0},{cat:"shoes",count:0},{cat:"trash",count:0},{cat:"white-glass",count:0},])
  setType([{cat:"Biodegradable",count:0},{cat:"NonBiodegradable",count:0}])
  setHelp(!help)
}
  
  return (
    <Router>
<Navbar/>
<Routes>
  <Route exact path='/' element={<Landing/>} />
  <Route exact path='/login' element={<Login />} />
  <Route exact path='/signup' element={<Signup/>} />
  <Route exact path='/forgot' element={<Password/>} />
  <Route exact path='/activity' element={<Activity/>} />
  <Route exact path='/dashboard' element={<DashBoard count={cattt} currentStreak={timearr}  time={time} weigh={weight} categories={category} types={type} setload={setload}/>} />
</Routes>
{/* <DashBoard/> */}
    </Router>
  )
}

export default App