import React from 'react'

function Garbage({ke,fileurl,weight,category,type}) {
  return (
    <div>
        <div className='w-[100px]'>
            <img src={fileurl} alt="pic" id={`img${ke}`}  />
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
             <div className='font-bold text-lg'>Type</div>
            {
               type
            }
         
        </div>
         
         
        
    </div>
  )
}

export default Garbage