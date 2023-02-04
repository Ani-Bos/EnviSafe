import React from 'react'

function GarbageItem({ category,images }) {
    const url = "http://localhost:5001"
        
    return (
        <div className='p-[30px] rounded-md '>
            <div className='grid gap-2 grid-cols-3'>
                {images.map((e, i) => {
                    return (
                        <div key={i} className="rounded-lg shadow-lg">
                            <div className='w-[20vw] h-[200px]  m-auto'>
                                <img className=' h-[100%] m-auto' src={`${url}/image/${e}`} alt="" />
                            </div>
                            <div className='p-[30px]'>
                            <div className='font-bold text-xl'>
                                Category
                            </div>
                            <div>
                                {
                                    category[i]
                                }
                            </div>
                            </div>
                           
                        </div>

                    )
                })
                }
            </div>

        </div>
    )
}

export default GarbageItem