import React from 'react'

function Garbage({fileurl,weight,category}) {
  return (
    <div>
        <div className='w-[100px]'>
            <img src={fileurl} alt="pic"  />
        </div>
        <div className='p-5'>
          <div className='font-bold text-lg'>Approx. Weight in Kg</div>
            {
                weight
            }
             <div className='font-bold text-lg'>Category</div>
            {
               category
            }
         
        </div>
         
         
        
    </div>
  )
}

export default Garbage