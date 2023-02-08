import React, { useEffect, useState } from 'react'
import axios from 'axios'
import GarbageItem from './GarbageItem';
import SideNav from './SideNavbar';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
function Activity() {
    let navigate=useNavigate()
    const host = "http://localhost:5001";
    const [data, setData] = useState([])
    const getgarbagedata = async () => {
        const re = await axios.post(`${host}/api/garbage/getdata`,{},{headers:{
            "auth-token":Cookies.get('auth-Tokensynex')
          }});
        setData(re.data);
    }
    useEffect(() => {
        if(!Cookies.get('auth-Tokensynex'))
        {
            navigate('/login')
            return;
        }
        getgarbagedata();
        // eslint-disable-next-line
    }, [])

    return (
        <div className='grid grid-cols-[10%_90%]'>
            <div>
                <SideNav/>
            </div>
            <div className='h-[90vh] overflow-y-scroll'>
                <div>
                    <h1 className='text-center font-bold text-xl'>All Record</h1>

                </div>
                {
                    data?.map((e, i) => {

                        return (
                            <div key={i} className='p-[30px]'>
                                <div className='text-lg font-bold'>Date</div>
                                <div>{new Date(e.createdAt).toLocaleString()}</div>
                                <div className='text-lg font-bold'>
                                    Total Carbon Weight
                                </div>
                                <div>
                                    {e.weight}
                                </div>
                                <GarbageItem images={e.filename} category={e.category} type={e.type}/>
                            </div>
                        )


                    })
                }
            </div>
        </div>
    )
}

export default Activity