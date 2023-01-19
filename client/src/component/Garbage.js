import React from 'react'

function Garbage({fileurl,weight}) {
  return (
    <div>
        <div className='w-[100px]'>
            <img src={fileurl} alt="pic"  />
        </div>
        <div className='p-5'>
          <div className='font-bold text-lg'>Approx. Weight</div>
            {
                weight
            }
         
        </div>
    </div>
  )
}

export default Garbage