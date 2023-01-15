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
  const getchartdata=async()=>{
    const url1="http://localhost:5001"
    const res1= await axios.post(`${url1}/api/graph/getall`,{},{
      headers:{
        "auth-token":Cookies.get('auth-Tokensynex')
      }
    })
    const resp=res1.data;
setWeight(resp.weight)

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
setTime(arr1)

  }

useEffect(() => {
getchartdata()
console.log("shbcvs")
}, [helper])

  
  return (
    <Router>
<Navbar/>
<Routes>
  <Route exact path='/' element={<Landing/>} />
  <Route exact path='/login' element={<Login />} />
  <Route exact path='/signup' element={<Signup/>} />
  <Route exact path='/forgot' element={<Password/>} />
  <Route exact path='/dashboard' element={<DashBoard  time={time} weigh={weight}/>} />
</Routes>
{/* <DashBoard/> */}
    </Router>
  )
}

export default App