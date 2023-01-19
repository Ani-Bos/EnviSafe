import React from 'react'
import BarChart from './component/BarChart'
import { Data,Data1 } from './utils/data'
import{useState,useEffect} from 'react'
import axios from'axios'
import Cookies from 'js-cookie'
import DashBoard from './component/DashBoard'
import Navbar from './component/Navbar'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Landing from './component/Landing'
import Signup from './component/Signup'
import Login from './component/Login'
import Password from './component/Password'
function App() {
  const [helper, setHelper] = useState(false)
  const [time, setTime] = useState([])
  const [weight, setWeight] = useState([])
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
// resp.time.map((e)=>{
//   arr.push(e.toLocalDateString())
// })

let catt=category;
// setCategory([])
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


  }
const [help, setHelp] = useState(false)
useEffect(() => {
getchartdata()
console.log("shbcvs")
}, [help])
const setload=()=>{
  setCategory([{cat:"battery",count:0},{cat:"biological",count:0},{cat:"brown-glass",count:0},{cat:"cardboard",count:0},{cat:"clothes",count:0},{cat:"green-glass",count:0},{cat:"metal",count:0},{cat:"paper",count:0},{cat:"plastic",count:0},{cat:"shoes",count:0},{cat:"trash",count:0},{cat:"white-glass",count:0},])
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
  <Route exact path='/dashboard' element={<DashBoard  time={time} weigh={weight} categories={category} setload={setload}/>} />
</Routes>
{/* <DashBoard/> */}
    </Router>
  )
}

export default App