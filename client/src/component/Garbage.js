import React from 'react'

function Garbage({fileurl,weight}) {
  return (
    <div>
        <div className='w-[100px]'>
            <img src={fileurl} alt="pic"  />
        </div>
        <div>
            {
                weight
            }
        </div>
    </div>
  )
}

export default Garbage