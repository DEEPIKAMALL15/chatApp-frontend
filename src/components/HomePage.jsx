 import React from 'react'
import Sidebar from './Sidebar.jsx'
import MessageContainer from './MessageContainer.jsx'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const HomePage = () => {
  const {authUser} = useSelector(store=>store.user);
  const navigate = useNavigate();
  if(!authUser)  return ( navigate('/login') ) 
  return (
    
    
    <div className=' min-h-full  flex  /* sm:h-[450px] md:h-[550px] */     w-full   overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-0'>
      <Sidebar/>
      <MessageContainer/>
    </div>
    
  )
}

export default HomePage ;

/* import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'

const HomePage = () => {
  return (
    <>
      <div className="w-full">
       
        <div className="ml-12 pb-2">
          <h1 className="text-3xl font-semibold text-gray-300">Quick</h1>
          <img  src="../../public/icon.jpg" alt=''/>
        </div>

        
        <div className='flex w-full rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
          <Sidebar />
          <MessageContainer />
        </div>
      </div>
    </>
  )
}

export default HomePage

 */